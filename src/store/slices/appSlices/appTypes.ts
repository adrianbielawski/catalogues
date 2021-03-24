export interface AppState {
    screenHeight: number,
    screenWidth: {
        width: number,
        smallViewport: boolean | null,
        mediumViewport: boolean | null,
        largeViewport: boolean | null,
    },
    fetchingSwitches: boolean,
    switches: string[],
}

export interface ChangeScreenSizePayload {
    height: number,
    width: number,
}