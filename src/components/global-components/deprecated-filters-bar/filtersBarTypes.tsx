import { FiltersContextInterface } from "./filters/filtersTypes"
import { SearchContextInterface } from "./search/searchTypes"
import { SortContextInterface } from "./sort/sortTypes"

export const INITIALIZED = 'INITIALIZED'

interface Initialized {
    type: typeof INITIALIZED,
}

export type Action = Initialized

export interface FiltersBarInitialState {
    show: boolean,
    isInitialized: boolean
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