import {
    RefreshCatalogueField,
    RefreshCatalogueFields, FetchCatalogueFields,
} from "./cataloguesTypes";
import {
    CreateCatalogueFieldSuccess,
    PostChoiceFieldChangesSuccess,
    PostTextFieldNameChangeSuccess
} from "./settingsTypes";

export type RefreshCatalogueFieldEpic = RefreshCatalogueField | PostChoiceFieldChangesSuccess | PostTextFieldNameChangeSuccess
export type RefreshCatalogueFieldsEpic = RefreshCatalogueFields | FetchCatalogueFields | CreateCatalogueFieldSuccess