import { ButtonHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './addButton.module.scss'
import { useDelay } from 'src/hooks/useDelay'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Loader from '../loader/loader'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  loading?: boolean
  className?: string
  onClick: () => void
}

const cx = classNames.bind(styles)

const AddButton = ({ text, loading, className, onClick, ...rest }: Props) => {
  const delayCompleted = useDelay(loading)

  const buttonClass = cx('addButton', className)

  return (
    <TransparentButton
      className={buttonClass}
      disabled={loading}
      onClick={onClick}
      {...rest}
    >
      <>
        {delayCompleted ? (
          <Loader size={24} />
        ) : (
          <FontAwesomeIcon icon={faPlus} className={styles.plus} />
        )}
        {text ? <p>{text}</p> : null}
      </>
    </TransparentButton>
  )
}

export default AddButton
