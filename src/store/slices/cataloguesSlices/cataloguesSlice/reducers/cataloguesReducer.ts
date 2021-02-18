import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { Catalogue } from 'src/globalTypes'
import * as T from '../cataloguesTypes'
import { catalogueDeserializer } from 'src/serializers'
import { getCatalogueById } from '../cataloguesSlectors'

type State = T.CataloguesState

export const CREATE_CATALOGUE = createAction('CATALOGUES/CREATE_CATALOGUE')
export const createCatalogueReducers = {
    CREATE_CATALOGUE_START(state: State) {
        state.creatingNewCatalogue = true
    },
    CREATE_CATALOGUE_FAILURE(state: State) {
        state.creatingNewCatalogue = false
    },
    CREATE_CATALOGUE_SUCCESS(state: State, action: PayloadAction<Catalogue>) {
        state.catalogues.unshift(catalogueDeserializer(action.payload))
        state.creatingNewCatalogue = false
    },
}

export const FETCH_CATALOGUES = createAction('CATALOGUES/FETCH_CATALOGUES')
export const fetchCataloguesReducers = {
    FETCH_CATALOGUES_START(state: State) {
        state.fetchingCatalogues = true
    },
    FETCH_CATALOGUES_SUCCESS(state: State, action: PayloadAction<Catalogue[]>) {
        state.catalogues = action.payload.map(catalogue => catalogueDeserializer(catalogue))
        state.fetchingCatalogues = false
    },
    FETCH_CATALOGUES_FAILURE(state: State) {
        state.fetchingCatalogues = false
    },
}

export const CHANGE_CATALOGUE_NAME = createAction<T.ChangeCatalogueNamePayload>('CATALOGUES/CHANGE_CATALOGUE_NAME')
export const changeCatalogueNameReducers = {
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
        catalogue.isEditingCatalogueName = false
    },
    CHANGE_CATALOGUE_NAME_FAILURE(state: State, action: PayloadAction<number>) {
        const catalogue = getCatalogueById(state, action.payload)
        catalogue.isSubmittingCatalogueName = false
    },
}