import {
  DeserializedField,
  Choice,
  CurrentUserCatalogueData,
} from 'src/globalTypes'

export interface CurrentUserCataloguesState {
  cataloguesData: CurrentUserCatalogueData[]
  defaultCatalogueId: number | null
  isFetchingCatalogues: boolean
}

// export type CurrentUserCatalogueData = CatalogueData<CurrentUserFieldData>

// export type CurrentUserChoiceFieldData = ChoiceFieldsData<number>

// export type CurrentUserTextFieldData = FieldsData

// export type CurrentUserFieldData = CurrentUserChoiceFieldData | CurrentUserTextFieldData

// Payloads
export interface CatalogueAndFieldIdPayload {
  catalogueId: number
  fieldId: number
}

export interface FetchCatalogueFieldsSuccessPayload {
  fields: DeserializedField[]
  catalogueId: number
}

export interface FetchFieldsChoicesPayload {
  catalogueId: number
  data: Record<string, Choice[]>
}
