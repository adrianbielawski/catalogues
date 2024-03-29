import type * as T from 'src/globalTypes'

export interface LatestFromFavouritesState {
  itemsData: T.DeserializedListData<T.DeserializedItemData> | null
  isFetchingItems: boolean
  isFetchingData: boolean
  error: T.ErrorMessage | null
}

export type FetchLFFItemsCommentsSuccessPayload = Record<
  number,
  T.ListData<T.ItemCommentParent>
>

export interface PostLFFItemCommentSuccessPayload extends T.ItemCommentChild {
  parent_id: number
  meta: {
    count: number
  }
}

export interface PostLFFItemCommentPayload {
  itemId: number
  parentId?: number
  text: string
}

export interface FetchLFFItemCommentsPayload {
  itemId: number
  page: number | null
}

export interface FetchLFFItemCommentsSuccessPayload {
  itemId: number
  data: T.ListData<T.ItemCommentParent>
}
