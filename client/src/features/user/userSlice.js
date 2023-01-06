import { createSlice, createAsyncThunk } from "@reduxjs/toolkit" // for the async functions

import { toast } from "react-toastify"
import customFetch from "../../utils/axios"
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage"

const initialState = {
  isLoading: false, //will be for controlling the submit button so the user cant click it multiple times
  isSidebarOpen: false,
  // isLogoutButtonOpen: false,
  user: getUserFromLocalStorage(), //we will get back the user when the app loads
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user)
      return resp.data //that's the user  object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user)
      return resp.data //that's the user  object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (user, thunkAPI) => {
//     console.log(`loginUser thunk ${user.token}`)
//   }
// )

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    // toggleLogoutButton: (state) => {
    //   state.isLogoutButtonOpen = !state.isLogoutButtonOpen
    // },
    logoutUser: (state) => {
      state.user = null
      localStorage.removeItem("user")
    },
  },

  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      //in payload we have the user object 'whatever we return from the registeruser async function'
      const { user } = payload
      state.isLoading = false
      state.user = user
      console.log(`userSlice ${user.token}`)
      addUserToLocalStorage(user)
      toast.success(`Welcome ${user.name}`)
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
      toast.error(payload)
    },
    [loginUser.pending]: (state, action) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      //in payload we have the user object 'whatever we return from the registeruser async function'
      const { user } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      console.log(`userSlice ${user.token}`)
      toast.success(`Welcome Back ${user.name}`)
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
      toast.error(payload)
    },
  },
})

export const { logoutUser, toggleSidebar } = userSlice.actions //PP
export default userSlice.reducer
