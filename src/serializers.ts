import * as T from 'src/globalTypes'

export const userDeserializer = (user: T.User): T.DeserializedUser => ({
    id: user.id,
    username: user.username,
    email: user.email,
    image: user.image,
    imageThumbnail: user.image_thumbnail,
    isAnonymous: user.is_anonymous,
})

export const listResultsDeserializer = <R, DR>(
    results: R[],
    resultsDeserializer: (results: R) => DR,
    prevResults?: DR[],
): DR[] => {
    const deserialized = results.map(resultsDeserializer)
    
    if (prevResults) {
        return prevResults.concat(deserialized)
    }

    return deserialized
}

export const listDeserializer = <S, D>(
    data: T.ListData<S>,
    resultsDeserializer: (results: S) => D,
    prevResults?: D[],
): T.DeserializedListData<D> => ({
    count: data.count,
    pageSize: data.page_size,
    startIndex: data.start_index,
    endIndex: data.end_index,
    current: data.current,
    next: data.next,
    previous: data.previous,
    results: listResultsDeserializer(data.results, resultsDeserializer, prevResults),
})

//Catalogues
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
    createdBy: userDeserializer(catalogue.created_by),
    default: catalogue.default,
    public: catalogue.public,
    name: catalogue.name,
    slug: catalogue.slug,
    itemsRanges: itemsRangeDeserializer(catalogue.items_ranges),
    permissions: cataloguePermissionsDeserializer(catalogue.permissions),
    image: catalogue.image,
    imageThumbnail: catalogue.image_thumbnail,
    isFavourite: catalogue.is_favourite,
})

//Fields
export const fieldDeserializer = (field: T.Field): T.DeserializedField => ({
    id: field.id,
    catalogueId: field.catalogue_id,
    type: field.type,
    name: field.name,
    filterName: field.filter_name,
    position: field.position,
    public: field.public,
})

export const fieldsDeserializer = (fields: T.Field[]): T.DeserializedField[] => (
    fields.map(fieldDeserializer)
)

//Choices
export const choiceDeserializer = (choice: T.Choice): T.DeserializedChoice => ({
    id: choice.id,
    fieldId: choice.field_id,
    value: choice.value,
})

export const choicesDeserializer = (choices: T.Choice[]): T.DeserializedChoice[] => (
    choices.map(choiceDeserializer)
)

//Item
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
    average: Math.round((rating.average + Number.EPSILON) * 100) / 100,
    count: rating.count,
    currentUser: rating.current_user,
})

export const itemCommentCreatedByDeserializer = (createdBy: T.ItemCommentCreatedBy) => ({
    id: createdBy.id,
    username: createdBy.username,
    image: createdBy.image,
    imageThumbnail: createdBy.image_thumbnail,
})

export const itemCommentChildDeserializer = (comment: T.ItemCommentChild) => ({
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
    children: comment.children?.map(itemCommentChildDeserializer) || [],
})

export const itemCommentDataDeserializer = (comment: T.ItemCommentParent) => ({
    id: comment.id,
    children: comment.children.map(c => c.id)
})

export const itemDeserializer = (item: T.Item): T.DeserializedItem => ({
    id: item.id,
    createdBy: userDeserializer(item.created_by),
    createdAt: item.created_at,
    modifiedAt: item.modified_at,
    catalogueId: item.catalogue_id,
    permissions: itemPermissionsDeserializer(item.permissions),
    rating: itemRatingDeserializer(item.rating),
    isFavourite: item.is_favourite,
    fieldsValues: item.values.map(itemFieldDeserializer),
    images: item.images.map(imageDeserializer),
    removedImages: [],
})

export const itemDataDeserializer = (item: T.Item): T.DeserializedItemData => ({
    id: item.id,
    commentsData: {
        count: null,
        pageSize: null,
        startIndex: null,
        endIndex: null,
        current: null,
        next: null,
        previous: null,
        results: [],
    },
    isFetchingComments: true,
    isPostingComment: true,
    isEditing: false,
    isSubmitting: false,
    isDeleting: false,
    itemError: null,
})

//Images
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