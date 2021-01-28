import React from 'react'
import styles from './checkBoxWithTitle.scss'
//Custom components
import CheckBox from 'components/global-components/check-box/checkBox'

type Props = {
    id: number | string,
    title: string,
    selected: boolean,
    className?: string,
    onChange: (id: number | string, selected: boolean) => void
}

const CheckBoxWithTitle = (props: Props) => {
    const handleCheck = () => {
        props.onChange(props.id, !props.selected)
    }

    return (
        <div className={styles.checkBoxWithTitle} onClick={handleCheck}>
            <CheckBox selected={props.selected} />
            <span>{props.title}</span>
        </div>
    )
}

export default CheckBoxWithTitle