import { FiltersContextInterface } from "./filters/filtersTypes"
import { SearchContextInterface } from "./search/searchTypes"
import { SortContextInterface } from "./sort/sortTypes"

export const CHANGE_SHOW_FILTERS_BAR = 'CHANGE_SHOW_FILTERS_BAR'
export const INITIALIZED = 'INITIALIZED'

interface ToggleFiltersBar {
    type: typeof CHANGE_SHOW_FILTERS_BAR,
    show: boolean,
}

interface Initialized {
    type: typeof INITIALIZED,
}

export type Action = Initialized | ToggleFiltersBar

export interface FiltersBarInitialState {
    show: boolean,
    isInitialized: boolean
}

export interface FiltersBarContextInterface extends FiltersBarInitialState {
    initialized: () => void,
    changeShowFiltersBar: (show: boolean) => void,
}

export interface UseFiltersBarContextInterface {
    searchContext: SearchContextInterface,
    sortContext: SortContextInterface,
    filtersContext: FiltersContextInterface,
    filtersBar: FiltersBarContextInterface,
}