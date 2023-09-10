import type * as T from 'src/globalTypes'
import { listData } from './constants'
import { pullChildren } from './utils'

export const userDeserializer = (user: T.User): T.DeserializedUser => ({
  id: user.id,
  username: user.username,
  email: user?.email,
  image: user.image,
  imageThumbnail: user.image_thumbnail,
})

export const listResultsDeserializer = <R, DR>(
  results: R[],
  resultsDeserializer: (results: R) => DR,
  prevResults?: DR[],
): DR[] => {
  const deserialized = results.map(resultsDeserializer)

  if (prevResults != null) {
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
  results: listResultsDeserializer(
    data.results,
    resultsDeserializer,
    prevResults,
  ),
})

// Catalogues
export const itemsRangeDeserializer = (
  itemsRanges: T.ItemsRanges,
): T.DeserializedItemsRanges => ({
  id: {
    min: itemsRanges.id.min,
    max: itemsRanges.id.max,
  },
  date: {
    min: itemsRanges.date.min,
    max: itemsRanges.date.max,
  },
})

export const cataloguePermissionsDeserializer = (
  permissions: T.CataloguePermissions,
): T.DeserializedCataloguePermissions => ({
  canCreateItems: permissions.can_create_items,
})

export const catalogueDeserializer = (
  catalogue: T.Catalogue,
): T.DeserializedCatalogue => ({
  id: catalogue.id,
  createdBy: catalogue.created_by.id,
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

// Fields
export const fieldDeserializer = (field: T.Field): T.DeserializedField[] => {
  const getField = (f: T.Field): T.DeserializedFieldWithChildren => ({
    id: f.id,
    catalogueId: f.catalogue_id,
    type: f.type,
    name: f.name,
    filterName: f.filter_name,
    position: f.position,
    public: f.public,
    children: f.children ? f.children?.map(getField) : undefined,
    parentId: f.parent_id,
  })
  return pullChildren(getField(field))
}

export const fieldsDeserializer = (fields: T.Field[] = []) =>
  fields.flatMap(fieldDeserializer)

// Choices
export const choiceDeserializer = (choice: T.Choice): T.DeserializedChoice => ({
  id: choice.id,
  fieldId: choice.field_id,
  value: choice.value,
})

export const choicesDeserializer = (
  choices: T.Choice[],
): T.DeserializedChoice[] => choices.map(choiceDeserializer)

// Item
export const geoFieldAddressDeserializer = (
  address: T.GeoFieldAddress,
): T.DeserializedGeoFieldAddress => ({
  city: address.city,
  country: address.country,
  countryCode: address.country_code,
  displayName: address.display_name,
  state: address.state,
  stateDistrict: address.state_district,
})

export const geoFieldDeserializer = (
  value: T.GeoField,
): T.DeserializedGeoField => ({
  address: geoFieldAddressDeserializer(value.address),
  latitude: value.latitude,
  longitude: value.longitude,
})

export const mediaFieldDeserializer = (
  value: T.MediaFieldValue,
): T.DeserializedMediaFieldValue => ({
  url: value.url,
  type: value.type,
  service: value.service,
  id: value.id,
  title: value.title,
  thumbnailUrl: value.thumbnail_url,
})

export const mediaFieldSerializer = (
  value: T.DeserializedMediaFieldValue,
): T.MediaFieldValue => ({
  url: value.url,
  type: value.type,
  service: value.service,
  id: value.id,
  title: value.title,
  thumbnail_url: value.thumbnailUrl,
})

export const itemFieldValueDeserializer = (
  value: T.ItemFieldValue,
): T.DeserializedItemFieldValue => {
  if (value === null) {
    return null
  }
  if ((value as T.MediaFieldValue).url !== undefined) {
    return mediaFieldDeserializer(value as T.MediaFieldValue)
  }

  if ((value as T.GeoField).address !== undefined) {
    return geoFieldDeserializer(value as T.GeoField)
  }
  return value as T.BasicFieldValue
}

export const itemFieldValueSerializer = (
  value: T.DeserializedItemFieldValue,
): T.SerializedItemFieldValue => {
  if (value === null) {
    return null
  }
  if ((value as T.DeserializedMediaFieldValue).url !== undefined) {
    return (value as T.DeserializedMediaFieldValue).url
  }
  if ((value as T.DeserializedGeoField).address !== undefined) {
    const v = value as T.DeserializedGeoField

    return {
      latitude: v.latitude,
      longitude: v.longitude,
    }
  }
  return value as T.BasicFieldValue
}

export const itemFieldDeserializer = (
  field: T.ItemField<T.ItemFieldValue>,
): T.DeserializedItemField<T.DeserializedItemFieldValue> => ({
  itemId: field.item_id,
  fieldId: field.field_id,
  value: itemFieldValueDeserializer(field.value),
})

export const itemFieldSerializer = (
  field: T.DeserializedItemField<T.DeserializedItemFieldValue>,
): T.SerializedItemField<T.SerializedItemFieldValue> => ({
  field_id: field.fieldId,
  value: itemFieldValueSerializer(field.value),
})

export const itemPermissionsDeserializer = (
  permissions: T.ItemPermissions,
): T.DeserializedItemPermissions => ({
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

export const itemCommentChildDeserializer = (comment: T.ItemCommentChild) => ({
  id: comment.id,
  itemId: comment.item_id,
  createdBy: comment.created_by.id,
  createdAt: comment.created_at,
  text: comment.text,
})

export const itemCommentDeserializer = (comment: T.ItemCommentParent) => ({
  id: comment.id,
  itemId: comment.item_id,
  createdBy: comment.created_by.id,
  createdAt: comment.created_at,
  text: comment.text,
  children: comment.children?.map(itemCommentChildDeserializer) || [],
})

export const itemCommentDataDeserializer = (comment: T.ItemCommentParent) => ({
  id: comment.id,
  children: comment.children.map((c) => c.id),
})

export const itemDeserializer = (item: T.Item): T.DeserializedItem => ({
  id: item.id,
  createdBy: item.created_by.id,
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
    ...listData,
  },
  isFetchingComments: true,
  isPostingComment: false,
  isEditing: false,
  isSubmitting: false,
  isDeleting: false,
  itemError: null,
})

// Images
export const imageDeserializer = (image: T.Image): T.DeserializedImage => ({
  id: image.id as number,
  image: image.image,
  imageThumbnail: image.image_thumbnail,
  isPrimary: image.is_primary,
  itemId: image.item_id,
  dimensions: {
    width: image.dimensions.width,
    height: image.dimensions.height,
  },
})

export const imagesDeserializer = (images: T.Image[]): T.DeserializedImage[] =>
  images.map(imageDeserializer)
