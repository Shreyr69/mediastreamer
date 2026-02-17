import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'


export default function Layout({children}) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div>{children}</div>
    </>
  )
}
