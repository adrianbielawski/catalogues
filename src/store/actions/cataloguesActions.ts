import axiosInstance from 'src/axiosInstance'
import { Catalogue, ListData } from 'src/globalTypes'
import {
    CATALOGUES_GET_CATALOGUE_ITEMS_SUCCESS, CATALOGUES_GET_CATALOGUE_ITEMS_START, CATALOGUES_GET_CATALOGUE_ITEMS_FAILURE,
    CATALOGUES_FETCH_CATALOGUES, CATALOGUES_FETCH_CATALOGUES_START, CATALOGUES_FETCH_CATALOGUES_SUCCESS, CATALOGUES_FETCH_CATALOGUES_FAILURE,
    AppActionTypes, ThunkAction, ErrorData
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