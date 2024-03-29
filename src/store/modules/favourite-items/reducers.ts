import { current, PayloadAction } from '@reduxjs/toolkit'
import { networkError } from 'src/constants'
import {
  DeserializedCatalogue,
  DeserializedCommentData,
  DeserializedItemData,
  DeserializedListData,
  Field,
  Item,
  ListData,
} from 'src/globalTypes'
import {
  itemCommentDataDeserializer,
  itemDataDeserializer,
  listDeserializer,
} from 'src/serializers'
import {
  getItemCommentDataById,
  getItemCommentsDataById,
  getItemDataById,
} from './selectors'
import type * as T from './types'

type State = T.FavouriteItemsSliceState

export const favouriteItems = {
  CLEAR_FAVOURITE_ITEMS_ERROR(state: State) {
    state.error = null
  },
}

export const fetchFavouriteItems = {
  FETCH_FAVOURITE_ITEMS(
    state: State,
    action: PayloadAction<T.FetchFavouriteItemsPayload>,
  ) {},
  FETCH_FAVOURITE_ITEMS_START(state: State) {
    state.isFetchingItems = true
  },
  FETCH_FAVOURITE_ITEMS_SUCCESS(
    state: State,
    action: PayloadAction<ListData<Item>>,
  ) {
    const prevResults =
      action.payload.current === 1 ? [] : current(state).itemsData?.results
    const itemsData = listDeserializer(
      action.payload,
      itemDataDeserializer,
      prevResults,
    )
    state.itemsData = { ...itemsData }
    state.isFetchingItems = false
  },
  FETCH_FAVOURITE_ITEMS_FAILURE(state: State) {
    state.error = networkError
  },
}

export const fetchFavouriteItemsComments = {
  FETCH_FAVOURITE_ITEMS_COMMENTS(
    state: State,
    action: PayloadAction<number>,
  ) {},
  FETCH_FAVOURITE_ITEMS_COMMENTS_SUCCESS(
    state: State,
    action: PayloadAction<T.FetchItemsCommentsSuccessPayload>,
  ) {
    const data = action.payload
    for (const id in data) {
      const itemData =
        getItemDataById(state, parseInt(id)) ?? ({} as DeserializedItemData)
      itemData.commentsData = listDeserializer(
        data[id],
        itemCommentDataDeserializer,
        itemData.commentsData?.results || [],
      )
      itemData.isFetchingComments = false
      itemData.commentsData.startIndex = 1
    }
  },
  FETCH_FAVOURITE_ITEMS_COMMENTS_FAILURE(state: State) {
    state.error = networkError
  },
  FAVOURITE_ITEMS_COMMENTS_NOT_NEEDED(state: State) {},
}

export const fetchFavouriteItemsData = {
  FETCH_FAVOURITE_ITEMS_DATA(state: State) {},
  FETCH_FAVOURITE_ITEMS_DATA_SUCCESS(
    state: State,
    action: PayloadAction<DeserializedCatalogue[]>,
  ) {
    state.cataloguesIds = action.payload.map((c) => c.id)
  },
  FETCH_FAVOURITE_ITEMS_DATA_FAILURE(state: State) {
    state.error = networkError
  },
}

export const fetchFavouriteItemsFields = {
  FETCH_FAVOURITE_ITEMS_FIELDS(state: State, action: PayloadAction<number>) {},
  FETCH_FAVOURITE_ITEMS_FIELDS_SUCCESS(
    state: State,
    action: PayloadAction<Field[]>,
  ) {},
  FETCH_FAVOURITE_ITEMS_FIELDS_FAILURE(state: State) {
    state.error = networkError
  },
  FAVOURITE_ITEMS_FIELDS_NOT_NEEDED(state: State) {
    state.isFetchingFavItemsData = false
  },
}

export const fetchFavouriteItemsChoices = {
  FETCH_FAVOURITE_ITEMS_CHOICES(state: State, action: PayloadAction<number>) {},
  FETCH_FAVOURITE_ITEMS_CHOICES_SUCCESS(
    state: State,
    action: PayloadAction<Field[]>,
  ) {
    state.isFetchingFavItemsData = false
  },
  FETCH_FAVOURITE_ITEMS_CHOICES_FAILURE(state: State) {
    state.error = networkError
  },
  FAVOURITE_ITEMS_CHOICES_NOT_NEEDED(state: State) {
    state.isFetchingFavItemsData = false
  },
}

export const fetchFavouriteItemComments = {
  FETCH_FAVOURITE_ITEM_COMMENTS(
    state: State,
    action: PayloadAction<T.FetchItemCommentsPayload>,
  ) {},
  FETCH_FAVOURITE_ITEM_COMMENTS_START(
    state: State,
    action: PayloadAction<number>,
  ) {
    const itemData =
      getItemDataById(state, action.payload) ?? ({} as DeserializedItemData)
    itemData.isFetchingComments = true
  },
  FETCH_FAVOURITE_ITEM_COMMENTS_SUCCESS(
    state: State,
    action: PayloadAction<T.FetchItemCommentsSuccessPayload>,
  ) {
    const itemData =
      getItemDataById(state, action.payload.itemId) ??
      ({} as DeserializedItemData)
    itemData.isFetchingComments = false
    itemData.commentsData = listDeserializer(
      action.payload.data,
      itemCommentDataDeserializer,
      itemData.commentsData.results,
    )
    itemData.commentsData.startIndex = 1
  },
  FETCH_FAVOURITE_ITEM_COMMENTS_FAILURE(
    state: State,
    action: PayloadAction<number>,
  ) {
    const itemData =
      getItemDataById(state, action.payload) ?? ({} as DeserializedItemData)
    itemData.isFetchingComments = false
  },
}

export const postFavouriteItemComment = {
  POST_FAVOURITE_ITEM_COMMENT(
    state: State,
    action: PayloadAction<T.PostItemCommentPayload>,
  ) {},
  POST_FAVOURITE_ITEM_COMMENT_START(
    state: State,
    action: PayloadAction<number>,
  ) {
    const itemData =
      getItemDataById(state, action.payload) ?? ({} as DeserializedItemData)
    itemData.isPostingComment = true
  },
  POST_FAVOURITE_ITEM_COMMENT_SUCCESS(
    state: State,
    action: PayloadAction<T.PostItemCommentSuccessPayload>,
  ) {
    const itemData =
      getItemDataById(state, action.payload.item_id) ??
      ({} as DeserializedItemData)
    const commentsData =
      getItemCommentsDataById(state, action.payload.item_id) ??
      ({} as DeserializedListData<DeserializedCommentData>)
    const parentId = action.payload.parent_id

    if (parentId) {
      const parentComment =
        getItemCommentDataById(state, action.payload.item_id, parentId) ??
        ({} as DeserializedCommentData)
      parentComment.children.unshift(action.payload.id)
    } else {
      commentsData.results.unshift({
        id: action.payload.id,
        children: [],
      })
    }

    commentsData.count = action.payload.meta.count
    itemData.isPostingComment = false
  },
  POST_FAVOURITE_ITEM_COMMENT_FAILURE(
    state: State,
    action: PayloadAction<number>,
  ) {
    const itemData =
      getItemDataById(state, action.payload) ?? ({} as DeserializedItemData)
    itemData.isPostingComment = false
    itemData.itemError = networkError
  },
}
