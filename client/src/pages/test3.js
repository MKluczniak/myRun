import React, { useState, useEffect } from "react"

import axios from "axios"

const CreateUser = () => {
  const [user, setUser] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const getAnswer = async () => {
    setUser("test")
    setIsLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:5005/api/v1/auth/register",
        {
          name: "john55d55",
          email: "tedsdd340g1208708dfqq0555177861898yf@gmail.com",
          password: "johddddn",
        }
      )
      console.log(response)
      setUser(response)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAnswer()
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  try {
    axios
      .get("http://localhost:5005/api/v1/auth/register", {
        name: "john55ddd55",
        email: "fffdsdddfff@gamil.com",
        password: "johdddddddn",
      })
      .then((response) => {
        setUser(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    //   setUser(response.data)
    //   console.log(response.data)
  } catch (error) {
    console.log(error)
  }

  return <h1>fuyghjhjjhhjgv</h1>
}

export default CreateUser
