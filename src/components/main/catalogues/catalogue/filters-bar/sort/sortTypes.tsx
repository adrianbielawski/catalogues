import { Dispatch } from 'react'

export const CHANGE_SORT = 'CHANGE_SORT'
export const CLEAR_SORT = 'CLEAR_SORT'

interface changeSort {
    type: typeof CHANGE_SORT,
    value: Selected,
}

interface clearSort {
    type: typeof CLEAR_SORT,
}

export type Action = changeSort | clearSort

export interface State {
    sortOptions: Option[],
    selected: Selected,
    dispatch: Dispatch<Action>,
}

export interface Option {
    id: string,
    title: string,
    type: string,
}

export interface Selected {
    [key: string]: string | null
}

export type SortMap = {
    [key: string]: string[]
}