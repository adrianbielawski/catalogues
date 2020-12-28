import React from 'react'
//Types
import { Choice } from './choice-field/choices/choices'
//Custom components
import TextField from './text-field/textField'
import ChoiceField from './choice-field/choiceField'

export interface TextFieldInterface {
    id: string,
    name: string,
    type: string,
    choices?: never,
}

export interface ChoiceFieldInterface {
    id: string,
    name: string,
    type: string,
    choices: Choice[],
}

type Field = TextFieldInterface | ChoiceFieldInterface

enum FieldTypes {
    'short text' = '0',
    'long text' = '1',
    'single choice' = '2',
    'multiple choice' = '3',
}

const ItemFields = () => {
    const handleEditConfirm = () => {

    }

    const handleConfirmChoiceFieldEdit = (name: string, choices: Choice[]) => {
    }

    const FIELDS: Field[] = [
        {
            id: '0',
            name: 'Id',
            type: FieldTypes['short text'],
        },
        {
            id: '1',
            name: 'Name',
            type: FieldTypes['short text'],
        },
        {
            id: '2',
            name: 'Description',
            type: FieldTypes['long text'],
        },
        {
            id: '3',
            name: 'thing',
            type: FieldTypes['single choice'],
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
            type: FieldTypes['multiple choice'],
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

    const fields = FIELDS.map(field => {
        if (field.type === '0' || field.type === '1') {
            return (
                <TextField
                    field={field as TextFieldInterface}
                    key={field.id}
                    onEditConfirm={handleEditConfirm}
                />
            )
        } else {
            return (
                <ChoiceField
                    field={field as ChoiceFieldInterface}
                    key={field.id}
                    onEditConfirm={handleConfirmChoiceFieldEdit}
                />
            )
        }
    })

    return (
        <div>
            {fields}
        </div>
    )
}

export default ItemFields