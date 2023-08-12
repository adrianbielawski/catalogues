import { cloneDeep } from 'lodash'
// Types
import { type DeserializedItem } from 'src/globalTypes'
// Redux
import { useTypedSelector } from 'store/storeConfig'
// Components
import CollapsableList from 'components/global-components/collapsable-list/collapsableList'
import Field from './field/field'

interface Props {
  item: DeserializedItem
  isNarrow: boolean
  className?: string
}

const ItemFields = (props: Props) => {
  const fields = useTypedSelector((state) => state.entities.fields.entities)
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
