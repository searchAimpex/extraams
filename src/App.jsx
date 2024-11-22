import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
