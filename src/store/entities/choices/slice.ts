import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
//Types
import { Choice, DeserializedChoice } from 'src/globalTypes'
import { FieldChoiceUpdated } from './types'
//Serializers
import { choiceDeserializer, choicesDeserializer } from 'src/serializers'
//Actions
import { CLEAR_APP_STATE } from 'store/modules/app/slice'

const choicesAdapter = createEntityAdapter<DeserializedChoice>({})

export const choicesEntitiesSlice = createSlice({
    name: 'CHOICES',
    initialState: choicesAdapter.getInitialState(),
    reducers: {
        CHOICES_UPDATED(state, action: PayloadAction<Choice[]>) {
            choicesAdapter.upsertMany(state, choicesDeserializer(action.payload))
        },
        CHOICE_UPDATED(state, action: PayloadAction<FieldChoiceUpdated>) {
            choicesAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload.changes,
            })
        },
        CHOICE_ADDED(state, action: PayloadAction<Choice>) {
            choicesAdapter.addOne(state, choiceDeserializer(action.payload))
        },
        CHOICE_REMOVED(state, action: PayloadAction<number>) {
            choicesAdapter.removeOne(state, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => { })
    }
})

export const {
    CHOICES_UPDATED,
    CHOICE_UPDATED,
    CHOICE_ADDED,
    CHOICE_REMOVED,
} = choicesEntitiesSlice.actions