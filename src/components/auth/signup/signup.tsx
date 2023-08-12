import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import styles from './signup.module.scss'
// Types
import { LocationState } from 'src/globalTypes'
// Redux
import {
  CLEAR_SIGNUP_MESSAGE,
  SIGN_UP,
  VALIDATE_USERNAME,
} from 'store/modules/auth-user/slice'
import { usersSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
// Custom hooks and utils
import { useDebouncedDispatch } from 'src/hooks/useDebouncedDispatch'
import { mergeRefs } from 'src/utils'
// Custom Components
import Loader from 'components/global-components/loader/loader'
import Button from 'components/global-components/button/button'
import Input from 'components/global-components/input/input'
import MessageModal from 'components/global-components/message-modal/messageModal'

const Signup = () => {
  const dispatch = useAppDispatch()
  const history = useHistory<LocationState>()
  const users = useTypedSelector(usersSelector())
  const authUser = useTypedSelector((state) => state.modules.authUser)
  const usernameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const repeatPasswordInput = useRef<HTMLInputElement>(null)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (authUser.id) {
      return
    }
    validateUserInput()
  }, [authUser.invalidUsernameMessage])

  const validateUsername = () => {
    return usernameInput.current!.checkValidity()
  }

  const usernameDebounceRef = useDebouncedDispatch(
    (username) => VALIDATE_USERNAME(username),
    300,
    validateUsername,
  )

  const validateUserInput = () => {
    const isUserNameValid = usernameInput.current!.checkValidity()
    const isEmailValid = emailInput.current!.checkValidity()
    const isPasswordValid = passwordInput.current!.checkValidity()
    const isRepeatPasswordValid = passwordInput.current!.checkValidity()

    if (
      !isUserNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isRepeatPasswordValid ||
      authUser.invalidUsernameMessage.length !== 0
    ) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const password = passwordInput.current!.value
    const repeatedPassword = repeatPasswordInput.current!.value
    const userName = usernameInput.current!.value
    const email = emailInput.current!.value

    dispatch(
      SIGN_UP({
        userName,
        email,
        password,
        repeatedPassword,
        history,
      }),
    )
  }

  const clearError = () => {
    dispatch(CLEAR_SIGNUP_MESSAGE())
    history.push('/')
  }

  if (authUser.id !== null) {
    return (
      <Redirect
        to={{
          pathname: `/${users[authUser.id]!.username}`,
        }}
      />
    )
  }

  return (
    <div className={styles.signup}>
      <form onSubmit={handleSubmit} onChange={validateUserInput}>
        <Input
          placeholder="user name"
          ref={mergeRefs([usernameDebounceRef, usernameInput])}
          minLength={2}
          required
          invalidInputMessage={authUser.invalidUsernameMessage}
        />
        <Input type="email" placeholder="e-mail" ref={emailInput} required />
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
        {authUser.isSigningUp ? (
          <Loader />
        ) : (
          <Button type="submit" disabled={!isValid}>
            Create account
          </Button>
        )}
      </form>
      <MessageModal
        show={authUser.signUpMessage !== null}
        title={authUser.signUpMessage?.title}
        message={authUser.signUpMessage?.message ?? ''}
        onConfirm={clearError}
      />
    </div>
  )
}

export default Signup
