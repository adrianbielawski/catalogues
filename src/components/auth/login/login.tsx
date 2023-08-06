import React, { useRef, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import styles from './login.module.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import { LOG_IN } from 'store/modules/auth-user/slice'
import { usersSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import Loader from 'components/global-components/loader/loader'
import Button from 'components/global-components/button/button'
import Input from 'components/global-components/input/input'


const Login = () => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const users = useTypedSelector(usersSelector())
    const authUser = useTypedSelector(state => state.modules.authUser)
    const [isValid, setIsValid] = useState(false)
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

    if (authUser.id) {
        return (
            <Redirect to={{
                pathname: `/${users[authUser.id]!.username}`
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
                {authUser.isLoggingIn
                    ? <Loader />
                    : <Button
                        type="submit"
                        disabled={!isValid}
                    >
                        Login
                    </Button>}
            </form>
            {!authUser.isLoggingIn &&
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