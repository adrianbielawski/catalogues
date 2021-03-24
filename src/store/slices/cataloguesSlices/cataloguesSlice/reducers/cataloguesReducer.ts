import { PayloadAction } from '@reduxjs/toolkit'
import { Catalogue } from 'src/globalTypes'
import * as T from '../cataloguesTypes'
import { catalogueDeserializer } from 'src/serializers'
import { getCatalogueById } from '../cataloguesSlectors'

type State = T.CataloguesState

export const createCatalogueReducers = {
    CREATE_CATALOGUE(state: State, action: PayloadAction<string>) { },
    CREATE_CATALOGUE_START(state: State) {
        state.creatingNewCatalogue = true
    },
    CREATE_CATALOGUE_SUCCESS(state: State, action: PayloadAction<Catalogue>) {
        state.catalogues.unshift(catalogueDeserializer(action.payload))
        state.newCatalogueId = action.payload.id
    },
    CREATE_CATALOGUE_FAILURE(state: State) {
        state.creatingNewCatalogue = false
    },
    NEW_CATALOGUE_CREATED(state: State) {
        state.creatingNewCatalogue = false
        state.newCatalogueId = null
    },
}

export const refreshCatalogueReducers = {
    REFRESH_CATALOGUE(state: State, action: PayloadAction<number>) { },
    REFRESH_CATALOGUE_START(state: State) { },
    REFRESH_CATALOGUE_SUCCESS(state: State, action: PayloadAction<Catalogue>) {
        const refreshedCatalogue = catalogueDeserializer(action.payload)
        const catalogue = getCatalogueById(state, action.payload.id)
        catalogue.itemsRanges.date.min = refreshedCatalogue.itemsRanges.date.min
        catalogue.name = refreshedCatalogue.name
        catalogue.slug = refreshedCatalogue.slug
    },
    REFRESH_CATALOGUE_FAILURE(state: State) { },
}

export const fetchCataloguesReducers = {
    FETCH_CATALOGUES(state: State) { },
    FETCH_CATALOGUES_START(state: State) {
        state.fetchingCatalogues = true
    },
    FETCH_CATALOGUES_SUCCESS(state: State, action: PayloadAction<Catalogue[]>) {
        state.catalogues = action.payload.map(catalogueDeserializer)
        state.fetchingCatalogues = false
    },
    FETCH_CATALOGUES_FAILURE(state: State) {
        state.fetchingCatalogues = false
    },
}

export const fetchAuthUserDataReducers = {
    FETCH_AUTH_USER_DATA(state: State) { },
    FETCH_AUTH_USER_DATA_START(state: State) {
        state.authUser.fetchingData = true
    },
    FETCH_AUTH_USER_DATA_SUCCESS(state: State, action: PayloadAction<T.FetchAuthUserDataSuccessPayload>) {
        state.authUser.catalogues = action.payload.catalogues.map(catalogueDeserializer)
        state.authUser.favouriteCatalogues = action.payload.favCatalogues.map(catalogueDeserializer)
        state.authUser.fetchingData = false
    },
    FETCH_AUTH_USER_DATA_FAILURE(state: State) {
        state.authUser.fetchingData = false
    },
}

export const changeCatalogueNameReducers = {
    CHANGE_CATALOGUE_NAME(state: State, action: PayloadAction<T.ChangeCatalogueNamePayload>) { },
    TOGGLE_CATALOGUE_NAME_EDIT(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isEditingCatalogueName = !catalogue.isEditingCatalogueName
    },
    CHANGE_CATALOGUE_NAME_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isSubmittingCatalogueName = true
    },
    CHANGE_CATALOGUE_NAME_SUCCESS(state: State, action: PayloadAction<Catalogue>) {
        const catalogue = getCatalogueById(state, action.payload.id)
        catalogue.name = action.payload.name
        catalogue.slug = action.payload.slug
        catalogue.isSubmittingCatalogueName = false
    },
    CHANGE_CATALOGUE_NAME_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isSubmittingCatalogueName = false
        catalogue.catalogueError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const catalogueReducer = {
    CLEAR_CATALOGUE_ERROR(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.catalogueError = {
            title: '',
            message: '',
        }
    },
}

