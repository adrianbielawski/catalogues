import axiosInstance from 'src/axiosInstance'
import { Catalogue, Choice, Field, ListData } from 'src/globalTypes'
import {
    CATALOGUES_FETCH_ITEMS_FIELDS, CATALOGUES_FETCH_ITEMS_FIELDS_START, CATALOGUES_FETCH_ITEMS_FIELDS_SUCCESS, CATALOGUES_FETCH_ITEMS_FIELDS_FAILURE,
    CATALOGUES_REFRESH_FIELD,
    CATALOGUES_FETCH_CATALOGUE_FIELD, CATALOGUES_FETCH_CATALOGUE_FIELD_START, CATALOGUES_FETCH_CATALOGUE_FIELD_SUCCESS, CATALOGUES_FETCH_CATALOGUE_FIELD_FAILURE,
    CATALOGUES_GET_CATALOGUE_ITEMS_SUCCESS, CATALOGUES_GET_CATALOGUE_ITEMS_START, CATALOGUES_GET_CATALOGUE_ITEMS_FAILURE,
    CATALOGUES_FETCH_CATALOGUES, CATALOGUES_FETCH_CATALOGUES_START, CATALOGUES_FETCH_CATALOGUES_SUCCESS, CATALOGUES_FETCH_CATALOGUES_FAILURE,
    CATALOGUES_FETCH_FIELDS_CHOICES, CATALOGUES_FETCH_FIELDS_CHOICES_START, CATALOGUES_FETCH_FIELDS_CHOICES_SUCCESS, CATALOGUES_FETCH_FIELDS_CHOICES_FAILURE, 
    AppActionTypes, ThunkAction, ErrorData,
} from '../storeTypes'

const fetchCatalogueItemsStart = (): AppActionTypes => ({
    type: CATALOGUES_GET_CATALOGUE_ITEMS_START,
})

const fetchCatalogueItemsSuccess = (data: ListData): AppActionTypes => ({
    type: CATALOGUES_GET_CATALOGUE_ITEMS_SUCCESS,
    data,
})

const fetchCatalogueItemsFailure = (): AppActionTypes => ({
    type: CATALOGUES_GET_CATALOGUE_ITEMS_FAILURE,
})

export const fetchCatalogueItems = (
    catalogueId: number
    ): ThunkAction => dispatch => {
        dispatch(fetchCatalogueItemsStart())
        axiosInstance.get('/items/', { params: {catalogue_id: catalogueId} })
        .then((response) => {
            dispatch(fetchCatalogueItemsSuccess(response.data))
        })
        .catch((error) => {
            dispatch(fetchCatalogueItemsFailure())
            if (error.response) {
                console.log(Object.values(error.response.data as ErrorData)[0][0])
            } else {
                console.log('Something went wrong')
            }
        })
}

export const fetchItemsFields = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_ITEMS_FIELDS,
    catalogueId,
})

export const fetchItemsFieldsStart = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_ITEMS_FIELDS_START,
    catalogueId,
})

export const fetchItemsFieldsSuccess = (data: Field[], catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_ITEMS_FIELDS_SUCCESS,
    data,
    catalogueId,
})

export const fetchItemsFieldsFailure = (catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_FETCH_ITEMS_FIELDS_FAILURE,
    catalogueId
})

export const refreshField = (fieldId: number, catalogueId: number): AppActionTypes => ({
    type: CATALOGUES_REFRESH_FIELD,
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

export const fetchCatalogueFailure = (): AppActionTypes => ({
    type: CATALOGUES_FETCH_CATALOGUES_FAILURE,
})