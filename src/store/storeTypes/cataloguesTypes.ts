import { Catalogue, DeserializedCatalogue, ListData, Field, Choice, Item } from 'src/globalTypes'

export const CATALOGUES_FETCH_CATALOGUES = 'CATALOGUES/FETCH_CATALOGUES'
export const CATALOGUES_FETCH_CATALOGUES_START = 'CATALOGUES/FETCH_CATALOGUES/START'
export const CATALOGUES_FETCH_CATALOGUES_SUCCESS = 'CATALOGUES/FETCH_CATALOGUES/SUCCESS'
export const CATALOGUES_FETCH_CATALOGUES_FAILURE = 'CATALOGUES/FETCH_CATALOGUES/FAILURE'
export const CATALOGUES_FETCH_CATALOGUE_ITEMS = 'CATALOGUES/FETCH_CATALOGUE_ITEMS'
export const CATALOGUES_FETCH_CATALOGUE_ITEMS_START = 'CATALOGUES/FETCH_CATALOGUE_ITEMS/START'
export const CATALOGUES_FETCH_CATALOGUE_ITEMS_SUCCESS = 'CATALOGUES/FETCH_CATALOGUE_ITEMS/SUCCESS'
export const CATALOGUES_FETCH_CATALOGUE_ITEMS_FAILURE = 'CATALOGUES/FETCH_CATALOGUE_ITEMS/FAILURE'
export const CATALOGUES_REFRESH_CATALOGUE_FIELDS = 'CATALOGUES/REFRESH_CATALOGUE_FIELDS'
export const CATALOGUES_FETCH_CATALOGUE_FIELDS = 'CATALOGUES/FETCH_CATALOGUE_FIELDS'
export const CATALOGUES_FETCH_CATALOGUE_FIELDS_START = 'CATALOGUES/FETCH_CATALOGUE_FIELDS/START'
export const CATALOGUES_FETCH_CATALOGUE_FIELDS_SUCCESS = 'CATALOGUES/FETCH_CATALOGUE_FIELDS/SUCCESS'
export const CATALOGUES_FETCH_CATALOGUE_FIELDS_FAILURE = 'CATALOGUES/FETCH_CATALOGUE_FIELDS/FAILURE'
export const CATALOGUES_REFRESH_CATALOGUE_FIELD = 'CATALOGUES/REFRESH_CATALOGUE_FIELD'
export const CATALOGUES_FETCH_CATALOGUE_FIELD = 'CATALOGUES/FETCH_CATALOGUE_FIELD'
export const CATALOGUES_FETCH_CATALOGUE_FIELD_START = 'CATALOGUES/FETCH_CATALOGUE_FIELD/START'
export const CATALOGUES_FETCH_CATALOGUE_FIELD_SUCCESS = 'CATALOGUES/FETCH_CATALOGUE_FIELD/SUCCESS'
export const CATALOGUES_FETCH_CATALOGUE_FIELD_FAILURE = 'CATALOGUES/FETCH_CATALOGUE_FIELD/FAILURE'
export const CATALOGUES_FETCH_FIELDS_CHOICES = 'CATALOGUES/FETCH_FIELDS_CHOICES'
export const CATALOGUES_FETCH_FIELDS_CHOICES_START = 'CATALOGUES/FETCH_FIELDS_CHOICES/START'
export const CATALOGUES_FETCH_FIELDS_CHOICES_SUCCESS = 'CATALOGUES/FETCH_FIELDS_CHOICES/SUCCESS'
export const CATALOGUES_FETCH_FIELDS_CHOICES_FAILURE = 'CATALOGUES/FETCH_FIELDS_CHOICES/FAILURE'

export interface CataloguesState {
    catalogues: DeserializedCatalogue[],
    fetchingCatalogues: boolean,
}

export interface RefreshCatalogueFields {
    type: typeof CATALOGUES_REFRESH_CATALOGUE_FIELDS,
    catalogueId: number,
}

