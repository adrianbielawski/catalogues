import { DeserializedListData } from "src/globalTypes";

export interface RecomendedCataloguesState {
    recomendedCataloguesData: RecomendedCataloguesData,
}

export interface RecomendedCataloguesData extends DeserializedListData<number> {
    results: number[]
    isFetchingCatalogues: boolean,
}