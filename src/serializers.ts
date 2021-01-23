import {
    User, DeserializedUser, Catalogue, DeserializedCatalogue, ItemDeserializer, ListData, DeserializedListData,
    Item, DeserializedItem, Field, DeserializedField, DeserializedChoiceField, DeserializedTextField, Choice,
    DeserializedChoice,
} from 'src/globalTypes'

export const userDeserializer = (user: User): DeserializedUser => ({
    id: user.id,
    username: user.username,
    email: user.email,
    image: user.image,
    imageThumbnail: user.image_thumbnail,
    isAnonymous: user.is_anonymous,
})

export const catalogueDeserializer = (catalogue: Catalogue): DeserializedCatalogue => ({
    id: catalogue.id,
    createdBy: catalogue.created_by,
    name: catalogue.name,
    slug: catalogue.slug,
    fields: [],
    fetchingFields: false,
    isAddFieldFormActive: false,
    isSubmittingNewField: false,
})

export const listDeserializer = (
    data: ListData,
    itemDeserializer: ItemDeserializer
): DeserializedListData => ({
    count: data.count,
    pageSize: data.page_size,
    startIndex: data.start_index,
    endIndex: data.end_index,
    current: data.current,
    next: data.next,
    previous: data.previous,
    results: data.results.map(itemDeserializer)
})

export const itemDeserializer = (item: Item): DeserializedItem => ({
    id: item.id,
    createdBy: item.created_by,
    createdAt: item.created_at,
    modifiedAt: item.modified_at,
    name: item.name,
    slug: item.slug,
    catalogue: catalogueDeserializer(item.catalogue),
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
    fetchingChoices: false,
    isEditing: false,
    isSubmitting: false,
})

export const choiceDeserializer = (choice: Choice): DeserializedChoice => ({
    id: choice.id,
    fieldId: choice.field_id,
    value: choice.value,
    removed: false,
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