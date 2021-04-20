import React from 'react'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Components
import CollapsableList from 'components/global-components/collapsable-list/collapsableList'
import Field from './field/field'

type Props = {
    item: DeserializedItem,
    isNarrow: boolean,
    className?: string,
}

const ItemFields = (props: Props) => {
    const maxHeight = props.isNarrow ? 55 : 106
    const itemsProps = { catalogueId: props.item.catalogueId }

    return (
        <div className={props.className}>
            <CollapsableList >
                <CollapsableList.List
                    items={props.item.fieldsValues}
                    itemsProps={itemsProps}
                    maxHeight={maxHeight}
                    itemComponent={Field}
                />
                <CollapsableList.Button />
            </CollapsableList>
        </div>
    )
}

export default ItemFields