import React, { useRef } from 'react'
import styles from './field.scss'
//Global types
import { DeserializedItemField } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/reducers'
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
        let val = value as string[]
        value = val.join(', ')
    }

    return (
        <p className={styles.field}>
            <span className={styles.name}>{field.name}:</span>
            <span>{value}</span>
        </p>
    )
}

export default Field