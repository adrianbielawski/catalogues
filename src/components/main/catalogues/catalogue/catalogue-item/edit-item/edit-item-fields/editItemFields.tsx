import React from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
//Types
import {
    AuthUserChoiceFieldData, AuthUserFieldData, DeserializedGeoField, DeserializedItem, DeserializedItemField,
    DeserializedMediaFieldValue,
} from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Components
import TextField from './text-field/textField'
import LongTextField from './long-text-field/longTextField'
import SingleChoiceField from './single-choice-field/singleChoiceField'
import MultipleChoiceField from './multiple-choice-field/multipleChoiceField'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'
import DateField from './date-field/dateField'
import MediaField from './media-field/mediaField'
import GeoField from './geo-field/geoField'

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
        }

        switch (field.type) {
            case 'short_text':
                fieldComponent = (
                    <TextField
                        {...fieldProps}
                        fieldValue={fieldValue as DeserializedItemField<string>}
                    />
                )
                break
            case 'long_text':
                fieldComponent = (
                    <LongTextField
                        {...fieldProps}
                        fieldValue={fieldValue as DeserializedItemField<string>}
                    />
                )
                break
            case 'date':
                fieldComponent = (
                    <DateField
                        {...fieldProps}
                        fieldValue={fieldValue as DeserializedItemField<string>}
                    />
                )
                break
            case 'media':
                fieldComponent = (
                    <MediaField
                        {...fieldProps}
                        fieldValue={fieldValue as DeserializedItemField<DeserializedMediaFieldValue>}
                    />
                )
                break
            case 'geo_point':
                fieldComponent = (
                    <GeoField
                        {...fieldProps}
                        fieldValue={fieldValue?.value as DeserializedGeoField}
                    />
                )
                break
            case 'single_choice':
                fieldComponent = (
                    <SingleChoiceField
                        {...fieldProps}
                        fieldValue={fieldValue as DeserializedItemField<number | null>}
                        fieldData={fieldData as AuthUserChoiceFieldData}
                    />
                )
                break
            case 'multiple_choice':
                fieldComponent = (
                    <MultipleChoiceField
                        {...fieldProps}
                        fieldValue={fieldValue as DeserializedItemField<number[] | null>}
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