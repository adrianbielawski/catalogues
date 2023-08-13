import { ReactNode, ButtonHTMLAttributes, MouseEvent } from 'react'
import classNames from 'classnames/bind'
import styles from './transparentButton.module.scss'
import Loader from '../loader/loader'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  className?: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const cx = classNames.bind(styles)

const TransparentButton = (props: Props) => {
  const { className, loading, onClick, ...rest } = props
  const transparentButtonClass = cx('transparentButton', className)

  return (
    <button className={transparentButtonClass} onClick={onClick} {...rest}>
      {loading ? <Loader size={25} /> : props.children}
    </button>
  )
}

export default TransparentButton
