import React, { useEffect } from 'react'
import moment from 'moment'
import styles from './catalogue.scss'
//Types
import { HydratedRouteComponentProps } from 'src/router'
//Redux
import { FETCH_CATALOGUE_FIELDS } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
import { ADD_ITEM_TO_STATE } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch } from 'store/storeConfig'
//Utils
import { scrollTop } from 'src/utils'
//Custom components
import CatalogueItems from './catalogue-items/catalogueItems'
import FiltersBar from './filters-bar/filtersBar'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'
import useFiltersBarContext from './filters-bar/useFiltersBarContext'
import { DeserializedChoice, DeserializedChoiceField } from 'src/globalTypes'
import { Choice, FilterType } from './filters-bar/filters/filtersTypes'

const Catalogue = (props: HydratedRouteComponentProps) => {
    const dispatch = useAppDispatch()
    const { filtersContext } = useFiltersBarContext()
    const catalogue = props.match.params.catalogue!

    useEffect(() => {
        dispatch(FETCH_CATALOGUE_FIELDS(catalogue.id))
    }, [catalogue.id])

    useEffect(() => {
        if (!catalogue.fetchingFieldsChoices) {
            const filters = getFilters()
            filtersContext.changeFilters(filters)
        }
    }, [catalogue.fetchingFieldsChoices])

    const buildFilterChoice = (choice: DeserializedChoice): Choice => ({
        id: choice.value,
        title: choice.value,
    })

    const buildFilter = (field: DeserializedChoiceField): FilterType => ({
        id: field.filterName,
        title: field.name,
        type: field.type,
        choices: field.choices.map(buildFilterChoice)
    })

    const getFilters = (): FilterType[] => {
        const fields = catalogue.fields.filter(f =>
            (f.type === 'multiple_choice' || f.type === 'single_choice')
            && (f as DeserializedChoiceField).choices.length
        ) as DeserializedChoiceField[]

        return [
            {
                id: 'id',
                title: 'id',
                type: 'number',
                minVal: '1',
                maxVal: '9999999999',
            },
            {
                id: 'date',
                title: 'date',
                type: 'date',
                minVal: '2020-01-01',
                maxVal: moment().format('YYYY-MM-DD'),
            },
            ...fields.map(buildFilter)
        ]
    }

    const handleAddItem = () => {
        scrollTop()
        dispatch(ADD_ITEM_TO_STATE(catalogue.id))
    }

    const getAddItemButton = () => {
        if (window.innerWidth > 640) {
            return (
                <AddButton
                    text="Add new item"
                    className={styles.addItemButton}
                    onClick={handleAddItem}
                />
            )
        } else {
            return <FixedAddButton onClick={handleAddItem} />
        }
    }

    return (
        <div className={styles.catalogue}>
            <FiltersBar />
            <div id="catalogueMainContent" className={styles.mainContent}>
                {getAddItemButton()}
                {filtersContext.filters.length > 0 &&
                    <CatalogueItems key={catalogue.id} catalogueId={catalogue.id} />
                }
            </div>
        </div>
    )
}

export default Catalogue