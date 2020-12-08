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

export interface ListData {
    count: number,
    page_size: number,
    start_index: number,
    end_index: number,
    current: number,
    next: number,
    previous: number,
    results: Item[]
}

export interface DeserializedListData {
    count: number | null,
    pageSize: number | null,
    startIndex: number | null,
    endIndex: number | null,
    current: number | null,
    next: number | null,
    previous: number | null,
    results: DeserializedItem[]
}

export interface Item {
    id: number,
    created_by: number,
    created_at: string,
    modified_at: string,
    name: string,
    slug: string,
    catalogue: Catalogue
}

export interface DeserializedItem {
    id: number,
    createdBy: number,
    createdAt: string,
    modifiedAt: string,
    name: string,
    slug: string,
    catalogue: DeserializedCatalogue
}

export type ItemDeserializer = (item: Item) => DeserializedItem