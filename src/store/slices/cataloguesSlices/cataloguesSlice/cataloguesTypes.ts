import {
    Catalogue, Choice, DeserializedCatalogue, DeserializedChoiceField, DeserializedRecomendedCatalogues,
    ErrorMessage, Field,
} from "src/globalTypes"

export interface CataloguesState {
    authUser: AuthUser,
    catalogues: DeserializedCatalogue[],
    fetchingCatalogues: boolean,
    creatingNewCatalogue: boolean,
    newCatalogueId: number | null,
}

export interface AuthUser {
    catalogues: DeserializedCatalogue[],
    recomended: DeserializedRecomendedCatalogues,
    favouriteCatalogues: DeserializedCatalogue[],
    fetchingData: boolean,
}

export interface ChangeCatalogueNamePayload {
    catalogueId: number,
    name: string,
}

export interface CatalogueAndFieldIdPayload {
    catalogueId: number,
    fieldId: number,
}

export interface FetchCatalogueFieldSuccessPayload extends CatalogueAndFieldIdPayload {
    data: Field,
}

export interface FetchCatalogueFieldsSuccessPayload {
    data: Field[],
    catalogueId: number,
}

export interface FetchFieldChoicesPayload extends CatalogueAndFieldIdPayload {
    data: Choice[],
}

export interface FetchFieldsChoicesPayload {
    catalogueId: number,
    data: {
        [id: string]: Choice[],
    }
}

export interface RemoveFieldToStatePayload extends CatalogueAndFieldIdPayload {
    id: number | string,
}

export interface AddFieldToStatePayload extends CatalogueAndFieldIdPayload {
    name: string,
}

export interface TextFieldNameChange extends CatalogueAndFieldIdPayload {
    name: string,
}

export interface ChioceFieldChangesPayload {
    name: string,
    field: DeserializedChoiceField,
}

export interface AddChoiceError extends CatalogueAndFieldIdPayload {
    error: ErrorMessage,
}

export interface PostChoicePayload extends CatalogueAndFieldIdPayload {
    name: string,
}

export interface PostChoiceSuccessPayload extends CatalogueAndFieldIdPayload {
    choice: Choice,
}

export interface CreateCatalogueFieldPayload {
    name: string,
    catalogueId: number,
    type: string,
    position: number,
    public: boolean,
}

export interface RemoveChoicePayload extends CatalogueAndFieldIdPayload {
    choiceId: number,
}

export interface ChangeFieldNamePayload extends CatalogueAndFieldIdPayload {
    name: string,
}

export interface ChangeFieldNameSuccessPayload extends CatalogueAndFieldIdPayload {
    field: Field,
}

export interface ChangeDefaultCataloguePayload {
    catalogueId: number,
    default: boolean,
}

export interface ChangePublicCataloguePayload {
    catalogueId: number,
    public: boolean,
}

export interface ChangePublicFieldPayload extends CatalogueAndFieldIdPayload {
    public: boolean,
}

export interface ChangeCatalogueImagePayload {
    catalogueId: number,
    image: string,
}

export interface FetchAuthUserDataSuccessPayload {
    catalogues: Catalogue[],
    favCatalogues: any,
}