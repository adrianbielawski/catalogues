import React from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
//Types
import { AuthUserChoiceFieldData, AuthUserFieldData, DeserializedItem } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Components
import TextField from './text-field/textField'
import LongTextField from './long-text-field/longTextField'
import SingleChoiceField from './single-choice-field/singleChoiceField'
import MultipleChoiceField from './multiple-choice-field/multipleChoiceField'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'
import DateField from './date-field/dateField'

type Props = {
    item: DeserializedItem,
    fieldsData: AuthUserFieldData[],
}

const EditItemFields = (props: Props) => {
    const fields = useTypedSelector(state => state.entities.fields.entities)

    const fieldsComponents = props.fieldsData.map(fieldData => {
        const field = fields[fieldData.id]!
        const fieldValue = props.item.fieldsValues.filter(v => v.fieldId === field.id)[0]

        let fieldComponent
        const fieldProps = {
            itemId: props.item.id,
            field,
            fieldValue
        }

        switch (field.type) {
            case 'short_text':
                fieldComponent = <TextField {...fieldProps} />
                break
            case 'long_text':
                fieldComponent = <LongTextField {...fieldProps} />
                break
            case 'date':
                fieldComponent = <DateField {...fieldProps} />
                break
            case 'single_choice':
                fieldComponent = (
                    <SingleChoiceField
                        {...fieldProps}
                        fieldData={fieldData as AuthUserChoiceFieldData}
                    />
                )
                break
            case 'multiple_choice':
                fieldComponent = (
                    <MultipleChoiceField
                        {...fieldProps}
                        fieldData={fieldData as AuthUserChoiceFieldData}
                    />
                )
                break
        }

        return (
            <li key={field.id}>
                {fieldComponent}
            </li>
        )
    })

    return (
        <IconWithTitle
            title={'Item fields'}
            icon={faListAlt}
        >
            <ul>
                {fieldsComponents}
            </ul>
        </IconWithTitle>
    )
}

export default EditItemFields