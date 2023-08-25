import { cloneDeep } from 'lodash'
import { type DeserializedItem } from 'src/globalTypes'
import CollapsableList from 'components/global-components/collapsable-list/collapsableList'
import Field from './field/field'
import { useEntitiesSelector } from 'store/entities/hooks'

interface Props {
  item: DeserializedItem
  isNarrow: boolean
  className?: string
}

const ItemFields = (props: Props) => {
  const fields = useEntitiesSelector('fields')
  const maxHeight = props.isNarrow ? 55 : 106

  const items = cloneDeep(props.item.fieldsValues).sort(
    (a, b) => fields[a.fieldId]!.position - fields[b.fieldId]!.position,
  )

  return (
    <div className={props.className}>
      <CollapsableList>
        <CollapsableList.List
          items={items}
          maxHeight={maxHeight}
          itemComponent={Field}
        />
        <CollapsableList.Button />
      </CollapsableList>
    </div>
  )
}

export default ItemFields
