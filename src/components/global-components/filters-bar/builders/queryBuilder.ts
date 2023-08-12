import queryString from 'query-string'
import { UseFiltersBarContextInterface } from 'components/global-components/filters-bar/filters-bar-context/filtersBarTypes'
import { QueryObj } from 'src/globalTypes'

const queryBuilder = (context: UseFiltersBarContextInterface) => {
  const queryObj: QueryObj = {}

  const sort = Object.values(context.sortContext.selected)[0]

  queryObj.ordering = sort ?? ''
  queryObj.search = context.searchContext.search

  const filters: Record<string, string | number> = {}
  if (context.filtersContext.selectedFilters !== null) {
    Object.entries(context.filtersContext.selectedFilters).forEach(
      ([id, values]) => {
        if (values === null) return

        if ('gte' in values) {
          if (values.gte) {
            queryObj[`${id}__gte`] = values.gte!
            filters[`${id}__gte`] = values.gte!
          }
          if (values.lte) {
            queryObj[`${id}__lte`] = values.lte!
            filters[`${id}__lte`] = values.lte!
          }
        } else {
          queryObj[id] = values
          filters[`${id}__in`] = values.join('__')
        }
      },
    )
  }

  const query = queryString.stringify(queryObj, {
    arrayFormat: 'comma',
    skipEmptyString: true,
    skipNull: true,
  })

  return {
    query,
    search: context.searchContext.search || undefined,
    sort: sort ?? undefined,
    filters: filters || undefined,
  }
}

export default queryBuilder
