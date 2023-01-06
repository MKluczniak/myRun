// import React from "react"
// import ReactDOM from "react-dom/client"
// import "normalize.css" //before index.css
// import "./index.css"
// import App from "./App"
// import reportWebVitals from "./reportWebVitals"
// import { store } from "./store"
// import { Provider } from "react-redux"
// // Bootstrap CSS
// // import "bootstrap/dist/css/bootstrap.min.css"
// // // Bootstrap Bundle JS
// // import "bootstrap/dist/js/bootstrap.bundle.min"

// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App tab="home" />
//     </Provider>
//   </React.StrictMode>
// )

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

import React from "react"
import { createRoot } from "react-dom/client"
import "normalize.css"
import "./index.css"
import App from "./App"
import { store } from "./store"
import { Provider } from "react-redux"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
)
