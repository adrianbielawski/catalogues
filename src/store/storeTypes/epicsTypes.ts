import {
    CATALOGUES_REFRESH_CATALOGUE_FIELD,
    CATALOGUES_REFRESH_CATALOGUE_FIELDS,
    FetchCatalogueFields, RefreshCatalogueField, RefreshCatalogueFields
} from "./cataloguesTypes";
import {
    MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_SUCCESS,
    MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS,
    MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_SUCCESS,
    PostChoiceFieldChangesSuccess, PostTextFieldNameChangeSuccess, CreateCatalogueFieldSuccess,
} from "./settingsTypes";

export const REFRESH_CATALOGUE_FIELD_EPIC = CATALOGUES_REFRESH_CATALOGUE_FIELD
    || MANAGE_CATALOGUES_POST_CHOICE_FIELD_CHANGES_SUCCESS
    || MANAGE_CATALOGUES_POST_TEXT_FIELD_NAME_CHANGE_SUCCESS

export const REFRESH_CATALOGUE_FIELDS_EPIC = CATALOGUES_REFRESH_CATALOGUE_FIELDS
    || MANAGE_CATALOGUES_CREATE_CATALOGUE_FIELD_SUCCESS

export type RefreshCatalogueFieldEpic = RefreshCatalogueField | PostChoiceFieldChangesSuccess | PostTextFieldNameChangeSuccess
export type RefreshCatalogueFieldsEpic = RefreshCatalogueFields | FetchCatalogueFields | CreateCatalogueFieldSuccess