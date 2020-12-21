export const TOGGLE_FILTERS_BAR = 'TOGGLE_FILTERS_BAR'

interface toggleFiltersBar {
    type: typeof TOGGLE_FILTERS_BAR,
}

export type Action = toggleFiltersBar

export interface FiltersBarInitialState {
    show: boolean,
}

export interface FiltersBarContextInterface {
    show: boolean,
    toggleFiltersBar: () => void,
}