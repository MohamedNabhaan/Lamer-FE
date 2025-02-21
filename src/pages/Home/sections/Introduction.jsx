import { Box, Center, Image, Text,Heading,Flex,Button } from "@chakra-ui/react";

import ImageCarousel from "../../../components/ImageCarousel";

import bg from "../../../assets/introduction/Intro4.png"



export default function Introduction() {
  return (
    
     <Box h={{base:"16rem",md:"36rem"}}>
      <Flex pos={'absolute'} flexDir={'column'} justify='center' alignItems={'center'} w={'100%'} gap={4} >
      <Heading  size={{base:'sm',md:"xl",lg:"2xl"}}color={"whitesmoke"}  paddingTop={{base:12,md:32}}>Creating Solutions for a Sustainable Future.</Heading>
      <Heading  size={{base:'sm',md:"lg",lg:"xl"}}  color={"gray.200"} fontWeight={400} >25 Years of Continued Excellence.</Heading>
      <Button  marginTop={{base:4,md:12}}  size={{base:'sm',md:'lg'}} border={'solid'}  color={'brand.400'} textColor={'white'} bg={'brand.400'} borderColor={'brand.400'} _hover={{
            textDecoration: "none",
            textColor: "brand.900",
            bgColor: "white",
            border: "solid",
          }}>Check Out Our Projects!</Button>
      </Flex>
      <Image  w={"100%"} h={"100%"} objectFit={'cover'} src={bg}></Image>
     </Box>
      
       
      
    
  );
}
