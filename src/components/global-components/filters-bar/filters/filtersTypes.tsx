export const CHANGE_SELECTED_FILTERS = 'CHANGE_SELECTED_FILTERS'
export const SET_SELECTED_FILTERS = 'SET_SELECTED_FILTERS'
export const CHANGE_ACTIVE_FILTERS = 'CHANGE_ACTIVE_FILTERS'
export const CHANGE_FILTERS = 'CHANGE_FILTERS'

interface ChangeSelectedFilters {
    type: typeof CHANGE_SELECTED_FILTERS,
    filterId: number | string,
    value: FilterValue,
}

interface SetSelectedFilters {
    type: typeof SET_SELECTED_FILTERS,
    filters: SelectedFilter
}

interface ChangeActiveFilters {
    type: typeof CHANGE_ACTIVE_FILTERS,
    filterId: number | string,
    value: boolean,
}

interface ChangeFilters {
    type: typeof CHANGE_FILTERS,
    filters: FilterType[],
}

export type Action = ChangeSelectedFilters
    | SetSelectedFilters
    | ChangeActiveFilters
    | ChangeFilters

export type SelectedChoiceFilterValue = string

export type Range = {
    gte: string | number | null,
    lte: string | number | null,
}

export type SelectedFilterValue = SelectedChoiceFilterValue[] | Range

export type FilterValue = SelectedFilterValue | null

export interface Choice {
    id: number | string,
    value: string,
}

export type FilterComponentMap = Record<string, React.ComponentType<any>>

export type SelectedFilter = Record<string, FilterValue>

export type ActiveFilter = Record<string, boolean>

export interface FilterWithoutChoices {
    id: number | string,
    title: string,
    type: 'date' | 'number' | 'starsRange',
    minVal: string | number,
    maxVal: string | number,
    choices?: never,
}

export interface FilterWithChoices {
    id: number | string,
    title: string,
    type: string,
    choices: Choice[],
    choicesSortDir: 'asc' | 'desc',
    searchValue: string,
    minVal?: never,
    maxVal?: never,
}

export type FilterType = FilterWithoutChoices | FilterWithChoices

export interface FiltersInitialState {
    filters: FilterType[],
    selectedFilters: SelectedFilter,
    activeFilters: ActiveFilter,
    filtersInitialized: boolean,
}

export interface FiltersContextInterface extends FiltersInitialState {
    setSelectedFilters: (filters: SelectedFilter) => void
    changeSelectedFilters: (filterId: number | string, value: FilterValue) => void
    changeActiveFilters: (filterId: number | string, value: boolean) => void
    changeFilters: (filters: FilterType[]) => void
}