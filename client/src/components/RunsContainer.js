import { useEffect } from "react"
import Run from "./Run"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useSelector, useDispatch } from "react-redux"
import Loading from "./Loading"

import { getAllRuns } from "../features/AllRuns/allRunsSlice"

const JobsContainer = () => {
  const { runs, isLoading } = useSelector((store) => store.allRuns)
  const dispatch = useDispatch()
  console.log(runs)

  useEffect(() => {
    dispatch(getAllRuns())
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  if (runs.length === 0) {
    return (
      <Wrapper>
        <h2>No runs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>runs info</h5>
      <div className="jobs">
        {runs?.map((run) => {
          return <Run key={run._id} {...run} />
        })}
      </div>
    </Wrapper>
  )
}

export default JobsContainer
