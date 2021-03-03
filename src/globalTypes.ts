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
        userId?: number,
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
    name: string,
    slug: string,
    items_ranges: ItemsRanges
}

export interface DeserializedCatalogue {
    id: number,
    createdBy: number,
    name: string,
    slug: string,
    itemsRanges: DeserializedItemsRanges,
    fields: DeserializedField[],
    fetchingFields: boolean,
    fetchingFieldsChoices: boolean,
    isEditingCatalogueName: boolean,
    isSubmittingCatalogueName: boolean,
    changeNameError: ErrorMessage,
    isAddFieldFormActive: boolean,
    isSubmittingNewField: boolean,
}

export interface ItemsData extends ListData {
    results: Item[],
}

export interface DeserializedItemsData extends DeserializedListData {
    results: DeserializedItem[],
}

export type ListDataResults = Item[]

export interface ListData {
    count: number,
    page_size: number,
    start_index: number,
    end_index: number,
    current: number,
    next: number,
    previous: number,
    results: ListDataResults,
}

export type DeserializedListDataResults = DeserializedItem[] 

export interface DeserializedListData {
    count: number | null,
    pageSize: number | null,
    startIndex: number | null,
    endIndex: number | null,
    current: number | null,
    next: number | null,
    previous: number | null,
    results: DeserializedListDataResults,
}

export type ListResultsDeserializer = ItemDeserializer

export type ItemDeserializer = (item: Item) => DeserializedItem

export interface Item {
    id: number,
    created_by: number,
    created_at: string,
    modified_at: string,
    catalogue_id: number,
    values: ItemField[],
    images: Image[],
}

export interface DeserializedItem {
    id: number | string,
    createdBy: number | null,
    createdAt: string,
    modifiedAt: string,
    catalogueId: number,
    fieldsValues: DeserializedItemField[],
    images: DeserializedImage[],
    removedImages: DeserializedImage[],
    isEditing: boolean,
    isSubmitting: boolean,
    isDeleting: boolean,
}

export interface ItemField {
    item_id: number,
    field_id: number,
    value: string | string[],
}

export interface SerializedItemField {
    field_id: number,
    value: string | string[],
}

export interface DeserializedItemField {
    itemId: number | string,
    fieldId: number,
    value: string | string[],
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
    addChoiceError: ErrorMessage,
    removingChoice: boolean,
    removeChoiceError: ErrorMessage,
    changingName: boolean,
    changeNameError: ErrorMessage,
    isDeleting: boolean,
    deleteFieldError: ErrorMessage
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
    changeNameError: ErrorMessage,
    isDeleting: boolean,
    deleteFieldError: ErrorMessage
    isEditing: boolean,
    isSubmitting: boolean,
}

export type DeserializedField = DeserializedTextField | DeserializedChoiceField

export type Image = {
    id: number | null,
    image: string,
    image_thumbnail: string,
    is_primary: boolean,
    item_id: number | string,
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
    itemId: number | string,
}