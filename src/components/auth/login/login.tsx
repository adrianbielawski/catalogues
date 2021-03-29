import React, { useRef, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import styles from './login.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { LocationState } from 'src/globalTypes'
import { LOG_IN } from 'store/slices/authSlices/authSlices'
//Custom Components
import Loader from 'components/global-components/loader/loader'
import Button from 'components/global-components/button/button'
import Input from 'components/global-components/input/input'


const Login = () => {
    const dispatch = useAppDispatch()
    const auth = useTypedSelector(state => state.auth)
    const [isValid, setIsValid] = useState(false);
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailInput.current!.value
        const password = passwordInput.current!.value

        dispatch(LOG_IN({ email, password, history, location }))
    }

    const validateInput = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isEmailValid = emailInput.current!.checkValidity()
        const isPasswordValid = passwordInput.current!.checkValidity()
        
        if (!isEmailValid || !isPasswordValid) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }

    const handleSignUp = () => {
        history.push('/signup')
    }

    if (auth.user) {
        return (
            <Redirect to={{
                pathname: `/${auth.user.username}`
            }} />
        )
    }

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit} onChange={validateInput}>
                <Input
                    type="email"
                    placeholder="e-mail"
                    ref={emailInput}
                    required
                />
                <Input
                    type="password"
                    placeholder="password"
                    ref={passwordInput}
                    minLength={8}
                    required
                />
                {auth.isLoggingIn
                    ? <Loader />
                    : <Button
                        type="submit"
                        disabled={!isValid}
                    >
                        Login
                    </Button>}
            </form>
            {!auth.isLoggingIn &&
                <p>
                    Don't have an account?
                    <span onClick={handleSignUp}>
                        Create new account here!
                    </span>
                </p>
            }
        </div>
    )
}

export default Login