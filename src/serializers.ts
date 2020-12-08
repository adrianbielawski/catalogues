import { User, DeserializedUser, Catalogue, DeserializedCatalogue } from 'src/globalTypes'

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
})