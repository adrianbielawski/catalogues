import { AuthUserCataloguesState, AuthUserFieldData, AuthUserChoiceData, AuthUserChoiceFieldData } from "./types"

export const getCatalogueDataById = (
    state: AuthUserCataloguesState,
    id: number
) => {
    return state.cataloguesData.filter(c => c.id === id)[0]
}

export const getFieldDataById = (
    state: AuthUserCataloguesState,
    catalogueId: number,
    fieldId: number,
): AuthUserFieldData => (
    getCatalogueDataById(state, catalogueId).fieldsData.filter(f => f.id === fieldId)[0]
)

export const getChoiceDataById = (
    state: AuthUserCataloguesState,
    catalogueId: number,
    fieldId: number,
    choiceId: number,
): AuthUserChoiceData => (
    (getFieldDataById(state, catalogueId, fieldId) as AuthUserChoiceFieldData).choices.filter(c => c.id === choiceId)[0]
)