export interface ErrorData {
    [field: string]: string,
}

export interface ErrorObject {
    response: {
        data: ErrorData,
    },
}

export interface ErrorMessage {
    title?: string,
    message: string,
}

export interface Referrer {
    pathname: string,
    params: {
        username?: string,
        slug?: string,
        catalogue?: DeserializedCatalogue,
    },
}

export interface LocationState {
    referrer: Referrer;
}

export interface QueryObj {
    [key: string]: number | string | string[]
}

//List data
export interface ListData<R> {
    count: number,
    page_size: number,
    start_index: number,
    end_index: number,
    current: number,
    next: number,
    previous: number,
    results: R[],
}

export interface DeserializedListData<R> {
    count: number | null,
    pageSize: number | null,
    startIndex: number | null,
    endIndex: number | null,
    current: number | null,
    next: number | null,
    previous: number | null,
    results: R[],
}

//User
export interface User {
    id: number,
    username: string,
    email: string,
    image: string,
    image_thumbnail: string,
    is_anonymous: boolean,
}

export interface DeserializedUser {
    id: number,
    username: string,
    email: string,
    image: string,
    imageThumbnail: string,
    isAnonymous: boolean,
}

//Catalogues
export interface ItemsRanges {
    id: {
        min: string,
        max: string
    },
    date: {
        min: string,
        max: string
    }
}

export interface DeserializedItemsRanges {
    id: {
        min: string,
        max: string
    },
    date: {
        min: string,
        max: string
    }
}

export interface Catalogue {
    id: number,
    created_by: User,
    default: boolean,
    public: boolean,
    name: string,
    slug: string,
    items_ranges: ItemsRanges,
    permissions: {
        can_create_items: boolean,
    },
    image: string,
    image_thumbnail: string,
    is_favourite: boolean,
}

export interface CataloguePermisions {
    can_create_items: boolean,
}

export interface DeserializedCataloguePermisions {
    canCreateItems: boolean,
}

export interface DeserializedCatalogue {
    id: number,
    createdBy: number,
    default: boolean,
    public: boolean,
    name: string,
    slug: string,
    itemsRanges: DeserializedItemsRanges,
    permissions: DeserializedCataloguePermisions,
    image: string,
    imageThumbnail: string,
    isFavourite: boolean,
}

export interface CatalogueData<F> {
    id: number,
    fieldsData: F[],
    isInitialized: boolean,
    isFetchingFields: boolean,
    isFetchingFieldsChoices: boolean,

}

export interface FieldsData {
    id: number,
}

export interface ChoiceFieldsData<C> extends FieldsData {
    choices: C[],
}

export interface RecomendedCatalogues extends ListData<Catalogue> { }
export interface DeserializedRecomendedCatalogues extends DeserializedListData<DeserializedCatalogue> {
    fetchingCatalogues: boolean,
}

//Fields
export interface Field {
    id: number,
    catalogue_id: number,
    type: string,
    name: string,
    filter_name: string,
    position: number,
    public: boolean,
    choices?: Choice[],
}

export interface DeserializedField {
    id: number,
    catalogueId: number,
    type: string,
    name: string,
    filterName: string,
    position: number,
    public: boolean,
}

//Choices
export interface Choice {
    id: number,
    field_id: number,
    value: string,
}

export interface DeserializedChoice {
    id: number,
    fieldId: number,
    value: string,
}

//Items

export interface DeserializedCommentData {
    id: number,
    children: number[]
}

export interface DeserializedItemData {
    id: number,
    commentsData: DeserializedListData<DeserializedCommentData>,
    isFetchingComments: boolean,
    isPostingComment: boolean,
    isEditing: boolean,
    isSubmitting: boolean,
    isDeleting: boolean,
    itemError: ErrorMessage | null,
}

export interface DeserializedItemsData extends DeserializedListData<DeserializedItem[]> {
    catalogueId: number | null,
    fetchingItems: boolean,
    creatingNewItem: boolean,
    newItem: DeserializedItem | null,
    itemsError: ErrorMessage,
}

export interface ItemPermisions {
    can_edit: boolean,
    can_comment: boolean,
    can_add_to_favourites: boolean,
    can_rate: boolean,
}

export interface DeserializedItemPermisions {
    canEdit: boolean,
    canComment: boolean,
    canAddToFavourites: boolean,
    canRate: boolean,
}

export interface ItemRating {
    average: number,
    count: number,
    current_user: number | null,
}

export interface DeserializedItemRating {
    average: number,
    count: number,
    currentUser: number | null,
}

export interface ItemCommentCreatedBy {
    id: number,
    username: string,
    image: string,
    image_thumbnail: string,
}

export interface DeserializedItemCommentCreatedBy {
    id: number,
    username: string,
    image: string,
    imageThumbnail: string,
}

export type ItemCommentChild = Omit<ItemCommentParent, 'children'>
export type DeserializedItemCommentChild = Omit<DeserializedItemCommentParent, 'children'>

export interface ItemCommentParent {
    id: number,
    item_id: number,
    created_by: ItemCommentCreatedBy,
    created_at: string,
    text: string,
    children: ItemCommentChild[],
}

export interface DeserializedItemCommentParent {
    id: number,
    itemId: number,
    createdBy: number,
    createdAt: string,
    text: string,
    children: DeserializedItemCommentChild[],
}

export type DeserializedItemComment = DeserializedItemCommentParent | DeserializedItemCommentChild

export interface CommentsData extends ListData<ItemCommentParent> { }
export interface DeserializedCommentsData extends DeserializedListData<DeserializedItemComment> { }

export interface Item {
    id: number,
    created_by: User,
    created_at: string,
    modified_at: string,
    catalogue_id: number,
    permissions: ItemPermisions,
    values: ItemField[],
    images: Image[],
    rating: ItemRating,
    is_favourite: boolean,
}

export interface DeserializedItem {
    id: number,
    createdBy: number,
    createdAt: string,
    modifiedAt: string,
    catalogueId: number,
    permissions: DeserializedItemPermisions,
    rating: DeserializedItemRating,
    isFavourite: boolean,
    fieldsValues: DeserializedItemField[],
    images: DeserializedImage[],
    removedImages: DeserializedImage[],
}

export type ItemFieldValue = string | number | number[]

export interface ItemField {
    item_id: number,
    field_id: number,
    value: ItemFieldValue,
}

export interface SerializedItemField {
    field_id: number,
    value: ItemFieldValue,
}

export interface DeserializedItemField {
    itemId: number,
    fieldId: number,
    value: ItemFieldValue,
}

//Image
export type Image = {
    id: number | null,
    image: string,
    image_thumbnail: string,
    is_primary: boolean,
    item_id: number,
}

export type SerializedImage = {
    image: string,
    is_primary: boolean,
    item_id: number | string,
}

export type DeserializedImage = {
    id: number | string,
    image: string,
    imageThumbnail: string,
    isPrimary: boolean,
    itemId: number,
}