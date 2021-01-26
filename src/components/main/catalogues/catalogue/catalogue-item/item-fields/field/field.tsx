import React from 'react'
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
    }
}

const Field = (props: Props) => {
    const field = useTypedSelector(fieldSelector(props.itemProps.catalogueId, props.item.fieldId))

    return (
        <div className={styles.field}>
            <div>{field.name}: </div>
            <div className={styles.value}>{props.item.value}</div>
        </div>
    )
}

export default Field