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

export const updateUser = createAsyncThunk(
  //bc async action
  "user/updateUser", //name of the action ofc we export
  async (user, thunkAPI) => {
    //user is the entire object we set up in the profile, thunkAPI is the redux toolkit

    console.log(`updateUser thunk ${JSON.stringify(user)}`)
    try {
      const resp = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`, //with get state we get the entire state of the store and we can access the user object and the token/ user is name of our slice, plus second user the property of the slice, and.token
          // Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data // if we successful we are returning data and then we will do sth with it in extra reducers , that's the user  object
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        toast.error("Your session has expired, please login again")
        return thunkAPI.rejectWithValue("Unauthorized. Logging out...")
      }
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  //this is where we will write our reducers, name our different actions
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null
      localStorage.removeItem("user")
      if (payload) {
        toast.success(payload)
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
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
      toast.error(payload)
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload //we wonna get the new user we are getting back from the server and will be located in payload
      state.isLoading = false
      state.user = user //update user in the state
      addUserToLocalStorage(user)
      toast.success(`User Updated ${user.name}`)
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { logoutUser, toggleSidebar } = userSlice.actions

export default userSlice.reducer
