import React, { useState, useEffect } from "react"

import axios from "axios"

const Test2 = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:5005/api/v1/auth/register",
        {
          name: "john55d55",
          email: "ted0340g120708dfqggghcdfggfdq0555776@gmail.com",
          password: "johddddn",
        }
      )
      setData(response)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h1>{data ? data.data.user.email : "loading"}</h1>
    </div>
  )
}

export default Test2
