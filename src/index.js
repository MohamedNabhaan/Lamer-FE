import ceLogo from "./assets/services/ceSymbol.png";
import eeLogo from "./assets/services/eeSymbol.png";
import pmLogo from "./assets/services/pmSymbol.png";
import fiLogo from "./assets/services/fiSymbol.png";
import sLogo from "./assets/services/surSymbol.png";
import sheraton from "./assets/clients/sheraton.png";
import arc from "./assets/clients/arc.png";
import dhiraagu from "./assets/clients/dhiraagu.png";
import furaveri from "./assets/clients/furaveri.png";
import mtcc from "./assets/clients/mtcc.png";
import jbic from "./assets/clients/jbic.png";
import undp from "./assets/clients/undp.png";
import unops from "./assets/clients/unops.png";

import EIA from "./assets/servicepage/EIA.png";
import ECMT from "./assets/servicepage/ECMT.png";
import EMS from "./assets/servicepage/EMS.png";
import EMR from "./assets/servicepage/EMR.png";
import EEA from "./assets/servicepage/EEA.png";
import PM from "./assets/servicepage/pm.png";
import RSP from "./assets/servicepage/RSP.png";
import CEBR from "./assets/servicepage/CEBRR.png";
import CRHM from "./assets/servicepage/CRHM.png";
import RRR from "./assets/servicepage/RRR.png";
import LHOS from "./assets/servicepage/LHOS.png";
import ES from "./assets/servicepage/ES.png";
import FRM from "./assets/servicepage/FRM.png";
import associate1 from "./assets/aboutus/associate1.png";
import associate2 from "./assets/aboutus/associate2.png";
import hb from "./assets/founders/HB.jpg";
import drone from "./assets/tech/djiZenmuseL1.jpg";
import drone2 from "./assets/tech/drone2.png";
import apache3 from "./assets/tech/apache3.png";

export const CLIENTS = [
  dhiraagu,
  unops,
  sheraton,
  arc,
  furaveri,
  mtcc,
  jbic,
  undp,
];



export const NAV_ITEMS = [
  {
    label: "Home",
    path: "",
    subRoutes: [],
  },
  {
    label: "Services",
    path: "Services",
    subRoutes: [],
  },
  {
    label: "Projects",
    path: "Projects",
    subRoutes: ["/Projects", "/Clients"],
    children: [
      {
        label: "Projects",
        path: "Projects",
      },
      {
        label: "Clients",
        path: "Clients",
      },
    ],
  },
  {
    label: "About Us",
    path: "AboutUs",
    subRoutes: ["/AboutUs", "/OurTeam"],
    children: [
      {
        parent: "About Us",
        label: "About Us",
        path: "AboutUs",
      },
      {
        parent: "About Us",
        label: "Our Team",
        path: "OurTeam",
      },
    ],
  },
  {
    label: "Careers",
    path: "Careers",
    subRoutes: [],
  },
];

export const SERVICES = [
  {
    label: "Coastal Engineering",
    path: "CE",
    img: ceLogo,
  },
  {
    label: "Enviromental Engineering",
    path: "EE",
    img: eeLogo,
  },
  {
    label: "Surveying",
    path: "S",
    img: sLogo,
  },
  {
    label: "Fisheries Resource Management",
    path: "FRM",
    img: fiLogo,
  },
];

export const SERVICE_DETAILS = [
  {
    label: "Coastal Engineering",
    path: "CE",
    description:
      "LAMER has assisted in large reclamation projects with designing of islands that are newly reclaimed from shallow lagoons aided by physical and numerical modeling with due consideration given to elevation with respect to climate and elevated sea level. We also provide shore protection designs, erosion control measures, beach protection and maintenance measures.",
    img: CEBR,
  },
  {
    label: "Environmental Engineering",
    path: "EE",
    description:
      "Environmental monitoring is a tool for detecting improvements or degradation in the health of ecosystems. Environmental impact monitoring is thus planned, systematic collection of environmental data to meet specific objectives and environmental needs. Monitoring combined with enforcement ensures proper functioning of environmental protection measures prescribed for development projects or activities. Monitoring is conducted to assess the status of the environment and to protect against potential damage from various development impacts on the natural and socioeconomic environment. Our team of expertise have been engaged in environmental compliance reporting for various clients.",
    img: EMR,
  },

  {
    label: "Surveying",
    path: "S",
    description:
      "We provide a wide array of surveys ranging from topographic, hydrographic and oceanographic surveys as required for the specific nature of projects. At LAMER land surveys are carried out using state of the art Topcon GNSS Positioning System and for high canopy areas Topcon Total Stations providing output to optimum accuracy. Hydrographic surveys are carried out using OHMEX Single beam echo-sounder integrated with high precision Topcon GNSS Positioning System. Datum for hydrographic surveys is Mean Sea Level which is determined by collecting local tide data using RBR tide gauges. Oceanographic survey is the study of oceanographic conditions with reference to physical, chemical, biological and geological, and other properties of the ocean. At LAMER, oceanographic surveys we provide include wave measurements, tide and ocean current measurements to develop models and study the effects of marine construction works ranging from dredging and reclamation, coastal protection and other types of marine constructions. We also have instruments to measure and monitor physical and chemical properties of marine and freshwater.",
    img: LHOS,
  },
  {
    label: "Fisheries Resources Management",
    path: "FRM",
    description:
      "Fisheries is one of the key income avenues of the Maldivian economy and hence proper management of this industry is crucial for its sustainability in the long term. Proper management can only be attained through long term assessment of fisheries to properly understand the changes it undergoes. The technical team have diverse range of expertise in various aspects of the marine environment. Our team have been involved in various resource assessments, inclusive of fisheries assessments, both through the company and other capacities. We have a strong background in assessment of fisheries resources, through collection and analysis of fishery-dependent and fishery- independent data as well as through consultation with key stakeholders.",
    img: FRM,
  },
];

