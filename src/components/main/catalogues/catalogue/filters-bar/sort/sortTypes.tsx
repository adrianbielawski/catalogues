export const CHANGE_SORT = 'CHANGE_SORT'

interface changeSort {
    type: typeof CHANGE_SORT,
    value: SortValue,
}

export type Action = changeSort

export interface SortInitialState {
    sortOptions: Option[],
    selected: Selected,
}
export interface SortContextInterface {
    sortOptions: Option[],
    selected: Selected,
    setSortValue: (value: SortValue) => void,
}

export interface Option {
    id: string,
    title: string,
    type: string,
}

export type SortValue = Selected | undefined

interface Selected {
    [key: string]: string | null
}

export type SortMap = {
    [key: string]: string[]
}