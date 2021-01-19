import { Selector } from "react-redux"
import { DeserializedCatalogue, DeserializedField } from "src/globalTypes"
import { RootState } from "./reducers"

export const catalogueSelector = (id: number): Selector<RootState, DeserializedCatalogue> => {
    return state => state.catalogues.catalogues.filter(c => c.id == id)[0]
}

export const fieldSelector = (catalogueId: number, fieldId: number): Selector<RootState, DeserializedField> => {
    return state => state.catalogues.catalogues.filter(c => c.id == catalogueId)[0].fields.filter(f => f.id == fieldId)[0]
}