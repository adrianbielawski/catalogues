import React from 'react'
import styles from './field.scss'
//Types
import { DeserializedGeoField, DeserializedItemField, DeserializedItemFieldValue, DeserializedMediaFieldValue } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { fieldSelector, fieldChoicesSelector } from 'store/selectors'
//Components
import MediaFieldValue from '../media-field-value/mediaFieldValue'

type Props = {
    item: DeserializedItemField<DeserializedItemFieldValue>,
}

const Field = (props: Props) => {
    const field = useTypedSelector(fieldSelector(props.item.fieldId))
    const fieldChoices = useTypedSelector(fieldChoicesSelector(field.id))

    let value = props.item.value
    let valueComponent = <p>{value}</p>

    if (field.type === 'multiple_choice') {
        if (value === null) {
            return null
        }
        const values = (value as number[]).map(id =>
            fieldChoices.find(c => c.id === id)?.value
        )
        const displayedValue = values.join(', ')
        valueComponent = <p>{displayedValue}</p>
    }

    if (field.type === 'single_choice') {
        const displayedValue = fieldChoices.find(f => f.id === value)?.value || ''
        valueComponent = <p>{displayedValue}</p>
    }

    if (field.type === 'media') {
        valueComponent = (
            <MediaFieldValue
                fieldValue={value as DeserializedMediaFieldValue}
            />
        )
    }

    if (field.type === 'geo_point') {
        const address = (value as DeserializedGeoField).address
        const displayedValue = address
            ? `${address.displayName || 'unknown address'}`
            : null

        valueComponent = <p>{displayedValue}</p>
    }

    return (
        <div className={styles.field}>
            <p className={styles.name}>
                {field.name}:
            </p>
            <div className={styles.value}>
                {valueComponent}
            </div>
        </div>
    )
}

export default Field