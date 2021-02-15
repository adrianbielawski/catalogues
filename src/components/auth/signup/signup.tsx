import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './signup.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/reducers/index'
import { SIGN_UP } from 'store/slices/authSlices/authSlices'
//Custom Components
import Loader from 'components/global-components/loader/loader'
import Button from 'components/global-components/button/button'
import Input from 'components/global-components/input/input'

const Signup = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const userNameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)
    const repeatPasswordInput = useRef<HTMLInputElement>(null)
    const isSigningUp = useTypedSelector(state => state.auth.isSigningUp)
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

    return (
        <div className={styles.signup}>
            <form onSubmit={handleSubmit} onChange={validateUserInput}>
                <Input placeholder="user name" ref={userNameInput} minLength={2} required />
                <Input type="email" placeholder="e-mail" ref={emailInput} required />
                <Input type="password" placeholder="password" ref={passwordInput} minLength={8} required />
                <Input type="password" placeholder="repeat password" ref={repeatPasswordInput} minLength={8} required />
                {isSigningUp ? <Loader /> : <Button type="submit" disabled={!isValid}>Create account</Button>}
            </form>
        </div>
    );
}

export default Signup