import { Catalogue, Choice, DeserializedItem, Field, Item, ListData } from 'src/globalTypes'
import { AppActionTypes } from 'store/storeTypes/appTypes'
import {
    CATALOGUES_REFRESH_CATALOGUE_FIELD,
    CATALOGUES_FETCH_CATALOGUE_FIELD, CATALOGUES_FETCH_CATALOGUE_FIELD_START, CATALOGUES_FETCH_CATALOGUE_FIELD_SUCCESS, CATALOGUES_FETCH_CATALOGUE_FIELD_FAILURE,
    CATALOGUES_REFRESH_CATALOGUE_FIELDS,
    CATALOGUES_FETCH_CATALOGUE_FIELDS, CATALOGUES_FETCH_CATALOGUE_FIELDS_START, CATALOGUES_FETCH_CATALOGUE_FIELDS_SUCCESS, CATALOGUES_FETCH_CATALOGUE_FIELDS_FAILURE,
    CATALOGUES_FETCH_CATALOGUE_ITEMS, CATALOGUES_FETCH_CATALOGUE_ITEMS_SUCCESS, CATALOGUES_FETCH_CATALOGUE_ITEMS_START, CATALOGUES_FETCH_CATALOGUE_ITEMS_FAILURE,
    CATALOGUES_FETCH_CATALOGUES, CATALOGUES_FETCH_CATALOGUES_START, CATALOGUES_FETCH_CATALOGUES_SUCCESS, CATALOGUES_FETCH_CATALOGUES_FAILURE,
    CATALOGUES_FETCH_FIELDS_CHOICES, CATALOGUES_FETCH_FIELDS_CHOICES_START, CATALOGUES_FETCH_FIELDS_CHOICES_SUCCESS, CATALOGUES_FETCH_FIELDS_CHOICES_FAILURE,
    CATALOGUES_TOGGLE_EDIT_ITEM,
    CATALOGUES_ADD_ITEM_TO_STATE, CATALOGUES_SAVE_ITEM, CATALOGUES_SAVE_ITEM_START, CATALOGUES_SAVE_ITEM_SUCCESS, CATALOGUES_SAVE_ITEM_FAILURE, 
} from 'store/storeTypes/cataloguesTypes'

export const fetchCatalogueItems = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_ITEMS,
    catalogueId,
})

export const fetchCatalogueItemsStart = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_ITEMS_START,
    catalogueId,
})

export const fetchCatalogueItemsSuccess = (data: ListData, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_ITEMS_SUCCESS,
    data,
    catalogueId,
})

export const fetchCatalogueItemsFailure = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_ITEMS_FAILURE,
    catalogueId,
})

export const refreshCatalogueFields = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_REFRESH_CATALOGUE_FIELDS,
    catalogueId,
})

export const fetchCatalogueFields = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_FIELDS,
    catalogueId,
})

export const fetchCatalogueFieldsStart = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_FIELDS_START,
    catalogueId,
})

export const fetchCatalogueFieldsSuccess = (data: Field[], catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_FIELDS_SUCCESS,
    data,
    catalogueId,
})

export const fetchCatalogueFieldsFailure = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_FIELDS_FAILURE,
    catalogueId
})

export const refreshCatalogueField = (fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_REFRESH_CATALOGUE_FIELD,
    fieldId,
    catalogueId,
})

export const fetchCatalogueField = (fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_FIELD,
    fieldId,
    catalogueId,
})

export const fetchCatalogueFieldStart = (fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_FIELD_START,
    fieldId,
    catalogueId,
})

export const fetchCatalogueFieldSuccess = (data: Field, fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_FIELD_SUCCESS,
    data,
    fieldId,
    catalogueId,
})

export const fetchCatalogueFieldFailure = (fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUE_FIELD_FAILURE,
    fieldId,
    catalogueId,
})

export const fetchFieldsChoices = (fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_FIELDS_CHOICES,
    fieldId,
    catalogueId,
})

export const fetchFieldsChoicesStart = (fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_FIELDS_CHOICES_START,
    fieldId,
    catalogueId,
})

export const fetchFieldsChoicesSuccess = (fieldId: number, catalogueId: number, data: Choice[]): AppActionTypes => ({
    type: CATALOGUES_FETCH_FIELDS_CHOICES_SUCCESS,
    fieldId,
    catalogueId,
    data,
})

export const fetchFieldsChoicesFailure = (fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_FIELDS_CHOICES_FAILURE,
    fieldId,
    catalogueId,
})

export const fetchCatalogues = (): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUES,
})

export const fetchCataloguesStart = (): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUES_START,
})

export const fetchCataloguesSuccess = (catalogues: Catalogue[]): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUES_SUCCESS,
    catalogues,
})

export const fetchCataloguesFailure = (): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUES_FAILURE,
})

export const toggleEditItem = (catalogueId: number, itemId: number | string): AppActionTypes => ({
    type: CATALOGUES_TOGGLE_EDIT_ITEM,
    catalogueId,
    itemId,
})

export const addItemToState = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_ADD_ITEM_TO_STATE,
    catalogueId,
})

export const saveItem = (catalogueId: number, item: DeserializedItem): AppActionTypes => ({
    type: CATALOGUES_SAVE_ITEM,
    catalogueId,
    item,
})

export const saveItemStart = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_SAVE_ITEM_START,
    catalogueId,
})

export const saveItemSuccess = (catalogueId: number, previousId: number | string, item: Item): AppActionTypes => ({
    type: CATALOGUES_SAVE_ITEM_SUCCESS,
    catalogueId,
    previousId,
    item,
})

export const saveItemFailure = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_SAVE_ITEM_FAILURE,
    catalogueId,
})