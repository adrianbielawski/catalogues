import React from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
//Types
import { DeserializedChoiceField, DeserializedField, DeserializedItem } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { fieldsSelector, itemFieldsSelector } from 'store/selectors'
//Custom components
import TextField from './text-field/textField'
import LongTextField from './long-text-field/longTextField'
import SingleChoiceField from './single-choice-field/singleChoiceField'
import MultipleChoiceField from './multiple-choice-field/multipleChoiceField'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'

type Props = {
    item: DeserializedItem,
}

const EditItemFields = (props: Props) => {
    const catalogueFields = useTypedSelector(fieldsSelector(props.item.catalogueId))
    const fieldsValues = useTypedSelector(itemFieldsSelector(props.item.id))

    const fields = catalogueFields.map(field => {
        const fieldValue = fieldsValues.filter(v => v.fieldId === field.id)[0]

        switch (field.type) {
            case 'short_text':
                let shortTextField = field as DeserializedField
                return (
                    <TextField
                        itemId={props.item.id}
                        field={shortTextField}
                        fieldValue={fieldValue}
                        key={shortTextField.id}
                    />
                )
            case 'long_text':
                let longTextField = field as DeserializedField
                return (
                    <LongTextField
                        itemId={props.item.id}
                        field={longTextField}
                        fieldValue={fieldValue}
                        key={longTextField.id}
                    />
                )
            case 'single_choice':
                let singleChoiceField = field as DeserializedChoiceField
                return (
                    <SingleChoiceField
                        itemId={props.item.id}
                        field={singleChoiceField}
                        fieldValue={fieldValue}
                        key={singleChoiceField.id}
                    />
                )
            case 'multiple_choice':
                let multipleChoiceField = field as DeserializedChoiceField
                return (
                    <MultipleChoiceField
                        itemId={props.item.id}
                        field={multipleChoiceField}
                        fieldValue={fieldValue}
                        key={multipleChoiceField.id}
                    />
                )
        }
    })

    return (
        <IconWithTitle
            title={'Item fields'}
            icon={faListAlt}
        >
            <ul>
                {fields}
            </ul>
        </IconWithTitle>
    )
}

export default EditItemFields