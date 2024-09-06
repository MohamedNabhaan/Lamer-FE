import { Box } from "@chakra-ui/react";
import Navbar  from "../../components/Navbar"
import Introduction from "./sections/Introduction";
import Services from "./sections/Services";
import Clients from "./sections/Clients"
import Footer  from "../../components/Footer"


export default function Home (){
    return (
        <Box>
        <Navbar/>
        <Introduction ></Introduction>
        <Services></Services>
        <Clients></Clients>
        <Footer></Footer>
        </Box>
    );
}