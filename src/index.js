import ceLogo from "./assets/services/ceSymbol2.png"
import eeLogo from "./assets/services/eeSymbol2.png"
import pmLogo from "./assets/services/pmSymbol2.png"
import fiLogo from "./assets/services/fiSymbol2.png"
import sLogo from "./assets/services/surSymbol2.png"
import sheraton from "./assets/clients/sheraton.png"
import arc from "./assets/clients/arc.png"
import dhiraagu from "./assets/clients/dhiraagu.png"
import furaveri from "./assets/clients/furaveri.png"
import mtcc from "./assets/clients/mtcc.png"
import jbic from "./assets/clients/jbic.png"
import undp from "./assets/clients/undp.png"
import unops from "./assets/clients/unops.png"

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
        label : "Home",
        path : "",
        subRoutes:[]

        },
    {
        label : "Services",
        path : "Services",
        subRoutes:[]
        },
    {
        label : "Projects",
        path : "Projects",
        subRoutes:['/Projects','/Clients'],
        children : [
            {
                label: "Projects",
                path: "Projects"
            },
            {
                label:"Clients",
                path:"Clients"
            }
        ]
        },
    {
        label : "About Us",
        path : "AboutUs",
        subRoutes: ["/AboutUs","/OurTeam"],
        children : [
            {
                parent: "About Us",
                label : "About Us",
                path : "AboutUs"
                },
            {
                parent: "About Us",
                label : "Our Team",
                path : "OurTeam"
                }
        ]
        },
    {
        label : "Careers",
        path : "Careers",
        subRoutes:[]

     },
]

export const SERVICES = [
    {
        label: "Enviromental Engineering Consultation",
        img: eeLogo
    },
    {
        label: "Project Management",
        img: pmLogo
    },
    {
        label: "Coastal Engineering Consultation",
        img: ceLogo
    },
    {
        label: "Ecological,Land, Hydrographic & Oceanographic Surveys",
        img: sLogo
    },
    {
        label: "Fisheries Resource Management",
        img: fiLogo
    }
]

// const NAV_ITEMS = ['Home','Services','Projects','About Us','Career','Contact Us']

// const SUB_NAV_ITEMS = [
//     ABOUT_US = ["About Us","Our Team"],

// ]