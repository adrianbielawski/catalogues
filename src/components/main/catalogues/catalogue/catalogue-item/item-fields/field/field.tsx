import React from 'react'
import styles from './field.scss'
//Types
import { DeserializedItemField } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { fieldSelector, fieldChoicesSelector } from 'store/selectors'

type Props = {
    item: DeserializedItemField,
}

const Field = (props: Props) => {
    const field = useTypedSelector(fieldSelector(props.item.fieldId))
    const fieldChoices = useTypedSelector(fieldChoicesSelector(field.id))

    let value = props.item.value

    if (field.type === 'multiple_choice') {
        if (value === null) {
            return null
        }
        const values = (value as number[]).map(id =>
            fieldChoices.find(c => c.id === id)?.value
        )
        value = values.join(', ')
    }

    if (field.type === 'single_choice') {
        value = fieldChoices.find(f => f.id === value)?.value || ''
    }

    return (
        <p className={styles.field}>
            <span className={styles.name}>{field.name}:</span>
            <span>{value}</span>
        </p>
    )
}

export default Field