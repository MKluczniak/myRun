import React, { useEffect } from "react"
import { useState } from "react"
// import "./css/paceCalculator.css"

const PaceCalculator = () => {
  const [distance, setDistance] = useState(0)
  const [paceTime, setPaceTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [pace, setPace] = useState(0)
  const [runPace, setRunPace] = useState(0)
  const handleChange = (e) => {
    setDistance(Number(e.target.value))
  }

  const handlePaceChange = (e) => {
    const value = e.target.value
    setPaceTime({
      ...paceTime,
      [e.target.name]: value,
    })
  }

  const calculatePace = () => {
    let minuteFraction = paceTime.seconds / 60

    console.log([
      (Number(paceTime.hours) * 60 +
        Number(paceTime.minutes) +
        minuteFraction) /
        Number(distance),
    ])

    setRunPace(
      (Number(paceTime.hours) * 60 +
        Number(paceTime.minutes) +
        minuteFraction) /
        Number(distance)
    )
    let convertAfterDecimal = (runPace - Math.floor(runPace)) * 60

    setPace(Number(convertAfterDecimal.toFixed(0)))
  }

  const handlePaceSubmit = (e) => {
    e.preventDefault()
    calculatePace()
  }

  return (
    <div>
      <h1>Pace Calculator</h1>
      <h2>Distance</h2>
      <form onSubmit={handlePaceSubmit}>
        <input
          type="number"
          placeholder="enter distance"
          name="distance"
          onChange={handleChange}
          value={distance}
        />
      </form>
      <h2>Time</h2>
      <form onSubmit={handlePaceSubmit}>
        <input
          className="=time"
          type="number"
          onChange={handlePaceChange}
          value={paceTime.time}
          size="5"
          placeholder="hh"
          name="hours"
        />
      </form>
      <form onSubmit={handlePaceSubmit}>
        <input
          className="=time"
          type="number"
          onChange={handlePaceChange}
          value={paceTime.minutes}
          size="5"
          placeholder="mm"
          name="minutes"
        />
      </form>
      <form onSubmit={handlePaceSubmit}>
        <input
          className="=time"
          type="text"
          onChange={handlePaceChange}
          value={paceTime.seconds}
          size="5"
          placeholder="ss"
          name="seconds"
        />
      </form>
      <h2>Pace</h2>
      {/* <form>
            <input
                    type="text"
                    placeholder="minutes/mile"
                />
            </form> */}
      <h1>{`${Math.floor(runPace)} m ${pace} s`}</h1>
    </div>
  )
}

export default PaceCalculator
