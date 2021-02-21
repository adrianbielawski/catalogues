export const CHANGE_SELECTED_FILTERS = 'CHANGE_SELECTED_FILTERS'
export const CHANGE_ACTIVE_FILTERS = 'CHANGE_ACTIVE_FILTERS'
export const CHANGE_FILTERS = 'CHANGE_FILTERS'

interface ChangeSelectedFilters {
    type: typeof CHANGE_SELECTED_FILTERS,
    filterId: number | string,
    value: FilterValue,
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

export interface SelectedChoiceFilterValue {
    [id: string]: boolean,
}

export type Range = {
    gte: string | null,
    lte: string | null,
}

export type SelectedFilterValue = SelectedChoiceFilterValue | Range

export type FilterValue = SelectedChoiceFilterValue | Range | null

export interface Choice {
    id: number | string,
    title: string,
}

export type FilterComponentMap = {
    [key: string]: React.ComponentType<any>
}

export interface SelectedFilter {
    [filterId: string]: SelectedFilterValue | null,
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
    minVal?: never,
    maxVal?: never,
}

export type FilterType = FilterWithoutChoices | FilterWithChoices

export type Action = ChangeSelectedFilters | ChangeActiveFilters | ChangeFilters

export interface FiltersInitialState {
    filters: FilterType[],
    selectedFilters: SelectedFilter,
    activeFilters: ActiveFilter,
}

export interface FiltersContextInterface extends FiltersInitialState {
    changeSelectedFilters: (filterId: number | string, value: FilterValue) => void
    changeActiveFilters: (filterId: number | string, value: boolean) => void
    changeFilters: (filters: FilterType[]) => void
}