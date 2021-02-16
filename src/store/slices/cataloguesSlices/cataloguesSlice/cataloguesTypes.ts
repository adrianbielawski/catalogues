import { Choice, DeserializedCatalogue, DeserializedChoiceField, Field } from "src/globalTypes"

export interface CataloguesState {
    catalogues: DeserializedCatalogue[],
    fetchingCatalogues: boolean,
    creatingNewCatalogue: boolean,
}

export interface ChangeCatalogueNamePayload {
    catalogueId: number,
    name: string,
}

export interface CatalogueAndFieldIdPayload {
    catalogueId: number,
    fieldId: number,
}

export interface FetchCatalogueFieldSuccessPayload {
    data: Field,
    catalogueId: number,
    fieldId: number,
}

export interface FetchCatalogueFieldsSuccessPayload {
    data: Field[],
    catalogueId: number,
}

export interface FetchFieldChoicesPayload {
    data: Choice[],
    catalogueId: number,
    fieldId: number,
}

export interface RemoveFieldToStatePayload {
    id: number | string,
    catalogueId: number,
    fieldId: number,
}

export interface AddFieldToStatePayload {
    name: string,
    catalogueId: number,
    fieldId: number,
}

export interface TextFieldNameChange {
    name: string,
    catalogueId: number,
    fieldId: number,
}

export interface ChioceFieldChangesPayload {
    name: string,
    field: DeserializedChoiceField,
}

export interface CreateCatalogueFieldPayload {
    name: string,
    catalogueId: number,
    type: string,
    position: number,
}