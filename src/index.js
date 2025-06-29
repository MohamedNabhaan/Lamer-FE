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
import drone from "./assets/tech/drone2.png";
import drone2 from "./assets/tech/zenmuse.png";
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
    path: "/",
    subRoutes: [],
  },
  {
    label: "Services",
    path: "Services",
    subRoutes: [],
  },
  {
    label: "Projects",
    path: "",
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
    label: "SIRC",
    path: "SIRC",
    subRoutes: [],
  },
  {
    label: "About Us",
    path: "AboutUs",
    subRoutes: [],
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
    "We strive to maintain a workplace culture based on mutual respect and achieving positive outcomes for our clients and the environment in general.",
  ],
  relatedEstablishment: [associate1, associate2],
};

export const ADMIN_NAV_ITEMS = [
  {
    label: "Projects",
    path: "",
    subRoutes: [
      "/l4m3r-secure-dashboard-panel/content-management",
      "/l4m3r-secure-dashboard-panel/client-registry",
    ],
    children: [
      {
        label: "Projects",
        path: "content-management",
      },
      {
        label: "Clients",
        path: "client-registry",
      },
    ],
  },
  {
    label: "Services",
    path: "service-offerings",
    subRoutes: [],
  },
  {
    label: "Team",
    path: "personnel-management",
    subRoutes: [],
  },
  {
    label: "Careers",
    path: "position-listings",
    subRoutes: [],
  },
  {
    label: "SIRC",
    path: "",
    subRoutes: [
      "/l4m3r-secure-dashboard-panel/academic-programs",
      "/l4m3r-secure-dashboard-panel/research-publications",
      "/l4m3r-secure-dashboard-panel/laboratory-assets",
      "/l4m3r-secure-dashboard-panel/sirc-sites",
    ],
    children: [
      {
        label: "Programs",
        path: "academic-programs",
      },
      {
        label: "Research",
        path: "research-publications",
      },
      {
        label: "Equipment",
        path: "laboratory-assets",
      },
      {
        label: "Sites",
        path: "sirc-sites",
      },
    ],
  },
];

