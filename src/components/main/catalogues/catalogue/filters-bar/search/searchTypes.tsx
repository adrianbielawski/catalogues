export const CHANGE_SEARCH = 'CHANGE_SEARCH'

interface changeSearch {
    type: typeof CHANGE_SEARCH,
    value: SearchValue,
}

export type SearchValue = string

export type Action = changeSearch

export interface SearchInitialState {
    search: string,
}
export interface State {
    search: string,
    setSearchValue: (value: SearchValue) => void,
}