import axiosInstance from 'src/axiosInstance'
import { Catalogue } from 'src/globalTypes'
import {
    CATALOGUES_GET_CATALOGUES_SUCCESS,
    AppActionTypes, ThunkAction, ErrorData,
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