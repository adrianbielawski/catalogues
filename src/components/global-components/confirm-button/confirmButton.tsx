import { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './confirmButton.module.scss'
import Loader from 'components/global-components/loader/loader'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props {
  loading?: boolean
  size: number
  className?: string
  disabled?: boolean
  onClick: () => void
}

const cx = classNames.bind(styles)

const ConfirmButton = (props: Props) => {
  const { loading, size, className, onClick, ...rest } = props

  const confirmButtonClass = cx('buttonWrapper', className)

  const buttonClass = cx('button', {
    disabled: props.disabled,
  })

  return (
    <div
      className={confirmButtonClass}
      style={
        {
          '--size': `${size}px`,
        } as CSSProperties
      }
    >
      {!loading ? (
        <TransparentButton className={buttonClass} onClick={onClick} {...rest}>
          <FontAwesomeIcon icon={faCheck} />
        </TransparentButton>
      ) : (
        <Loader size={size} />
      )}
    </div>
  )
}

export default ConfirmButton
