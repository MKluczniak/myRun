import logo from "./logo.svg"
import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

// import { Register, Landing, Error, ProtectedRoute } from "./pages"
import { Error, CreateUser, Dashboard, Landing, Register, Test2 } from "./pages"

// const Button = styled.button`
//   background-color: #f50057;
//   color: white;
//   font-size: 2rem;
// `

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
