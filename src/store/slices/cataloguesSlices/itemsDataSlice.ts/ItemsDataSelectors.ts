import { DeserializedItem, DeserializedItemField } from "src/globalTypes"
import { ItemsDataState } from "./itemsDataTypes"

export const getItemById = (
    state: ItemsDataState,
    itemId: number,
): DeserializedItem => (
    state.results.filter(f => f.id === itemId)[0]
)

export const getFieldValueById = (
    state: ItemsDataState,
    itemId: number,
    fieldId: number | string,
): DeserializedItemField => (
    getFieldsValuesById(state, itemId).filter(f => f.fieldId === fieldId)[0]
)

export const getFieldsValuesById = (
    state: ItemsDataState,
    itemId: number,
): DeserializedItemField[] => (
    getItemById(state, itemId).fieldsValues
)