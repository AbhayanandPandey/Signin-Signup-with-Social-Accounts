import { useState } from 'react'
import React from 'react'
import Login from './Pages/login'
import Register from './Pages/signup'
import Dashboard from './Pages/dashboard'
import Forgot from './Pages/forgotPassword'
import ProtectedRoute from './components/PrivateRouter'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
