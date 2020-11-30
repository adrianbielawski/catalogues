import React from 'react'
import styles from './input.scss'
import classNames from 'classnames/bind'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string,
}
const cx = classNames.bind(styles)

const Input: React.ForwardRefRenderFunction<
HTMLInputElement,
Props
> = (props, ref) => {

    const inputClass = cx(
        'input',
        props.className,
    )
    return (
        <input className={inputClass} {...props} ref={ref} spellCheck="false" />
    )
}

export default React.forwardRef(Input)