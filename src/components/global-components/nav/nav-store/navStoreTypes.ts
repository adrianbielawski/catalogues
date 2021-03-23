export const SHOW_LIST = 'SHOW_LIST'
export const CLOSE_LIST = 'CLOSE_LIST'

interface ShowList {
    type: typeof SHOW_LIST,
    listId: string | number,
}

interface CloseList {
    type: typeof CLOSE_LIST,
}

export type Action = ShowList | CloseList

export interface NavInitialState {
    show: boolean,
    listId: string | number | null,
}

export interface NavContextInterface extends NavInitialState {
    showList: (listId: string | number) => void,
    closeList: () => void,
}