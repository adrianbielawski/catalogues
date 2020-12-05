import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './myAccount.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import EditableList from 'components/global-components/editable-list/editableList'
import { changeUserName } from 'store/actions/authActions'

type OnConfirm = (input: string[]) => void

const MyAccount = () => {
    const dispatch = useDispatch()
    const user = useTypedSelector(state => state.app.user)

    const handleNameChange: OnConfirm = (input) => {
        return dispatch(changeUserName(input[0]))
    }

    const handlePasswordChange: OnConfirm = (input) => {
        console.log(input)
    }

    const FIELDS = [
        {
            title: "Name",
            content: [user!.username],
            onConfirm: handleNameChange,
        },
        {
            title: "Password",
            content: ['password', 'confirm password'],
            hidden: true,
            onConfirm: handlePasswordChange,
        },
        {
            title: "E-mail",
            content: [user!.email],
        },
    ]

    return (
        <div className={styles.myAccount}>
            <EditableList fields={FIELDS} />
        </div>
    )
}

export default MyAccount