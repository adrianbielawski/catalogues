import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './field.scss'
//Types
import { AuthUserChoiceFieldData, AuthUserFieldData } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Components
import TextField from '../text-field/textField'
import ChoiceField from '../choice-field/choiceField'
import OrderableList, { ItemComponentProps } from '@adrianbielawski/orderable-list'

const cx = classNames.bind(styles)

const Field = (props: ItemComponentProps<AuthUserFieldData>) => {
    const fieldsEntities = useTypedSelector(state => state.entities.fields.entities)

    const getField = () => {
        const field = fieldsEntities[props.item.id]!
        switch (field.type) {
            case 'short_text':
            case 'long_text':
                return (
                    <TextField
                        field={field}
                        fieldData={props.item}
                        key={field.id}
                    />
                )
            case 'single_choice':
            case 'multiple_choice':
                return (
                    <ChoiceField
                        field={field}
                        fieldData={props.item as AuthUserChoiceFieldData}
                        key={field.id}
                    />
                )
        }
    }

    const fieldClass = cx(
        'field',
        {
            grabbed: props.grabbed,
        }
    )
    
    return (
        <div className={fieldClass}>
            <OrderableList.Grabbable className={styles.grabbable}>
                <FontAwesomeIcon icon={faArrowsAltV} />
            </OrderableList.Grabbable>
            {getField()}
        </div>
    )
}

export default Field