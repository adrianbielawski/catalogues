import { useContext } from 'react'
import { SearchContext } from './search/searchStore'
import { FiltersContext } from './filters/filtersStore'
import { SortContext } from './sort/sortStore'

const useFiltersBarContext = () => {
    const { search } = useContext(SearchContext)
    const { selected: sort } = useContext(SortContext)
    const { selectedFilters: filters } = useContext(FiltersContext)

    return {
        search,
        sort,
        filters,
    }
}

export default useFiltersBarContext