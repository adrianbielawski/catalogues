import React from 'react'
import styles from './editableField.scss'
//Custom hooks
import { useDelay } from 'src/hooks/useDelay'
//Custom components
import InputWithConfirmButton from 'components/global-components/input-with-confirm-button/inputWithConfirmButton'
import EditableFieldTitle from './editable-field-title/editableFieldTitle'

interface Props {
    id: number | string,
    title: string,
    value: string,
    isEditing: boolean,
    isSubmitting: boolean,
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    invalidInputMessage?: string,
    onEdit: () => void,
    onConfirm: (input: string) => void,
}

const EditableFieldWithConfirm: React.ForwardRefRenderFunction<
    HTMLInputElement,
    Props
> = (props, ref) => {
    const delayCompleated = useDelay(props.isSubmitting)

    const handleConfirm = (input: string) => {
        props.onConfirm!(input)
    }

    return (
        <div className={styles.editableField}>
            <EditableFieldTitle
                title={props.title}
                isEditing={props.isEditing}
                onEdit={props.onEdit}
            />
            <div className={styles.content}>
                {props.isEditing ? (
                    <InputWithConfirmButton
                        loading={delayCompleated}
                        inputProps={{ ...props.inputProps, defaultValue: props.value }}
                        buttonProps={{ disabled: props.invalidInputMessage?.length !== 0 }}
                        invalidInputMessage={props.invalidInputMessage}
                        onConfirm={handleConfirm}
                        ref={ref}
                        key={props.value}
                    />
                )
                    : props.value
                }
            </div>
        </div >
    )
}

export default React.forwardRef(EditableFieldWithConfirm)