import { useLoaderData } from "react-router-dom"
import { Box } from "@chakra-ui/react";

export default function ServicePage(){
    const service= useLoaderData();
    console.log(service)
    return (<>
    <Box minH={'72vh'}></Box></>)
}