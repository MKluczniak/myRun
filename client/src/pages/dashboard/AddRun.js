import { FormRow, FormRowSelect } from "../../components"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  clearValues,
  handleChange,
  createRun,
} from "../../features/run/runSlice"
import { useEffect } from "react"

const AddJob = () => {
  const {
    isLoading,
    runName,
    runLocation,
    locationOptions,
    runDistance,
    statusOptions,
    status,
    isEditing,
    editJobId,
    whoIsAlsoRunning,
  } = useSelector((store) => store.run)
  const dispatch = useDispatch()

  const { user } = useSelector((store) => store.user)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!runName || Number.isNaN(runDistance)) {
      console.log(Number.isNaN(runDistance))
      return toast.error("Wypełnij wszystkie pola, dystans musi być liczbą!")
    }
    dispatch(
      createRun({ runName, runLocation, runDistance, status, whoIsAlsoRunning })
    )
  }
  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    // console.log(name, value)
    dispatch(handleChange({ name, value }))
  }

  useEffect(() => {
    dispatch(handleChange({ name: "runLocation", value: user.location })) //this needs to match what is in the state // alternatives ??P
  }, [])

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edytuj bieg" : "dodaj bieg"}</h3>

        <div className="form-center">
          {/* run name */}
          <FormRow
            type="text"
            name="runName"
            labelText={"Nazwa biegu"}
            value={runName}
            handleChange={handleJobInput}
          />
          {/* distance of the run */}
          <FormRow
            type="text"
            name="runDistance"
            labelText="Dystans"
            value={runDistance}
            handleChange={handleJobInput}
          />
          {/* run location */}
          <FormRowSelect
            labelText="Lokalizacja"
            name="runLocation"
            value={runLocation}
            handleChange={handleJobInput}
            list={locationOptions}
          />
          {/* run status */}

          <FormRowSelect
            labelText="status"
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRow
            type="text"
            labelText="Kto też biegnie"
            name="whoIsAlsoRunning"
            value={whoIsAlsoRunning}
            handleChange={handleJobInput}
          />

          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              Wyczyść
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Dodaj Bieg
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
