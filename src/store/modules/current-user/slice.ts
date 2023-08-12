import { createSlice } from '@reduxjs/toolkit'
import { type CurrentUserState } from './types'
import * as reducers from './reducers'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import { LOG_IN } from 'store/modules/auth-user/slice'

export const initialState: CurrentUserState = {
  userId: null,
  currentUserError: null,
}

export const currentUserSlice = createSlice({
  name: 'CURRENT_USER',
  initialState,
  reducers: {
    ...reducers.currentUser,
    ...reducers.getCurrentUser,
  },
  extraReducers: (builder) => {
    builder.addCase(CLEAR_APP_STATE, () => initialState)
    builder.addCase(LOG_IN, () => initialState)
  },
})

export const {
  CLEAR_CURRENT_USER_ERROR,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
} = currentUserSlice.actions
