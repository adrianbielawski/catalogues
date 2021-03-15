import {
    User, DeserializedUser, Catalogue, DeserializedCatalogue, ListData, DeserializedListData,
    Item, DeserializedItem, Field, DeserializedField, DeserializedChoiceField, DeserializedTextField, Choice,
    DeserializedChoice, ItemField, DeserializedItemField,
    Image, DeserializedImage, SerializedItemField, DeserializedItemsRanges, ItemsRanges, ItemPermisions,
    DeserializedItemPermisions, CataloguePermisions, DeserializedCataloguePermisions, ItemRating,
    ItemCommentChildren,
    ItemComment, ItemCommentCreatedBy,
} from 'src/globalTypes'

export const userDeserializer = (user: User): DeserializedUser => ({
    id: user.id,
    username: user.username,
    email: user.email,
    image: user.image,
    imageThumbnail: user.image_thumbnail,
    isAnonymous: user.is_anonymous,
})

export const itemsRangeDeserializer = (itemsRanges: ItemsRanges): DeserializedItemsRanges => ({
    id: {
        min: itemsRanges.id.min,
        max: itemsRanges.id.max,
    },
    date: {
        min: itemsRanges.date.min,
        max: itemsRanges.date.max,
    },
})

export const cataloguePermissionsDeserializer = (permissions: CataloguePermisions): DeserializedCataloguePermisions => ({
    canCreateItems: permissions.can_create_items,
})

export const catalogueDeserializer = (catalogue: Catalogue): DeserializedCatalogue => ({
    id: catalogue.id,
    createdBy: catalogue.created_by,
    default: catalogue.default,
    public: catalogue.public,
    name: catalogue.name,
    slug: catalogue.slug,
    itemsRanges: itemsRangeDeserializer(catalogue.items_ranges),
    permissions: cataloguePermissionsDeserializer(catalogue.permissions),
    fields: [],
    fetchingFields: true,
    fetchingFieldsChoices: true,
    isEditingCatalogueName: false,
    isSubmittingCatalogueName: false,
    catalogueError: {
        title: '',
        message: '',
    },
    isAddFieldFormActive: false,
    isSubmittingNewField: false,
    deletingCatalogue: false,
    isInitialized: false,
})

export const listDeserializer = <S, D>(
    data: ListData<S>,
    resultsDeserializer: (results: S) => D
): DeserializedListData<D[]> => ({
    count: data.count,
    pageSize: data.page_size,
    startIndex: data.start_index,
    endIndex: data.end_index,
    current: data.current,
    next: data.next,
    previous: data.previous,
    results: data.results.map(resultsDeserializer),
})

export const itemFieldDeserializer = (field: ItemField): DeserializedItemField => ({
    itemId: field.item_id,
    fieldId: field.field_id,
    value: field.value,
})

export const itemFieldSerializer = (field: DeserializedItemField): SerializedItemField => ({
    field_id: field.fieldId,
    value: field.value,
})

export const itemPermissionsDeserializer = (permissions: ItemPermisions): DeserializedItemPermisions => ({
    canEdit: permissions.can_edit,
    canComment: permissions.can_comment,
})

export const itemRatingDeserializer = (rating: ItemRating) => ({
    average: rating.average,
    count: rating.count,
    currentUser: rating.current_user,
})

export const itemCommentCreatedByDeserializer = (createdBy: ItemCommentCreatedBy) => ({
    id: createdBy.id,
    username: createdBy.username,
    image: createdBy.image,
    imageThumbnail: createdBy.image_thumbnail,
})

export const itemCommentChildrenDeserializer = (comment: ItemCommentChildren) => ({
    id: comment.id,
    itemId: comment.item_id,
    createdBy: itemCommentCreatedByDeserializer(comment.created_by),
    createdAt: comment.created_at,
    text: comment.text,
})

export const itemCommentDeserializer = (comment: ItemComment) => ({
    id: comment.id,
    itemId: comment.item_id,
    createdBy: itemCommentCreatedByDeserializer(comment.created_by),
    createdAt: comment.created_at,
    text: comment.text,
    children: comment.children.map(itemCommentChildrenDeserializer),
})

export const itemDeserializer = (item: Item): DeserializedItem => ({
    id: item.id,
    createdBy: item.created_by,
    createdAt: item.created_at,
    modifiedAt: item.modified_at,
    catalogueId: item.catalogue_id,
    permissions: itemPermissionsDeserializer(item.permissions),
    rating: itemRatingDeserializer(item.rating),
    fieldsValues: item.values.map(itemFieldDeserializer),
    images: item.images.map(imageDeserializer),
    removedImages: [],
    commentsData: null,
    isEditing: false,
    isSubmitting: false,
    isDeleting: false,
})

export const textFieldDeserializer = (field: Field): DeserializedTextField => ({
    id: field.id,
    catalogueId: field.catalogue_id,
    type: field.type,
    name: field.name,
    filterName: field.filter_name,
    position: field.position,
    changingName: false,
    fieldError: {
        title: '',
        message: '',
    },
    isDeleting: false,
    isEditing: false,
    isSubmitting: false,
})

export const choiceFieldDeserializer = (field: Field): DeserializedChoiceField => ({
    id: field.id,
    catalogueId: field.catalogue_id,
    type: field.type,
    name: field.name,
    filterName: field.filter_name,
    position: field.position,
    choices: field.choices ? choicesDeserializer(field.choices) : [],
    fetchingChoices: false,
    postingChoice: false,
    fieldError: {
        title: '',
        message: '',
    },
    removingChoice: false,
    changingName: false,
    isDeleting: false,
    isEditing: false,
    isSubmitting: false,
})

export const choiceDeserializer = (choice: Choice): DeserializedChoice => ({
    id: choice.id,
    fieldId: choice.field_id,
    value: choice.value,
})

export const choicesDeserializer = (choices: Choice[]): DeserializedChoice[] => (
    choices.map(choiceDeserializer)
)

export const fieldDeserializer = (field: Field): DeserializedField => {
    switch (field.type) {
        case 'short_text':
        case 'long_text':
            return textFieldDeserializer(field)

        case 'single_choice':
        case 'multiple_choice':
            return choiceFieldDeserializer(field)

        default:
            return textFieldDeserializer(field)
    }
}

export const fieldsDeserializer = (fields: Field[]): DeserializedField[] => (
    fields.map(fieldDeserializer)
)

export const imageDeserializer = (image: Image): DeserializedImage => ({
    id: image.id as number,
    image: image.image,
    imageThumbnail: image.image_thumbnail,
    isPrimary: image.is_primary,
    itemId: image.item_id,
})

export const imagesDeserializer = (images: Image[]): DeserializedImage[] => (
    images.map(imageDeserializer)
)