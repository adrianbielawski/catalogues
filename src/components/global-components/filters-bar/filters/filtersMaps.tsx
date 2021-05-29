import FilterRange from './filter/filter-range/filterRange'
import FilterStarsRange from './filter/filter-stars-range/filterStarsRange'
import FilterChoices from './filter/filter-choices/filterChoices'
import { FilterComponentMap } from './filtersTypes'

export const filterComponentMap: FilterComponentMap = {
    'number': FilterRange,
    'date': FilterRange,
    'rating': FilterStarsRange,
    'multiple_choice': FilterChoices,
    'single_choice': FilterChoices,
}