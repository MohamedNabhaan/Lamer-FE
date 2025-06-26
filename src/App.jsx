import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/Home/Home";
import AboutUs, { loader as teamLoader } from "./pages/AboutUs/AboutUs";
import RootPage from "./Root";
import Services, { loader as servicesLoader } from "./pages/Services/Services";
import Clients, { publicClientsLoader } from "./pages/Clients/Clients";
import Careers from "./pages/Careers/Careers";
import Projects from "./pages/Projects/Projects";
import ProjectView from "./pages/Projects/ProjectView";
import AdminProjects, {
  loader as projectsLoader,
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
  loader as employeesLoader,
  action as deleteEmployee,
} from "./pages/AdminPages/AdminTeam/AdminTeam";
import AdminPrograms, {
  loader as programsLoader,
  action as deleteProgram,
} from "./pages/AdminPages/AdminPrograms/AdminPrograms";
import AdminServices, {
  loader as serviceAdminLoader,
  action as deleteService,
} from "./pages/AdminPages/AdminServices/AdminServices";
import AdminResearch, {
  loader as researchAdminLoader,
  action as deleteResearch,
} from "./pages/AdminPages/AdminResearch/AdminResearch";
import AdminEquipment, {
  equipmentAdminLoader,
  action as deleteEquipment,
} from "./pages/AdminPages/AdminEquipment/AdminEquipment";
import AdminSites, {
  loader as sitesAdminLoader,
  action as deleteSite,
} from "./pages/AdminPages/AdminSites/AdminSites";
import AdminDash, { action as logOutAction } from "./AdminDash";
import LoginPage, { action as authAction } from "./pages/LoginPage/Login";
import SignUpPage, { action as signUpAction } from "./pages/SignUpPage/SignUp";
import AdminUnapprovedUsers, {
  loader as unapprovedUsersLoader,
} from "./pages/AdminPages/AdminUnapprovedUsers/AdminUnapprovedUsers";
import NoAccess from "./pages/AdminPages/NoAccess/NoAccess";
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
import SiteAddForm, {
  action as addSiteAction,
  loader as siteAddLoader,
} from "./components/SiteAddForm";
import SiteEditForm, {
  action as editSiteAction,
  siteLoader,
} from "./components/SiteEditForm";
import SIRC, { loader as SIRCLoader } from "./pages/SIRC/SIRC";
import ServicePage from "./pages/ServicePage/ServicePage";
import { serviceLoader } from "./utils/service";
import Vacancies, {
  loader as vacanciesLoaderPage,
} from "./pages/Careers/Vacancies";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/l4m3r-management-portal-auth",
    element: <LoginPage />,
    action: authAction,
  },
  {
    path: "/l4m3r-management-portal-signup",
    element: <SignUpPage />,
    action: signUpAction,
  },
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "", element: <Home />, loader: homeLoader },
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
      {
        path: "l4m3r-secure-dashboard-panel",
        element: <AdminDash />,
        loader: checkAuthLoader,
        action: logOutAction,
        children: [
          {
            path: "content-management",
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
            path: "content-management/modify/:id",
            element: <EditForm />,
            loader: projectLoader,
            action: editAction,
          },
          {
            path: "content-management/new",
            element: <AddForm />,
            action: AddAction,
          },
          {
            path: "position-listings",
            element: <AdminCareers />,
            loader: vacanciesLoader,
            children: [{ path: ":id/destroy", action: deleteVacancy }],
          },
          {
            path: "position-listings/modify/:id",
            element: <VacancyEditForm />,
            loader: vacancyLoader,
            action: editVacancyAction,
          },
          {
            path: "position-listings/new",
            element: <VacancyAddForm />,
            action: addVacancyAction,
          },
          {
            path: "client-registry",
            element: <AdminClients />,
            loader: clientsLoader,
            children: [{ path: ":id/destroy", action: deleteClient }],
          },
          {
            path: "client-registry/new",
            element: <ClientAddForm />,
            action: addClientAction,
          },
          {
            path: "personnel-management",
            element: <AdminTeam />,
            loader: employeesLoader,
            children: [{ path: ":id/destroy", action: deleteEmployee }],
          },
          {
            path: "personnel-management/new",
            element: <EmployeeAddForm />,
            action: addEmployeeAction,
          },
          {
            path: "personnel-management/modify/:id",
            element: <EmployeeEditForm />,
            loader: employeeLoader,
            action: editEmployeeAction,
          },
          {
            path: "academic-programs",
            element: <AdminPrograms />,
            loader: programsLoader,
            children: [{ path: ":id/destroy", action: deleteProgram }],
          },
          {
            path: "academic-programs/new",
            element: <ProgramAddForm />,
            action: addProgramAction,
          },
          {
            path: "academic-programs/modify/:id",
            element: <ProgramEditForm />,
            loader: programLoader,
            action: editProgramAction,
          },
          {
            path: "service-offerings",
            element: <AdminServices />,
            loader: serviceAdminLoader,
            children: [{ path: ":id/destroy", action: deleteService }],
          },
          {
            path: "service-offerings/new",
            element: <ServiceAddForm />,
            action: addServiceAction,
          },
          {
            path: "service-offerings/modify/:id",
            element: <ServiceEditForm />,
            loader: adminServiceLoader,
            action: editServiceAction,
          },
          {
            path: "research-publications",
            element: <AdminResearch />,
            loader: researchAdminLoader,
            children: [{ path: ":id/destroy", action: deleteResearch }],
          },
          {
            path: "research-publications/new",
            element: <ResearchAddForm />,
            action: addResearchAction,
          },
          {
            path: "research-publications/modify/:id",
            element: <ResearchEditForm />,
            loader: researchItemLoader,
            action: editResearchAction,
          },
          {
            path: "laboratory-assets",
            element: <AdminEquipment />,
            loader: equipmentAdminLoader,
            children: [{ path: ":id/destroy", action: deleteEquipment }],
          },
          {
            path: "laboratory-assets/new",
            element: <EquipmentAddForm />,
            action: addEquipmentAction,
          },
          {
            path: "laboratory-assets/modify/:id",
            element: <EquipmentEditForm />,
            loader: equipmentItemLoader,
            action: editEquipmentAction,
          },
          {
            path: "sirc-sites",
            element: <AdminSites />,
            loader: sitesAdminLoader,
            children: [{ path: ":id/destroy", action: deleteSite }],
          },
          {
            path: "sirc-sites/new",
            element: <SiteAddForm />,
            loader: siteAddLoader,
            action: addSiteAction,
          },
          {
            path: "sirc-sites/modify/:id",
            element: <SiteEditForm />,
            loader: siteLoader,
            action: editSiteAction,
          },
          {
            path: "user-approvals",
            element: <AdminUnapprovedUsers />,
            loader: unapprovedUsersLoader,
          },
          {
            path: "no-access",
            element: <NoAccess />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
