import React from 'react'
import styles from './editItemFields.scss'
//Types
import { SelectedChoice } from 'components/global-components/multiple-choice-list/multipleChoiceList'
import { ChoiceFieldInterface } from 'components/main/settings/account-settings/manage-catalogues/manage-catalogue/item-fields/itemFields'
//Custom components
import TextField, { TextFieldInterface } from './text-field/textField'
import LongTextField from './long-text-field/longTextField'
import SingleChoiceField from './single-choice-field/singleChoiceField'
import MultipleChoiceField from './multiple-choice-field/multipleChoiceField'

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

    const handleChoiceFieldEditConfirm = (fieldId: string, choice: SelectedChoice) => {
        console.log('item id', props.itemId, 'field id', fieldId, 'choice', choice)
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
                    <LongTextField
                        field={longTextField}
                        onEditConfirm={handleFieldEditConfirm}
                        key={longTextField.id}
                    />
                )
            case 'single choice':
                let singleChoiceField = field as ChoiceFieldInterface
                return (
                    <SingleChoiceField
                        field={singleChoiceField}
                        onEditConfirm={handleFieldEditConfirm}
                        key={singleChoiceField.id}
                    />
                )
            case 'multiple choice':
                let multipleChoiceField = field as ChoiceFieldInterface
                return (
                    <MultipleChoiceField
                        field={multipleChoiceField}
                        selected={{'222': true}}
                        onEditConfirm={handleChoiceFieldEditConfirm}
                        key={multipleChoiceField.id}
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