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

type Props = {
    item: DeserializedItem,
    fieldsData: AuthUserFieldData[],
}

const EditItemFields = (props: Props) => {
    const fields = useTypedSelector(state => state.entities.fields.entities)

    const fieldsComponents = props.fieldsData.map(fieldData => {
        const field = fields[fieldData.id]!
        const fieldValue = props.item.fieldsValues.filter(v => v.fieldId === field.id)[0]

        switch (field.type) {
            case 'short_text':
                return (
                    <li key={field.id}>
                        <TextField
                            itemId={props.item.id}
                            field={field}
                            fieldValue={fieldValue}
                        />
                    </li>
                )
            case 'long_text':
                return (
                    <li key={field.id}>
                        <LongTextField
                            itemId={props.item.id}
                            field={field}
                            fieldValue={fieldValue}
                        />
                    </li>
                )
            case 'single_choice':
                return (
                    <li key={field.id}>
                        <SingleChoiceField
                            itemId={props.item.id}
                            field={field}
                            fieldValue={fieldValue}
                            fieldData={fieldData as AuthUserChoiceFieldData}
                        />
                    </li>
                )
            case 'multiple_choice':
                return (
                    <li key={field.id}>
                        <MultipleChoiceField
                            itemId={props.item.id}
                            field={field}
                            fieldValue={fieldValue}
                            fieldData={fieldData as AuthUserChoiceFieldData}
                        />
                    </li>
                )
        }
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