import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from "./statesRedux/tokenSlice"

export default configureStore({
  reducer: {
    token: tokenSlice,
  },
})