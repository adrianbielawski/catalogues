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

export interface LocationState {
    referrer: string;
}

export interface Catalogue {
    id: number,
    created_by: number,
    name: string,
    slug: string,
}

export interface DeserializedCatalogue {
    id: number,
    createdBy: number,
    name: string,
    slug: string,
}