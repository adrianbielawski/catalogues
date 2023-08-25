import {
  useRef,
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import styles from './input.module.scss'
import classNames from 'classnames/bind'
import { mergeRefs } from 'src/utils'
import DialogCloud from '../dialog-cloud/dialogCloud'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  invalidInputMessage?: string
}
const cx = classNames.bind(styles)

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  props,
  ref,
) => {
  const { className, invalidInputMessage, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const wrapperClass = cx('wrapper', className)

  return (
    <div className={wrapperClass}>
      <DialogCloud message={invalidInputMessage ?? ''} />
      <input {...rest} ref={mergeRefs([ref, inputRef])} spellCheck="false" />
    </div>
  )
}

export default forwardRef(Input)
