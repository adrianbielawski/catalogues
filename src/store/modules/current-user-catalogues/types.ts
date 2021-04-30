import { Choice, CurrentUserCatalogueData, Field } from "src/globalTypes";

export interface CurrentUserCataloguesState {
    cataloguesData: CurrentUserCatalogueData[],
    defaultCatalogueId: number | null,
    isFetchingCatalogues: boolean,
}

// export type CurrentUserCatalogueData = CatalogueData<CurrentUserFieldData>

// export type CurrentUserChoiceFieldData = ChoiceFieldsData<number>

// export type CurrentUserTextFieldData = FieldsData

// export type CurrentUserFieldData = CurrentUserChoiceFieldData | CurrentUserTextFieldData

//Payloads
export interface CatalogueAndFieldIdPayload {
    catalogueId: number,
    fieldId: number,
}

export interface FetchCatalogueFieldsSuccessPayload {
    data: Field[],
    catalogueId: number,
}

export interface FetchFieldsChoicesPayload {
    catalogueId: number,
    data: {
        [id: string]: Choice[],
    }
}