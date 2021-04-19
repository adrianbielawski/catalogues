import * as T from "src/globalTypes"

export interface RecommendedCataloguesState {
    cataloguesData: T.DeserializedListData<number>,
    isFetchingCatalogues: boolean,
    error: T.ErrorMessage | null,
}