import { cloneDeep } from 'lodash'
//Global types
import { DeserializedChoice, DeserializedChoiceField, DeserializedField } from 'src/globalTypes'
//Store types
import { AppActionTypes } from 'store/storeTypes/appTypes'
import { CataloguesState } from 'store/storeTypes/cataloguesTypes'
//Serializers
import {
    catalogueDeserializer, choicesDeserializer, fieldDeserializer, fieldsDeserializer,
    itemDeserializer, listDeserializer,
} from 'src/serializers'

const initialState: CataloguesState = {
    catalogues: [],
    fetchingCatalogues: true,
}

const getCatalogueById = (
    state: CataloguesState,
    id: number
) => (
    state.catalogues.filter(c => c.id === id)[0]
)

export const getFieldById = (
    state: CataloguesState,
    catalogueId: number,
    fieldId: number
): DeserializedField => (
    getCatalogueById(state, catalogueId).fields.filter(f => f.id === fieldId)[0]
)

const getChoiceById = (
    state: CataloguesState,
    catalogueId: number,
    fieldId: number,
    choiceId: number,
): DeserializedChoice => {
    const field = getFieldById(state, catalogueId, fieldId) as DeserializedChoiceField
    return field.choices.filter(choice => choice.id === choiceId)[0]
}

const cataloguesReducer = (
    state = initialState,
    action: AppActionTypes
): CataloguesState => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'MANAGE_CATALOGUES/TOGGLE_CATALOGUE_NAME_EDIT': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.isEditingCatalogueName = !catalogue.isEditingCatalogueName
            return newState
        }

        case 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/START': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.isSubmittingCatalogueName = true
            return newState
        }

        case 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/SUCCESS': {
            const catalogue = getCatalogueById(newState, action.catalogue.id)
            catalogue.name = action.catalogue.name
            catalogue.slug = action.catalogue.slug
            catalogue.isSubmittingCatalogueName = false
            catalogue.isEditingCatalogueName = false
            return newState
        }

        case 'MANAGE_CATALOGUES/CHANGE_CATALOGUE_NAME/FAILURE': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.isSubmittingCatalogueName = false
            return newState
        }

        case 'CATALOGUES/FETCH_CATALOGUES/START':
            newState.fetchingCatalogues = true
            return newState

        case 'CATALOGUES/FETCH_CATALOGUES/SUCCESS':
            newState.catalogues = action.catalogues.map(catalogue => catalogueDeserializer(catalogue))
            newState.fetchingCatalogues = false
            return newState

        case 'CATALOGUES/FETCH_CATALOGUES/FAILURE':
            newState.fetchingCatalogues = false
            return newState

        case 'CATALOGUES/FETCH_CATALOGUE_ITEMS/START': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.fetchingItems = true
            return newState
        }

        case 'CATALOGUES/FETCH_CATALOGUE_ITEMS/SUCCESS': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.itemsData = listDeserializer(action.data, itemDeserializer)
            catalogue.fetchingItems = false
            return newState
        }

        case 'CATALOGUES/FETCH_CATALOGUE_ITEMS/FAILURE': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.fetchingItems = false
            return newState
        }

        case 'CATALOGUES/FETCH_CATALOGUE_FIELDS/START': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.fetchingFields = true
            return newState
        }

        case 'CATALOGUES/FETCH_CATALOGUE_FIELDS/SUCCESS': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.fetchingFields = false
            catalogue.fields = fieldsDeserializer(action.data)
            return newState
        }

        case 'CATALOGUES/FETCH_CATALOGUE_FIELDS/FAILURE': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.fetchingFields = false
            return newState
        }

        case 'CATALOGUES/FETCH_CATALOGUE_FIELD/SUCCESS': {
            let field = getFieldById(newState, action.catalogueId, action.fieldId)
            Object.assign(field, fieldDeserializer(action.data))
            return newState
        }

        case 'CATALOGUES/FETCH_FIELDS_CHOICES/START': {
            const field = getFieldById(newState, action.catalogueId, action.fieldId) as DeserializedChoiceField
            field.fetchingChoices = true
            return newState
        }

        case 'CATALOGUES/FETCH_FIELDS_CHOICES/SUCCESS': {
            const field = getFieldById(newState, action.catalogueId, action.fieldId) as DeserializedChoiceField
            field.choices = choicesDeserializer(action.data)
            field.fetchingChoices = false
            return newState
        }

        case 'CATALOGUES/FETCH_FIELDS_CHOICES/FAILURE': {
            const field = getFieldById(newState, action.catalogueId, action.fieldId) as DeserializedChoiceField
            field.fetchingChoices = false
            return newState
        }

        case 'MANAGE_CATALOGUES/TOGGLE_FIELD_EDIT': {
            const field = getFieldById(newState, action.catalogueId, action.fieldId) as DeserializedChoiceField
            field.isEditing = !field.isEditing
            return newState
        }

        case 'MANAGE_CATALOGUES/REMOVE_FIELD_CHOICE_FROM_STATE': {
            const choice = getChoiceById(newState, action.catalogueId, action.fieldId, action.id)
            choice.removed = true
            return newState
        }

        case 'MANAGE_CATALOGUES/ADD_FIELD_CHOICE_TO_STATE': {
            const field = getFieldById(newState, action.catalogueId, action.fieldId) as DeserializedChoiceField
            field.choices.unshift({
                id: null,
                fieldId: action.fieldId,
                value: action.name,
                removed: false,
            })
            return newState
        }

        case 'MANAGE_CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE/START':
        case 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES/START': {
            const field = getFieldById(newState, action.catalogueId, action.fieldId)
            field.isSubmitting = true
            return newState
        }

        case 'MANAGE_CATALOGUES/POST_TEXT_FIELD_NAME_CHANGE/FAILURE':
        case 'MANAGE_CATALOGUES/POST_CHOICE_FIELD_CHANGES/FAILURE': {
            const field = getFieldById(newState, action.catalogueId, action.fieldId)
            field.isSubmitting = false
            return newState
        }

        case 'MANAGE_CATALOGUES/TOGGLE_ADD_FIELD': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.isAddFieldFormActive = !catalogue.isAddFieldFormActive
            return newState
        }

        case 'MANAGE_CATALOGUES/CREATE_CATALOGUE_FIELD/START': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.isSubmittingNewField = true
            return newState
        }

        case 'MANAGE_CATALOGUES/CREATE_CATALOGUE_FIELD/SUCCESS': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.isSubmittingNewField = false
            catalogue.isAddFieldFormActive = false
            return newState
        }

        case 'MANAGE_CATALOGUES/CREATE_CATALOGUE_FIELD/FAILURE': {
            const catalogue = getCatalogueById(newState, action.catalogueId)
            catalogue.isSubmittingNewField = false
            return newState
        }
        case 'MANAGE_CATALOGUES/CREATE_CATALOGUE/SUCCESS':
            newState.catalogues.unshift(catalogueDeserializer(action.catalogue))
            return newState

        case 'APP/CLEAR_APP_STATE':
            newState = cloneDeep(initialState)
            return newState

        default:
            return newState
    }
}

export default cataloguesReducer
