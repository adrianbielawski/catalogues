export const SHOW_LIST = 'SHOW_LIST'
export const CLOSE_LIST = 'CLOSE_LIST'
export const SHOW_NESTED_LIST = 'SHOW_NESTED_LIST'

interface ShowList {
    type: typeof SHOW_LIST,
    listId: string | number,
}

interface CloseList {
    type: typeof CLOSE_LIST,
}

interface ShowNestedList {
    type: typeof SHOW_NESTED_LIST,
    nestedListId: string | number,
}

export type Action = ShowList | CloseList | ShowNestedList

export interface NavInitialState {
    show: boolean,
    listId: string | number | null,
    nestedListId: string | number | null,
}

export interface NavContextInterface extends NavInitialState {
    showList: (listId: string | number) => void,
    closeList: () => void,
    showNestedList: (nestedListId: string | number) => void,
}