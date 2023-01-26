import moment from "moment"
import {
  FaLocationArrow,
  FaRunning,
  FaCalendarAlt,
  FaUserFriends,
} from "react-icons/fa"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
// import { useAppContext } from "../context/appContext"
import Wrapper from "../assets/wrappers/Job"
import { deleteRun } from "../features/run/runSlice"
import RunInfo from "./RunInfo"

const Run = ({
  _id,
  runName,
  runLocation,
  runDistance,
  whoIsAlsoRunning,
  status,
}) => {
  let date = moment(Date.now())
  date = date.format("MMM Do, YYYY")

  const dispatch = useDispatch()

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{runName?.charAt(0)}</div>
        <div className="info">
          <h5>{runName}</h5>
          <p>{`Dystants biegu: ${runDistance} km`}</p>
          <p>{whoIsAlsoRunning}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <RunInfo icon={<FaLocationArrow />} text={runLocation} />

          <RunInfo icon={<FaRunning />} text={runName} />
          <RunInfo icon={<FaUserFriends />} text={whoIsAlsoRunning} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              // onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteRun(_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Run
