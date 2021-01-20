import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { cloneDeep } from 'lodash'
import classNames from 'classnames/bind'
import styles from './choiceField.scss'
//Types
//Redux
import { useTypedSelector } from 'store/reducers'
import { fieldSelector } from 'store/selectors'
import { fetchFieldsChoices } from 'store/actions/cataloguesActions'
import { addFieldChoiceToState } from 'store/actions/settingsActions'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import Button from 'components/global-components/button/button'
import Input from 'components/global-components/input/input'
import Choices from './choices/choices'
import Loader from 'components/global-components/loader/loader'

type Props = {
    field: DeserializedChoiceField,
}

const cx = classNames.bind(styles)

const ChoiceField = (props: Props) => {
    const dispatch = useDispatch()
    const nameInputRef = useRef<HTMLInputElement>(null)
    const field = useTypedSelector(fieldSelector(props.field.catalogueId, props.field.id)) as DeserializedChoiceField

    useEffect(() => {
        dispatch(fetchFieldsChoices(props.field.id, props.field.catalogueId))
    }, [])

    const handleEdit = () => {
        dispatch(toggleFieldEdit(props.field.id, props.field.catalogueId))
    }

    const handleRemoveChoice = (id: string) => {
        let newChoices = cloneDeep(choices)
        const choiceIndex = newChoices.findIndex(choice => choice.id === id)        
        newChoices.splice(choiceIndex, 1)
        setChoices(newChoices)
    }

    const handleAddChoice = (name: string) => {
        let newChoices = cloneDeep(choices)
        newChoices.push({
            id: Date.now().toString(),
            name,
        })
        setChoices(newChoices)
    }

    const handleConfirm = () => {
        setConfirmed(true)
        const name = nameInputRef.current?.value || props.field.name

        Promise.resolve(
            props.onEditConfirm(name, choices)
        )
            .then(() => {
                setConfirmed(false)
                setIsEditing(false)
            })
            .catch(() => setConfirmed(false))
    }

    const handleCancel = () => {
        setIsEditing(false)
        setChoices(props.field.choices)
    }

    const fieldClass = cx(
        'field',
        {
            active: field.isEditing,
        }
    )

    const buttonClass = cx(
        'editButton',
        {
            active: field.isEditing,
        }
    )

    return (
        <div className={fieldClass}>
            <TransparentButton className={buttonClass} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </TransparentButton>
            {field.isEditing
                ? (
                    <div>
                        <Input
                            placeholder={props.field.name}
                            className={styles.nameInput}
                            minLength={2}
                            ref={nameInputRef}
                        />
                        <Choices
                            className={styles.choices}
                            choices={field.choices}
                            onRemove={handleRemoveChoice}
                            onAdd={handleAddChoice}
                        />
                        <div className={styles.buttons}>
                            <Button className={styles.button} onClick={handleConfirm}>
                                {confirmed
                                    ? <Loader size={25} />
                                    : 'Save'
                                }
                            </Button>
                            <Button className={styles.button} onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )
                : props.field.name
            }
        </div>
    )
}

export default ChoiceField
