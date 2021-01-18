import {
    User, DeserializedUser, Catalogue, DeserializedCatalogue, ItemDeserializer, ListData, DeserializedListData,
    Item, DeserializedItem, Field, DeserializedField,
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

export const fieldDeserializer = (field: Field): DeserializedField => ({
    id: field.id,
    catalogueId: field.catalogue_id,
    type: field.type,
    name: field.name,
    filterName: field.filter_name,
    position: field.position,
})

export const fieldsDeserializer = (fields: Field[]): DeserializedField[] => (
    fields.map(field => fieldDeserializer(field))
)