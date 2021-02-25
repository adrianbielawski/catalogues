import {
    User, DeserializedUser, Catalogue, DeserializedCatalogue, ItemDeserializer, ListData, DeserializedListData,
    Item, DeserializedItem, Field, DeserializedField, DeserializedChoiceField, DeserializedTextField, Choice,
    DeserializedChoice, DeserializedItemsData, ListResultsDeserializer, ItemField, DeserializedItemField,
    Image, DeserializedImage, SerializedItemField, DeserializedItemsRanges, ItemsRanges,
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

export const catalogueDeserializer = (catalogue: Catalogue): DeserializedCatalogue => ({
    id: catalogue.id,
    createdBy: catalogue.created_by,
    name: catalogue.name,
    slug: catalogue.slug,
    itemsRanges: itemsRangeDeserializer(catalogue.items_ranges),
    fields: [],
    fetchingFields: true,
    fetchingFieldsChoices: true,
    isEditingCatalogueName: false,
    isSubmittingCatalogueName: false,
    isAddFieldFormActive: false,
    isSubmittingNewField: false,
})

export const itemsDataDeserializer = (
    data: ListData,
    itemDeserializer: ItemDeserializer
): DeserializedItemsData => ({
    count: data.count,
    pageSize: data.page_size,
    startIndex: data.start_index,
    endIndex: data.end_index,
    current: data.current,
    next: data.next,
    previous: data.previous,
    results: data.results.map(itemDeserializer)
})

export const listDeserializer = (
    data: ListData,
    resultsDeserializer: ListResultsDeserializer
): DeserializedListData => ({
    count: data.count,
    pageSize: data.page_size,
    startIndex: data.start_index,
    endIndex: data.end_index,
    current: data.current,
    next: data.next,
    previous: data.previous,
    results: data.results.map(resultsDeserializer)
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

export const itemDeserializer = (item: Item): DeserializedItem => ({
    id: item.id,
    createdBy: item.created_by,
    createdAt: item.created_at,
    modifiedAt: item.modified_at,
    catalogueId: item.catalogue_id,
    fieldsValues: item.values.map(itemFieldDeserializer),
    images: item.images.map(imageDeserializer),
    removedImages: [],
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
    removedChoices: [],
    fetchingChoices: false,
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