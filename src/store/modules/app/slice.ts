import { createSlice } from '@reduxjs/toolkit'
import type * as T from './types'
import * as reducers from './reducers'

const initialState: T.AppState = {
  screenHeight: window.innerHeight,
  screenWidth: {
    width: window.innerWidth,
    smallViewport: window.innerWidth <= 640,
    mediumViewport: window.innerWidth <= 800 && window.innerWidth > 640,
    largeViewport: window.innerWidth > 800,
  },
  fetchingSwitches: true,
  switches: [],
}

export const appSlice = createSlice({
  name: 'APP',
  initialState,
  reducers: {
    ...reducers.changeScreenSize,
    ...reducers.fetchSwitches,
    ...reducers.clearAppState,
  },
})

export const {
  CHANGE_SCREEN_SIZE,
  FETCH_SWITCHES,
  FETCH_SWITCHES_START,
  FETCH_SWITCHES_SUCCESS,
  FETCH_SWITCHES_FAILURE,
  CLEAR_APP_STATE,
} = appSlice.actions
