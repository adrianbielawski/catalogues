import { Choice, DeserializedCatalogue, DeserializedChoiceField, ErrorMessage, Field } from "src/globalTypes"

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

export interface FetchFieldsChoicesPayload {
    catalogueId: number,
    data: {
        [id: string]: Choice[],
    }
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

export interface AddChoiceError {
    catalogueId: number,
    fieldId: number,
    error: ErrorMessage,
}

export interface PostChoicePayload {
    catalogueId: number,
    fieldId: number,
    name: string,
}

export interface PostChoiceSuccessPayload {
    catalogueId: number,
    fieldId: number,
    choice: Choice,
}

export interface CreateCatalogueFieldPayload {
    name: string,
    catalogueId: number,
    type: string,
    position: number,
}

export interface RemoveChoicePayload {
    catalogueId: number,
    fieldId: number,
    choiceId: number,
}

export interface ChangeFieldNamePayload {
    catalogueId: number,
    fieldId: number,
    name: string,
}

export interface ChangeFieldNameSuccessPayload {
    catalogueId: number,
    fieldId: number,
    field: Field,
}