import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './signup.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { SIGN_UP, CLEAR_SIGNUP_ERROR } from 'store/slices/authSlices/authSlices'
//Custom Components
import Loader from 'components/global-components/loader/loader'
import Button from 'components/global-components/button/button'
import Input from 'components/global-components/input/input'
import MessageModal from 'components/global-components/message-modal/messageModal'

const Signup = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const userNameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)
    const repeatPasswordInput = useRef<HTMLInputElement>(null)
    const auth = useTypedSelector(state => state.auth)
    const [isValid, setIsValid] = useState(false)

    const validateUserInput = () => {
        const isUserNameValid = userNameInput.current!.checkValidity()
        const isEmailValid = emailInput.current!.checkValidity()
        const isPasswordValid = passwordInput.current!.checkValidity()
        const isRepeatPasswordValid = passwordInput.current!.checkValidity()

        if (!isUserNameValid || !isEmailValid || !isPasswordValid || !isRepeatPasswordValid) {
            setIsValid(false)
            return
        } else {
            setIsValid(true)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const password = passwordInput.current!.value
        const repeatedPassword = repeatPasswordInput.current!.value
        const userName = userNameInput.current!.value
        const email = emailInput.current!.value

        dispatch(SIGN_UP({
            userName,
            email,
            password,
            repeatedPassword,
            history
        }))
    }

    const clearError = () => {
        dispatch(CLEAR_SIGNUP_ERROR())
    }

    return (
        <div className={styles.signup}>
            <form onSubmit={handleSubmit} onChange={validateUserInput}>
                <Input
                    placeholder="user name"
                    ref={userNameInput}
                    minLength={2}
                    required
                />
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
                <Input
                    type="password"
                    placeholder="repeat password"
                    ref={repeatPasswordInput}
                    minLength={8}
                    required
                />
                {auth.isSigningUp
                    ? <Loader />
                    : <Button
                        type="submit"
                        disabled={!isValid}
                    >
                        Create account
                    </Button>
                }
            </form>
            <MessageModal
                show={auth.signUpError.length !== 0}
                title="Signup error"
                message={auth.signUpError}
                onConfirm={clearError}
            />
        </div>
    );
}

export default Signup