export type ErrorData = Record<string, string>

export interface ErrorObject {
  response: {
    data: ErrorData
  }
}

export interface ErrorMessage {
  title?: string
  message: string
}

export interface LocationParams {
  username?: string
  catalogueSlug?: string
  catalogue?: DeserializedCatalogue
  itemId?: string
}

export interface Referrer {
  pathname: string
  params: LocationParams
}

export interface LocationState {
  referrer: Referrer
}

export type QueryObj = Record<string, number | string | string[]>

export interface Salt {
  salt: string | null
}

// List data
export interface ListData<R> {
  count: number
  page_size: number
  start_index: number
  end_index: number
  current: number
  next: number
  previous: number
  results: R[]
}

export interface DeserializedListData<R> {
  count: number | null
  pageSize: number | null
  startIndex: number | null
  endIndex: number | null
  current: number | null
  next: number | null
  previous: number | null
  results: R[]
}

// User
export interface User {
  id: number
  username: string
  email?: string
  image: string
  image_thumbnail: string
}

export interface DeserializedUser {
  id: number
  username: string
  email?: string
  image: string
  imageThumbnail: string
}

// Catalogues
export interface ItemsRanges {
  id: {
    min: string
    max: string
  }
  date: {
    min: string
    max: string
  }
}

export interface DeserializedItemsRanges {
  id: {
    min: string
    max: string
  }
  date: {
    min: string
    max: string
  }
}

export interface Catalogue {
  id: number
  created_by: User
  default: boolean
  public: boolean
  name: string
  slug: string
  items_ranges: ItemsRanges
  permissions: {
    can_create_items: boolean
  }
  image: string
  image_thumbnail: string
  is_favourite: boolean
}

export interface CataloguePermissions {
  can_create_items: boolean
}

export interface DeserializedCataloguePermissions {
  canCreateItems: boolean
}

export interface DeserializedCatalogue {
  id: number
  createdBy: number
  default: boolean
  public: boolean
  name: string
  slug: string
  itemsRanges: DeserializedItemsRanges
  permissions: DeserializedCataloguePermissions
  image: string
  imageThumbnail: string
  isFavourite: boolean
}

export interface CatalogueData<F> {
  id: number
  fieldsData: F[]
  isInitialized: boolean
  isFetchingFields: boolean
  isFetchingFieldsChoices: boolean
}

export type CurrentUserCatalogueData = CatalogueData<CurrentUserFieldData>

export type CurrentUserChoiceFieldData = ChoiceFieldsData<number>

export type CurrentUserTextFieldData = FieldsData

export type CurrentUserFieldData =
  | CurrentUserChoiceFieldData
  | CurrentUserTextFieldData

export interface AuthUserCatalogueData
  extends CatalogueData<AuthUserFieldData> {
  isEditingCatalogueName: boolean
  isSubmittingCatalogueName: boolean
  isAddFieldFormActive: boolean
  isSubmittingNewField: boolean
  isDeletingCatalogue: boolean
  isSubmittingImage: boolean
  catalogueError: ErrorMessage | null
}

export interface AuthUserChoiceData {
  id: number
  isDeleting: boolean
}

export interface AuthUserChoiceFieldData
  extends AuthUserTextFieldData,
    ChoiceFieldsData<AuthUserChoiceData> {
  isFetchingChoices: boolean
  isPostingChoice: boolean
}

export interface AuthUserTextFieldData extends FieldsData {
  isChangingName: boolean
  isDeleting: boolean
  isEditing: boolean
  isSubmitting: boolean
  fieldError: ErrorMessage | null
}

export type AuthUserFieldData = AuthUserChoiceFieldData | AuthUserTextFieldData

export interface FieldsData {
  id: number
}

export interface ChoiceFieldsData<C> extends FieldsData {
  choices: C[]
  isFetchingChoices: boolean
}

export interface RecommendedCatalogues extends ListData<Catalogue> {}
export interface DeserializedRecommendedCatalogues
  extends DeserializedListData<DeserializedCatalogue> {
  fetchingCatalogues: boolean
}

// Fields
export interface Field {
  id: number
  catalogue_id: number
  type: string
  name: string
  filter_name: string
  position: number
  public: boolean
  choices?: Choice[]
  children?: Field[]
}

export interface DeserializedField {
  id: number
  catalogueId: number
  type: string
  name: string
  filterName: string
  position: number
  public: boolean
  children?: DeserializedField[]
}

// Choices
export interface Choice {
  id: number
  field_id: number
  value: string
}

export interface DeserializedChoice {
  id: number
  fieldId: number
  value: string
}

// Items

