import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from './AddButton.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

type Props = {
    onClick: () => void,
}

const AddButton = (props: Props) => {
    return (
        <TransparentButton className={styles.addButton} onClick={props.onClick}>
            <>
                <FontAwesomeIcon icon={faPlus} className={styles.plus} />
                <p>Add image</p>
            </>
        </TransparentButton>
    )
}

export default AddButton