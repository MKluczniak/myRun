import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { toast } from "react-toastify"
import customFetch from "../../utils/axios"
import axios from "axios"

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
}

const initialState = {
  isLoading: true,
  runs: [],
  totalRuns: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllRuns = createAsyncThunk(
  "allRuns/getAllRuns",
  async (_, thunkAPI) => {
    let url = `/runs/allruns`

    // console.log(`${thunkAPI.getState().user.user.token}`)
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      console.log(resp.data)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const allRuns = createSlice({
  name: "allRuns",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState }
    },
  },

  extraReducers: {
    [getAllRuns.pending]: (state) => {
      state.isLoading = true
    },
    [getAllRuns.fulfilled]: (state, { payload }) => {
      console.log(payload.runs)
      state.isLoading = false
      state.runs = payload.runs
    },
    [getAllRuns.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { handleChange, clearFilters } = allRuns.actions

export default allRuns.reducer
