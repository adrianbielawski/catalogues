import { CurrentUserFieldData } from "src/globalTypes"
import { CurrentUserCataloguesState } from "./types"

export const getCatalogueDataById = (
    state: CurrentUserCataloguesState,
    id: number
) => {
    return state.cataloguesData.filter(c => c.id === id)[0]
}

export const getFieldDataById = (
    state: CurrentUserCataloguesState,
    catalogueId: number,
    fieldId: number,
): CurrentUserFieldData => (
    getCatalogueDataById(state, catalogueId).fieldsData.filter(f => f.id === fieldId)[0]
)