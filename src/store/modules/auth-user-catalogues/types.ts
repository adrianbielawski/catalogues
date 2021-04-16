import { CatalogueData, Choice, ChoiceFieldsData, ErrorMessage, Field, FieldsData } from "src/globalTypes";

export interface AuthUserCataloguesState {
    cataloguesData: AuthUserCatalogueData[],
    defaultCatalogueId: number | null,
    newCatalogueId: number | null,
    isFetchingCatalogues: boolean,
    isCreatingNewCatalogue: boolean,
}

export interface AuthUserCatalogueData extends CatalogueData<AuthUserFieldData> {
    isEditingCatalogueName: boolean,
    isSubmittingCatalogueName: boolean,
    isAddFieldFormActive: boolean,
    isSubmittingNewField: boolean,
    isDeletingCatalogue: boolean,
    isSubmittingImage: boolean,
    catalogueError: ErrorMessage | null,
}

export interface AuthUserChoiceData {
    id: number,
    isDeleting: boolean,
}

export interface AuthUserChoiceFieldData extends AuthUserTextFieldData, ChoiceFieldsData<AuthUserChoiceData> {
    isFetchingChoices: boolean,
    isPostingChoice: boolean,
}

export interface AuthUserTextFieldData extends FieldsData {
    isChangingName: boolean,
    isDeleting: boolean,
    isEditing: boolean,
    isSubmitting: boolean,
    fieldError: ErrorMessage | null,
}

export type AuthUserFieldData = AuthUserChoiceFieldData | AuthUserTextFieldData

//Payloads
export interface ChangeCatalogueNamePayload {
    catalogueId: number,
    name: string,
}

export interface ChangeDefaultCataloguePayload {
    catalogueId: number,
    default: boolean,
}

export interface ChangePublicCataloguePayload {
    catalogueId: number,
    public: boolean,
}

export interface ChangeCatalogueImagePayload {
    catalogueId: number,
    image: string,
}

export interface CatalogueAndFieldIdPayload {
    catalogueId: number,
    fieldId: number,
}

export interface CreateCatalogueFieldPayload {
    name: string,
    catalogueId: number,
    type: string,
    position: number,
    public: boolean,
}

export interface FetchCatalogueFieldSuccessPayload extends CatalogueAndFieldIdPayload {
    data: Field,
}

export interface FetchCatalogueFieldsSuccessPayload {
    data: Field[],
    catalogueId: number,
}

export interface ChangeFieldNamePayload extends CatalogueAndFieldIdPayload {
    name: string,
}

export interface ChangeFieldNameSuccessPayload extends CatalogueAndFieldIdPayload {
    field: Field,
}

export interface ChangePublicFieldPayload extends CatalogueAndFieldIdPayload {
    public: boolean,
}

export interface FetchFieldsChoicesPayload {
    catalogueId: number,
    data: {
        [id: number]: Choice[],
    }
}

export interface FetchFieldChoicesPayload extends CatalogueAndFieldIdPayload {
    data: Choice[],
}

export interface PostChoicePayload extends CatalogueAndFieldIdPayload {
    name: string,
}

export interface PostChoiceSuccessPayload extends CatalogueAndFieldIdPayload {
    choice: Choice,
}

export interface RemoveChoicePayload extends CatalogueAndFieldIdPayload {
    choiceId: number,
}