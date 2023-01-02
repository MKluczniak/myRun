import React, { useState, useEffect } from "react"

function Eye() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [direction, setDirection] = useState({ x: 0, y: 0 })

  function updatePosition(event) {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", updatePosition)
    return () => {
      window.removeEventListener("mousemove", updatePosition)
    }
  }, [])

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  }

  return (
    <svg className="eye" style={style} width="100" height="100">
      <circle cx="50" cy="50" r="50" />
    </svg>
  )
}

export default Eye
