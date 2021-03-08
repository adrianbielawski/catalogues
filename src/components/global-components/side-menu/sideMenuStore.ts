import { createContext } from 'react'
import { Draft } from 'immer'
//Types
import { SideMenuContextInterface, SideMenuInitialState } from './sideMenuTypes'

export const SideMenuContext = createContext<SideMenuContextInterface>({
    show: false,
})

export const reducer = (state: Draft<SideMenuInitialState>, action: any) => {
    switch (action.type) {
        default:
            throw new Error()
    }
}