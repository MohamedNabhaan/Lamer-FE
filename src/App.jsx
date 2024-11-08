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
  projectsLoader,
  action as deleteProject,
} from "./pages/AdminPages/AdminProjects/AdminProjects";
import { checkAuthLoader } from "./utils/auth";
import AdminCareers from "./pages/AdminPages/AdminCareers/AdminCareers";
import AdminClients from "./pages/AdminPages/AdminClients/AdminClients";
import AdminTeam from "./pages/AdminPages/AdminTeam/AdminTeam";
import AdminDash, { action as logOutAction } from "./AdminDash";
import LoginPage, { action as authAction } from "./pages/LoginPage/Login";
import ProjectModal from "./components/ProjectModal";
import ContactUs from "./pages/ContactUs/ContactUs";
import EditForm, { action as editAction } from "./components/EditForm";
import { projectLoader } from "./utils/project";
import AddForm, { action as AddAction } from "./components/AddForm";
import SIRC from "./pages/SIRC/SIRC";

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
        children: [
          { path: ":id", element: <ProjectModal />, loader: projectLoader },
        ],
      },
      { path: "AboutUs", element: <AboutUs /> },
      { path: "OurTeam", element: <Team /> },
      { path: "Careers", element: <Careers /> },
      { path: "ContactUs", element: <ContactUs /> },
      { path: "SIRC", element: <SIRC /> },
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
        loader: projectsLoader,

        children: [
          {
            path: ":id",
            element: <EditForm />,
            loader: projectLoader,
            action: editAction,
          },
          {
            path: ":id/destroy",

            action: deleteProject,
          },
        ],
      },
      { path: "Careers", element: <AdminCareers />, loader: checkAuthLoader },
      { path: "Clients", element: <AdminClients />, loader: checkAuthLoader },
      { path: "Team", element: <AdminTeam />, loader: checkAuthLoader },
      {
        path: "Projects/Create",
        element: <AddForm />,
        action: AddAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
