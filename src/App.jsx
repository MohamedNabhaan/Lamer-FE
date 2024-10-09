import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import RootPage from "./Root";
import Services from "./pages/Services/Services";
import Clients from "./pages/Clients/Clients";
import Team from "./pages/Team/Team";
import Careers from "./pages/Careers/Careers";
import Projects from "./pages/Projects/Projects";

import AdminProjects from "./pages/AdminPages/AdminProjects";
import { checkAuthLoader } from "./utils/auth";
import AdminCareers from "./pages/AdminPages/AdminCareers";
import AdminClients from "./pages/AdminPages/AdminClients";
import AdminTeam from "./pages/AdminPages/AdminTeam";
import AdminDash, { action as logOutAction } from "./AdminDash";
import LoginPage, { action as authAction } from "./pages/LoginPage/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "Services", element: <Services /> },
      { path: "Clients", element: <Clients /> },
      { path: "Projects", element: <Projects /> },
      { path: "AboutUs", element: <AboutUs /> },
      { path: "OurTeam", element: <Team /> },
      { path: "Careers", element: <Careers /> },
    ],
  },
  { path: "Admin", element: <LoginPage />, action: authAction },
  {
    path: "AdminDash",
    element: <AdminDash />,
    loader: checkAuthLoader,
    action: logOutAction,
    children: [
      { path: "Projects", element: <AdminProjects />, loader: checkAuthLoader },
      { path: "Careers", element: <AdminCareers />, loader: checkAuthLoader },
      { path: "Clients", element: <AdminClients />, loader: checkAuthLoader },
      { path: "Team", element: <AdminTeam />, loader: checkAuthLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
