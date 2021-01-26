import React from 'react'
import styles from './itemFields.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Redux
import { itemFieldsSelector } from 'store/selectors'
import { useTypedSelector } from 'store/reducers'
//Custom components
import CollapsableList from 'components/global-components/collapsable-list/collapsableList'
import Field from './field/field'

type Props = {
    item: DeserializedItem
}

const ItemFields = (props: Props) => {
    const itemFields = useTypedSelector(itemFieldsSelector(props.item.catalogueId, props.item.id))
    const screenWidth = window.innerWidth
    const maxHeight = screenWidth <= 640 ? 25 : 73

    const itemsProps = { catalogueId: props.item.catalogueId }

    return (
        <CollapsableList >
            <div className={styles.itemFields}>
                <CollapsableList.List
                    items={itemFields}
                    itemsProps={itemsProps}
                    maxHeight={maxHeight}
                    itemComponent={Field}
                />
                <CollapsableList.Button />
            </div>
        </CollapsableList>
    )
}

export default ItemFields