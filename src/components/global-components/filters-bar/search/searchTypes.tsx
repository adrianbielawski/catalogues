export const CHANGE_SEARCH = 'CHANGE_SEARCH'

interface ChangeSearch {
  type: typeof CHANGE_SEARCH
  value: SearchValue
}

export type SearchValue = string

export type Action = ChangeSearch

export interface SearchInitialState {
  search: string
}

export interface SearchContextInterface {
  search: string
  setSearchValue: (value: SearchValue) => void
}
