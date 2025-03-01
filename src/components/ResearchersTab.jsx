import { Box, Heading, Image, Text, Stack, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import aslam from "../assets/SIRC/aslam.png";
import hussein from "../assets/SIRC/hussein.png";
import kensh from "../assets/SIRC/kensh.png";

export default function ResearchersTab() {
  return (
    <>
      <Box
        paddingTop={6}
        paddingBottom={8}
        paddingInline={12}
        borderInline={'solid'}
        borderColor={'design.200'}
        borderBottomRadius={24}
        bgColor={"design.200"}
      >
        <Heading color={"brand.900"} size={"xl"}>
          Researchers
        </Heading>

        
          <Flex paddingTop={4} flexDir={'column'} gap={4}>
          <Flex gap={2} flexDir={{base:'column',md:'row'}}>
            <Flex  borderRadius={24} h={{base:'20%',md:'10%'}} w={{base:'40%',md:'10%'}} >
            <Image  borderRadius={24} objectFit={"contain"} src={kensh} ></Image>
            </Flex>
            <Flex w={"80%"} padding={1} flexDir={'column'}> 
              <Text  fontSize={"2xl"} fontWeight={600}>
                Professor Paul Simon Kench
              </Text>
              <Text paddingBottom={2} fontSize={"lg"} >
                MA (Hons) (Auckland), PhD (UNSW)
              </Text>
              <Text fontSize={"sm"}>
                The Research Centre is in partnership with Professor Paul Kench
                (the Head of the School of Environment at The University of
                Auckland, New Zealand), who is a coastal geomorphologist with
                research interests in areas of coral reef geomorphology, coastal
                processes, medium-term coastal change, gravel beach processes
                and the application of coastal science to support coastal
                management
              </Text>
            </Flex>
          </Flex>

          <Flex gap={2}flexDir={{base:'column',md:'row'}}>
            <Flex justifyContent={{base:'center',md:'left'}} h={{base:'20%',md:'10%'}} w={{base:'40%',md:'10%'}} >
            <Image  borderRadius={24} objectFit={"contain"} src={aslam} ></Image>
            </Flex>
            <Flex w={"80%"} padding={1} flexDir={'column'}> 
              <Text  fontSize={"2xl"} fontWeight={600}>
              Mohamed Aslam
              </Text>
              <Text paddingBottom={2} fontSize={"lg"} >
              MSc in Geography (Auckland) , B.Sc Geological Oceanography (UK)
              </Text>
              <Text fontSize={"sm"}>
              Director at small island research Group, with several years of
                experience in coastal development projects and studies and
                researches in island morphology.
              </Text>
            </Flex>
          </Flex>

          <Flex gap={2} flexDir={{base:'column',md:'row'}}>
          <Flex h={{base:'20%',md:'10%'}} w={{base:'40%',md:'10%'}}  >
            <Image  borderRadius={24} objectFit={"contain"} src={hussein} ></Image>
            </Flex> 
            <Flex w={"80%"} padding={1} flexDir={'column'}>
            
              <Text   fontSize={"2xl"} fontWeight={600}>
              Hussein Zahir
              </Text>
              <Text paddingBottom={2} fontSize={"lg"} >
              B.Sc. (Hon) Marine Biology(UK) , MPhil in Coral Reef Ecology (UK)
              </Text>
              <Text fontSize={"sm"}>
              Hussein Zahir is a marine biologist with an MPhil from the
                University of Newcastle Upon Tyne. He has over 30 years of
                experience in coral reef ecology, conservation and management of
                coral reefs of Maldives. He is also co-foundering member and
                director of LAMER Group under which SIRG operate. Prior to his
                fulltime commitment to in 2010 he has worked in Marine Research
                Centre a Maldives Government Institution, as senior coral reef
                ecologist, leading the coral reef research unit.
              </Text>
            </Flex>
          </Flex>
          </Flex>
          
          

          
       
      </Box>
    </>
  );
}
