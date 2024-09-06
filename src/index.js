import ceLogo from "./assets/services/ceSymbol.png"
import eeLogo from "./assets/services/eeSymbol.png"
import pmLogo from "./assets/services/pmSymbol.png"
import fiLogo from "./assets/services/fiSymbol.png"
import sLogo from "./assets/services/surSymbol.png"
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
        href : ""

        },
    {
        label : "Services",
        href : ""
        },
    {
        label : "Projects",
        href : "",
        children : [
            {
                label: "Projects",
                href: ""
            },
            {
                label:"Clients",
                href:""
            }
        ]
        },
    {
        label : "About Us",
        href : "",
        children : [
            {
                label : "About Us",
                href : ""
                },
            {
                label : "Our Team",
                href : ""
                }
        ]
        },
    {
        label : "Career",
        href : "",

     },
    {
        label : "Contact Us",
        href : ""
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