export const changeDefaultCatalogueReducers = {
    CHANGE_DEFAULT_CATALOGUE(state: State, action: PayloadAction<T.ChangeDefaultCataloguePayload>) {
        const catalogue = getCatalogueById(state, action.payload.catalogueId)
        if (action.payload.default) {
            const prevDefaultCatalogue = state.catalogues.find(c => c.default === true)
            if (prevDefaultCatalogue) {
                prevDefaultCatalogue.default = false
            }
        }
        catalogue.default = action.payload.default
    },
    CHANGE_DEFAULT_CATALOGUE_START(state: State) { },
    CHANGE_DEFAULT_CATALOGUE_SUCCESS(state: State) { },
    CHANGE_DEFAULT_CATALOGUE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.catalogueError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const changePublicCatalogueReducers = {
    CHANGE_PUBLIC_CATALOGUE(state: State, action: PayloadAction<T.ChangePublicCataloguePayload>) {
        const catalogue = getCatalogueById(state, action.payload.catalogueId)
        catalogue.public = action.payload.public
    },
    CHANGE_PUBLIC_CATALOGUE_START(state: State) { },
    CHANGE_PUBLIC_CATALOGUE_SUCCESS(state: State) {},
    CHANGE_PUBLIC_CATALOGUE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.catalogueError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const changeCatalogueImageReducers = {
    POST_CATALOGUE_IMAGE(state: State, action: PayloadAction<T.ChangeCatalogueImagePayload>) { },
    POST_CATALOGUE_IMAGE_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isSubmittingImage = true
    },
    POST_CATALOGUE_IMAGE_SUCCESS(state: State, action: PayloadAction<Catalogue>) {
        const catalogue = getCatalogueById(state, action.payload.id)
        catalogue.image = action.payload.image
        catalogue.imageThumbnail = action.payload.image_thumbnail
        catalogue.isSubmittingImage = false
    },
    POST_CATALOGUE_IMAGE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isSubmittingImage = false
        catalogue.catalogueError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const deleteCatalogueReducers = {
    DELETE_CATALOGUE(state: State, action: PayloadAction<number>) { },
    DELETE_CATALOGUE_START(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.deletingCatalogue = true
    },
    DELETE_CATALOGUE_SUCCESS(state: State, action: PayloadAction<number>) {
        const catalogueIndex = state.catalogues.findIndex(c => c.id === action.payload)
        state.catalogues.splice(catalogueIndex, 1)
        state.newCatalogueId = null
        state.creatingNewCatalogue = false
    },
    DELETE_CATALOGUE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.deletingCatalogue = false
        catalogue.catalogueError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const addCatalogueToFavouriteReducers = {
    ADD_CATALOGUE_TO_FAVOURITE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isFavourite = true
    },
    ADD_CATALOGUE_TO_FAVOURITE_SUCCESS(state: State) { },
    ADD_CATALOGUE_TO_FAVOURITE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isFavourite = false
        catalogue.catalogueError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const deleteCatalogueFromFavouriteReducers = {
    DELETE_CATALOGUE_FROM_FAVOURITE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isFavourite = false
    },
    DELETE_CATALOGUE_FROM_FAVOURITE_SUCCESS(state: State) { },
    DELETE_CATALOGUE_FROM_FAVOURITE_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isFavourite = true
        catalogue.catalogueError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const refreshFavouriteCataloguesReducers = {
    FETCH_FAVOURITE_CATALOGUES(state: State) { },
    FETCH_FAVOURITE_CATALOGUES_SUCCESS(state: State, action: PayloadAction<Catalogue[]>) {
        state.authUser.favouriteCatalogues = action.payload.map(catalogueDeserializer)
    },
}