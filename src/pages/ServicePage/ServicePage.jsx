import { useLoaderData } from "react-router-dom"

export default function ServicePage(){
    const service= useLoaderData();
    console.log(service)
    return (<></>)
}