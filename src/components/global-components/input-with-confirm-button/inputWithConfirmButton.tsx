import {
  useRef,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import classNames from 'classnames/bind'
import styles from './inputWithConfirmButton.module.scss'
import { useConfirmOnEnter, mergeRefs } from 'src/utils'
import ConfirmButton from '../confirm-button/confirmButton'
import DialogCloud from '../dialog-cloud/dialogCloud'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  clearOnConfirm?: boolean
  invalidInputMessage?: string
  onConfirm: (input: string) => void
}

const cx = classNames.bind(styles)

const InputWithConfirmButton: ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    loading,
    buttonProps,
    clearOnConfirm,
    invalidInputMessage,
    onConfirm,
    ...rest
  } = props

  const handleConfirm = () => {
    if (invalidInputMessage && invalidInputMessage?.length !== 0) {
      return
    }
    onConfirm(inputRef.current!.value)
    if (clearOnConfirm) {
      inputRef.current!.value = ''
      inputRef.current?.focus()
    }
  }
  useConfirmOnEnter(inputRef, handleConfirm)

  const disabled =
    invalidInputMessage !== undefined && invalidInputMessage?.length !== 0

  const wrapperClass = cx('wrapper', props.className)

  return (
    <div className={wrapperClass}>
      <DialogCloud message={invalidInputMessage ?? ''} />
      <input ref={mergeRefs([inputRef, ref])} {...rest} autoFocus />
      <ConfirmButton
        className={styles.confirmButton}
        size={25}
        loading={loading}
        disabled={disabled}
        {...buttonProps}
        onClick={handleConfirm}
      />
    </div>
  )
}

export default forwardRef(InputWithConfirmButton)
