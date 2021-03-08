import queryString from 'query-string'
import { QueryObj } from "src/globalTypes"
import { Filter } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataTypes'
import { UseFiltersBarContextInterface } from 'components/global-components/filters-bar/filtersBarTypes'
import { Range } from 'components/global-components/filters-bar/filters/filtersTypes'

const queryBuilder = (context: UseFiltersBarContextInterface) => {
    const queryObj: QueryObj = {}

    const sort = Object.values(context.sortContext.selected)[0]

    queryObj['ordering'] = sort || ''
    queryObj['search'] = context.searchContext.search

    const filters: Filter = {}
    if (context.filtersContext.selectedFilters !== null) {
        Object.entries(context.filtersContext.selectedFilters).forEach(([id, values]) => {
            if (values === null) return

            if ('gte' in values) {
                if (values.gte) {
                    queryObj[`${id}__gte`] = (values as Range).gte!
                    filters[`${id}__gte`] = (values as Range).gte!
                }
                if (values.lte) {
                    queryObj[`${id}__lte`] = (values as Range).lte!
                    filters[`${id}__lte`] = (values as Range).lte!
                }
            } else {
                queryObj[id] = values
                filters[`${id}__in`] = values.join('__')
            }
        })
    }

    const query = queryString.stringify(queryObj, {
        arrayFormat: 'comma',
        skipEmptyString: true
    })

    return {
        query,
        search: context.searchContext.search || undefined,
        sort: sort ? sort : undefined,
        filters: filters || undefined,
    }
}

export default queryBuilder