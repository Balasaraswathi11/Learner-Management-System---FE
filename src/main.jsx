import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './Components/context/UserContext.jsx'
import { CourseContextProvider } from './Components/context/CourseContext.jsx'

export const server="https://capstone-project-lms-be.onrender.com"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
    <App />
    </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
