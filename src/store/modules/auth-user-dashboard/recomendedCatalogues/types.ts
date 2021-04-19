import * as T from "src/globalTypes"

export interface RecomendedCataloguesState {
    cataloguesData: T.DeserializedListData<number>,
    isFetchingCatalogues: boolean,
    error: T.ErrorMessage | null,
}