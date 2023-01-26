import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import customFetch from "../../utils/axios"
import arrayofcities from "../../utils/listofcities"
import { getUserFromLocalStorage } from "../../utils/localStorage"
import { getAllRuns } from "../AllRuns/allRunsSlice"
import { logoutUser } from "../user/userSlice"

// import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk"

// const dispatch = useDispatch()

const initialState = {
  isLoading: false,
  runName: "",
  runLocation: "",
  locationOptions: [
    "Warszawa",
    "Gliwice",
    "Katowice",
    "Opole",
    "Dąbrowa Górnicza",
    "Kraków",
  ], // arrayofcities,
  runDistance: "",
  statusOptions: ["nieopłacony", "opłacony"],
  status: "nieopłacony",
  isEditing: false,
  whoIsAlsoRunning: "",
  editJobId: "",
}

export const createRun = createAsyncThunk(
  "run/fetchJobs",
  async (run, thunkAPI) => {
    try {
      const response = await customFetch.post("/runs/addrun", run, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      thunkAPI.dispatch(clearValues())
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...")
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteRun = createAsyncThunk(
  "run/deleteRun",
  async (runId, thunkAPI) => {
    console.log("runId", runId)
    try {
      const response = await customFetch.delete(`/runs/deleterun/${runId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      thunkAPI.dispatch(getAllRuns())

      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...")
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const runSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },
    clearValues: (state) => {
      //   return initialState //bit risky to return sth becoz it will reset the state, but in this case it is our goal
      //   state.position = ""
      //   state.company = ""
      //   state.jobLocation = ""
      //   state.jobType = "full-time"
      //   state.status = "pending"
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "", //bc job location ma
      }
    },
  },
  extraReducers: {
    [createRun.pending]: (state) => {
      state.isLoading = true
    },
    [createRun.fulfilled]: (state, action) => {
      state.isLoading = false
      toast.success("Run Created")
    },
    [createRun.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [deleteRun.pending]: (state) => {
      state.isLoading = true
    },
    [deleteRun.fulfilled]: (state, action) => {
      state.isLoading = false
      state.runs = action.payload
      getAllRuns()
      toast.success("Run Deleted")
    },
    [deleteRun.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { handleChange, clearValues } = runSlice.actions

export default runSlice.reducer
