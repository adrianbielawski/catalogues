import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
//Types
import { DeserializedField, Field } from 'src/globalTypes'
import { FieldUpdated } from './types'
//Serializers
import { fieldDeserializer } from 'src/serializers'
//Actions
import { CLEAR_APP_STATE } from 'store/modules/app/slice'

const fieldsAdapter = createEntityAdapter<DeserializedField>({})

export const fieldsEntitiesSlice = createSlice({
    name: 'FIELDS',
    initialState: fieldsAdapter.getInitialState(),
    reducers: {
        FIELDS_UPDATED(state, action: PayloadAction<Field[]>) {
            fieldsAdapter.upsertMany(state, action.payload.map(fieldDeserializer))
        },
        FIELD_UPDATED(state, action: PayloadAction<FieldUpdated>) {
            fieldsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload.changes,
            })
        },
        FIELD_ADDED(state, action: PayloadAction<Field>) {
            fieldsAdapter.addOne(state, fieldDeserializer(action.payload))
        },
        FIELD_REMOVED(state, action: PayloadAction<number>) {
            fieldsAdapter.removeOne(state, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => fieldsAdapter.getInitialState())
    }
})

export const {
    FIELDS_UPDATED,
    FIELD_UPDATED,
    FIELD_ADDED,
    FIELD_REMOVED,
} = fieldsEntitiesSlice.actions