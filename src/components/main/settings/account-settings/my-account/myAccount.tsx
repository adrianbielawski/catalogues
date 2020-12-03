import React from 'react'
import styles from './myAccount.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import EditableList from 'components/global-components/editable-list/editableList'

type OnConfirm = (input: string[]) => void

const MyAccount = () => {
    const user = useTypedSelector(state => state.app.user)

    const handleNameChange: OnConfirm = (input) => {
        console.log(input)
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