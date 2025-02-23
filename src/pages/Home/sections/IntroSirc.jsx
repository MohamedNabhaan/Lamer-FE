import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import SIRC from "../../../assets/SIRC/SIRC2.png";
import { Link } from "react-router-dom";
export default function IntroSirc() {
  return (
    <>
      <Box
        minH={"32rem"}
        paddingBlock={{ base: 4, md: 12 }}
        paddingLeft={14}
        
        
      >
        <SimpleGrid columns={{base:1,lg:2}} paddingInline={4}>
          <Box paddingRight={8} paddingBottom={{base:1,md:0}}>
            <Heading
            textAlign={{base:'center',md:'left'}}
              textColor={"brand.400"}
              size={{base:'2xl',md:"3xl"}}
              paddingLeft={1}
              paddingBottom={{base:3,md:6}}
              paddingRight={68}
            >
              Small Island Research Center (SIRC)
            </Heading>
            <Text paddingBottom={2} paddingTop={{base:0,md:2}} fontSize={{base:'sm',md:"md"}} >
              Located in Faresmaathoda in Huvadhoo Atoll of Maldives, the SIRC
              is for students and researchers in the field of marine sciences,
              island morphology and climate change.
            </Text>
            <Text paddingBottom={2} fontSize={{base:'sm',md:"md"}}>
              The Research Center has worked closely with departments within
              Universities such as University of Auckland, New Zealand and
              University of Derby , United Kingdom.
            </Text>

            <Text paddingBottom={2} fontSize={{base:'sm',md:"md"}}> 
              The Center has two in-house programs, A summer coral reef ecology
              course and a coral reef system course.
            </Text>
            <Text paddingBottom={2} fontSize={{base:'sm',md:"md"}}>
              The Center has facilitated several research papers and studies.
            </Text>
            <Link to={"/SIRC"} >
              <Text fontSize={{base:"sm",md:"md"}} fontWeight={600} _hover={{ textDecoration: "underline" }}>
                
                Learn More...
              </Text>
            </Link>
          </Box>
          <Box paddingRight={{base:16,md: 10}} >
            <Image borderRadius
            ={24} src={SIRC}></Image>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
