import * as T from "src/globalTypes"

export interface RecommendedCataloguesState {
    cataloguesData: T.DeserializedListData<number> & T.Salt,
    isFetchingCatalogues: boolean,
    error: T.ErrorMessage | null,
}

export interface FetchRecomendedCatalogues {
    page: number,
    salt?: string,
}