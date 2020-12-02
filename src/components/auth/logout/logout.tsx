import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
//Redux
import { logOut } from 'store/actions/authActions'

interface Props {
  className?: string,
}

const Logout = (props: Props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logOut(history))
    }

    return (
        <p className={props.className} onClick={handleLogout}>
            Logout
        </p>
    )
}

export default Logout