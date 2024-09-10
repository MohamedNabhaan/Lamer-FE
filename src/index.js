import ceLogo from "./assets/services/ceSymbol2.png";
import eeLogo from "./assets/services/eeSymbol2.png";
import pmLogo from "./assets/services/pmSymbol2.png";
import fiLogo from "./assets/services/fiSymbol2.png";
import sLogo from "./assets/services/surSymbol2.png";
import sheraton from "./assets/clients/sheraton.png";
import arc from "./assets/clients/arc.png";
import dhiraagu from "./assets/clients/dhiraagu.png";
import furaveri from "./assets/clients/furaveri.png";
import mtcc from "./assets/clients/mtcc.png";
import jbic from "./assets/clients/jbic.png";
import undp from "./assets/clients/undp.png";
import unops from "./assets/clients/unops.png";

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
    label: "Enviromental Engineering Consultation",
    img: eeLogo,
  },
  {
    label: "Project Management",
    img: pmLogo,
  },
  {
    label: "Coastal Engineering Consultation",
    img: ceLogo,
  },
  {
    label: "Ecological,Land, Hydrographic & Oceanographic Surveys",
    img: sLogo,
  },
  {
    label: "Fisheries Resource Management",
    img: fiLogo,
  },
];

export const SERVICE_DETAILS = [
  {
    label: "Environmental and Social Impact Assessment",
    description:
      "Environmental and Social Impact Assessments (EIAs) are required by law, for a wide range of development projects. In some cases, these assessments are based on the International Finance Corporations (IFC) such as the World Bank (WB) and Asian Development Bank (ADB). The LAMER team have an in-depth understanding of national and international legal requirements and have been involved in preparation of ESIAs for various types of projects from large scale dredging and reclamation, infrastructure development, water and sewerage, solid waste management and energy etc. In addition, LAMER assists clients with EIA or ESIA processes that include EIA scoping applications, field surveying, stakeholder consultations, report preparation and submission for approval.",
  },
  {
    label: "Environmental conservation and management training",
    description:
      "We provide support to companies in formulating and implementing environmental management plans by establishing their natural resource audits, and by providing advice and staff training on best practices to manage those resources.",
  },
  {
    label: "Environmental management systems",
    description:
      "LAMER has assisted various clientele in establishing and implementing Environmental Management Systems for their businesses. We help define environmental aspects of the business from identifying environmental policy, planning, implementation, checking/ corrective action and management review to document these aspects successfully. We also assess our clients complacent with the relevant legal requirements and provide the necessary training to the relevant teams.",
  },
  {
    label: "Environmental Monitoring and Reporting",
    description:
      "Environmental monitoring is a tool for detecting improvements or degradation in the health of ecosystems. Environmental impact monitoring is thus planned, systematic collection of environmental data to meet specific objectives and environmental needs. Monitoring combined with enforcement ensures proper functioning of environmental protection measures prescribed for development projects or activities. Monitoring is conducted to assess the status of the environment and to protect against potential damage from various development impacts on the natural and socioeconomic environment. Our team of expertise have been engaged in environmental compliance reporting for various clients.",
  },
  {
    label: "Environmental Education and Awareness",
    description:
      "Environmental Education to create awareness on the stressing environmental challenges is essential to educate the island communities on how their actions and lifestyles could impact the natural resources and associated environment they depend upon. In LAMER, we focus on educating and informing stakeholders on the different environmental issues that we are being faced with due to climate change and other impacts through sharing of knowledge from our experiences. With background in different aspects of environmental science and sustainable development, the LAMER team works with schools, local government and private sectors in conducting training programs and creating awareness materials for different disciplines.",
  },
  {
    label: "Project Management",
    description:
      "Environmental Management and Sustainable Development being the key expertise of the company, our services extend to management of environmental and coastal development projects. We work side by side with the client and provide project management services on all aspects of the project to ensure the scope of works under the project are met with guaranteed quality of work. We pride ourselves in providing cost effective solutions to the coastal designs while preserving the environment. Our team has experience and knowledge with the legislations pertaining to development projects of any sort. ",
  },
  {
    label: "Resiliant Planning and Sustainable Development",
    description:
      "Sustainable development of our islands in both urban and rural areas are important to build resilient communities in this changing environment. Taking on an integrated planning approach, the LAMER team works with all the stakeholders; the island communities, policy makers, private sectors and other relevant parties on a range of projects including island development plans; land use plans; urban development master plans; social impact assessments (SIAs); waste management plans and other development related projects with a specific focus on risk resilience and sustainability.",
  },
  {
    label: "Coastal engineering, beach replenishment and restoration",
    description:
      "LAMER has assisted in large reclamation projects with designing of islands that are newly reclaimed from shallow lagoons aided by physical and numerical modeling with due consideration given to elevation with respect to climate and elevated sea level. We also provide shore protection designs, erosion control measures, beach protection and maintenance measures.",
  },
  {
    label: "Coastal and Reef Habitat Mapping",
    description:
      "We have the expertise to produce high resolution maps, graphics and spatial data for various planning purposes using remote sensing (satellite and drone imagery) aided with physical surveys (terrestrial and nearshore). We also have the capacity to develop Geographic Information Systems (GIS) to manage, interpret, and present data using remote sensing outputs.",
  },
  {
    label: "Reef rehabilitation and restoration",
    description:
      "Reefs are threatened worldwide by the impact of ongoing climate change directly affecting reefs through increased sea surface temperature. Impacts are manifested by recurring mass bleaching events, compounded by damages caused by pollution and human induced degradation of reef habitats. The recovery of the reefs can be supported by well-conceived restoration strategies. This can only be successfully realised through understanding of local causes of reef degradation. We offer expertise on understanding of local environment and factors required for successful restoration and rehabilitation through establishment of in-water or ocean-based nurseries (asexually or sexually derived corals) or coral fragments from intact areas (often construction or reclamation sites) to degraded reef areas or substrate stabilization areas.",
  },
  {
    label: "Land, Hydrographic & Oceanographic Surveys",
    description:
      "We provide a wide array of surveys ranging from topographic, hydrographic and oceanographic surveys as required for the specific nature of projects. At LAMER land surveys are carried out using state of the art Topcon GNSS Positioning System and for high canopy areas Topcon Total Stations providing output to optimum accuracy. Hydrographic surveys are carried out using OHMEX Single beam echo-sounder integrated with high precision Topcon GNSS Positioning System. Datum for hydrographic surveys is Mean Sea Level which is determined by collecting local tide data using RBR tide gauges. Oceanographic survey is the study of oceanographic conditions with reference to physical, chemical, biological and geological, and other properties of the ocean. At LAMER, oceanographic surveys we provide include wave measurements, tide and ocean current measurements to develop models and study the effects of marine construction works ranging from dredging and reclamation, coastal protection and other types of marine constructions. We also have instruments to measure and monitor physical and chemical properties of marine and freshwater.",
  },
  {
    label: "Ecological Surveys",
    description:
      "With our experts of biologists, ecologists, and other technical specialists, we address marine, terrestrial and groundwater issues with a goal of sustainably managing those resources and goods and services on which we all depend. Our experts use both scientific methods and technical tools to conduct detailed investigations of species and habitats; data which can be used to develop comprehensive management plans. Our team have expertise in all areas of coral atoll based natural resource management, including planning and mitigation. We are also well informed in both national and international legal standards and legislation, to which Maldives has to abide by with respect to management of these species and habitats.",
  },
  {
    label: "Fisheries resources assessment",
    description:
      "Fisheries is one of the key income avenues of the Maldivian economy and hence proper management of this industry is crucial for its sustainability in the long term. Proper management can only be attained through long term assessment of fisheries to properly understand the changes it undergoes. The technical team have diverse range of expertise in various aspects of the marine environment. Our team have been involved in various resource assessments, inclusive of fisheries assessments, both through the company and other capacities. We have a strong background in assessment of fisheries resources, through collection and analysis of fishery-dependent and fishery- independent data as well as through consultation with key stakeholders.",
  },
];

// const NAV_ITEMS = ['Home','Services','Projects','About Us','Career','Contact Us']

// const SUB_NAV_ITEMS = [
//     ABOUT_US = ["About Us","Our Team"],

// ]
