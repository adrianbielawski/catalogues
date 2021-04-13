import { PayloadAction } from '@reduxjs/toolkit'
import { Catalogue } from 'src/globalTypes'
import { getCatalogueDataById } from '../selectors'
import * as T from '../types'

const networkError = {
    title: 'Network error',
    message: 'Something went wrong. Plaese try again.',
}

const createCatalogueData = (id: number) => ({
    id: id,
    fieldsData: [],
    isFetchingFields: false,
    isFetchingFieldsChoices: false,
    isEditingCatalogueName: false,
    isSubmittingCatalogueName: false,
    isAddFieldFormActive: false,
    isSubmittingNewField: false,
    isDeletingCatalogue: false,
    isSubmittingImage: false,
    isInitialized: false,
    catalogueError: null,
})

type State = T.AuthUserCataloguesState

export const catalogueReducer = {
    CLEAR_CATALOGUE_ERROR(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.catalogueError = {
            title: '',
            message: '',
        }
    },
}

export const createCatalogueReducers = {
    CREATE_CATALOGUE(state: State, action: PayloadAction<string>) { },
    CREATE_CATALOGUE_START(state: State) {
        state.isCreatingNewCatalogue = true
    },
    CREATE_CATALOGUE_SUCCESS(state: State, action: PayloadAction<Catalogue>) {
        state.cataloguesData.unshift(createCatalogueData(action.payload.id))
        state.newCatalogueId = action.payload.id
    },
    CREATE_CATALOGUE_FAILURE(state: State) {
        state.isCreatingNewCatalogue = false
    },
    NEW_CATALOGUE_CREATED(state: State) {
        state.isCreatingNewCatalogue = false
        state.newCatalogueId = null
    },
}

export const fetchAuthUserCataloguesReducers = {
    FETCH_AUTH_USER_CATALOGUES(state: State) { },
    FETCH_AUTH_USER_CATALOGUES_START(state: State) {
        state.isFetchingCatalogues = true
    },
    FETCH_AUTH_USER_CATALOGUES_SUCCESS(state: State, action: PayloadAction<Catalogue[]>) {
        state.cataloguesData = action.payload.map(c => {
            if (c.default) {
                state.defaultCatalogueId = c.id
            }
            return {
                ...createCatalogueData(c.id),
                isFetchingFields: true,
                isFetchingFieldsChoices: true,
            }
        })
        state.isFetchingCatalogues = false
    },
    FETCH_AUTH_USER_CATALOGUES_FAILURE(state: State) {
        state.isFetchingCatalogues = false
    },
}

export const refreshCatalogueReducers = {
    REFRESH_CATALOGUE(state: State, action: PayloadAction<number>) { },
    REFRESH_CATALOGUE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.catalogueError = networkError
    },
}

export const changeCatalogueNameReducers = {
    CHANGE_CATALOGUE_NAME(state: State, action: PayloadAction<T.ChangeCatalogueNamePayload>) { },
    TOGGLE_CATALOGUE_NAME_EDIT(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isEditingCatalogueName = !catalogue.isEditingCatalogueName
    },
    CHANGE_CATALOGUE_NAME_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isSubmittingCatalogueName = true
    },
    CHANGE_CATALOGUE_NAME_SUCCESS(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isSubmittingCatalogueName = false
    },
    CHANGE_CATALOGUE_NAME_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isSubmittingCatalogueName = false
        catalogue.catalogueError = networkError
    },
}

export const changeDefaultCatalogueReducers = {
    CHANGE_DEFAULT_CATALOGUE(state: State, action: PayloadAction<T.ChangeDefaultCataloguePayload>) {
        if (action.payload.default) {
            state.defaultCatalogueId = action.payload.catalogueId
        } else {
            state.defaultCatalogueId = null
        }
    },
    CHANGE_DEFAULT_CATALOGUE_SUCCESS(state: State) { },
    CHANGE_DEFAULT_CATALOGUE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.catalogueError = networkError
    },
}

export const changePublicCatalogueReducers = {
    CHANGE_PUBLIC_CATALOGUE(state: State, action: PayloadAction<T.ChangePublicCataloguePayload>) { },
    CHANGE_PUBLIC_CATALOGUE_SUCCESS(state: State) { },
    CHANGE_PUBLIC_CATALOGUE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.catalogueError = networkError
    },
}

export const changeCatalogueImageReducers = {
    POST_CATALOGUE_IMAGE(state: State, action: PayloadAction<T.ChangeCatalogueImagePayload>) { },
    POST_CATALOGUE_IMAGE_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isSubmittingImage = true
    },
    POST_CATALOGUE_IMAGE_SUCCESS(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isSubmittingImage = false
    },
    POST_CATALOGUE_IMAGE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isSubmittingImage = false
        catalogue.catalogueError = networkError
    },
}

export const deleteCatalogueReducers = {
    DELETE_CATALOGUE(state: State, action: PayloadAction<number>) { },
    DELETE_CATALOGUE_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isDeletingCatalogue = true
    },
    DELETE_CATALOGUE_SUCCESS(state: State, action: PayloadAction<number>) {
        const catalogueIndex = state.cataloguesData.findIndex(c => c.id === action.payload)
        state.cataloguesData.splice(catalogueIndex, 1)
        state.newCatalogueId = null
        state.isCreatingNewCatalogue = false
    },
    DELETE_CATALOGUE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.isDeletingCatalogue = false
        catalogue.catalogueError = networkError
    },
}

export const addCatalogueToFavouriteReducers = {
    ADD_CATALOGUE_TO_FAVOURITE(state: State, action: PayloadAction<number>) { },
    ADD_CATALOGUE_TO_FAVOURITE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.catalogueError = networkError
    },
}

export const deleteCatalogueFromFavouriteReducers = {
    DELETE_CATALOGUE_FROM_FAVOURITE(state: State, action: PayloadAction<number>) { },
    DELETE_CATALOGUE_FROM_FAVOURITE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueDataById(state, action.payload)
        catalogue.catalogueError = networkError
    },
}