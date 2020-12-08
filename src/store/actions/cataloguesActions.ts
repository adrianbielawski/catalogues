import axiosInstance from 'src/axiosInstance'
import { Catalogue, ListData } from 'src/globalTypes'
import {
    CATALOGUES_GET_CATALOGUES_SUCCESS, CATALOGUES_GET_CATALOGUE_ITEMS_SUCCESS, CATALOGUES_GET_CATALOGUE_ITEMS_START,
    CATALOGUES_GET_CATALOGUE_ITEMS_FAILURE, AppActionTypes, ThunkAction, ErrorData,
} from '../storeTypes'

const getCataloguesSuccess = (catalogues: Catalogue[]): AppActionTypes => ({
    type: CATALOGUES_GET_CATALOGUES_SUCCESS,
    catalogues,
})

export const getCatalogues = (userId: number): ThunkAction => dispatch => {
    axiosInstance.get('/catalogues/', { params: {created_by: userId} })
    .then((response) => {
        dispatch(getCataloguesSuccess(response.data.results))
    })
    .catch((error) => {
        if (error.response) {
            console.log(Object.values(error.response.data as ErrorData)[0][0])
        } else {
            console.log('Something went wrong')
        }
    })
}

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