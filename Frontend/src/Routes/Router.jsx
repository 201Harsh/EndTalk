import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Start from '../Pages/Start'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import ChatPage from '../Pages/ChatPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router