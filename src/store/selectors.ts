import { Selector } from "@reduxjs/toolkit"
import { RootState } from "./storeConfig"
import * as T from "src/globalTypes"
import { CurrentUserCatalogueData, CurrentUserFieldData } from "./modules/current-user-catalogues/types"
import { AuthUserCatalogueData, AuthUserFieldData } from "./modules/auth-user-catalogues/types"

type SelectorType<T> = Selector<RootState, T>

//Catalogues entities
export const catalogueSelector = (id: number): SelectorType<T.DeserializedCatalogue> => (
    state => state.entities.catalogues.entities[id]!
)

export const catalogueSelectorBySlug = (slug: string): SelectorType<T.DeserializedCatalogue> => (
    state => Object.values(state.entities.catalogues.entities).filter(c => c!.slug === slug)[0]!
)

//Fields entities
export const fieldSelector = (fieldId: number): SelectorType<T.DeserializedField> => (
    state => state.entities.fields.entities[fieldId]!
)

export const fieldsSelector = (fieldsIds: number[]): SelectorType<T.DeserializedField[]> => (
    state => fieldsIds.map(f => state.entities.fields.entities[f]) as T.DeserializedField[]
)

//Choices entities
export const fieldChoicesSelector = (fieldId: number): SelectorType<T.DeserializedChoice[]> => (
    state => Object.values(state.entities.choices.entities).filter(c =>
        c!.fieldId === fieldId) as T.DeserializedChoice[]
)

//Current user
export const currentUserCatalogueSelector = (id: number): SelectorType<CurrentUserCatalogueData> => (
    state => state.modules.currentUserCatalogues.cataloguesData.filter(c => c.id === id)[0]
)

export const currentUserFieldDataSelector = (
    catalogueId: number,
    fieldId: number
): SelectorType<CurrentUserFieldData> => (
    state => state.modules.currentUserCatalogues.cataloguesData.filter(c =>
        c.id === catalogueId)[0].fieldsData.filter(f => f.id === fieldId)[0]
)

export const currentUserFieldsDataSelector = (catalogueId: number): SelectorType<CurrentUserFieldData[]> => (
    state => state.modules.currentUserCatalogues.cataloguesData.filter(c =>
        c.id === catalogueId)[0].fieldsData
)

//Auth user
export const authUserCatalogueSelector = (id: number): SelectorType<AuthUserCatalogueData> => (
    state => state.modules.authUserCatalogues.cataloguesData.filter(c => c.id === id)[0]
)

export const authUserFieldDataSelector = (
    catalogueId: number,
    fieldId: number
): SelectorType<AuthUserFieldData> => (
    state => state.modules.authUserCatalogues.cataloguesData.filter(f =>
        f.id === catalogueId)[0].fieldsData.filter(f => f.id === fieldId)[0]
)

export const authUserFieldsDataSelector = (catalogueId: number): SelectorType<AuthUserFieldData[]> => (
    state => state.modules.authUserCatalogues.cataloguesData.filter(f =>
        f.id === catalogueId)[0].fieldsData
)

export const itemSelector = (itemId: number): SelectorType<T.DeserializedItem> => (
    state => state.itemsData.results.filter(i => i.id == itemId)[0]
)

export const itemFieldsSelector = (itemId: number): SelectorType<T.DeserializedItemField[]> => (
    state => state.itemsData.results.filter(i => i.id == itemId)[0].fieldsValues
)