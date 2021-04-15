import React from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { currentUserFieldsDataSelector } from 'store/selectors'
//Components
import TextField from './text-field/textField'
import LongTextField from './long-text-field/longTextField'
import SingleChoiceField from './single-choice-field/singleChoiceField'
import MultipleChoiceField from './multiple-choice-field/multipleChoiceField'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'

type Props = {
    item: DeserializedItem,
}

const EditItemFields = (props: Props) => {
    const fields = useTypedSelector(state => state.entities.fields.entities)
    const authUserFields = useTypedSelector(currentUserFieldsDataSelector(props.item.catalogueId))

    const fieldsComponents = authUserFields.map(fieldData => {
        const field = fields[fieldData.id]!
        const fieldValue = props.item.fieldsValues.filter(v => v.fieldId === field.id)[0]

        switch (field.type) {
            case 'short_text':
                return (
                    <TextField
                        itemId={props.item.id}
                        field={field}
                        fieldValue={fieldValue}
                        key={field.id}
                    />
                )
            case 'long_text':
                return (
                    <LongTextField
                        itemId={props.item.id}
                        field={field}
                        fieldValue={fieldValue}
                        key={field.id}
                    />
                )
            case 'single_choice':
                return (
                    <SingleChoiceField
                        itemId={props.item.id}
                        field={field}
                        fieldValue={fieldValue}
                        key={field.id}
                    />
                )
            case 'multiple_choice':
                return (
                    <MultipleChoiceField
                        itemId={props.item.id}
                        field={field}
                        fieldValue={fieldValue}
                        key={field.id}
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
                {fieldsComponents}
            </ul>
        </IconWithTitle>
    )
}

export default EditItemFields