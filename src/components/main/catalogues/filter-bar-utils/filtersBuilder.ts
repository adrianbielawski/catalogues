import moment from "moment"
import { DeserializedChoice, DeserializedChoiceField, DeserializedField, ItemsRanges } from "src/globalTypes"
import { Choice, FilterType } from "components/global-components/filters-bar/filters/filtersTypes"

const buildFilterChoice = (choice: DeserializedChoice): Choice => ({
    id: choice.value,
    value: choice.value,
})

const buildFilter = (field: DeserializedChoiceField): FilterType => ({
    id: field.filterName,
    title: field.name,
    type: field.type,
    choices: field.choices.map(buildFilterChoice),
    choicesSortDir: 'asc',
    searchValue: '',
})

const buildFilters = (fields: DeserializedField[], itemsRanges: ItemsRanges): FilterType[] => {
    const filteredFields = fields.filter(f =>
        (f.type === 'multiple_choice' || f.type === 'single_choice')
        && (f as DeserializedChoiceField).choices.length
    ) as DeserializedChoiceField[]

    return [
        {
            id: 'id',
            title: 'id',
            type: 'number',
            minVal: itemsRanges.id.min || '1',
            maxVal: itemsRanges.id.max || '9999999999',
        },
        {
            id: 'date',
            title: 'date',
            type: 'date',
            minVal: moment(itemsRanges.date.min || '2021-01-01').format('YYYY-MM-DD'),
            maxVal: moment().format('YYYY-MM-DD'),
        },
        ...filteredFields.map(buildFilter)
    ]
}

export default buildFilters