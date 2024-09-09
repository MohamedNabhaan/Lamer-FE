import { Box } from "@chakra-ui/react";
import Navbar  from "../../components/Navbar"
import Introduction from "./sections/Introduction";
import Featured from "./sections/Featured"
import IntroServices from "./sections/IntroService";
import IntroClients from "./sections/IntroClients"
import Footer  from "../../components/Footer"


export default function Home (){
    return (
        <Box> 
        <Introduction ></Introduction>
        <IntroServices></IntroServices>
        <Featured></Featured>
        <IntroClients></IntroClients>
        </Box>
    );
}