import { Dispatch } from 'react'

export const CHANGE_FILTER = 'CHANGE_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'

interface changeFilter {
    type: typeof CHANGE_FILTER,
    filterId: string,
    value: {} | null,
}

interface clearFiltersGroup {
    type: typeof CLEAR_FILTER,
    filterId: string,
}

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

export type Action = changeFilter | clearFiltersGroup

export interface State {
    filters: FilterType[],
    selectedFilters: SelectedFilter,
    dispatch: Dispatch<Action>,
}