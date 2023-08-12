import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './editItemButton.module.scss'
// Components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props {
  itemId: number
  onClick: () => void
}

const EditItemButton = (props: Props) => {
  return (
    <TransparentButton className={styles.editButton} onClick={props.onClick}>
      <FontAwesomeIcon icon={faEdit} />
    </TransparentButton>
  )
}

export default EditItemButton
