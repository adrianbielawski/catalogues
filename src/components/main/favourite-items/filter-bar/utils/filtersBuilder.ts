import { type Dictionary } from '@reduxjs/toolkit'
import moment from 'moment'
// Types
import { type DeserializedCatalogue } from 'src/globalTypes'
import { type FilterType } from 'components/global-components/filters-bar/filters/filtersTypes'

const buildFilters = (
  cataloguesIds: number[],
  catalogues: Dictionary<DeserializedCatalogue>,
): FilterType[] => {
  const cataloguesFilter: FilterType = {
    id: 'catalogue_id',
    title: 'catalogue',
    type: 'multiple_choice',
    choices: cataloguesIds.map((id) => ({
      id: id.toString(),
      value: catalogues[id]!.name,
    })),
    choicesSortDir: 'asc',
    searchValue: '',
  }

  return [
    {
      id: 'date',
      title: 'date',
      type: 'date',
      minVal: moment('2021-01-01').format('YYYY-MM-DD'),
      maxVal: moment().format('YYYY-MM-DD'),
    },
    {
      id: 'rating',
      title: 'rating',
      type: 'rating',
      minVal: 1,
      maxVal: 5,
    },
    cataloguesFilter,
  ]
}

export default buildFilters
