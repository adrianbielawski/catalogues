export interface AppState {
    screenHeight: number,
    screenWidth: {
        width: number,
        is640OrLess: boolean | null,
        is800OrLess: boolean | null,
    },
    fetchingSwitches: boolean,
    switches: string[],
}

export interface ChangeScreenSizePayload {
    height: number,
    width: number,
}