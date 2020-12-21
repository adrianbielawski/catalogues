import { useContext } from 'react'
import { SearchContext } from './search/searchStore'
import { FiltersContext } from './filters/filtersStore'
import { SortContext } from './sort/sortStore'
import { FiltersBarContext } from './filtersBarStore'

const useFiltersBarContext = () => {
    const { search } = useContext(SearchContext)
    const { selected: sort } = useContext(SortContext)
    const { selectedFilters: filters } = useContext(FiltersContext)
    const filtersBar = useContext(FiltersBarContext)

    return {
        search,
        sort,
        filters,
        filtersBar,
    }
}

export default useFiltersBarContext