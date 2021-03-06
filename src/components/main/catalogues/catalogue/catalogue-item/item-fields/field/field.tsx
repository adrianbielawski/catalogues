import React from 'react'
import styles from './field.scss'
//Global types
import { DeserializedItemField, DeserializedChoiceField } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { fieldSelector } from 'store/selectors'

type Props = {
    item: DeserializedItemField,
    itemProps: {
        catalogueId: number,
    },
}

const Field = (props: Props) => {
    const field = useTypedSelector(fieldSelector(props.itemProps.catalogueId, props.item.fieldId))

    let value = props.item.value

    if (field.type === 'multiple_choice') {
        const values = (value as number[]).map(id =>
            (field as DeserializedChoiceField).choices.find(c => c.id === id)?.value
        )
        value = values.join(', ')
    }

    if (field.type === 'single_choice') {
        value = (field as DeserializedChoiceField).choices.find(f => f.id === value)?.value || ''
    }

    return (
        <p className={styles.field}>
            <span className={styles.name}>{field.name}:</span>
            <span>{value}</span>
        </p>
    )
}

export default Field