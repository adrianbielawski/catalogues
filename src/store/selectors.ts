import { Dictionary, Selector } from "@reduxjs/toolkit"
import { RootState } from "./storeConfig"
import * as T from "src/globalTypes"

type SelectorType<T> = Selector<RootState, T>

//User
export const userSelector = (id: number): SelectorType<T.DeserializedUser> => (
    state => state.entities.users.entities[id]!
)

export const usersSelector = (): SelectorType<Dictionary<T.DeserializedUser>> => (
    state => state.entities.users.entities
)

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
export const currentUserCatalogueSelector = (id: number): SelectorType<T.CurrentUserCatalogueData> => (
    state => state.modules.currentUserCatalogues.cataloguesData.filter(c => c.id === id)[0]
)

export const currentUserFieldDataSelector = (
    catalogueId: number,
    fieldId: number
): SelectorType<T.CurrentUserFieldData> => (
    state => state.modules.currentUserCatalogues.cataloguesData.filter(c =>
        c.id === catalogueId)[0].fieldsData.filter(f => f.id === fieldId)[0]
)

export const currentUserFieldsDataSelector = (catalogueId: number): SelectorType<T.CurrentUserFieldData[]> => (
    state => state.modules.currentUserCatalogues.cataloguesData.filter(c =>
        c.id === catalogueId)[0].fieldsData
)

//Auth user
export const authUserCatalogueDataSelector = (id: number): SelectorType<T.AuthUserCatalogueData> => (
    state => state.modules.authUserCatalogues.cataloguesData.filter(c => c.id === id)[0]
)

export const authUserFieldDataSelector = (
    catalogueId: number,
    fieldId: number
): SelectorType<T.AuthUserFieldData> => (
    state => state.modules.authUserCatalogues.cataloguesData.filter(f =>
        f.id === catalogueId)[0].fieldsData.filter(f => f.id === fieldId)[0]
)

export const authUserFieldsDataSelector = (catalogueId: number): SelectorType<T.AuthUserFieldData[]> => (
    state => state.modules.authUserCatalogues.cataloguesData.filter(f =>
        f.id === catalogueId)[0].fieldsData
)

//Items data
export const itemSelector = (itemId: number): SelectorType<T.DeserializedItem> => (
    state => state.entities.items.entities[itemId]!
)

export const itemDataSelector = (itemId: number): SelectorType<T.DeserializedItemData | undefined> => (
    state => state.modules.currentUserItems.itemsData?.results.filter(i => i.id == itemId)[0]
)

export const itemsDataSelector = (): SelectorType<T.DeserializedListData<T.DeserializedItemData> | null> => (
    state => state.modules.currentUserItems.itemsData
)

export const commentSelector = (commentId: number): SelectorType<T.DeserializedItemCommentParent> => (
    state => state.entities.itemsComments.entities[commentId]!
)

export const commentsSelector = (): SelectorType<Dictionary<T.DeserializedItemCommentParent>> => (
    state => state.entities.itemsComments.entities
)

export const commentChildrenSelector = (commentId: number): SelectorType<T.DeserializedItemCommentChild[]> => (
    state => state.entities.itemsComments.entities[commentId]!.children
)

export const itemCommentsDataSelector = (
    itemId: number
): SelectorType<T.DeserializedListData<T.DeserializedCommentData> | undefined> => (
    state => state.modules.currentUserItems.itemsData?.results.filter(i =>
        i.id == itemId)[0].commentsData
)

export const itemCommentDataSelector = (
    itemId: number,
    commentId: number,
): SelectorType<T.DeserializedCommentData | undefined> => (
    state => state.modules.currentUserItems.itemsData?.results.filter(i =>
        i.id == itemId)[0].commentsData.results.filter(c => c.id === commentId)[0]
)