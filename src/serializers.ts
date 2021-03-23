import * as T from 'src/globalTypes'

export const userDeserializer = (user: T.User): T.DeserializedUser => ({
    id: user.id,
    username: user.username,
    email: user.email,
    image: user.image,
    imageThumbnail: user.image_thumbnail,
    isAnonymous: user.is_anonymous,
})

export const itemsRangeDeserializer = (itemsRanges: T.ItemsRanges): T.DeserializedItemsRanges => ({
    id: {
        min: itemsRanges.id.min,
        max: itemsRanges.id.max,
    },
    date: {
        min: itemsRanges.date.min,
        max: itemsRanges.date.max,
    },
})

export const cataloguePermissionsDeserializer = (permissions: T.CataloguePermisions): T.DeserializedCataloguePermisions => ({
    canCreateItems: permissions.can_create_items,
})

export const catalogueDeserializer = (catalogue: T.Catalogue): T.DeserializedCatalogue => ({
    id: catalogue.id,
    createdBy: catalogue.created_by,
    default: catalogue.default,
    public: catalogue.public,
    name: catalogue.name,
    slug: catalogue.slug,
    itemsRanges: itemsRangeDeserializer(catalogue.items_ranges),
    permissions: cataloguePermissionsDeserializer(catalogue.permissions),
    fields: [],
    image: catalogue.image,
    imageThumbnail: catalogue.image_thumbnail,
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
    isSubmittingImage: false,
    isInitialized: false,
})

export const listDeserializer = <S, D>(
    data: T.ListData<S>,
    resultsDeserializer: (results: S) => D
): T.DeserializedListData<D[]> => ({
    count: data.count,
    pageSize: data.page_size,
    startIndex: data.start_index,
    endIndex: data.end_index,
    current: data.current,
    next: data.next,
    previous: data.previous,
    results: data.results.map(resultsDeserializer),
})

export const itemFieldDeserializer = (field: T.ItemField): T.DeserializedItemField => ({
    itemId: field.item_id,
    fieldId: field.field_id,
    value: field.value,
})

export const itemFieldSerializer = (field: T.DeserializedItemField): T.SerializedItemField => ({
    field_id: field.fieldId,
    value: field.value,
})

export const itemPermissionsDeserializer = (permissions: T.ItemPermisions): T.DeserializedItemPermisions => ({
    canEdit: permissions.can_edit,
    canComment: permissions.can_comment,
    canAddToFavourites: permissions.can_add_to_favourites,
    canRate: permissions.can_rate,
})

export const itemRatingDeserializer = (rating: T.ItemRating) => ({
    average: rating.average,
    count: rating.count,
    currentUser: rating.current_user,
})

export const itemCommentCreatedByDeserializer = (createdBy: T.ItemCommentCreatedBy) => ({
    id: createdBy.id,
    username: createdBy.username,
    image: createdBy.image,
    imageThumbnail: createdBy.image_thumbnail,
})

export const itemCommentChildrenDeserializer = (comment: T.ItemCommentChildren) => ({
    id: comment.id,
    itemId: comment.item_id,
    createdBy: itemCommentCreatedByDeserializer(comment.created_by),
    createdAt: comment.created_at,
    text: comment.text,
})

export const itemCommentDeserializer = (comment: T.ItemCommentParent) => ({
    id: comment.id,
    itemId: comment.item_id,
    createdBy: itemCommentCreatedByDeserializer(comment.created_by),
    createdAt: comment.created_at,
    text: comment.text,
    children: comment.children.map(itemCommentChildrenDeserializer),
})

export const itemDeserializer = (item: T.Item): T.DeserializedItem => ({
    id: item.id,
    createdBy: item.created_by,
    createdAt: item.created_at,
    modifiedAt: item.modified_at,
    catalogueId: item.catalogue_id,
    permissions: itemPermissionsDeserializer(item.permissions),
    rating: itemRatingDeserializer(item.rating),
    isFavourite: item.is_favourite,
    fieldsValues: item.values.map(itemFieldDeserializer),
    images: item.images.map(imageDeserializer),
    removedImages: [],
    commentsData: null,
    fetchingComments: false,
    postingComment: false,
    isEditing: false,
    isSubmitting: false,
    isDeleting: false,
})

export const textFieldDeserializer = (field: T.Field): T.DeserializedTextField => ({
    id: field.id,
    catalogueId: field.catalogue_id,
    type: field.type,
    name: field.name,
    filterName: field.filter_name,
    position: field.position,
    public: field.public,
    changingName: false,
    fieldError: {
        title: '',
        message: '',
    },
    isDeleting: false,
    isEditing: false,
    isSubmitting: false,
})

export const choiceFieldDeserializer = (field: T.Field): T.DeserializedChoiceField => ({
    id: field.id,
    catalogueId: field.catalogue_id,
    type: field.type,
    name: field.name,
    filterName: field.filter_name,
    position: field.position,
    public: field.public,
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

export const choiceDeserializer = (choice: T.Choice): T.DeserializedChoice => ({
    id: choice.id,
    fieldId: choice.field_id,
    value: choice.value,
})

export const choicesDeserializer = (choices: T.Choice[]): T.DeserializedChoice[] => (
    choices.map(choiceDeserializer)
)

export const fieldDeserializer = (field: T.Field): T.DeserializedField => {
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

export const fieldsDeserializer = (fields: T.Field[]): T.DeserializedField[] => (
    fields.map(fieldDeserializer)
)

export const imageDeserializer = (image: T.Image): T.DeserializedImage => ({
    id: image.id as number,
    image: image.image,
    imageThumbnail: image.image_thumbnail,
    isPrimary: image.is_primary,
    itemId: image.item_id,
})

export const imagesDeserializer = (images: T.Image[]): T.DeserializedImage[] => (
    images.map(imageDeserializer)
)