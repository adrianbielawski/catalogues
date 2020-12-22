export const TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU'

interface toggleSideMenu {
    type: typeof TOGGLE_SIDE_MENU,
}

export type Action = toggleSideMenu

export interface SideMenuInitialState {
    active: boolean,
}

export interface SideMenuContextInterface {
    active: boolean,
    toggleSideMenu: () => void,
}