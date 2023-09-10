import {
  type AuthUserCatalogueData,
  type AuthUserFieldData,
  type Choice,
  type Field,
} from 'src/globalTypes'

export interface AuthUserCataloguesState {
  cataloguesData: AuthUserCatalogueData[]
  defaultCatalogueId: number | null
  newCatalogueId: number | null
  isFetchingCatalogues: boolean
  isFetchingCataloguesData: boolean
  isCreatingNewCatalogue: boolean
}

// Payloads
export interface ChangeCatalogueNamePayload {
  catalogueId: number
  name: string
}

export interface ChangeDefaultCataloguePayload {
  catalogueId: number
  default: boolean
}

export interface ChangePublicCataloguePayload {
  catalogueId: number
  public: boolean
}

export interface ChangeCatalogueImagePayload {
  catalogueId: number
  image: string
}

export interface CatalogueAndFieldIdPayload {
  catalogueId: number
  fieldId: number
}

export interface CreateCatalogueFieldPayload {
  name: string
  catalogueId: number
  type: string
  position: number
  public: boolean
  parentId: number | null
}

export interface FetchCatalogueFieldSuccessPayload
  extends CatalogueAndFieldIdPayload {
  data: Field
}

export interface FetchCatalogueFieldsSuccessPayload {
  data: Field[]
  catalogueId: number
}

export interface ChangeFieldNamePayload extends CatalogueAndFieldIdPayload {
  name: string
}

export interface ChangeFieldNameSuccessPayload
  extends CatalogueAndFieldIdPayload {
  field: Field
}

export interface ChangePublicFieldPayload extends CatalogueAndFieldIdPayload {
  public: boolean
}

export interface FetchFieldsChoicesPayload {
  catalogueId: number
  data: Record<number, Choice[]>
}

export interface FetchFieldChoicesPayload extends CatalogueAndFieldIdPayload {
  data: Choice[]
}

export interface PostChoicePayload extends CatalogueAndFieldIdPayload {
  name: string
}

export interface PostChoiceSuccessPayload extends CatalogueAndFieldIdPayload {
  choice: Choice
}

export interface RemoveChoicePayload extends CatalogueAndFieldIdPayload {
  choiceId: number
}

export interface ReorderCatalogueFieldsPayload
  extends CatalogueAndFieldIdPayload {
  newPosition: number
  fieldsData: AuthUserFieldData[]
}
