import { createContext } from 'react'
import { cloneDeep } from 'lodash'
//Types
import { SideMenuContextInterface, Action, TOGGLE_SIDE_MENU, SideMenuInitialState } from './sideMenuTypes'

export const SideMenuContext = createContext<SideMenuContextInterface>({
    active: false,
    toggleSideMenu: () => {},
})

export const reducer = (state: SideMenuInitialState, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case TOGGLE_SIDE_MENU:
            newState.active = !newState.active
            return newState

        default:
            throw new Error()
    }
}