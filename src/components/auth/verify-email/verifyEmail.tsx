import React, { useEffect } from 'react'
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom'
import styles from './verifyEmail.module.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import { CLEAR_VERIFY_EMAIL_ERROR, VERIFY_EMAIL } from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom Components
import Loader from 'components/global-components/loader/loader'
import Button from 'components/global-components/button/button'

interface Params {
    key: string,
}

const VerifyEmail = (props: RouteComponentProps<Params>) => {
    const dispatch = useAppDispatch()
    const location = useLocation<LocationState>()
    const history = useHistory<LocationState>()
    const authUser = useTypedSelector(state => state.modules.authUser)

    useEffect(() => {
        dispatch(VERIFY_EMAIL({
            key: props.match.params.key!,
            history,
            location,
        }))
    }, [])

    const resendEmail = () => {

    }

    const redirectToLogin = () => {
        dispatch(CLEAR_VERIFY_EMAIL_ERROR())
        history.push('/login')
    }

    if (authUser.verifyEmailError.length) {
        return (
            <div className={styles.verifyEmail}>
                <p className={styles.title}>Email verification failed</p>
                <p>{authUser.verifyEmailError}</p>
                <div className={styles.buttons}>
                    <Button onClick={resendEmail}>
                        Resend email
                    </Button>
                    <p>or</p>
                    <Button onClick={redirectToLogin}>
                        Login
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.verifyEmail}>
            <p className={styles.title}>Verifying your email address</p>
            <p>Please wait ...</p>
            <Loader className={styles.loader} />
        </div>
    );
}

export default VerifyEmail