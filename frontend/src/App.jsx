import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import SignUpPage from './pages/auth/signup/SignUpPage'
import LoginPage from './pages/auth/login/LoginPage'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'
import { Navigate } from'react-router-dom'

function App() {
  const {data:authUser,isLoading} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if(data.error) return null;
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
          console.log("authUser is here: ",data)
        return data;
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    retry: false,
  })
  if(isLoading) {
    return <div className='h-screen flex justify-center items-center'>
      <LoadingSpinner size='lg' />
    </div>
  }
  return (
    <div className='min-h-screen bg-black'>
      <div className='flex max-w-6xl mx-auto'>
        <Toaster position="top-center" />
        {authUser && <Sidebar />}
        <Routes>
          <Route path='/' element={authUser? <HomePage /> : <Navigate to="/login"/>} />
          <Route path='/signup' element={!authUser? <SignUpPage /> : <Navigate to="/"/>} />
          <Route path='/login' element={!authUser? <LoginPage /> : <Navigate to="/"/>} />
          <Route path='/notifications' element={authUser ? <NotificationPage />:<Navigate to="/login"/>} />
          <Route path='/profile/:username' element={authUser ? <ProfilePage />:<Navigate to="/login"/>} />
        </Routes>
        {authUser && <RightPanel />}
      </div>
    </div>
  )
}

export default App
