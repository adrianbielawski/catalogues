import React from 'react'
import classNames from 'classnames/bind'
import styles from './checkBoxWithTitle.module.scss'
//Custom components
import CheckBox from 'components/global-components/check-box/checkBox'

type Props = {
    id: number | string,
    title: string,
    selected: boolean,
    className?: string,
    onChange: (id: number | string, selected: boolean) => void
}

const cx = classNames.bind(styles)

const CheckBoxWithTitle = (props: Props) => {
    const handleCheck = () => {
        props.onChange(props.id, !props.selected)
    }

    const checkBoxWithTitleClass = cx(
        'checkBoxWithTitle',
        props.className,
    )

    return (
        <div className={checkBoxWithTitleClass} onClick={handleCheck}>
            <CheckBox selected={props.selected} />
            <span>{props.title}</span>
        </div>
    )
}

export default CheckBoxWithTitle