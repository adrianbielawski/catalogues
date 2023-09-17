import { Dictionary, Selector, createSelector } from '@reduxjs/toolkit'
import { RootState } from './storeConfig'
import type * as T from 'src/globalTypes'

type SelectorType<T> = Selector<RootState, T>

const cataloguesDataSelector = (state: RootState) =>
  state.modules.currentUserCatalogues.cataloguesData
const authUserCataloguesDataSelector = (state: RootState) =>
  state.modules.authUserCatalogues.cataloguesData
const currentUserItemsDataSelector = (state: RootState) =>
  state.modules.currentUserItems.itemsData?.results

// User
export const userSelector =
  (id: number): SelectorType<T.DeserializedUser | undefined> =>
  (state) =>
    state.entities.users.entities[id]

export const usersSelector =
  (): SelectorType<Dictionary<T.DeserializedUser>> => (state) =>
    state.entities.users.entities

// Catalogues entities
export const catalogueSelector =
  (id: number): SelectorType<T.DeserializedCatalogue | undefined> =>
  (state) =>
    state.entities.catalogues.entities[id]

export const catalogueSelectorBySlug = (
  slug: string,
  id: number,
): SelectorType<T.DeserializedCatalogue | undefined> =>
  createSelector(
    [(state: RootState) => state.entities.catalogues.entities],
    (catalogues) =>
      Object.values(catalogues).filter(
        (c) => c?.slug === slug && c?.createdBy === id,
      )[0],
  )

// Fields entities
export const fieldSelector =
  (fieldId: number): SelectorType<T.DeserializedField | undefined> =>
  (state) =>
    state.entities.fields.entities[fieldId]

export const fieldsSelector = (
  fieldsIds: number[],
): SelectorType<T.DeserializedField[]> =>
  createSelector(
    [(state: RootState) => state.entities.fields.entities],
    (fields) => fieldsIds.map((f) => fields[f]) as T.DeserializedField[],
  )

// Choices entities
export const fieldChoicesSelector = (fieldId: number) =>
  createSelector(
    [(state: RootState) => state.entities.choices.entities],
    (choices) =>
      Object.values(choices).filter(
        (c) => c?.fieldId === fieldId,
      ) as T.DeserializedChoice[],
  )
// Current user
export const currentUserCatalogueSelector = (
  id: number,
): SelectorType<T.CurrentUserCatalogueData> =>
  createSelector(
    [cataloguesDataSelector],
    (cataloguesData) => cataloguesData.filter((c) => c.id === id)[0],
  )

export const currentUserFieldDataSelector = (
  catalogueId: number,
  fieldId: number,
) =>
  createSelector(
    [cataloguesDataSelector],
    (cataloguesData) =>
      cataloguesData
        .filter((c) => c.id === catalogueId)[0]
        .fieldsData.filter((f) => f.id === fieldId)[0],
  )

export const currentUserFieldsDataSelector = (catalogueId: number) =>
  createSelector(
    [cataloguesDataSelector],
    (cataloguesData) =>
      cataloguesData.filter((c) => c.id === catalogueId)[0].fieldsData,
  )

// Auth user
export const authUserCatalogueDataSelector = (
  id: number,
): SelectorType<T.AuthUserCatalogueData> =>
  createSelector(
    [authUserCataloguesDataSelector],
    (cataloguesData) => cataloguesData.filter((c) => c.id === id)[0],
  )

export const authUserFieldDataSelector = (
  catalogueId: number,
  fieldId: number,
): SelectorType<T.AuthUserFieldData> =>
  createSelector(
    [authUserCataloguesDataSelector],
    (cataloguesData) =>
      cataloguesData
        .filter((f) => f.id === catalogueId)[0]
        .fieldsData.filter((f) => f.id === fieldId)[0],
  )

export const authUserFieldsDataSelector = (
  catalogueId: number,
  parentFieldId?: number | null,
): SelectorType<T.AuthUserFieldData[]> =>
  createSelector([authUserCataloguesDataSelector], (cataloguesData) => {
    const { fieldsData } = cataloguesData.find((c) => c.id === catalogueId)!

    if (parentFieldId !== undefined) {
      const { children } = fieldsData.find(
        (f) => f.id === parentFieldId,
      ) as T.AuthUserGroupFieldData

      return children.flatMap((f) => fieldsData.find((fd) => fd.id === f) ?? [])
    }

    return fieldsData
  })

// Items data
export const itemSelector =
  (itemId: number): SelectorType<T.DeserializedItem | undefined> =>
  (state) =>
    state.entities.items.entities[itemId]

export const itemDataSelector =
  (itemId: number): SelectorType<T.DeserializedItemData | undefined> =>
  (state) =>
    state.modules.currentUserItems.itemsData?.results.filter(
      (i) => i.id === itemId,
    )[0]

export const itemsDataSelector =
  (): SelectorType<T.DeserializedListData<T.DeserializedItemData> | null> =>
  (state) =>
    state.modules.currentUserItems.itemsData

export const commentSelector =
  (
    commentId: number,
  ): SelectorType<T.DeserializedItemCommentParent | undefined> =>
  (state) =>
    state.entities.itemsComments.entities[commentId]

export const commentsSelector =
  (): SelectorType<Dictionary<T.DeserializedItemCommentParent>> => (state) =>
    state.entities.itemsComments.entities

export const commentChildrenSelector =
  (
    commentId: number,
  ): SelectorType<T.DeserializedItemCommentChild[] | undefined> =>
  (state) =>
    state.entities.itemsComments.entities[commentId]?.children

export const itemCommentsDataSelector = (
  itemId: number,
): SelectorType<
  T.DeserializedListData<T.DeserializedCommentData> | undefined
> =>
  createSelector(
    [currentUserItemsDataSelector],
    (itemsData) => itemsData?.filter((i) => i.id === itemId)[0].commentsData,
  )

export const itemCommentDataSelector = (
  itemId: number,
  commentId: number,
): SelectorType<T.DeserializedCommentData | undefined> =>
  createSelector(
    [currentUserItemsDataSelector],
    (itemsData) =>
      itemsData
        ?.filter((i) => i.id === itemId)[0]
        .commentsData.results.filter((c) => c.id === commentId)[0],
  )
