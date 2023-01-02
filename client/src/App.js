import logo from "./logo.svg"
import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

// import { Register, Landing, Error, ProtectedRoute } from "./pages"
import { Error, CreateUser, Dashboard, Landing, Register, Test2 } from "./pages"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// const Button = styled.button`
//   background-color: #f50057;
//   color: white;
//   font-size: 2rem;
// `

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  )
}

export default App
