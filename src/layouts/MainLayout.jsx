import React from 'react'
import Header from '../components/Header.tsx'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='wrapper'>
      <Header/>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
