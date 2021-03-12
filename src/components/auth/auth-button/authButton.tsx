import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import { CLEAR_LOGOUT_ERROR, LOG_OUT } from 'store/slices/authSlices/authSlices'
//Components
import MessageModal from 'components/global-components/message-modal/messageModal'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props {
    className?: string,
}

const AuthButton = (props: Props) => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const auth = useTypedSelector(state => state.auth)

    const handleClick = () => {
        if (auth.user === null) {
            history.push('/')
        } else {
            dispatch(LOG_OUT({ history }))
        }
    }

    const clearError = () => {
        dispatch(CLEAR_LOGOUT_ERROR())
    }

    return (
        <>
            <TransparentButton className={props.className} onClick={handleClick}>
                {auth.user === null ? 'Login' : 'Logout'}
            </TransparentButton>
            <MessageModal
                show={auth.logOutError.length !== 0}
                title="Logout error"
                message={auth.logOutError}
                onConfirm={clearError}
            />
        </>
    )
}

export default AuthButton