import { Selector } from "react-redux"
import { DeserializedCatalogue, DeserializedField, DeserializedItem, DeserializedItemField } from "src/globalTypes"
import { RootState } from "./storeConfig"

export const catalogueSelector = (id: number): Selector<RootState, DeserializedCatalogue> => {
    return state => state.catalogues.catalogues.filter(c => c.id == id)[0]
}

export const catalogueSelectorBySlug = (slug: string): Selector<RootState, DeserializedCatalogue> => {
    return state => state.catalogues.catalogues.filter(c => c.slug === slug)[0]
}

export const fieldSelector = (catalogueId: number, fieldId: number): Selector<RootState, DeserializedField> => {
    return state => state.catalogues.catalogues.filter(c => c.id == catalogueId)[0].fields.filter(f => f.id == fieldId)[0]
}

export const fieldsSelector = (catalogueId: number): Selector<RootState, DeserializedField[]> => {
    return state => state.catalogues.catalogues.filter(c => c.id == catalogueId)[0].fields
}

export const itemSelector = (itemId: number | string): Selector<RootState, DeserializedItem> => {
    return state => state.itemsData.results.filter(i => i.id == itemId)[0]
}

export const itemFieldsSelector = (itemId: number | string): Selector<RootState, DeserializedItemField[]> => {
    return state => state.itemsData.results.filter(i => i.id == itemId)[0].fieldsValues
}