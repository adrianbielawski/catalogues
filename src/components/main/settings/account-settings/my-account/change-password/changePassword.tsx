import { useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './changePassword.module.scss'
// Redux
import {
  CHANGE_PASSWORD,
  TOGGLE_PASSWORD_EDIT,
} from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
// Components
import Button from 'components/global-components/button/button'
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import Input from 'components/global-components/input/input'

const cx = classNames.bind(styles)

const ChangePassword = () => {
  const dispatch = useAppDispatch()
  const authUser = useTypedSelector((state) => state.modules.authUser)
  const passwordInput = useRef<HTMLInputElement>(null)
  const repeatPasswordInput = useRef<HTMLInputElement>(null)
  const [arePasswordsValid, setArePasswordsValid] = useState(false)

  const handleEditPassword = () => {
    dispatch(TOGGLE_PASSWORD_EDIT(!authUser.isEditingPassword))
  }

  const validatePasswords = () => {
    const password = passwordInput.current
    const repeatPassword = repeatPasswordInput.current

    if (
      !password?.checkValidity() ||
      !repeatPassword?.checkValidity() ||
      password.value !== repeatPassword.value
    ) {
      setArePasswordsValid(false)
      return
    }

    setArePasswordsValid(true)
  }

  const handlePasswordChange = () => {
    dispatch(
      CHANGE_PASSWORD({
        password1: passwordInput.current!.value,
        password2: repeatPasswordInput.current!.value,
      }),
    )
  }

  const changePasswordClass = cx('changePassword', {
    active: authUser.isEditingPassword,
  })

  return (
    <div className={changePasswordClass}>
      <EditableFieldTitle
        title={'Password'}
        isEditing={authUser.isEditingPassword}
        onEdit={handleEditPassword}
      />
      {authUser.isEditingPassword && (
        <div className={styles.content}>
          <Input
            type="password"
            placeholder="password"
            ref={passwordInput}
            minLength={8}
            required
            onChange={validatePasswords}
          />
          <Input
            type="password"
            placeholder="repeat password"
            ref={repeatPasswordInput}
            minLength={8}
            required
            onChange={validatePasswords}
          />
          <Button disabled={!arePasswordsValid} onClick={handlePasswordChange}>
            Change password
          </Button>
        </div>
      )}
    </div>
  )
}

export default ChangePassword
