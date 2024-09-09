import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home  from "./pages/Home/Home"
import AboutUs from './pages/AboutUs/AboutUs'
import Navbar  from "./components/Navbar"
import RootPage from './Root'
import Services from './pages/Services/Services'
import Clients from './pages/Clients/Clients'
import Team from './pages/Team/Team'
import Careers from './pages/Careers/Careers'
import Projects from './pages/Projects/Projects'

const router = createBrowserRouter([
  {
    path:'/',
    element:<RootPage/>,
    children: [
      { path:'', element: <Home/>},
      { path:'Services', element: <Services/>},
      { path: 'Clients', element: <Clients/>},
      { path: 'Projects', element: <Projects/>},
      { path: 'AboutUs', element: <AboutUs/>},
      { path: 'OurTeam', element: <Team/>},
      { path: 'Careers', element: <Careers/>},
    ]
  }
])

function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App
