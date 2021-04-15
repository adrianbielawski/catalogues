export interface ItemUpdated {
    id: number,
    changes: any,
}

export interface AddImagesToStatePayload {
    itemId: number,
    images: string[],
}

export interface ImagePayload {
    itemId: number,
    index: number,
}