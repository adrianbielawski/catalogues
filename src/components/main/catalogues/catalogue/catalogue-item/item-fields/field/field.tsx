import React from 'react'
import classNames from 'classnames/bind'
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
    isShowingAllItems: boolean,
}

const cx = classNames.bind(styles)

const Field = (props: Props) => {
    const field = useTypedSelector(fieldSelector(props.itemProps.catalogueId, props.item.fieldId))

    let value = props.item.value

    if (field.type === 'multiple_choice') {
        let val = props.item.value as string[]
        value = val.join(', ')
    }

    const fieldClass = cx(
        'field',
        {
            collapsed: !props.isShowingAllItems
        }
    )

    return (
        <p className={fieldClass}>
            <span className={styles.name}>{field.name}:</span>
            <span>{value}</span>
        </p>
    )
}

export default Field