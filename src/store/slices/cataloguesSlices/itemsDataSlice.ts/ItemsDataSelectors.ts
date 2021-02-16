import { DeserializedItem, DeserializedItemField } from "src/globalTypes"
import { ItemsDataState } from "./itemsDataTypes"

export const getItemById = (
    state: ItemsDataState,
    itemId: number | string,
): DeserializedItem => (
    state.results.filter(f => f.id === itemId)[0]
)

export const getFieldValueById = (
    state: ItemsDataState,
    itemId: number | string,
    fieldId: number | string,
): DeserializedItemField => (
    getFieldsValuesById(state, itemId).filter(f => f.fieldId === fieldId)[0]
)

export const getFieldsValuesById = (
    state: ItemsDataState,
    itemId: number | string,
): DeserializedItemField[] => (
    getItemById(state, itemId).fieldsValues
)