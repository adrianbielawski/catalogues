import type * as T from 'src/globalTypes'

export interface RecommendedCataloguesState {
  cataloguesData: (T.DeserializedListData<number> & T.Salt) | null
  isFetchingCatalogues: boolean
  error: T.ErrorMessage | null
}

export interface FetchRecommendedCatalogues {
  page: number
  salt?: string
}
