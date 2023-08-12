import queryString from 'query-string'
import { trimStart } from 'lodash'
// Types
import { type UseFiltersBarContextInterface } from 'components/global-components/filters-bar/filters-bar-context/filtersBarTypes'
import { type SelectedFilter } from 'components/global-components/filters-bar/filters/filtersTypes'

const filtersBarValuesBuilder = (
  context: UseFiltersBarContextInterface,
  search: string,
) => {
  // eslint-disable-next-line no-restricted-globals
  const parsedQuery = queryString.parse(search || '')

  const searchValue = (parsedQuery.search as string) || ''

  const orderingValue = parsedQuery.ordering
    ? {
        [trimStart(parsedQuery.ordering as string, '-')]:
          parsedQuery.ordering as string,
      }
    : {}

  const filtersValue: SelectedFilter = {}

  for (const filter of context.filtersContext.filters) {
    if (
      filter.type === 'date' ||
      filter.type === 'number' ||
      filter.type === 'rating'
    ) {
      if (
        `${filter.id}__lte` in parsedQuery ||
        `${filter.id}__gte` in parsedQuery
      ) {
        filtersValue[filter.id] = {
          gte: (parsedQuery[`${filter.id}__gte`] as string) || null,
          lte: (parsedQuery[`${filter.id}__lte`] as string) || null,
        }
      }
    } else {
      if (filter.id in parsedQuery) {
        filtersValue[filter.id] = (parsedQuery[filter.id] as string).split(',')
      }
    }
  }

  return {
    searchValue,
    orderingValue,
    filtersValue,
  }
}

export default filtersBarValuesBuilder
