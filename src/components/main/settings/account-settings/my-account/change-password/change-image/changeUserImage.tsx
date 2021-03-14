import React, { useRef } from 'react'
import styles from './changeUserImage.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { POST_USER_IMAGE } from 'store/slices/settingsSlices/myAccountSlice/myAccountSlice'
//Custom components
import EditableFieldTitle from 'components/global-components/editable-field/editable-field-title/editableFieldTitle'
import UserImage from 'components/global-components/user-image/userImage'
import Loader from 'components/global-components/loader/loader'

const BASE_URL = process.env.API_URL

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
                        <UserImage
                            url={`${BASE_URL}${auth.user!.imageThumbnail}`}
                            className={styles.image}
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