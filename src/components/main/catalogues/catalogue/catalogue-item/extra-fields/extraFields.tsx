import React from 'react'
import styles from './extraFields.scss'

interface ExtraField {
    name: string,
    value: string,
}

type Props = {
    fields: ExtraField[],
}

const ExtraFields = (props: Props) => {
    const fields = props.fields.map(field => (
        <li key={field.name}>
            <p className={styles.extraField}>
                {field.name}:<span> {field.value}</span>
            </p>
        </li>
    ))

    return (
        <ul>
            {fields}
        </ul>
    )
}

export default ExtraFields