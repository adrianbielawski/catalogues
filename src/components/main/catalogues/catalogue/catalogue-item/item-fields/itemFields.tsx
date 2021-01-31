import React from 'react'
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
    const maxHeight = window.innerWidth <= 800 ? 55 : 95
    const itemsProps = { catalogueId: props.item.catalogueId }

    return (
        <CollapsableList >
            <>
                <CollapsableList.List
                    items={itemFields}
                    itemsProps={itemsProps}
                    maxHeight={maxHeight}
                    itemComponent={Field}
                />
                <CollapsableList.Button />
            </>
        </CollapsableList>
    )
}

export default ItemFields