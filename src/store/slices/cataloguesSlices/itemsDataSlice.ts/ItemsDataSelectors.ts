import { DeserializedItem, DeserializedItemComment, DeserializedItemField } from "src/globalTypes"
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

export const getCommentById = (
    state: ItemsDataState,
    itemId: number,
    id: number,
): DeserializedItemComment => (
    getItemById(state, itemId).commentsData!.results.filter(c => c.id === id)[0]
)