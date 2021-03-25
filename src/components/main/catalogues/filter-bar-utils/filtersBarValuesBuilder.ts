import queryString from 'query-string'
import { UseFiltersBarContextInterface } from 'components/global-components/deprecated-filters-bar/filtersBarTypes'
import { SelectedFilter } from 'components/global-components/deprecated-filters-bar/filters/filtersTypes'
import { trimStart } from 'lodash'


const filtersBarValuesBuilder = (context: UseFiltersBarContextInterface) => {
    const parsedQuery = queryString.parse(location.search || '')

    const searchValue = parsedQuery.search || ''

    const orderingValue = parsedQuery.ordering ? {
        [trimStart(parsedQuery.ordering, '-')]: parsedQuery.ordering,
    } : {}

    const filtersValue: SelectedFilter = {}

    for (const filter of context.filtersContext.filters) {
        if (filter.type === 'date' || filter.type === 'number') {
            if (`${filter.id}__lte` in parsedQuery || `${filter.id}__gte` in parsedQuery) {
                filtersValue[filter.id] = {
                    gte: parsedQuery[`${filter.id}__gte`] || null,
                    lte: parsedQuery[`${filter.id}__lte`] || null,
                }
            }
        }
        else {
            if (filter.id in parsedQuery) {
                parsedQuery[filter.id].split(',')
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