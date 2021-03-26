import { FiltersContextInterface, FiltersInitialState } from "../filters/filtersTypes"
import { SearchContextInterface, SearchInitialState } from "../search/searchTypes"
import { SortContextInterface, SortInitialState } from "../sort/sortTypes"

export const INITIALIZED = 'INITIALIZED'

interface Initialized {
    type: typeof INITIALIZED,
}

export type Action = Initialized

export interface FiltersBarInitialState {
    isInitialized: boolean
}

export interface FiltersBarValues {
    filtersBarValue: FiltersBarInitialState,
    filtersValue: FiltersInitialState,
    sortValue: SortInitialState,
    searchValue: SearchInitialState,
}

export interface FiltersBarContextInterface extends FiltersBarInitialState {
    initialize: () => void,
}

export interface UseFiltersBarContextInterface {
    searchContext: SearchContextInterface,
    sortContext: SortContextInterface,
    filtersContext: FiltersContextInterface,
    filtersBar: FiltersBarContextInterface,
}