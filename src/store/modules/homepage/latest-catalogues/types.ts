import * as T from "src/globalTypes"

export interface LatestCataloguesState {
    cataloguesData: T.DeserializedListData<number> | null,
    isFetchingCatalogues: boolean,
    error: T.ErrorMessage | null,
}