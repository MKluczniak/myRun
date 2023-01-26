import { configureStore } from "@reduxjs/toolkit"
import runSlice from "./features/run/runSlice"
import userSlice from "./features/user/userSlice"
import allRunsSlice from "./features/AllRuns/allRunsSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    run: runSlice,
    allRuns: allRunsSlice,
  },
})