// Static SIRC Sites Reference Data (original static data preserved)
export const STATIC_SIRC_SITES = [
  {
    name: "GDh. Mahutigala",
    image: "/src/assets/SIRC/Maahutigalaa.png",
    description:
      "Primary research station with comprehensive facilities for marine biology studies and coral reef research.",
    features: ["Coral Reef Systems", "Marine Biology Lab", "Accommodation"],
  },
  {
    name: "GDh. Hoothodaa",
    image: "/src/assets/SIRC/Hoothodaa.png",
    description:
      "Specialized site for island morphology studies and coastal erosion research with pristine natural conditions.",
    features: [
      "Coastal Studies",
      "Morphology Research",
      "Natural Preservation",
    ],
  },
  {
    name: "GDh. Faathiyehutta",
    image: "/src/assets/SIRC/Faathiyehuttaa.png",
    description:
      "Climate change research hub focusing on sea level rise impact and environmental monitoring.",
    features: [
      "Climate Research",
      "Environmental Monitoring",
      "Data Collection",
    ],
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
    credentials: ["Worked on Numerous Successfull Projects"],
    experience: "25",
    picture: hb,
  },
];
export const COUNTRIES = [
  { name: "Afghanistan", flag: "🇦🇫", code: "AF", dial_code: "+93" },
  { name: "Åland Islands", flag: "🇦🇽", code: "AX", dial_code: "+358" },
  { name: "Albania", flag: "🇦🇱", code: "AL", dial_code: "+355" },
  { name: "Algeria", flag: "🇩🇿", code: "DZ", dial_code: "+213" },
  {
    name: "American Samoa",
    flag: "🇦🇸",
    code: "AS",
    dial_code: "+1684",
  },
  { name: "Andorra", flag: "🇦🇩", code: "AD", dial_code: "+376" },
  { name: "Angola", flag: "🇦🇴", code: "AO", dial_code: "+244" },
  { name: "Anguilla", flag: "🇦🇮", code: "AI", dial_code: "+1264" },
  { name: "Antarctica", flag: "🇦🇶", code: "AQ", dial_code: "+672" },
  {
    name: "Antigua and Barbuda",
    flag: "🇦🇬",
    code: "AG",
    dial_code: "+1268",
  },
  { name: "Argentina", flag: "🇦🇷", code: "AR", dial_code: "+54" },
  { name: "Armenia", flag: "🇦🇲", code: "AM", dial_code: "+374" },
  { name: "Aruba", flag: "🇦��", code: "AW", dial_code: "+297" },
  { name: "Australia", flag: "🇦🇺", code: "AU", dial_code: "+61" },
  { name: "Austria", flag: "🇦🇹", code: "AT", dial_code: "+43" },
  { name: "Azerbaijan", flag: "🇦🇿", code: "AZ", dial_code: "+994" },
  { name: "Bahamas", flag: "🇧🇸", code: "BS", dial_code: "+1242" },
  { name: "Bahrain", flag: "🇧🇭", code: "BH", dial_code: "+973" },
  { name: "Bangladesh", flag: "🇧🇩", code: "BD", dial_code: "+880" },
  { name: "Barbados", flag: "🇧🇧", code: "BB", dial_code: "+1246" },
  { name: "Belarus", flag: "🇧🇾", code: "BY", dial_code: "+375" },
  { name: "Belgium", flag: "🇧🇪", code: "BE", dial_code: "+32" },
  { name: "Belize", flag: "🇧🇿", code: "BZ", dial_code: "+501" },
  { name: "Benin", flag: "🇧🇯", code: "BJ", dial_code: "+229" },
  { name: "Bermuda", flag: "🇧🇲", code: "BM", dial_code: "+1441" },
  { name: "Bhutan", flag: "🇧🇹", code: "BT", dial_code: "+975" },
  {
    name: "Bolivia, Plurinational State of bolivia",
    flag: "🇧🇴",
    code: "BO",
    dial_code: "+591",
  },
  {
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    code: "BA",
    dial_code: "+387",
  },
  { name: "Botswana", flag: "🇧🇼", code: "BW", dial_code: "+267" },
  { name: "Bouvet Island", flag: "🇧🇻", code: "BV", dial_code: "+47" },
  { name: "Brazil", flag: "🇧🇷", code: "BR", dial_code: "+55" },
  {
    name: "British Indian Ocean Territory",
    flag: "🇮🇴",
    code: "IO",
    dial_code: "+246",
  },
  {
    name: "Brunei Darussalam",
    flag: "🇧🇳",
    code: "BN",
    dial_code: "+673",
  },
  { name: "Bulgaria", flag: "🇧🇬", code: "BG", dial_code: "+359" },
  { name: "Burkina Faso", flag: "🇧🇫", code: "BF", dial_code: "+226" },
  { name: "Burundi", flag: "🇧🇮", code: "BI", dial_code: "+257" },
  { name: "Cambodia", flag: "🇰🇭", code: "KH", dial_code: "+855" },
  { name: "Cameroon", flag: "🇨🇲", code: "CM", dial_code: "+237" },
  { name: "Canada", flag: "🇨🇦", code: "CA", dial_code: "+1" },
  { name: "Cape Verde", flag: "🇨🇻", code: "CV", dial_code: "+238" },
  { name: "Cayman Islands", flag: "🇰🇾", code: "KY", dial_code: "+345" },
  {
    name: "Central African Republic",
    flag: "🇨🇫",
    code: "CF",
    dial_code: "+236",
  },
  { name: "Chad", flag: "🇹🇩", code: "TD", dial_code: "+235" },
  { name: "Chile", flag: "🇨🇱", code: "CL", dial_code: "+56" },
  { name: "China", flag: "🇨🇳", code: "CN", dial_code: "+86" },
  {
    name: "Christmas Island",
    flag: "🇨🇽",
    code: "CX",
    dial_code: "+61",
  },
  {
    name: "Cocos (Keeling) Islands",
    flag: "🇨🇨",
    code: "CC",
    dial_code: "+61",
  },
  { name: "Colombia", flag: "🇨🇴", code: "CO", dial_code: "+57" },
  { name: "Comoros", flag: "🇰🇲", code: "KM", dial_code: "+269" },
  { name: "Congo", flag: "🇨🇬", code: "CG", dial_code: "+242" },
  {
    name: "Congo, The Democratic Republic of the Congo",
    flag: "🇨🇩",
    code: "CD",
    dial_code: "+243",
  },
  { name: "Cook Islands", flag: "🇨🇰", code: "CK", dial_code: "+682" },
  { name: "Costa Rica", flag: "🇨🇷", code: "CR", dial_code: "+506" },
  { name: "Cote d'Ivoire", flag: "🇨🇮", code: "CI", dial_code: "+225" },
  { name: "Croatia", flag: "🇭🇷", code: "HR", dial_code: "+385" },
  { name: "Cuba", flag: "🇨🇺", code: "CU", dial_code: "+53" },
  { name: "Cyprus", flag: "🇨🇾", code: "CY", dial_code: "+357" },
  { name: "Czech Republic", flag: "🇨🇿", code: "CZ", dial_code: "+420" },
  { name: "Denmark", flag: "🇩🇰", code: "DK", dial_code: "+45" },
  { name: "Djibouti", flag: "🇩🇯", code: "DJ", dial_code: "+253" },
  { name: "Dominica", flag: "🇩🇲", code: "DM", dial_code: "+1767" },
  {
    name: "Dominican Republic",
    flag: "🇩🇴",
    code: "DO",
    dial_code: "+1849",
  },
  { name: "Ecuador", flag: "🇪🇨", code: "EC", dial_code: "+593" },
  { name: "Egypt", flag: "🇪🇬", code: "EG", dial_code: "+20" },
  { name: "El Salvador", flag: "🇸🇻", code: "SV", dial_code: "+503" },
  {
    name: "Equatorial Guinea",
    flag: "🇬🇶",
    code: "GQ",
    dial_code: "+240",
  },
  { name: "Eritrea", flag: "🇪🇷", code: "ER", dial_code: "+291" },
  { name: "Estonia", flag: "🇪🇪", code: "EE", dial_code: "+372" },
  { name: "Ethiopia", flag: "🇪🇹", code: "ET", dial_code: "+251" },
  {
    name: "Falkland Islands (Malvinas)",
    flag: "🇫🇰",
    code: "FK",
    dial_code: "+500",
  },
  { name: "Faroe Islands", flag: "🇫🇴", code: "FO", dial_code: "+298" },
  { name: "Fiji", flag: "🇫🇯", code: "FJ", dial_code: "+679" },
  { name: "Finland", flag: "🇫🇮", code: "FI", dial_code: "+358" },
  { name: "France", flag: "🇫🇷", code: "FR", dial_code: "+33" },
  { name: "French Guiana", flag: "🇬🇫", code: "GF", dial_code: "+594" },
  {
    name: "French Polynesia",
    flag: "🇵🇫",
    code: "PF",
    dial_code: "+689",
  },
  {
    name: "French Southern Territories",
    flag: "🇹🇫",
    code: "TF",
    dial_code: "+262",
  },
  { name: "Gabon", flag: "🇬🇦", code: "GA", dial_code: "+241" },
  { name: "Gambia", flag: "🇬🇲", code: "GM", dial_code: "+220" },
  { name: "Georgia", flag: "🇬🇪", code: "GE", dial_code: "+995" },
  { name: "Germany", flag: "🇩🇪", code: "DE", dial_code: "+49" },
  { name: "Ghana", flag: "🇬🇭", code: "GH", dial_code: "+233" },
  { name: "Gibraltar", flag: "🇬🇮", code: "GI", dial_code: "+350" },
  { name: "Greece", flag: "🇬🇷", code: "GR", dial_code: "+30" },
  { name: "Greenland", flag: "🇬🇱", code: "GL", dial_code: "+299" },
  { name: "Grenada", flag: "🇬🇩", code: "GD", dial_code: "+1473" },
  { name: "Guadeloupe", flag: "🇬🇵", code: "GP", dial_code: "+590" },
  { name: "Guam", flag: "🇬🇺", code: "GU", dial_code: "+1671" },
  { name: "Guatemala", flag: "🇬🇹", code: "GT", dial_code: "+502" },
  { name: "Guernsey", flag: "🇬🇬", code: "GG", dial_code: "+44" },
  { name: "Guinea", flag: "🇬🇳", code: "GN", dial_code: "+224" },
  { name: "Guinea-Bissau", flag: "🇬🇼", code: "GW", dial_code: "+245" },
  { name: "Guyana", flag: "🇬🇾", code: "GY", dial_code: "+592" },
  { name: "Haiti", flag: "🇭🇹", code: "HT", dial_code: "+509" },
  {
    name: "Heard Island and Mcdonald Islands",
    flag: "🇭🇲",
    code: "HM",
    dial_code: "+672",
  },
  {
    name: "Holy See (Vatican City State)",
    flag: "🇻🇦",
    code: "VA",
    dial_code: "+379",
  },
  { name: "Honduras", flag: "🇭🇳", code: "HN", dial_code: "+504" },
  { name: "Hong Kong", flag: "🇭🇰", code: "HK", dial_code: "+852" },
  { name: "Hungary", flag: "🇭🇺", code: "HU", dial_code: "+36" },
  { name: "Iceland", flag: "🇮🇸", code: "IS", dial_code: "+354" },
  { name: "India", flag: "🇮🇳", code: "IN", dial_code: "+91" },
  { name: "Indonesia", flag: "🇮🇩", code: "ID", dial_code: "+62" },
  {
    name: "Iran, Islamic Republic of Persian Gulf",
    flag: "🇮🇷",
    code: "IR",
    dial_code: "+98",
  },
  { name: "Iraq", flag: "🇮🇶", code: "IQ", dial_code: "+964" },
  { name: "Ireland", flag: "🇮🇪", code: "IE", dial_code: "+353" },
  { name: "Isle of Man", flag: "🇮🇲", code: "IM", dial_code: "+44" },
  { name: "Israel", flag: "🇮🇱", code: "IL", dial_code: "+972" },
  { name: "Italy", flag: "🇮🇹", code: "IT", dial_code: "+39" },
  { name: "Jamaica", flag: "🇯🇲", code: "JM", dial_code: "+1876" },
  { name: "Japan", flag: "🇯🇵", code: "JP", dial_code: "+81" },
  { name: "Jersey", flag: "🇯🇪", code: "JE", dial_code: "+44" },
  { name: "Jordan", flag: "🇯🇴", code: "JO", dial_code: "+962" },
  { name: "Kazakhstan", flag: "🇰🇿", code: "KZ", dial_code: "+7" },
  { name: "Kenya", flag: "🇰🇪", code: "KE", dial_code: "+254" },
  { name: "Kiribati", flag: "🇰🇮", code: "KI", dial_code: "+686" },
  {
    name: "Korea, Democratic People's Republic of Korea",
    flag: "🇰🇵",
    code: "KP",
    dial_code: "+850",
  },
  {
    name: "Korea, Republic of South Korea",
    flag: "🇰🇷",
    code: "KR",
    dial_code: "+82",
  },
  { name: "Kosovo", flag: "🇽🇰", code: "XK", dial_code: "+383" },
  { name: "Kuwait", flag: "🇰🇼", code: "KW", dial_code: "+965" },
  { name: "Kyrgyzstan", flag: "🇰🇬", code: "KG", dial_code: "+996" },
  { name: "Laos", flag: "🇱🇦", code: "LA", dial_code: "+856" },
  { name: "Latvia", flag: "🇱🇻", code: "LV", dial_code: "+371" },
  { name: "Lebanon", flag: "🇱🇧", code: "LB", dial_code: "+961" },
  { name: "Lesotho", flag: "🇱🇸", code: "LS", dial_code: "+266" },
  { name: "Liberia", flag: "🇱🇷", code: "LR", dial_code: "+231" },
  {
    name: "Libyan Arab Jamahiriya",
    flag: "🇱🇾",
    code: "LY",
    dial_code: "+218",
  },
  { name: "Liechtenstein", flag: "🇱🇮", code: "LI", dial_code: "+423" },
  { name: "Lithuania", flag: "🇱🇻", code: "LT", dial_code: "+370" },
  { name: "Luxembourg", flag: "🇱🇺", code: "LU", dial_code: "+352" },
  { name: "Macao", flag: "🇲🇴", code: "MO", dial_code: "+853" },
  { name: "Macedonia", flag: "🇲🇰", code: "MK", dial_code: "+389" },
  { name: "Madagascar", flag: "🇲🇬", code: "MG", dial_code: "+261" },
  { name: "Malawi", flag: "🇲🇼", code: "MW", dial_code: "+265" },
  { name: "Malaysia", flag: "🇲🇾", code: "MY", dial_code: "+60" },
  { name: "Maldives", flag: "🇲🇻", code: "MV", dial_code: "+960" },
  { name: "Mali", flag: "🇲🇱", code: "ML", dial_code: "+223" },
  { name: "Malta", flag: "🇲🇹", code: "MT", dial_code: "+356" },
  {
    name: "Marshall Islands",
    flag: "🇲🇭",
    code: "MH",
    dial_code: "+692",
  },
  { name: "Martinique", flag: "🇲🇶", code: "MQ", dial_code: "+596" },
  { name: "Mauritania", flag: "🇲🇷", code: "MR", dial_code: "+222" },
  { name: "Mauritius", flag: "🇲🇺", code: "MU", dial_code: "+230" },
  { name: "Mayotte", flag: "🇾🇹", code: "YT", dial_code: "+262" },
  { name: "Mexico", flag: "🇲🇽", code: "MX", dial_code: "+52" },
  {
    name: "Micronesia, Federated States of Micronesia",
    flag: "🇫🇲",
    code: "FM",
    dial_code: "+691",
  },
  { name: "Moldova", flag: "🇲🇩", code: "MD", dial_code: "+373" },
  { name: "Monaco", flag: "🇲🇨", code: "MC", dial_code: "+377" },
  { name: "Mongolia", flag: "🇲🇳", code: "MN", dial_code: "+976" },
  { name: "Montenegro", flag: "🇲🇪", code: "ME", dial_code: "+382" },
  { name: "Montserrat", flag: "🇲🇸", code: "MS", dial_code: "+1664" },
  { name: "Morocco", flag: "🇲🇦", code: "MA", dial_code: "+212" },
  { name: "Mozambique", flag: "🇲🇿", code: "MZ", dial_code: "+258" },
  { name: "Myanmar", flag: "🇲🇲", code: "MM", dial_code: "+95" },
  { name: "Namibia", flag: "🇳🇦", code: "NA", dial_code: "+264" },
  { name: "Nauru", flag: "🇳🇷", code: "NR", dial_code: "+674" },
  { name: "Nepal", flag: "🇳🇵", code: "NP", dial_code: "+977" },
  { name: "Netherlands", flag: "🇳🇱", code: "NL", dial_code: "+31" },
  {
    name: "Netherlands Antilles",
    flag: "",
    code: "AN",
    dial_code: "+599",
  },
  { name: "New Caledonia", flag: "🇳🇨", code: "NC", dial_code: "+687" },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ", dial_code: "+64" },
  { name: "Nicaragua", flag: "🇳🇮", code: "NI", dial_code: "+505" },
  { name: "Niger", flag: "🇳🇪", code: "NE", dial_code: "+227" },
  { name: "Nigeria", flag: "🇳🇬", code: "NG", dial_code: "+234" },
  { name: "Niue", flag: "🇳🇺", code: "NU", dial_code: "+683" },
  { name: "Norfolk Island", flag: "🇳🇫", code: "NF", dial_code: "+672" },
  {
    name: "Northern Mariana Islands",
    flag: "🇲🇵",
    code: "MP",
    dial_code: "+1670",
  },
  { name: "Norway", flag: "🇳🇴", code: "NO", dial_code: "+47" },
  { name: "Oman", flag: "🇴🇲", code: "OM", dial_code: "+968" },
  { name: "Pakistan", flag: "🇵🇰", code: "PK", dial_code: "+92" },
  { name: "Palau", flag: "🇵🇼", code: "PW", dial_code: "+680" },
  {
    name: "Palestinian Territory, Occupied",
    flag: "🇵🇸",
    code: "PS",
    dial_code: "+970",
  },
  { name: "Panama", flag: "🇵🇦", code: "PA", dial_code: "+507" },
  {
    name: "Papua New Guinea",
    flag: "🇵🇬",
    code: "PG",
    dial_code: "+675",
  },
  { name: "Paraguay", flag: "🇵🇾", code: "PY", dial_code: "+595" },
  { name: "Peru", flag: "🇵🇪", code: "PE", dial_code: "+51" },
  { name: "Philippines", flag: "🇵🇭", code: "PH", dial_code: "+63" },
  { name: "Pitcairn", flag: "🇵🇳", code: "PN", dial_code: "+64" },
  { name: "Poland", flag: "🇵🇱", code: "PL", dial_code: "+48" },
  { name: "Portugal", flag: "🇵🇹", code: "PT", dial_code: "+351" },
  { name: "Puerto Rico", flag: "🇵🇷", code: "PR", dial_code: "+1939" },
  { name: "Qatar", flag: "🇶🇦", code: "QA", dial_code: "+974" },
  { name: "Romania", flag: "🇷🇴", code: "RO", dial_code: "+40" },
  { name: "Russia", flag: "🇷🇺", code: "RU", dial_code: "+7" },
  { name: "Rwanda", flag: "🇷🇼", code: "RW", dial_code: "+250" },
  { name: "Reunion", flag: "🇷🇪", code: "RE", dial_code: "+262" },
  {
    name: "Saint Barthelemy",
    flag: "🇧🇱",
    code: "BL",
    dial_code: "+590",
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    flag: "🇸🇭",
    code: "SH",
    dial_code: "+290",
  },
  {
    name: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    code: "KN",
    dial_code: "+1869",
  },
  { name: "Saint Lucia", flag: "🇱🇨", code: "LC", dial_code: "+1758" },
  { name: "Saint Martin", flag: "🇲🇫", code: "MF", dial_code: "+590" },
  {
    name: "Saint Pierre and Miquelon",
    flag: "🇵🇲",
    code: "PM",
    dial_code: "+508",
  },
  {
    name: "Saint Vincent and the Grenadines",
    flag: "🇻🇨",
    code: "VC",
    dial_code: "+1784",
  },
  { name: "Samoa", flag: "🇼🇸", code: "WS", dial_code: "+685" },
  { name: "San Marino", flag: "🇸🇲", code: "SM", dial_code: "+378" },
  {
    name: "Sao Tome and Principe",
    flag: "🇸🇹",
    code: "ST",
    dial_code: "+239",
  },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "SA", dial_code: "+966" },
  { name: "Senegal", flag: "🇸🇳", code: "SN", dial_code: "+221" },
  { name: "Serbia", flag: "🇷🇸", code: "RS", dial_code: "+381" },
  { name: "Seychelles", flag: "🇸🇨", code: "SC", dial_code: "+248" },
  { name: "Sierra Leone", flag: "🇸🇱", code: "SL", dial_code: "+232" },
  { name: "Singapore", flag: "🇸🇬", code: "SG", dial_code: "+65" },
  { name: "Slovakia", flag: "🇸🇰", code: "SK", dial_code: "+421" },
  { name: "Slovenia", flag: "🇸🇮", code: "SI", dial_code: "+386" },
  {
    name: "Solomon Islands",
    flag: "🇸🇧",
    code: "SB",
    dial_code: "+677",
  },
  { name: "Somalia", flag: "🇸🇴", code: "SO", dial_code: "+252" },
  { name: "South Africa", flag: "🇿🇦", code: "ZA", dial_code: "+27" },
  { name: "South Sudan", flag: "🇸🇸", code: "SS", dial_code: "+211" },
  {
    name: "South Georgia and the South Sandwich Islands",
    flag: "🇬🇸",
    code: "GS",
    dial_code: "+500",
  },
  { name: "Spain", flag: "🇪🇸", code: "ES", dial_code: "+34" },
  { name: "Sri Lanka", flag: "🇱🇰", code: "LK", dial_code: "+94" },
  { name: "Sudan", flag: "🇸🇩", code: "SD", dial_code: "+249" },
  { name: "Suriname", flag: "🇸🇷", code: "SR", dial_code: "+597" },
  {
    name: "Svalbard and Jan Mayen",
    flag: "🇸🇯",
    code: "SJ",
    dial_code: "+47",
  },
  { name: "Swaziland", flag: "🇸🇿", code: "SZ", dial_code: "+268" },
  { name: "Sweden", flag: "🇸🇪", code: "SE", dial_code: "+46" },
  { name: "Switzerland", flag: "🇨🇭", code: "CH", dial_code: "+41" },
  {
    name: "Syrian Arab Republic",
    flag: "🇸🇾",
    code: "SY",
    dial_code: "+963",
  },
  { name: "Taiwan", flag: "🇹🇼", code: "TW", dial_code: "+886" },
  { name: "Tajikistan", flag: "🇹🇯", code: "TJ", dial_code: "+992" },
  {
    name: "Tanzania, United Republic of Tanzania",
    flag: "🇹🇿",
    code: "TZ",
    dial_code: "+255",
  },
  { name: "Thailand", flag: "🇹🇭", code: "TH", dial_code: "+66" },
  { name: "Timor-Leste", flag: "🇹🇱", code: "TL", dial_code: "+670" },
  { name: "Togo", flag: "🇹🇬", code: "TG", dial_code: "+228" },
  { name: "Tokelau", flag: "🇹🇰", code: "TK", dial_code: "+690" },
  { name: "Tonga", flag: "🇹🇴", code: "TO", dial_code: "+676" },
  {
    name: "Trinidad and Tobago",
    flag: "🇹🇹",
    code: "TT",
    dial_code: "+1868",
  },
  { name: "Tunisia", flag: "🇹🇳", code: "TN", dial_code: "+216" },
  { name: "Turkey", flag: "🇹🇷", code: "TR", dial_code: "+90" },
  { name: "Turkmenistan", flag: "🇹🇲", code: "TM", dial_code: "+993" },
  {
    name: "Turks and Caicos Islands",
    flag: "🇹🇨",
    code: "TC",
    dial_code: "+1649",
  },
  { name: "Tuvalu", flag: "🇹🇻", code: "TV", dial_code: "+688" },
  { name: "Uganda", flag: "🇺🇬", code: "UG", dial_code: "+256" },
  { name: "Ukraine", flag: "🇺🇦", code: "UA", dial_code: "+380" },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    code: "AE",
    dial_code: "+971",
  },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB", dial_code: "+44" },
  { name: "United States", flag: "🇺🇸", code: "US", dial_code: "+1" },
  { name: "Uruguay", flag: "🇺🇾", code: "UY", dial_code: "+598" },
  { name: "Uzbekistan", flag: "🇺🇿", code: "UZ", dial_code: "+998" },
  { name: "Vanuatu", flag: "🇻🇺", code: "VU", dial_code: "+678" },
  {
    name: "Venezuela, Bolivarian Republic of Venezuela",
    flag: "🇻🇪",
    code: "VE",
    dial_code: "+58",
  },
  { name: "Vietnam", flag: "🇻🇳", code: "VN", dial_code: "+84" },
  {
    name: "Virgin Islands, British",
    flag: "🇻🇬",
    code: "VG",
    dial_code: "+1284",
  },
  {
    name: "Virgin Islands, U.S.",
    flag: "🇻🇮",
    code: "VI",
    dial_code: "+1340",
  },
  {
    name: "Wallis and Futuna",
    flag: "🇼🇫",
    code: "WF",
    dial_code: "+681",
  },
  { name: "Yemen", flag: "🇾🇪", code: "YE", dial_code: "+967" },
  { name: "Zambia", flag: "🇿🇲", code: "ZM", dial_code: "+260" },
  { name: "Zimbabwe", flag: "🇿🇼", code: "ZW", dial_code: "+263" },
];
export const TECHNOLOGY = [
  {
    label: "DJI Zenmuse Li (Lidar)",
    use: "Provides high-precision 3D mapping and terrain modeling for erosion monitoring and land use planning.",
    image: drone,
  },
  {
    label: "CHCNAV Apache 3",
    use: "For hydrographic surveys, water quality monitoring, and habitat mapping in rivers, lakes, and coastal areas.",
    image: apache3,
  },
  {
    label: "Phantom 4 RTK drone with D-RTK 2 Mobile Station",
    use: "Provides high-precision mapping for land surveys, habitat monitoring, erosion tracking, and flood assessment",
    image: drone2,
  },
];

export const SERVICE_CATEGORIES = [
  {
    label: "Coastal Engineering (CE)",
    value: "CE",
  },
  {
    label: "Environmental Engineering (EE)",
    value: "EE",
  },
  {
    label: "Surveying (S)",
    value: "S",
  },
  {
    label: "Fisheries Resource Management (FRM)",
    value: "FRM",
  },
];

// const NAV_ITEMS = ['Home','Services','Projects','About Us','Career','Contact Us']

// const SUB_NAV_ITEMS = [
//     ABOUT_US = ["About Us","Our Team"],

// ]
