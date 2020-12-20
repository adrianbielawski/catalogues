export const CHANGE_FILTER = 'CHANGE_FILTER'

interface changeFilter {
    type: typeof CHANGE_FILTER,
    filterId: string,
    value: FilterValue,
}

export type FilterValue = {} | null | undefined

export interface Choice {
    id: string,
    title: string,
}

export type FilterComponentMap = {
    [key: string]: React.ComponentType<any>
}

export interface SelectedFilter {
    [filterId: string]: any,
}

export interface FilterWithoutChoices {
    id: string,
    title: string,
    type: string,
    minVal: string,
    maxVal: string,
    choices?: never,
}

export interface FilterWithChoices {
    id: string,
    title: string,
    type: string,
    choices: Choice[],
    minVal?: never,
    maxVal?: never,
}

export type FilterType = FilterWithoutChoices | FilterWithChoices

export type Action = changeFilter 

export interface FiltersInitialState {
    filters: FilterType[],
    selectedFilters: SelectedFilter,
}

export interface State {
    filters: FilterType[],
    selectedFilters: SelectedFilter,
    setFilterValue: (filterId: string, value: FilterValue) => void
}