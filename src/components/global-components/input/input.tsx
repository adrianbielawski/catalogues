import React, { useRef } from 'react'
import styles from './input.scss'
import classNames from 'classnames/bind'
//Custom hooks
import { mergeRefs } from 'src/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string,
}
const cx = classNames.bind(styles)

const Input: React.ForwardRefRenderFunction<
    HTMLInputElement,
    Props
> = (props, ref) => {
    const { className, ...rest } = props
    const inputRef = useRef<HTMLInputElement>(null)

    const inputClass = cx(
        'input',
        className,
    )
    return (
        <input
            className={inputClass}
            {...rest}
            ref={mergeRefs([ref, inputRef])}
            spellCheck="false"
        />
    )
}

export default React.forwardRef(Input)