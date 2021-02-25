export const CHANGE_SELECTED_FILTERS = 'CHANGE_SELECTED_FILTERS'
export const SET_SELECTED_FILTERS = 'SET_SELECTED_FILTERS'
export const CHANGE_ACTIVE_FILTERS = 'CHANGE_ACTIVE_FILTERS'
export const CHANGE_FILTERS = 'CHANGE_FILTERS'
export const CHANGE_CHOICES_SORT = 'CHANGE_CHOICES_SORT'
export const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE'

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

interface ChangeChoicesSort {
    type: typeof CHANGE_CHOICES_SORT,
    filterId: number | string,
}

interface ChangeSearchValue {
    type: typeof CHANGE_SEARCH_VALUE,
    filterId: number | string,
    input: string,
}

export type Action = ChangeSelectedFilters
    | SetSelectedFilters
    | ChangeActiveFilters
    | ChangeFilters
    | ChangeChoicesSort
    | ChangeSearchValue

export interface SelectedChoiceFilterValue {
    [id: string]: boolean,
}

export type Range = {
    gte: string | null,
    lte: string | null,
}

export type SelectedFilterValue = SelectedChoiceFilterValue | Range

export type FilterValue = SelectedFilterValue | null

export interface Choice {
    id: number | string,
    title: string,
}

export type FilterComponentMap = {
    [key: string]: React.ComponentType<any>
}

export interface SelectedFilter {
    [filterId: string]: FilterValue,
}

export interface ActiveFilter {
    [filterId: string]: boolean,
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
}

export interface FiltersContextInterface extends FiltersInitialState {
    setSelectedFilters: (filters: SelectedFilter) => void
    changeSelectedFilters: (filterId: number | string, value: FilterValue) => void
    changeActiveFilters: (filterId: number | string, value: boolean) => void
    changeFilters: (filters: FilterType[]) => void
    changeChoicesSort: (filterId: number | string) => void
    changeSearchValue: (filterId: number | string, input: string) => void
}