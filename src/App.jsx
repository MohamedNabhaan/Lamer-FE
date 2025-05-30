import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs, { loader as teamLoader } from "./pages/AboutUs/AboutUs";
import RootPage from "./Root";
import Services, { loader as servicesLoader } from "./pages/Services/Services";
import Clients, { publicClientsLoader } from "./pages/Clients/Clients";
import Careers from "./pages/Careers/Careers";
import Projects from "./pages/Projects/Projects";
import ProjectView from "./pages/Projects/ProjectView";
import AdminProjects, {
  projectsLoader,
  action as deleteProject,
} from "./pages/AdminPages/AdminProjects/AdminProjects";
import { checkAuthLoader } from "./utils/auth";
import AdminCareers, {
  vacanciesLoader,
  action as deleteVacancy,
} from "./pages/AdminPages/AdminCareers/AdminCareers";
import AdminClients, {
  clientsLoader,
  action as deleteClient,
} from "./pages/AdminPages/AdminClients/AdminClients";
import AdminTeam, {
  employeesLoader,
  action as deleteEmployee,
} from "./pages/AdminPages/AdminTeam/AdminTeam";
import AdminPrograms, {
  programsLoader,
  action as deleteProgram,
} from "./pages/AdminPages/AdminPrograms/AdminPrograms";
import AdminServices, {
  servicesLoader as serviceAdminLoader,
  action as deleteService,
} from "./pages/AdminPages/AdminServices/AdminServices";
import AdminResearch, {
  researchAdminLoader,
  action as deleteResearch,
} from "./pages/AdminPages/AdminResearch/AdminResearch";
import AdminEquipment, {
  equipmentAdminLoader,
  action as deleteEquipment,
} from "./pages/AdminPages/AdminEquipment/AdminEquipment";
import AdminDash, { action as logOutAction } from "./AdminDash";
import LoginPage, { action as authAction } from "./pages/LoginPage/Login";
import ContactUs from "./pages/ContactUs/ContactUs";
import EditForm, { action as editAction } from "./components/EditForm";
import { projectLoader } from "./utils/project";
import AddForm, { action as AddAction } from "./components/AddForm";
import VacancyEditForm, {
  action as editVacancyAction,
  vacancyLoader,
} from "./components/VacancyEditForm";
import VacancyAddForm, {
  action as addVacancyAction,
} from "./components/VacancyAddForm";
import ClientAddForm, {
  action as addClientAction,
} from "./components/ClientAddForm";
import EmployeeAddForm, {
  action as addEmployeeAction,
} from "./components/EmployeeAddForm";
import EmployeeEditForm, {
  action as editEmployeeAction,
  employeeLoader,
} from "./components/EmployeeEditForm";
import ProgramAddForm, {
  action as addProgramAction,
} from "./components/ProgramAddForm";
import ProgramEditForm, {
  action as editProgramAction,
  programLoader,
} from "./components/ProgramEditForm";
import ServiceAddForm, {
  action as addServiceAction,
} from "./components/ServiceAddForm";
import ServiceEditForm, {
  action as editServiceAction,
  serviceLoader as adminServiceLoader,
} from "./components/ServiceEditForm";
import ResearchAddForm, {
  action as addResearchAction,
} from "./components/ResearchAddForm";
import ResearchEditForm, {
  action as editResearchAction,
  researchItemLoader,
} from "./components/ResearchEditForm";
import EquipmentAddForm, {
  action as addEquipmentAction,
} from "./components/EquipmentAddForm";
import EquipmentEditForm, {
  action as editEquipmentAction,
  equipmentItemLoader,
} from "./components/EquipmentEditForm";
import SIRC, { loader as SIRCLoader } from "./pages/SIRC/SIRC";
import ServicePage from "./pages/ServicePage/ServicePage";
import { serviceLoader } from "./utils/service";
import Vacancies, {
  loader as vacanciesLoaderPage,
} from "./pages/Careers/Vacancies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "Services", element: <Services />, loader: servicesLoader },
      { path: "Services/:id", element: <ServicePage />, loader: serviceLoader },
      { path: "Clients", element: <Clients />, loader: publicClientsLoader },
      {
        path: "Projects",
        element: <Projects />,
      },
      {
        path: "Projects/:id",
        element: <ProjectView />,
        loader: projectLoader,
      },
      { path: "AboutUs", element: <AboutUs />, loader: teamLoader },
      { path: "Careers", element: <Careers /> },
      {
        path: "Careers/Vacancies",
        element: <Vacancies />,
        loader: vacanciesLoaderPage,
      },
      { path: "ContactUs", element: <ContactUs /> },
      { path: "SIRC", element: <SIRC />, loader: SIRCLoader },
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
                path: ":id/destroy",
                action: deleteProject,
              },
            ],
          },
          {
            path: "Projects/Edit/:id",
            element: <EditForm />,
            loader: projectLoader,
            action: editAction,
          },
          {
            path: "Projects/Create",
            element: <AddForm />,
            action: AddAction,
          },
          {
            path: "Careers",
            element: <AdminCareers />,
            loader: vacanciesLoader,
            children: [{ path: ":id/destroy", action: deleteVacancy }],
          },
          {
            path: "Careers/Edit/:id",
            element: <VacancyEditForm />,
            loader: vacancyLoader,
            action: editVacancyAction,
          },
          {
            path: "Careers/Create",
            element: <VacancyAddForm />,
            action: addVacancyAction,
          },
          {
            path: "Clients",
            element: <AdminClients />,
            loader: clientsLoader,
            children: [{ path: ":id/destroy", action: deleteClient }],
          },
          {
            path: "Clients/Create",
            element: <ClientAddForm />,
            action: addClientAction,
          },
          {
            path: "Team",
            element: <AdminTeam />,
            loader: employeesLoader,
            children: [{ path: ":id/destroy", action: deleteEmployee }],
          },
          {
            path: "Team/Create",
            element: <EmployeeAddForm />,
            action: addEmployeeAction,
          },
          {
            path: "Team/Edit/:id",
            element: <EmployeeEditForm />,
            loader: employeeLoader,
            action: editEmployeeAction,
          },
          {
            path: "Programs",
            element: <AdminPrograms />,
            loader: programsLoader,
            children: [{ path: ":id/destroy", action: deleteProgram }],
          },
          {
            path: "Programs/Create",
            element: <ProgramAddForm />,
            action: addProgramAction,
          },
          {
            path: "Programs/Edit/:id",
            element: <ProgramEditForm />,
            loader: programLoader,
            action: editProgramAction,
          },
          {
            path: "Services",
            element: <AdminServices />,
            loader: serviceAdminLoader,
            children: [{ path: ":id/destroy", action: deleteService }],
          },
          {
            path: "Services/Create",
            element: <ServiceAddForm />,
            action: addServiceAction,
          },
          {
            path: "Services/Edit/:id",
            element: <ServiceEditForm />,
            loader: adminServiceLoader,
            action: editServiceAction,
          },
          {
            path: "Research",
            element: <AdminResearch />,
            loader: researchAdminLoader,
            children: [{ path: ":id/destroy", action: deleteResearch }],
          },
          {
            path: "Research/Create",
            element: <ResearchAddForm />,
            action: addResearchAction,
          },
          {
            path: "Research/Edit/:id",
            element: <ResearchEditForm />,
            loader: researchItemLoader,
            action: editResearchAction,
          },
          {
            path: "Equipment",
            element: <AdminEquipment />,
            loader: equipmentAdminLoader,
            children: [{ path: ":id/destroy", action: deleteEquipment }],
          },
          {
            path: "Equipment/Create",
            element: <EquipmentAddForm />,
            action: addEquipmentAction,
          },
          {
            path: "Equipment/Edit/:id",
            element: <EquipmentEditForm />,
            loader: equipmentItemLoader,
            action: editEquipmentAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
