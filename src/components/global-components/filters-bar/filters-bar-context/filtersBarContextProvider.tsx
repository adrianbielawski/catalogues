import { ReactNode } from 'react'
import { useImmerReducer } from 'use-immer'
// Contexts
import { FiltersBarContext, reducer } from './filtersBarStore'
import { FiltersBarInitialState, INITIALIZED } from './filtersBarTypes'

interface Props {
  children: ReactNode
  value: FiltersBarInitialState
}

const FiltersBarContextProvider = (props: Props) => {
  const initialState = {
    ...props.value,
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const initialize = () => {
    dispatch({
      type: INITIALIZED,
    })
  }

  const context = {
    ...state,
    initialize,
  }

  return (
    <FiltersBarContext.Provider value={context}>
      {props.children}
    </FiltersBarContext.Provider>
  )
}

export default FiltersBarContextProvider
