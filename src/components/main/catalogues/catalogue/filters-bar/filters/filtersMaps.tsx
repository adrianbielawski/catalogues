import FilterRange from './filter/filter-wrapper/filter-range/filterRange'
import FilterChoices from './filter/filter-wrapper/filter-choices/filterChoices'
import { FilterComponentMap } from './filtersTypes'

export const filterComponentMap: FilterComponentMap = {
    'number': FilterRange,
    'date': FilterRange,
    'multiple_choice': FilterChoices,
}