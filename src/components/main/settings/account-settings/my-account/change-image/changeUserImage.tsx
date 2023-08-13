import { useRef } from 'react'
import * as React from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './changeUserImage.module.scss'
// Redux
import { POST_USER_IMAGE } from 'store/modules/auth-user/slice'
import { userSelector } from 'store/selectors'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
// Components
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import Avatar from 'components/global-components/avatar/avatar'
import Loader from 'components/global-components/loader/loader'

const ChangeUserImage = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const authUser = useTypedSelector((state) => state.modules.authUser)
  const user = useTypedSelector(userSelector(authUser.id!))!

  const handleEdit = () => {
    inputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(POST_USER_IMAGE(URL.createObjectURL(e.target.files![0])))
  }

  return (
    <div className={styles.changeUserImage}>
      <EditableFieldTitle
        title={'User image'}
        isEditing={false}
        onEdit={handleEdit}
      />
      <div className={styles.imageWrapper}>
        {authUser.isPostingUserImage ? (
          <Loader size={35} />
        ) : (
          <Avatar
            placeholderIcon={faUser}
            className={styles.image}
            url={user.imageThumbnail}
          />
        )}
      </div>
      <input
        className={styles.input}
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
        onChange={handleImageChange}
      />
    </div>
  )
}

export default ChangeUserImage
