import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home  from "./pages/Home/Home"
import AboutUs from './pages/AboutUs/AboutUs'
import Navbar  from "./components/Navbar"
import RootPage from './Root'

const router = createBrowserRouter([
  {
    path:'/',
    element:<RootPage/>,
    children: [
      { path:'', element: <Home/>},
      { path: 'about-us', element: <AboutUs/>}
    ]
  }
])

function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App
