import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './choices.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'
import { DeserializedChoiceField } from 'src/globalTypes'
import AddChoice from 'components/global-components/add-choice/addChoice'

type Props = {
    field: DeserializedChoiceField,
    className: string,
    onRemove: (id: number | string) => void,
}

const cx = classNames.bind(styles)

const Choices = (props: Props) => {
    const choices = (
        props.field.choices.map(choice => {
            const handleRemove = () => {
                props.onRemove(choice.id!)
            }

            return (
                <li className={styles.choice} key={choice.value}>
                    <TransparentButton className={styles.removeButton} onClick={handleRemove}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TransparentButton>
                    <span>{choice.value}</span>
                </li>
            )
        })
    )

    const choicesClass = cx(
        'choicesList',
        props.className,
    )

    return (
        <div className={styles.choices}>
            <ul className={choicesClass}>
                {choices}
            </ul>
            <AddChoice
                field={props.field}
            />
        </div>
    )
}

export default Choices