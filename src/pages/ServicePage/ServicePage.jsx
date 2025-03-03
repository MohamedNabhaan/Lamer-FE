import { useLoaderData } from "react-router-dom"
import { Box,Center,Flex, Heading,Image,Text } from "@chakra-ui/react";

export default function ServicePage(){
    const service= useLoaderData();
    console.log(service)
    
    return (<>
    <Box minH={'36rem'} paddingBottom={4}>    
        
        <Box w={'100%'} bg={'black'}  borderBottom={'1px solid'} borderColor={'design.100'}>
        <Center flexDir={'column'} >
            <Image bgColor={'black'} opacity={0.8} h={{base:'10rem',md:'16rem'}} w={'100%'} objectFit={'cover'} pos={'relative'} maxH={'20%'} src={service.bannerPic[0]}></Image>
            <Heading color={'white'} pos={'absolute'} size={'2xl'}>
                {service.serviceName}
            </Heading>
            
        </Center>
        </Box>
        
        <Flex paddingInline={{base:16,md:64}} flexDir={'column'} gap={4} paddingTop={4}>
            <Text>
                {service.intro}
            </Text>
            <Text>
                {service.body}
            </Text>
            <Text >
                Softwares We use: {service.softwares}
            </Text>
            <Text >
                Equipment We Use: {service.equipment}
            </Text>
        </Flex>
        < Flex marginBlock={4} justifyContent={'space-evenly'} h={{base:'12rem',md:'16rem'}} w={'100%'} flexDir={'row'}>
            {service.pagePics.map((img)=>{
                return(<Image objectFit={'contain'} src={img}></Image>)
            })}
        </Flex>
        
        </Box></>)
}