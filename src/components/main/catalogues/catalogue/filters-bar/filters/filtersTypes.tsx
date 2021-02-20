export const CHANGE_SELECTED_FILTERS = 'CHANGE_SELECTED_FILTERS'
export const CHANGE_FILTERS = 'CHANGE_FILTERS'

interface changeSelectedFilters {
    type: typeof CHANGE_SELECTED_FILTERS,
    filterId: number | string,
    value: FilterValue,
}

interface changeFilters {
    type: typeof CHANGE_FILTERS,
    filters: FilterType[],
}

export type FilterValue = {} | null | undefined

export interface Choice {
    id: number | string,
    title: string,
}

export type FilterComponentMap = {
    [key: string]: React.ComponentType<any>
}

export interface SelectedFilter {
    [filterId: string]: any,
}

export interface FilterWithoutChoices {
    id: number | string,
    title: string,
    type: string,
    minVal: string,
    maxVal: string,
    choices?: never,
}

export interface FilterWithChoices {
    id: number | string,
    title: string,
    type: string,
    choices: Choice[],
    minVal?: never,
    maxVal?: never,
}

export type FilterType = FilterWithoutChoices | FilterWithChoices

export type Action = changeSelectedFilters | changeFilters

export interface FiltersInitialState {
    filters: FilterType[],
    selectedFilters: SelectedFilter,
}

export interface FiltersContextInterface {
    filters: FilterType[],
    selectedFilters: SelectedFilter,
    changeSelectedFilters: (filterId: number | string, value: FilterValue) => void
    changeFilters: (filters: FilterType[]) => void
}