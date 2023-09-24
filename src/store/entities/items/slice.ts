import {
  createEntityAdapter,
  createSlice,
  type EntityState,
  type PayloadAction,
} from '@reduxjs/toolkit'
// Types
import {
  type Item,
  type DeserializedItem,
  type DeserializedItemField,
  type DeserializedItemFieldValue,
  DeserializedGroupFieldValue,
} from 'src/globalTypes'
import type * as T from './types'
// Utils
import { mod } from 'src/utils'
// Serializers
import { itemDeserializer } from 'src/serializers'
// Actions
import { CLEAR_APP_STATE } from 'store/modules/app/slice'

export const getFieldValueById = (
  state: EntityState<DeserializedItem>,
  itemId: number,
  fieldId: number | string,
): DeserializedItemField<DeserializedItemFieldValue> =>
  getFieldsValuesById(state, itemId).filter((f) => f.fieldId === fieldId)[0]

export const getFieldsValuesById = (
  state: EntityState<DeserializedItem>,
  itemId: number,
): Array<DeserializedItemField<DeserializedItemFieldValue>> =>
  state.entities[itemId]!.fieldsValues

const itemsAdapter = createEntityAdapter<DeserializedItem>({})

export const itemsEntitiesSlice = createSlice({
  name: 'ITEMS',
  initialState: itemsAdapter.getInitialState(),
  reducers: {
    ITEMS_UPDATED(state, action: PayloadAction<Item[]>) {
      itemsAdapter.upsertMany(state, action.payload.map(itemDeserializer))
    },
    UPSERT_ITEM(state, action: PayloadAction<Item>) {
      itemsAdapter.upsertOne(state, itemDeserializer(action.payload))
    },
    ITEM_UPDATED(state, action: PayloadAction<T.ItemUpdated>) {
      itemsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload.changes,
      })
    },
    ITEM_ADDED(state, action: PayloadAction<Item>) {
      itemsAdapter.addOne(state, itemDeserializer(action.payload))
    },
    ITEM_REMOVED(state, action: PayloadAction<number>) {
      itemsAdapter.removeOne(state, action.payload)
    },
    ADD_ITEM_GROUP_FIELD_CHILD(
      state,
      action: PayloadAction<T.AddItemGroupFieldChildPayload>,
    ) {
      const { itemId, fieldId, value } = action.payload

      const fieldValue = getFieldValueById(
        state,
        itemId,
        fieldId,
      ) as DeserializedItemField<DeserializedGroupFieldValue>

      const newField = {
        itemId,
        fieldId,
        value: [] as DeserializedGroupFieldValue,
      }

      if (fieldValue) {
        newField.value = [...fieldValue.value, value]
        Object.assign(fieldValue, newField)
      } else {
        newField.value = [value]
        const fieldsValues = getFieldsValuesById(state, itemId)
        fieldsValues.push(newField)
      }
    },
    CHANGE_ITEM_FIELD_VALUE(
      state,
      action: PayloadAction<T.ChangeItemFieldValuePayload>,
    ) {
      const { itemId, fieldId, parentFieldId, childIndex, value } =
        action.payload

      const fieldValue = getFieldValueById(
        state,
        itemId,
        parentFieldId ?? fieldId,
      )

      if (parentFieldId) {
        if (fieldValue) {
          const fv =
            fieldValue as DeserializedItemField<DeserializedGroupFieldValue>
          const childFieldValue = fv.value[childIndex].find(
            (f) => f.fieldId === fieldId,
          )!
          childFieldValue.value = value
        } else {
          const fieldsValues = getFieldsValuesById(state, itemId)

          const newField = {
            itemId,
            fieldId: parentFieldId,
            value: [[{ itemId, fieldId, value }]],
          }
          fieldsValues.push(newField)
        }
      } else {
        const newField = { itemId, fieldId, value }

        if (fieldValue) {
          Object.assign(fieldValue, newField)
        } else {
          const fieldsValues = getFieldsValuesById(state, itemId)
          fieldsValues.push(newField)
        }
      }
    },
    ADD_IMAGES_TO_STATE(
      state,
      action: PayloadAction<T.AddImagesToStatePayload>,
    ) {
      const item = state.entities[action.payload.itemId]!

      action.payload.images.forEach((image, i) => {
        item.images.push({
          id: `newImage_${i}_${Date.now()}`,
          image: image.url,
          imageThumbnail: '',
          isPrimary: item.images.length === 0,
          itemId: item.id,
          dimensions: image.dimensions,
        })
      })
    },
    REMOVE_IMAGE_FROM_STATE(state, action: PayloadAction<T.ImagePayload>) {
      const item = state.entities[action.payload.itemId]!
      const removedImage = item.images[action.payload.index]

      if (removedImage.isPrimary && item.images.length > 1) {
        const newPrimaryIndex = mod(
          item.images.length,
          action.payload.index + 1,
        )
        item.images[newPrimaryIndex].isPrimary = true
      }

      if (!removedImage.id.toString().startsWith('newImage')) {
        item.removedImages.push(removedImage)
      }
      item.images.splice(action.payload.index, 1)
    },
    CHANGE_PRIMARY_IMAGE(state, action: PayloadAction<T.ImagePayload>) {
      const item = state.entities[action.payload.itemId]!
      const prevPrimary = item.images.findIndex((img) => img.isPrimary)
      item.images[prevPrimary].isPrimary = false
      item.images[action.payload.index].isPrimary = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CLEAR_APP_STATE, () => itemsAdapter.getInitialState())
  },
})

export const {
  ITEMS_UPDATED,
  UPSERT_ITEM,
  ITEM_UPDATED,
  ITEM_ADDED,
  ITEM_REMOVED,
  ADD_ITEM_GROUP_FIELD_CHILD,
  CHANGE_ITEM_FIELD_VALUE,
  ADD_IMAGES_TO_STATE,
  REMOVE_IMAGE_FROM_STATE,
  CHANGE_PRIMARY_IMAGE,
} = itemsEntitiesSlice.actions