export const ABOUT_US = {
  history:
    "Founded in the year 2000, Land and Marine Environmental Resource(LAMER) Group is one of the first environmental consultancy firms established in the Maldives, specializing in environmental assessment andmanagement, community consultation, and land use planning. Providing a wide range of services and practical solutions to the public and private sector. It employs qualified urban planners, community consultation specialists, experienced environmental specialists and auditors. Our team has extensive experience with major state, private sector projects in the country and a few international development projects.",
  vision:
    " is to strive to continue as a leading environmental consultancy firm assisted by science and its application for sound and informed environmental management and governance.",
  missionValues: [
    "Honesty and transparency in all our business.",
    "Maintain professional integrity and deliver on our commitments.",
    "Consulting and services based on best practice techniques,innovation and quality information.",
    "Safety and health of our staff and client will never be compromised.",
    "We strive to maintain a workplace culture based on mutual respectand achieving positive outcomes for our clients and the environmentin general.",
  ],
  relatedEstablishment: [associate1, associate2],
};

export const ADMIN_NAV_ITEMS = [
  {
    label: "Projects",
    path: "Projects",
    subRoutes: [],
  },
  {
    label: "Clients",
    path: "Clients",
    subRoutes: [],
  },
  {
    label: "Team",
    path: "Team",
    subRoutes: [],
  },
  {
    label: "Careers",
    path: "Careers",
    subRoutes: [],
  },
];

export const PROJ_CATEGORIES = [
  {
    label: "Environmental and Social Impact Assessment",
    value: "EIA",
  },
  {
    label: "Environmental conservation and management training",
    value: "ECMT",
  },
  {
    label: "Environmental management systems",
    value: "EMS",
  },
  {
    label: "Environmental Monitoring and Reporting",
    value: "EMR",
  },
  {
    label: "Environmental Education and Awareness",
    value: "EEA",
  },
  {
    label: "Project Management",
    value: "PM",
  },
  {
    label: "Resiliant Planning and Sustainable Development",
    value: "RSP",
  },
  {
    label: "Coastal engineering, beach replenishment and restoration",
    value: "CEBR",
  },
  {
    label: "Coastal and Reef Habitat Mapping",
    value: "CRHM",
  },
  {
    label: "Reef rehabilitation and restoration",

    value: "RRR",
  },
  {
    label: "Land, Hydrographic & Oceanographic Surveys",

    value: "LHOS",
  },
  {
    label: "Ecological Surveys",
    value: "ES",
  },
  {
    label: "Fisheries resources assessment",
    value: "FRM",
  },
];

export const FOUNDERS = [
  {
    name: "Hussein Zahir",
    title: "Executive Director / Co-Founder",
    credentials: ["MPhil in Coral Reef Ecology "],
    experience: "25",
    picture: hb,
  },
  {
    name: "Mohamed Aslam",
    title: "Co-Founder / Consultant",
    credentials: [
      "MSc in Geography ",
      "Bsc(Honors) in Geological Oceanography",
    ],

    experience: "27",
    picture: hb,
  },
  {
    name: "Ismail Abid",
    title: "Managing Director",
    credentials: ['Worked on Numerous Successfull Projects'],
    experience: "25",
    picture: hb,
  },
];

export const TECHNOLOGY = [
  { label: "DJI Zenmuse Li (Lidar)", use: "numericals", image: drone },
  { label: "CHCNAV Apache 3", use: "ewdwedwe", image: apache3 },
  {
    label: "Phantom 4 RTK drone with D-RTK 2 Mobile Station",
    use: "ewdwedwe",
    image: drone2,
  },
];
// const NAV_ITEMS = ['Home','Services','Projects','About Us','Career','Contact Us']

// const SUB_NAV_ITEMS = [
//     ABOUT_US = ["About Us","Our Team"],

// ]
