import { DeserializedChoice, DeserializedChoiceField, DeserializedField } from "src/globalTypes"
import { CataloguesState } from "./cataloguesTypes"

export const getCatalogueById = (
    state: CataloguesState,
    id: number
) => (
    state.catalogues.filter(c => c.id === id)[0]
)

export const getFieldById = (
    state: CataloguesState,
    catalogueId: number,
    fieldId: number,
): DeserializedField => (
    getCatalogueById(state, catalogueId).fields.filter(f => f.id === fieldId)[0]
)

export const getChoiceById = (
    state: CataloguesState,
    catalogueId: number,
    fieldId: number,
    choiceId: number | string,
): DeserializedChoice => {
    const field = getFieldById(state, catalogueId, fieldId) as DeserializedChoiceField
    return field.choices.filter(choice => choice.id === choiceId)[0]
}