import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import { CLEAR_LOGOUT_ERROR, LOG_OUT } from 'store/slices/authSlices/authSlices'
//Components
import MessageModal from 'components/global-components/message-modal/messageModal'

interface Props {
    className?: string,
}

const Logout = (props: Props) => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const auth = useTypedSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(LOG_OUT({ history }))
    }

    const clearError = () => {
        dispatch(CLEAR_LOGOUT_ERROR())
    }

    return (
        <>
            <p className={props.className} onClick={handleLogout}>
                Logout
            </p>
            <MessageModal
                show={auth.logOutError.length !== 0}
                title="Login error"
                message={auth.logOutError}
                onConfirm={clearError}
            />
        </>
    )
}

export default Logout