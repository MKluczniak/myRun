import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

import main from "../assets/images/main.svg"
import LoadingComponent from "../components/LoadingComponent"
import { Logo } from "../components"

const Landing = () => {
  const [user, setUser] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const getAnswer = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:5005/api/v1/auth/register",
        {
          name: "john55d55",
          email: "ted0340g12d0708dfdddqq0555776@gmail.com",
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

  // useEffect(() => {
  //   getAnswer()
  // }, [])

  if (isLoading) {
    return <LoadingComponent center />
  }

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <main>
        <nav>{/* <Logo /> */}</nav>
        <div className="container page">
          <div className="info">
            <h1>
              Runs
              <span> tracking </span>
              app
            </h1>

            <p>
              Aplikacja do rejestracji wydarzeń biegowych to rodzaj aplikacji
              mobilnej, która umożliwia użytkownikom zapisywania, porządkowania
              i śledzenie wydarzen biegowych m.in. zawodów biegowych, na ktore
              już się zapisali, lub planują zapisac sie w przyszłości. Pozwala
              także na dzielenie się informacjami o planach biegowych z innymi
              użytkownikami.
            </p>
            {/* <h1>{user ? user.data.user.email : "loading..."}</h1> */}
            <Link to="/register" className="btn btn-hero">
              Login Register
            </Link>
          </div>
          <img src={main} alt="job hunt" />
        </div>
      </main>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`

export default Landing
