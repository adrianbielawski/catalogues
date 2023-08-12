import { type Dictionary } from '@reduxjs/toolkit'
import moment from 'moment'
import {
  type CurrentUserChoiceFieldData,
  type CurrentUserFieldData,
  type DeserializedChoice,
  type DeserializedField,
  type ItemsRanges,
} from 'src/globalTypes'
import {
  type Choice,
  type FilterType,
} from 'components/global-components/filters-bar/filters/filtersTypes'

const buildFilterChoice = (choice: DeserializedChoice): Choice => ({
  id: choice.value,
  value: choice.value,
})

const buildFilter = (
  field: DeserializedField,
  fieldsChoices: Dictionary<DeserializedChoice>,
): FilterType => {
  const choices = Object.values(fieldsChoices).filter(
    (choice) => choice!.fieldId === field.id,
  ) as DeserializedChoice[]

  return {
    id: field.filterName,
    title: field.name,
    type: field.type,
    choices: choices.map(buildFilterChoice),
    choicesSortDir: 'asc',
    searchValue: '',
  }
}

const buildFilters = (
  fieldsData: CurrentUserFieldData[],
  itemsRanges: ItemsRanges,
  catalogueFields: DeserializedField[],
  fieldsChoices: Dictionary<DeserializedChoice>,
): FilterType[] => {
  const filteredFields = catalogueFields.filter(
    (f) =>
      (f.type === 'multiple_choice' || f.type === 'single_choice') &&
      (fieldsData.find((d) => d.id === f.id) as CurrentUserChoiceFieldData)
        .choices?.length,
  )

  return [
    {
      id: 'date',
      title: 'date',
      type: 'date',
      minVal: moment(itemsRanges.date.min || '2021-01-01').format('YYYY-MM-DD'),
      maxVal: moment().format('YYYY-MM-DD'),
    },
    {
      id: 'rating',
      title: 'rating',
      type: 'rating',
      minVal: 1,
      maxVal: 5,
    },
    ...filteredFields.map((f) => buildFilter(f, fieldsChoices)),
  ]
}

export default buildFilters