export interface DeserializedCommentData {
  id: number
  children: number[]
}

export interface DeserializedItemData {
  id: number
  commentsData: DeserializedListData<DeserializedCommentData>
  isFetchingComments: boolean
  isPostingComment: boolean
  isEditing: boolean
  isSubmitting: boolean
  isDeleting: boolean
  itemError: ErrorMessage | null
}

export interface DeserializedItemsData
  extends DeserializedListData<DeserializedItem[]> {
  catalogueId: number | null
  fetchingItems: boolean
  creatingNewItem: boolean
  newItem: DeserializedItem | null
  itemsError: ErrorMessage
}

export interface ItemPermissions {
  can_edit: boolean
  can_comment: boolean
  can_add_to_favourites: boolean
  can_rate: boolean
}

export interface DeserializedItemPermissions {
  canEdit: boolean
  canComment: boolean
  canAddToFavourites: boolean
  canRate: boolean
}

export interface ItemRating {
  average: number
  count: number
  current_user: number | null
}

export interface DeserializedItemRating {
  average: number
  count: number
  currentUser: number | null
}

export type ItemCommentChild = Omit<ItemCommentParent, 'children'>
export type DeserializedItemCommentChild = Omit<
  DeserializedItemCommentParent,
  'children'
>

export interface ItemCommentParent {
  id: number
  item_id: number
  created_by: User
  created_at: string
  text: string
  children: ItemCommentChild[]
}

export interface DeserializedItemCommentParent {
  id: number
  itemId: number
  createdBy: number
  createdAt: string
  text: string
  children: DeserializedItemCommentChild[]
}

export type DeserializedItemComment =
  | DeserializedItemCommentParent
  | DeserializedItemCommentChild

export interface CommentsData extends ListData<ItemCommentParent> {}
export interface DeserializedCommentsData
  extends DeserializedListData<DeserializedItemComment> {}

export interface Item {
  id: number
  created_by: User
  created_at: string
  modified_at: string
  catalogue_id: number
  permissions: ItemPermissions
  values: Array<ItemField<ItemFieldValue>>
  images: Image[]
  rating: ItemRating
  is_favourite: boolean
}

export interface DeserializedItem {
  id: number
  createdBy: number
  createdAt: string
  modifiedAt: string
  catalogueId: number
  permissions: DeserializedItemPermissions
  rating: DeserializedItemRating
  isFavourite: boolean
  fieldsValues: Array<DeserializedItemField<DeserializedItemFieldValue>>
  images: DeserializedImage[]
  removedImages: DeserializedImage[]
}

export interface GeoFieldAddress {
  city?: string
  country?: string
  country_code?: string
  display_name: string
  state?: string
  state_district?: string
}

export interface DeserializedGeoFieldAddress {
  city?: string
  country?: string
  countryCode?: string
  displayName: string
  state?: string
  stateDistrict?: string
}

export interface SerializedGeoField {
  latitude: number
  longitude: number
}

export interface GeoField {
  address: GeoFieldAddress
  latitude: number
  longitude: number
}

export interface DeserializedGeoField {
  address?: DeserializedGeoFieldAddress | null
  latitude: number
  longitude: number
}

export type MediaFieldType = 'video' | 'link'

export interface MediaFieldValue {
  url: string
  type: MediaFieldType
  service?: string
  id?: string
  title?: string
  thumbnail_url?: string
}

export interface DeserializedMediaFieldValue {
  url: string
  type: MediaFieldType
  service?: string
  id?: string
  title?: string
  thumbnailUrl?: string
}

export type BasicFieldValue = string | number | number[] | null
export type ItemFieldValue = BasicFieldValue | MediaFieldValue | GeoField
export type SerializedItemFieldValue =
  | BasicFieldValue
  | MediaFieldValue
  | SerializedGeoField
export type DeserializedItemFieldValue =
  | BasicFieldValue
  | DeserializedMediaFieldValue
  | DeserializedGeoField

export interface ItemField<T> {
  item_id: number
  field_id: number
  value: T
}

export interface SerializedItemField<T> {
  field_id: number
  value: T
}

export interface DeserializedItemField<T> {
  itemId: number
  fieldId: number
  value: T
}

// Image
export interface Image {
  id: number | null
  image: string
  image_thumbnail: string
  is_primary: boolean
  item_id: number
  dimensions: {
    width: number
    height: number
  }
}

export interface SerializedImage {
  image: string
  is_primary: boolean
  item_id: number | string
}

export interface DeserializedImage {
  id: number | string
  image: string
  imageThumbnail: string
  isPrimary: boolean
  itemId: number
  dimensions: {
    width: number
    height: number
  } | null
}
