import {
  Box,
  Image,
  Stack,
  Text,
  Heading,
  Flex,
  HStack,Center,Link
  
} from "@chakra-ui/react";
import fm from "../assets/SIRC/fm.png";
import mhg from "../assets/SIRC/Maahutigalaa.png";
import htd from "../assets/SIRC/Hoothodaa.png";
import fth from "../assets/SIRC/Faathiyehuttaa.png";

import { ExternalLink, ExternalLinkIcon } from "lucide-react";

export default function SiteTab() {
  return (
    <>
      <Box
        paddingTop={5}
        paddingBottom={2}
        paddingInline={12}
        borderInline={'solid'}
        
        bgColor={"brand.1000"}
        borderBottom={'solid'}
        borderColor={'design.200'}
        borderBottomRadius={24}
      > 
      
        <Heading borderBottom={'solid'} borderColor={'design.200'} color={"brand.900"} size={"xl"}>
         Region
        </Heading>
      
        
        <Flex paddingTop={2} flexDir={{base:'column',md:'row'}}  alignItems={{base:'center',md:'flex-start'}} >
        <Flex flexDir={'column'} gap={4} w={{base:'',md:'50%'}} paddingBottom={{base:3,md:0}} justifyContent={'flex-start'}>
        <Text
           paddingRight={{base:0,md:12}}
           fontSize={'medium'}
           >
             All islands, lagoons and reefs within the red outline (with the
             exception of resort island) are available research sites for students
             and researchers interested in carrying out research in the area.
           </Text>
           <Text
            
             paddingRight={{base:0,md:12}}
           >
             The Research Centre has exclusive use of the islands of
             Maahutigalaa(1), Hoothodaa(2) and Faathiyehuttaa(3). The facility at
             Maathoda and the three islands which function as individual
             laboratories of the research centre, together form the whole Small
             Island Research Centre operated by SIRG. These three islands are
             exclusively available for research through a lease agreement between
             SIRG and Ministry of Fisheries, Marine Resources and Agriculture.
             Varying characteristics in terms of their geomorphology make them
             ideal candidates for comparison research work.
           </Text>
        </Flex>
          <Image borderRadius={32} h={"20%"} w={{base:'70%',md:'40%'}} objectFit={"contain"} src={fm}></Image>
        </Flex>
          
        
        
         
        

        <Box paddingBlock={8}>
          <Heading  paddingTop={4} paddingBottom={2} color={"brand.900"}>
            1. Maahutigalaa
          </Heading>

          <Flex flexDir={{base:'column',md:'row'}}  alignItems={{base:'center',md:'flex-start'}}>
            <Flex w={{base:'',md:'50%'}} flexDir={'column'} paddingBottom={4}>
            <Text
            
              paddingBottom={2}
              paddingRight={{base:0,md:16}}
              fontSize={'md'}
            >
              The island is our Coral Reef laboratory and the reef system around the island has good potential as a coral reef research habitat. 
              The island has large potential for the study of 
              beach dynamics and beach morphology.
            </Text>
            <Text 
              paddingBottom={2}
              paddingRight={{base:0,md:16}}
              fontSize={'md'}>
                Maahutigalaa is relatively untouched, making it 
                an ideal site for investigating natural 
                island dynamics, erosion patterns, and the role of vegetation 
                in stabilizing sandbanks.
          One of the most fascinating aspects of Maahutigalaa is its 
        potential as a case study for climate resilience. Researchers can explore how shifting monsoon patterns and rising sea levels influence island morphology. Additionally, its surrounding waters provide a chance to study fish spawning grounds and migratory patterns, particularly for reef sharks and manta rays.


            </Text>
            </Flex>
            
          
         
            <Center border={'solid'} borderColor={'design.200'} bg={'black'} borderRadius={32} w={{base:'70%',md:'40%'}} justifyContent={'center'} role="group" flexDir={'column'}>
              <Text zIndex={2} _groupHover={{
             
             
             cursor: "pointer",
           }} position={'absolute'} >View<ExternalLinkIcon></ExternalLinkIcon></Text>
            <Link zIndex={9999} _groupHover={{
             
             zIndex:1,
             cursor: "pointer",
           }}  href="https://maps.app.goo.gl/uJtrop5oLVdYBFui9" isExternal >
            <Image zIndex={9999} _groupHover={{
             
            opacity: 0.8,
            cursor: "pointer",
          }}  objectFit={"contain"}borderRadius={32} h={"20%"}  src={mhg}></Image></Link>
            </Center>
          </Flex>

          <Heading  paddingTop={4} paddingBottom={2} color={"brand.900"}>
            2. Hoothodaa
          </Heading>

          <Flex flexDir={{base:'column',md:'row'}}  alignItems={{base:'center',md:'flex-start'}}>
            <Flex w={{base:'',md:'50%'}} flexDir={'column'} paddingBottom={4}>
            <Text
            
              paddingBottom={2}
              paddingRight={{base:0,md:16}}
              fontSize={'md'}
            >
              The island of Hoothodaa is located to the immediate west of Fares
              Maathodaa on the same reef system. The island has a rocky
              shoreline all around and exposed beach rock. 
            </Text>
            <Text 
              paddingBottom={2}
              paddingRight={{base:0,md:16}}
              fontSize={'md'}>
            Its pristine marine ecosystems make it an excellent site for marine biology studies, particularly in coral reef ecology and sea turtle conservation. The island's relatively untouched environment provides a natural laboratory for studying biodiversity and the impacts of climate change on marine habitats.
            </Text>
            </Flex>
          
         
            <Center border={'solid'} borderColor={'design.200'} bg={'black'} borderRadius={32} w={{base:'70%',md:'40%'}} justifyContent={'center'} role="group" flexDir={'column'}>
              <Text zIndex={2}  position={'absolute'} _groupHover={{
             
             
             cursor: "pointer",
           }} >View<ExternalLinkIcon></ExternalLinkIcon></Text>
            <Link zIndex={9999} _groupHover={{
             
             zIndex:1,
             cursor: "pointer",
           }}  href="https://maps.app.goo.gl/https://maps.app.goo.gl/7A87dew9f6LvVjmU9" isExternal >
            <Image zIndex={9999} _groupHover={{
             
            opacity: 0.8,
            cursor: "pointer",
          }}  objectFit={"contain"}borderRadius={32} h={"20%"}  src={htd}></Image></Link>
            </Center>
          </Flex>

          <Heading  paddingTop={4} paddingBottom={2} color={"brand.900"}>
            3. Faathiyehuttaa
          </Heading>

          <Flex flexDir={{base:'column',md:'row'}}  alignItems={{base:'center',md:'flex-start'}}>
            <Flex  flexDir={'column'} w={{base:'',md:'50%'}} paddingBottom={4}>
            <Text
            
              paddingBottom={2}
              paddingRight={{base:0,md:16}}
              fontSize={'md'}
            >
              Faathihutta is a coral reef island located in the Maldives,
               notable for its proximity to seagrass meadows that play a 
               crucial role in island formation and maintenance. Recent studies
                have highlighted that these seagrass meadows act as "sand 
                factories," producing sediment essential for building and 
                sustaining coral reef islands. The breakdown of shells and 
                skeletons of organisms living in these meadows contributes to 
                sand production, which accumulates and helps in island formation.
                 In fact, research indicates that the sediment produced by these 
                 seagrass meadows could build an island like Faathihutta in 
                 approximately 18 years. <Link display={'inline'} href="https://divernet.com/scuba-news/sand-factory-seagrass-can-save-diver-islands/"
              ><ExternalLinkIcon size={16}></ExternalLinkIcon></Link> 

            </Text>
            <Text
              paddingBottom={2}
              paddingRight={{base:0,md:16}}
              fontSize={'md'}>
            This unique natural process makes Faathihutta an excellent site for 
            research in marine biology, coastal geomorphology, and climate change
             adaptation strategies. Studying the interactions between seagrass
              meadows and island formation can provide valuable insights into 
              sustainable island development and conservation efforts, especially
               in the face of rising sea levels.
            </Text>
            </Flex>
          
         
            <Center border={'solid'} borderColor={'design.200'} bg={'black'} borderRadius={32} w={{base:'70%',md:'40%'}} justifyContent={'center'} role="group" flexDir={'column'}>
              <Text zIndex={2}  _groupHover={{
             
             
             cursor: "pointer",
           }}position={'absolute'} >View<ExternalLinkIcon></ExternalLinkIcon></Text>
            <Link zIndex={9999} _groupHover={{
             
             zIndex:1,
             cursor: "pointer",
           }}  href="https://maps.app.goo.gl/G75vYLtpSzqmw3AQ8" isExternal >
            <Image zIndex={9999} _groupHover={{
             
            opacity: 0.8,
            cursor: "pointer",
          }}  objectFit={"contain"}borderRadius={32} h={"20%"}  src={fth}></Image></Link>
            </Center>
          </Flex>

          

         

          

          
        </Box>
      </Box>
    </>
  );
}
