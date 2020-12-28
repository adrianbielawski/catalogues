import React from 'react'
import styles from './editItemFields.scss'
//Types
import { Choice } from 'components/main/settings/account-settings/manage-catalogues/manage-catalogue/item-fields/choice-field/choices/choices'
//Custom components
import TextField, { TextFieldInterface } from './text-field/textField'

export interface ChoiceFieldInterface {
    id: string,
    name: string,
    type: string,
    choices: Choice[],
}

type Field = TextFieldInterface | ChoiceFieldInterface

type Props = {
    itemId: string | number,
}

const EditItemFields = (props: Props) => {
    const FIELDS: Field[] = [
        {
            id: '1',
            name: 'Name',
            type: 'short text',
            content: 'Cat 1',
        },
        {
            id: '2',
            name: 'Description',
            type: 'long text',
            content: 'Some cat with things',
        },
        {
            id: '3',
            name: 'thing',
            type: 'single choice',
            choices: [
                {
                    id: '111',
                    name: 'choice 1',
                },
                {
                    id: '222',
                    name: 'choice 2',
                },
                {
                    id: '113',
                    name: 'choice 1',
                },
                {
                    id: '223',
                    name: 'choice 2',
                },
                {
                    id: '114',
                    name: 'choice 1',
                },
                {
                    id: '225',
                    name: 'choice 2',
                },
                {
                    id: '116',
                    name: 'choice 1',
                },
                {
                    id: '227',
                    name: 'choice 2',
                },
            ],
        },
        {
            id: '4',
            name: 'Many things',
            type: 'multiple choice',
            choices: [
                {
                    id: '111',
                    name: 'choice 1',
                },
                {
                    id: '222',
                    name: 'choice 2',
                },
                {
                    id: '333',
                    name: 'choice 3',
                },
            ],
        },
    ]

    const handleFieldEditConfirm = (fieldId: string, input: string) => {
        console.log('item id', props.itemId, 'field id', fieldId, 'input', input)
    }

    const fields = FIELDS.map(field => {
            switch (field.type) {
                case 'short text':
                    let shortTextField = field as TextFieldInterface
                    return (
                        <TextField
                            field={shortTextField}
                            onEditConfirm={handleFieldEditConfirm}
                            key={shortTextField.id}
                        />
                    )
                case 'long text':
                    let longTextField = field as TextFieldInterface
                    return (
                        <TextField
                            field={longTextField}
                            onEditConfirm={handleFieldEditConfirm}
                            key={longTextField.id}
                        />
                    )
            }
        })

    return (
        <div className={styles.fields}>
            <p className={styles.itemId}>
                Item id: {props.itemId}
            </p>
            {fields}
        </div>
    )
}

export default EditItemFields