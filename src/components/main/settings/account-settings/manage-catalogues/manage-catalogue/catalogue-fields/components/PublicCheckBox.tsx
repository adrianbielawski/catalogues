import { CHANGE_FIELD_PUBLIC } from 'store/modules/auth-user-catalogues/slice'
import { useAppDispatch } from 'store/storeConfig'
import { DeserializedField } from 'src/globalTypes'
import CheckBoxWithTitle from 'components/global-components/check-box-with-title/checkBoxWithTitle'

interface Props {
  field: DeserializedField
}

const PublicCheckBox = ({ field }: Props) => {
  const dispatch = useAppDispatch()

  const handlePublicChange = () => {
    dispatch(
      CHANGE_FIELD_PUBLIC({
        fieldId: field.id,
        catalogueId: field.catalogueId,
        public: !field.public,
      }),
    )
  }

  return (
    <CheckBoxWithTitle
      id="public"
      title="Public"
      selected={field.public}
      onChange={handlePublicChange}
    />
  )
}

export default PublicCheckBox