export interface FetchCatalogueFields {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELDS,
    catalogueId: number,
}

interface FetchCatalogueFieldsStart {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELDS_START,
    catalogueId: number,
}

interface FetchCatalogueFieldsSuccess {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELDS_SUCCESS,
    data: Field[],
    catalogueId: number,
}

interface FetchCatalogueFieldsFailure {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELDS_FAILURE,
    catalogueId: number,
}

export interface RefreshCatalogueField {
    type: typeof CATALOGUES_REFRESH_CATALOGUE_FIELD,
    fieldId: number,
    catalogueId: number,
}

export interface FetchCatalogueField {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELD,
    fieldId: number,
    catalogueId: number,
}

interface FetchCatalogueFieldStart {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELD_START,
    fieldId: number,
    catalogueId: number,
}

interface FetchCatalogueFieldSuccess {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELD_SUCCESS,
    data: Field,
    fieldId: number,
    catalogueId: number,
}

interface FetchCatalogueFieldFailure {
    type: typeof CATALOGUES_FETCH_CATALOGUE_FIELD_FAILURE,
    fieldId: number,
    catalogueId: number,
}

export interface FetchFieldsChoices {
    type: typeof CATALOGUES_FETCH_FIELDS_CHOICES,
    fieldId: number,
    catalogueId: number,
}

interface FetchFieldsChoicesStart {
    type: typeof CATALOGUES_FETCH_FIELDS_CHOICES_START,
    fieldId: number,
    catalogueId: number,
}

interface FetchFieldsChoicesSuccess {
    type: typeof CATALOGUES_FETCH_FIELDS_CHOICES_SUCCESS,
    fieldId: number,
    catalogueId: number,
    data: Choice[]
}

interface FetchFieldsChoicesFailure {
    type: typeof CATALOGUES_FETCH_FIELDS_CHOICES_FAILURE,
    fieldId: number,
    catalogueId: number,
}

export interface FetchCatalogueItems {
    type: typeof CATALOGUES_FETCH_CATALOGUE_ITEMS,
    catalogueId: number,
}

interface FetchCatalogueItemsStart {
    type: typeof CATALOGUES_FETCH_CATALOGUE_ITEMS_START,
    catalogueId: number,
}

interface FetchCatalogueItemsSuccess {
    type: typeof CATALOGUES_FETCH_CATALOGUE_ITEMS_SUCCESS,
    data: ListData,
    catalogueId: number,
}

interface FetchCatalogueItemsFailure {
    type: typeof CATALOGUES_FETCH_CATALOGUE_ITEMS_FAILURE,
    catalogueId: number,
}

export interface FetchCatalogues {
    type: typeof CATALOGUES_FETCH_CATALOGUES,
}

interface FetchCataloguesStart {
    type: typeof CATALOGUES_FETCH_CATALOGUES_START,
}

interface FetchCataloguesSuccess {
    type: typeof CATALOGUES_FETCH_CATALOGUES_SUCCESS,
    catalogues: Catalogue[],
}

interface FetchCataloguesFailure {
    type: typeof CATALOGUES_FETCH_CATALOGUES_FAILURE,
}

export type CataloguesTypes =
    FetchCatalogueItems | FetchCatalogueItemsStart | FetchCatalogueItemsSuccess | FetchCatalogueItemsFailure
    | RefreshCatalogueFields 
    | FetchCatalogueFields | FetchCatalogueFieldsStart | FetchCatalogueFieldsSuccess | FetchCatalogueFieldsFailure
    | RefreshCatalogueField
    | FetchCatalogueField | FetchCatalogueFieldStart | FetchCatalogueFieldSuccess | FetchCatalogueFieldFailure
    | FetchFieldsChoices | FetchFieldsChoicesStart | FetchFieldsChoicesSuccess | FetchFieldsChoicesFailure
    | FetchCatalogues | FetchCataloguesStart | FetchCataloguesSuccess | FetchCataloguesFailure