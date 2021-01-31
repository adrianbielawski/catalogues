import {
    RefreshCatalogueField,
    RefreshCatalogueFields, FetchCatalogueFields,
    RefreshCatalogueItem, SaveItemSuccess,
} from "./cataloguesTypes";
import {
    CreateCatalogueFieldSuccess,
    PostChoiceFieldChangesSuccess,
    PostTextFieldNameChangeSuccess
} from "./settingsTypes";

export type RefreshCatalogueFieldEpic = RefreshCatalogueField | PostChoiceFieldChangesSuccess | PostTextFieldNameChangeSuccess
export type RefreshCatalogueFieldsEpic = RefreshCatalogueFields | FetchCatalogueFields | CreateCatalogueFieldSuccess
export type RefreshCatalogueItemEpic = RefreshCatalogueItem | SaveItemSuccess