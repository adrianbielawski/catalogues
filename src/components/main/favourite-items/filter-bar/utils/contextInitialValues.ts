export const filtersBarInitialState = {
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
        ],
        activeOption: null,
        selected: {},
    }
}