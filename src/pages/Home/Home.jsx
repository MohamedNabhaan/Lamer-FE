import { Box } from "@chakra-ui/react";
import Navbar  from "../../components/Navbar"
import Introduction from "./sections/Introduction";
import Featured from "./sections/Featured"
import Services from "./sections/Services";
import Clients from "./sections/Clients"
import Footer  from "../../components/Footer"


export default function Home (){
    return (
        <Box> 
        <Introduction ></Introduction>
        <Services></Services>
        <Featured></Featured>
        <Clients></Clients>
        </Box>
    );
}