import { FiltersBarValues } from "components/global-components/filters-bar/filters-bar-context/filtersBarTypes"

export const filtersBarInitialState: FiltersBarValues = {
    filtersBarValue: {
        isInitialized: false,
    },
    searchValue: {
        search: '',
    },
    filtersValue: {
        filters: [],
        selectedFilters: {},
        activeFilters: {},
        filtersInitialized: false,
    },
    sortValue: {
        sortOptions: [
            {
                id: 'date',
                title: 'date',
                type: 'date',
            },
            {
                id: 'rating',
                title: 'rating',
                type: 'number',
            },
        ],
        activeOption: null,
        selected: {},
    }
}