export interface AppState {
    screenHeight: number,
    screenWidth: {
        width: number,
        smallViewport: boolean,
        mediumViewport: boolean,
        largeViewport: boolean,
    },
    fetchingSwitches: boolean,
    switches: string[],
}

export interface ChangeScreenSizePayload {
    height: number,
    width: number,
}