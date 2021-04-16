import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
//Types
import { Catalogue, DeserializedCatalogue } from 'src/globalTypes'
import { CatalogueUpdated } from './types'
//Serializers
import { catalogueDeserializer } from 'src/serializers'
//Actions
import { CLEAR_APP_STATE } from 'store/modules/app/slice'

const cataloguesAdapter = createEntityAdapter<DeserializedCatalogue>({})

export const cataloguesEntitiesSlice = createSlice({
    name: 'CATALOGUES',
    initialState: cataloguesAdapter.getInitialState(),
    reducers: {
        CATALOGUES_UPDATED(state, action: PayloadAction<Catalogue[]>) {
            cataloguesAdapter.upsertMany(state, action.payload.map(catalogueDeserializer))
        },
        CATALOGUE_UPDATED(state, action: PayloadAction<CatalogueUpdated>) {
            cataloguesAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload.changes,
            })
        },
        CATALOGUE_ADDED(state, action: PayloadAction<Catalogue>) {
            cataloguesAdapter.addOne(state, catalogueDeserializer(action.payload))
        },
        CATALOGUE_REMOVED(state, action: PayloadAction<number>) {
            cataloguesAdapter.removeOne(state, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => cataloguesAdapter.getInitialState())
    }
})

export const {
    CATALOGUES_UPDATED,
    CATALOGUE_UPDATED,
    CATALOGUE_ADDED,
    CATALOGUE_REMOVED,
} = cataloguesEntitiesSlice.actions