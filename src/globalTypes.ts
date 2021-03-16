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
    created_by: number,
    default: boolean,
    public: boolean,
    name: string,
    slug: string,
    items_ranges: ItemsRanges,
    permissions: {
        can_create_items: boolean,
    },
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
    fields: DeserializedField[],
    fetchingFields: boolean,
    fetchingFieldsChoices: boolean,
    isEditingCatalogueName: boolean,
    isSubmittingCatalogueName: boolean,
    catalogueError: ErrorMessage,
    isAddFieldFormActive: boolean,
    isSubmittingNewField: boolean,
    deletingCatalogue: boolean,
    isInitialized: boolean,
}

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
    results: R,
}

export interface ItemsData extends ListData<Item> { }

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
}

export interface DeserializedItemPermisions {
    canEdit: boolean,
    canComment: boolean,
}

export interface ItemRating {
    average: number,
    count: number,
    current_user: number,
}

export interface DesrializedItemRating {
    average: number,
    count: number,
    currentUser: number,
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

export interface ItemCommentChildren {
    id: number,
    item_id: number,
    created_by: ItemCommentCreatedBy,
    created_at: string,
    text: string,
}

export interface DeserializedItemCommentChildren {
    id: number,
    itemId: number,
    createdBy: DeserializedItemCommentCreatedBy,
    createdAt: string,
    text: string,
}

export interface ItemComment {
    id: number,
    item_id: number,
    created_by: ItemCommentCreatedBy,
    created_at: string,
    text: string,
    children: ItemCommentChildren[],
}

export interface DeserializedItemComment {
    id: number,
    itemId: number,
    createdBy: DeserializedItemCommentCreatedBy,
    createdAt: string,
    text: string,
    children: DeserializedItemCommentChildren[],
}

export interface CommentsData extends ListData<ItemComment[]> { }
export interface DeserializedCommentsData extends DeserializedListData<DeserializedItemComment[]> { }

export interface Item {
    id: number,
    created_by: number,
    created_at: string,
    modified_at: string,
    catalogue_id: number,
    permissions: ItemPermisions,
    values: ItemField[],
    images: Image[],
    rating: ItemRating
}

export interface DeserializedItem {
    id: number,
    createdBy: number | null,
    createdAt: string,
    modifiedAt: string,
    catalogueId: number,
    permissions: DeserializedItemPermisions,
    rating: DesrializedItemRating,
    fieldsValues: DeserializedItemField[],
    images: DeserializedImage[],
    removedImages: DeserializedImage[],
    commentsData: DeserializedCommentsData | null,
    fetchingComments: boolean,
    postingComment: boolean,
    isEditing: boolean,
    isSubmitting: boolean,
    isDeleting: boolean,
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

export interface Field {
    id: number,
    catalogue_id: number,
    type: string,
    name: string,
    filter_name: string,
    position: number,
    choices?: Choice[],
}

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

export interface DeserializedChoiceField {
    id: number,
    catalogueId: number,
    type: string,
    name: string,
    filterName: string,
    position: number,
    choices: DeserializedChoice[],
    fetchingChoices: boolean,
    postingChoice: boolean,
    fieldError: ErrorMessage,
    removingChoice: boolean,
    changingName: boolean,
    isDeleting: boolean,
    isEditing: boolean,
    isSubmitting: boolean,
}

export interface DeserializedTextField {
    id: number,
    catalogueId: number,
    type: string,
    name: string,
    filterName: string,
    position: number,
    changingName: boolean,
    fieldError: ErrorMessage,
    isDeleting: boolean,
    isEditing: boolean,
    isSubmitting: boolean,
}

export type DeserializedField = DeserializedTextField | DeserializedChoiceField

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