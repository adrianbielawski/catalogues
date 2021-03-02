import React, { useRef } from 'react'
import styles from './input.scss'
import classNames from 'classnames/bind'
//Custom hooks
import { mergeRefs } from 'src/utils'
import DialogCloud from '../dialog-cloud/dialogCloud'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    invalidInputMessage?: string,
}
const cx = classNames.bind(styles)

const Input: React.ForwardRefRenderFunction<
    HTMLInputElement,
    Props
> = (props, ref) => {
    const { className, invalidInputMessage, ...rest } = props
    const inputRef = useRef<HTMLInputElement>(null)

    const wrapperClass = cx(
        'wrapper',
        className,
    )
    
    return (
        <div className={wrapperClass}>
            <DialogCloud message={invalidInputMessage || ''} />
            <input
                {...rest}
                ref={mergeRefs([ref, inputRef])}
                spellCheck="false"
            />
        </div>
    )
}

export default React.forwardRef(Input)