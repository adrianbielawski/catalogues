import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { DeserializedField } from 'src/globalTypes'
import { FieldUpdated } from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'

const fieldsAdapter = createEntityAdapter<DeserializedField>({})

export const fieldsEntitiesSlice = createSlice({
  name: 'FIELDS',
  initialState: fieldsAdapter.getInitialState(),
  reducers: {
    FIELDS_UPDATED(state, action: PayloadAction<DeserializedField[]>) {
      fieldsAdapter.upsertMany(state, action.payload)
    },
    FIELD_UPDATED(state, action: PayloadAction<FieldUpdated>) {
      fieldsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload.changes,
      })
    },
    FIELDS_ADDED(state, action: PayloadAction<DeserializedField[]>) {
      fieldsAdapter.addMany(state, action.payload)
    },
    FIELD_REMOVED(state, action: PayloadAction<number>) {
      fieldsAdapter.removeOne(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CLEAR_APP_STATE, () => fieldsAdapter.getInitialState())
  },
})

export const { FIELDS_UPDATED, FIELD_UPDATED, FIELDS_ADDED, FIELD_REMOVED } =
  fieldsEntitiesSlice.actions
