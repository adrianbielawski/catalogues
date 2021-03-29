import React from 'react'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Redux
import { itemFieldsSelector } from 'store/selectors'
import { useTypedSelector } from 'store/storeConfig'
//Custom components
import CollapsableList from 'components/global-components/collapsable-list/collapsableList'
import Field from './field/field'

type Props = {
    item: DeserializedItem,
    className?: string,
}

const ItemFields = (props: Props) => {
    const itemFields = useTypedSelector(itemFieldsSelector(props.item.id))
    const maxHeight = 55
    const itemsProps = { catalogueId: props.item.catalogueId }

    return (
        <div className={props.className}>
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
        </div>
    )
}

export default ItemFields