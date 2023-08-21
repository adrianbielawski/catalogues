import { useDebouncedDispatch } from 'src/hooks/useDebouncedDispatch'
import { useDelay } from 'src/hooks/useDelay'
import {
  CHANGE_USERNAME,
  TOGGLE_USERNAME_EDIT,
  VALIDATE_USERNAME,
} from 'store/modules/auth-user/slice'
import { userSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import EditableField from 'components/global-components/editable-field/editableField'
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import { useLocation, useNavigate } from 'react-router-dom'

const ChangeUsername = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const authUser = useTypedSelector((state) => state.modules.authUser)
  const user = useTypedSelector(userSelector(authUser.id!))!

  const delayCompleted = useDelay(authUser.isSubmittingUsername)

  const handleEditUsername = () => {
    dispatch(TOGGLE_USERNAME_EDIT(!authUser.isEditingUsername))
  }

  const validateUsername = (username: string) => {
    if (username.toLowerCase() === user.username.toLowerCase()) {
      return false
    }
    return true
  }

  const usernameInputRef = useDebouncedDispatch(
    (username) => VALIDATE_USERNAME(username),
    200,
    validateUsername,
  )

  const handleUsernameConfirm = (username: string) => {
    dispatch(
      CHANGE_USERNAME({
        name: username,
        location,
        navigate,
      }),
    )
  }

  const inputAttributes = {
    defaultValue: user.username,
  }

  const content = authUser.isEditingUsername ? (
    <InputWithConfirmButton
      loading={delayCompleted}
      {...inputAttributes}
      buttonProps={{ disabled: authUser.invalidUsernameMessage?.length !== 0 }}
      invalidInputMessage={authUser.invalidUsernameMessage}
      onConfirm={handleUsernameConfirm}
      ref={usernameInputRef}
    />
  ) : (
    user.username
  )

  return (
    <EditableField
      title="User name"
      isEditing={authUser.isEditingUsername}
      onEditClick={handleEditUsername}
      content={content}
    />
  )
}

export default ChangeUsername
