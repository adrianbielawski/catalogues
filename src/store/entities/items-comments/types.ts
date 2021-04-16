import { ItemCommentChild } from "src/globalTypes";

export interface ItemCommentUpdated {
    id: number,
    changes: any,
}

export interface ItemCommentChildAdded {
    parentId: number,
    child: ItemCommentChild,
}