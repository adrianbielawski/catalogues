import { createContext } from 'react'
import { Draft } from 'immer'
//Types
import { SideMenuContextInterface, Action, TOGGLE_SIDE_MENU, SideMenuInitialState } from './sideMenuTypes'

export const SideMenuContext = createContext<SideMenuContextInterface>({
    active: false,
    toggleSideMenu: () => {},
})

export const reducer = (state: Draft<SideMenuInitialState>, action: Action) => {
    switch (action.type) {
        case TOGGLE_SIDE_MENU:
            state.active = !state.active
            break

        default:
            throw new Error()
    }
}