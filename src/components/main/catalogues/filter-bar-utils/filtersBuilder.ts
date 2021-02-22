import moment from "moment"
import { DeserializedChoice, DeserializedChoiceField, DeserializedField } from "src/globalTypes"
import { Choice, FilterType } from "../catalogue/filters-bar/filters/filtersTypes"

const buildFilterChoice = (choice: DeserializedChoice): Choice => ({
    id: choice.value,
    title: choice.value,
})

const buildFilter = (field: DeserializedChoiceField): FilterType => ({
    id: field.filterName,
    title: field.name,
    type: field.type,
    choices: field.choices.map(buildFilterChoice)
})

const buildFilters = (fields: DeserializedField[]): FilterType[] => {
    const filteredFields = fields.filter(f =>
        (f.type === 'multiple_choice' || f.type === 'single_choice')
        && (f as DeserializedChoiceField).choices.length
    ) as DeserializedChoiceField[]

    return [
        {
            id: 'id',
            title: 'id',
            type: 'number',
            minVal: '1',
            maxVal: '9999999999',
        },
        {
            id: 'date',
            title: 'date',
            type: 'date',
            minVal: '2020-01-01',
            maxVal: moment().format('YYYY-MM-DD'),
        },
        ...filteredFields.map(buildFilter)
    ]
}

export default buildFilters