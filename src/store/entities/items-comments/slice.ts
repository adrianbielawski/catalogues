import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
//Types
import { ItemCommentParent, DeserializedItemCommentParent } from 'src/globalTypes'
import { ItemCommentUpdated, ItemCommentChildAdded } from './types'
//Serializers
import { itemCommentChildDeserializer, itemCommentDeserializer } from 'src/serializers'
//Actions
import { CLEAR_APP_STATE } from 'store/modules/app/slice'

const itemsCommentsAdapter = createEntityAdapter<DeserializedItemCommentParent>({})

export const itemsCommentsEntitiesSlice = createSlice({
    name: 'ITEMS_COMMENTS',
    initialState: itemsCommentsAdapter.getInitialState(),
    reducers: {
        ITEMS_COMMENTS_UPDATED(state, action: PayloadAction<ItemCommentParent[]>) {
            itemsCommentsAdapter.upsertMany(state, action.payload.map(itemCommentDeserializer))
        },
        ITEM_COMMENT_UPDATED(state, action: PayloadAction<ItemCommentUpdated>) {
            itemsCommentsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload.changes,
            })
        },
        ITEM_COMMENT_ADDED(state, action: PayloadAction<ItemCommentParent>) {
            itemsCommentsAdapter.addOne(state, itemCommentDeserializer(action.payload))
        },
        ITEM_COMMENTS_REMOVED(state, action: PayloadAction<number>) {
            itemsCommentsAdapter.removeOne(state, action.payload)
        },
        ITEM_COMMENT_CHILD_ADDED(state, action: PayloadAction<ItemCommentChildAdded>) {
            state.entities[action.payload.parentId]?.children.unshift(itemCommentChildDeserializer(action.payload.child))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => itemsCommentsAdapter.getInitialState())
    }
})

export const {
    ITEMS_COMMENTS_UPDATED,
    ITEM_COMMENT_UPDATED,
    ITEM_COMMENT_ADDED,
    ITEM_COMMENTS_REMOVED,
    ITEM_COMMENT_CHILD_ADDED,
} = itemsCommentsEntitiesSlice.actions