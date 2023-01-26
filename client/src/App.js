// import logo from "./logo.svg"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Register, Landing, Error, ProtectedRoute } from "./pages"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  AddRun,
  AllRuns,
  Profile,
  SharedLayout,
  Stats,
} from "./pages/dashboard/index.js"
import PaceCalculator from "./components/PaceCalculator"

// const Button = styled.button`
//   background-color: #f50057;
//   color: white;
//   font-size: 2rem;
// `

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
              {/*           //the children of ProtectedRoute is going to be SharedLayout, and also everything what is in the shared lay out will be automaticly inclused*/}
            </ProtectedRoute>
          }
        >
          <Route index element={<AllRuns />} />
          <Route path="/addRun" element={<AddRun />} />
          <Route path="/all-runs" element={<AllRuns />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calculator" element={<PaceCalculator />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  )
}

export default App
