import React, { useRef } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './changeUserImage.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { POST_USER_IMAGE } from 'store/slices/settingsSlices/myAccountSlice/myAccountSlice'
//Custom components
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import Avatar from 'components/global-components/avatar/avatar'
import Loader from 'components/global-components/loader/loader'

const ChangeUserImage = () => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const auth = useTypedSelector(state => state.auth)
    const myAccount = useTypedSelector(state => state.settings.myAccount)

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
                {myAccount.isPostingUserImage
                    ? (
                        <Loader size={35} />
                    ) : (
                        <Avatar
                            placeholderIcon={faUser}
                            className={styles.image}
                            url={auth.user!.imageThumbnail}
                        />
                    )
                }
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