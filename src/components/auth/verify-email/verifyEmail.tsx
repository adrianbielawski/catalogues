import React, { useEffect } from 'react'
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom'
import styles from './verifyEmail.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { VERIFY_EMAIL, CLEAR_VERIFY_EMAIL_ERROR } from 'store/slices/authSlices/authSlices'
//Custom Components
import Loader from 'components/global-components/loader/loader'
import Button from 'components/global-components/button/button'

interface Params {
    key: string,
}

const VerifyEmail = (props: RouteComponentProps<Params>) => {
    const location = useLocation<LocationState>()
    const history = useHistory<LocationState>()
    const dispatch = useAppDispatch()
    const auth = useTypedSelector(state => state.auth)

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

    if (auth.verifyEmailError.length) {
        return (
            <div className={styles.verifyEmail}>
                <p className={styles.title}>Email verification failed</p>
                <p>{auth.verifyEmailError}</p>
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