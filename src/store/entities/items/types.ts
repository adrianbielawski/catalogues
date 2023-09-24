import { type NewImage } from 'components/main/catalogues/catalogue/catalogue-item/edit-item/add-image/addImage'
import {
  DeserializedItemField,
  DeserializedItemFieldValue,
} from 'src/globalTypes'

export interface ItemUpdated {
  id: number
  changes: any
}

export interface AddImagesToStatePayload {
  itemId: number
  images: NewImage[]
}

export interface ImagePayload {
  itemId: number
  index: number
}

export interface ChangeItemFieldValuePayloadBase
  extends DeserializedItemField<DeserializedItemFieldValue> {
  parentFieldId: null
  childIndex?: never
}

export interface ChangeItemChildFieldValuePayload
  extends DeserializedItemField<DeserializedItemFieldValue> {
  parentFieldId: number
  childIndex: number
}

export type ChangeItemFieldValuePayload =
  | ChangeItemFieldValuePayloadBase
  | ChangeItemChildFieldValuePayload

export interface AddItemGroupFieldChildPayload
  extends DeserializedItemField<Array<DeserializedItemField<undefined>>> {}
