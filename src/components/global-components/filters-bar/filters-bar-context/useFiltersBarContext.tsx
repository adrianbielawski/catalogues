import { useContext } from 'react'
import { SearchContext } from '../search/searchStore'
import { FiltersContext } from '../filters/filtersStore'
import { SortContext } from '../sort/sortStore'
import { FiltersBarContext } from './filtersBarStore'

const useFiltersBarContext = () => {
  const searchContext = useContext(SearchContext)
  const sortContext = useContext(SortContext)
  const filtersContext = useContext(FiltersContext)
  const filtersBar = useContext(FiltersBarContext)

  return {
    searchContext,
    sortContext,
    filtersContext,
    filtersBar,
  }
}

export default useFiltersBarContext
