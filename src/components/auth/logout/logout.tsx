import React from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames/bind'
import styles from './logout.scss'
//Redux
import { logOut } from 'store/actions/authActions'

interface Props {
  className?: string,
}
const cx = classNames.bind(styles)

const Logout = (props: Props) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(logOut())
  }

  const logoutClass = cx(
      'logout',
      props.className,
  )

  return (
    <p className={logoutClass} onClick={handleClick}>Logout</p>
  )
}

export default Logout