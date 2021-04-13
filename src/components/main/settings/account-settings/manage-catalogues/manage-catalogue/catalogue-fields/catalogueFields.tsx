import React from 'react'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
//Types
import { AuthUserChoiceFieldData } from 'store/modules/auth-user-catalogues/types'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { authUserFieldsDataSelector } from 'store/selectors'
//Components
import TextField from '../catalogue-fields/text-field/textField'
import ChoiceField from '../catalogue-fields/choice-field/choiceField'
import AddField from './add-field/addField'
import IconWithTitle from 'components/global-components/icon-with-title/iconWithTitle'

type Props = {
    catalogueId: number,
}

const CatalogueFields = (props: Props) => {
    const fieldsData = useTypedSelector(authUserFieldsDataSelector(props.catalogueId))
    const catalogueFields = useTypedSelector(state => state.entities.fields.entities)

    const fields = fieldsData.map(fieldData => {
        const field = catalogueFields[fieldData.id]!
        switch (field.type) {
            case 'short_text':
            case 'long_text':
                return (
                    <TextField
                        field={field}
                        fieldData={fieldData}
                        key={field.id}
                    />
                )
            case 'single_choice':
            case 'multiple_choice':
                return (
                    <ChoiceField
                        field={field}
                        fieldData={fieldData as AuthUserChoiceFieldData}
                        key={field.id}
                    />
                )
        }
    })

    return (
        <IconWithTitle
            title={'Catalogue fields'}
            icon={faListAlt}
        >
            <>
                {fields}
                <AddField catalogueId={props.catalogueId} />
            </>
        </IconWithTitle>
    )
}

export default CatalogueFields