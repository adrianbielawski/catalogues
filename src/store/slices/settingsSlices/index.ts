import { combineReducers } from "@reduxjs/toolkit"
import { myAccountSlice } from "./myAccountSlice/myAccountSlice"

export const settingsSlices = combineReducers({
    myAccount: myAccountSlice.reducer,
})