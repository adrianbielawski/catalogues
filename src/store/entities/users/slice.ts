import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
//Types
import { User, DeserializedUser } from 'src/globalTypes'
import { UserUpdatedPayload } from './types'
//Serializers
import { userDeserializer } from 'src/serializers'
//Actions
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'

const usersAdapter = createEntityAdapter<DeserializedUser>({})

export const usersEntitiesSlice = createSlice({
    name: 'USERS',
    initialState: usersAdapter.getInitialState(),
    reducers: {
        USERS_UPDATED(state, action: PayloadAction<User[]>) {
            usersAdapter.upsertMany(state, action.payload.map(userDeserializer))
        },
        USER_UPDATED(state, action: PayloadAction<User>) {
            usersAdapter.upsertOne(state, userDeserializer(action.payload))
        },
        USER_CHANGED(state, action: PayloadAction<UserUpdatedPayload>) {
            usersAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload.changes,
            })
        },
        USER_ADDED(state, action: PayloadAction<User>) {
            usersAdapter.addOne(state, userDeserializer(action.payload))
        },
        USER_REMOVED(state, action: PayloadAction<number>) {
            usersAdapter.removeOne(state, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => { })
    }
})

export const {
    USERS_UPDATED,
    USER_UPDATED,
    USER_ADDED,
    USER_REMOVED,
} = usersEntitiesSlice.actions