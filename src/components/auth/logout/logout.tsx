import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from 'store/storeConfig'
//Redux
import { LOG_OUT } from 'store/slices/authSlices/authSlices'

interface Props {
  className?: string,
}

const Logout = (props: Props) => {
    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(LOG_OUT({ history }))
    }

    return (
        <p className={props.className} onClick={handleLogout}>
            Logout
        </p>
    )
}

export default Logout