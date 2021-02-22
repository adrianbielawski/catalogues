export const TOGGLE_FILTERS_BAR = 'TOGGLE_FILTERS_BAR'
export const INITIALIZED = 'INITIALIZED'

interface ToggleFiltersBar {
    type: typeof TOGGLE_FILTERS_BAR,
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
    toggleFiltersBar: () => void,
}