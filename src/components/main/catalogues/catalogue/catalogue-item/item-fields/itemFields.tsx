import React from 'react'
import styles from './itemFields.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import CollapsableList from 'components/global-components/collapsable-list/collapsableList'
import Field from './field/field'

type Props = {
    item: DeserializedItem
}

type Field = {
    title: string | number,
    value: string | number,
}

const ItemFields = (props: Props) => {
    const FIELDS: Field[] = [
        {
            title: 'Id',
            value: props.item.id,
        },
        {
            title: 'Name',
            value: props.item.name,
        },
        {
            title: 'Iddd',
            value: props.item.id,
        },
        {
            title: 'Nnnn',
            value: props.item.name,
        },
        {
            title: 'Iddd',
            value: props.item.id,
        },
        {
            title: 'Nnnn',
            value: props.item.name,
        },
    ]

    return (
        <CollapsableList >
            <div className={styles.itemFields}>
                <CollapsableList.List items={FIELDS} maxHeight={73} itemComponent={Field} />
                <CollapsableList.Button />
            </div>
        </CollapsableList>
    )
}

export default ItemFields