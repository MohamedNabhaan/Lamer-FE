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
import AdminProjects, {
  action as editProject,
} from "./pages/AdminPages/AdminProjects/AdminProjects";
import { checkAuthLoader } from "./utils/auth";
import AdminCareers from "./pages/AdminPages/AdminCareers/AdminCareers";
import AdminClients from "./pages/AdminPages/AdminClients/AdminClients";
import AdminTeam from "./pages/AdminPages/AdminTeam/AdminTeam";
import AdminDash, { action as logOutAction } from "./AdminDash";
import LoginPage, { action as authAction } from "./pages/LoginPage/Login";
import ProjectModal from "./components/ProjectModal";
import ContactUs from "./pages/ContactUs/ContactUs";
import EditForm from "./components/EditForm";
import { projectLoader } from "./utils/project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "Services", element: <Services /> },
      { path: "Clients", element: <Clients /> },
      {
        path: "Projects",
        element: <Projects />,
        children: [{ path: ":id", element: <ProjectModal /> }],
      },
      { path: "AboutUs", element: <AboutUs /> },
      { path: "OurTeam", element: <Team /> },
      { path: "Careers", element: <Careers /> },
      { path: "ContactUs", element: <ContactUs /> },
    ],
  },
  { path: "AdminLogin", element: <LoginPage />, action: authAction },
  {
    path: "Admin",
    element: <AdminDash />,
    loader: checkAuthLoader,
    action: logOutAction,
    children: [
      {
        path: "Projects",
        element: <AdminProjects />,
        loader: checkAuthLoader,
        children: [
          { path: ":id", element: <EditForm />, loader: projectLoader },
        ],
      },
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
