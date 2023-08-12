export const CHANGE_SORT = 'CHANGE_SORT'
export const SET_ACTIVE_OPTION = 'SET_ACTIVE_OPTION'

interface ChangeSort {
  type: typeof CHANGE_SORT
  value: SortValue
}

interface SetActiveOption {
  type: typeof SET_ACTIVE_OPTION
  option: string | null
}

export type Action = ChangeSort | SetActiveOption

export interface SortInitialState {
  sortOptions: Option[]
  activeOption: string | null
  selected: Selected
}
export interface SortContextInterface extends SortInitialState {
  setSortValue: (value: SortValue) => void
  setActiveOption: (option: string | null) => void
}

export interface Option {
  id: string
  title: string
  type: 'number' | 'date' | 'text'
}

export type SortValue = Selected | undefined

type Selected = Record<string, number | string | null>

export type SortMap = Record<string, string[]>
