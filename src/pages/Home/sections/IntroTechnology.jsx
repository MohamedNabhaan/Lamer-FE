import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Center,
  Flex,
} from "@chakra-ui/react";
import { TECHNOLOGY } from "../../..";


export default function IntroTechnology() {
  return (
    <>
      <Box paddingBlock={{ base: 6 , md: 12 }} paddingInline={16} bgColor={"design.500"}> 
        <Heading
        textAlign={{base:"center",md:"left"}}
          textColor={"brand.400"}
          size={{base:"2xl",md:"3xl"}}
          paddingBottom={{base:0,md:4}}
          paddingLeft={{ base: 0, md: 4 }}
        >
          State of the Art Technologies
        </Heading>
        <SimpleGrid columns={{base:1,md:2}} paddingTop={{base:4,md:12}} spacing={{ base: 2, md: 4 }} >
          <Flex  borderRadius={24} bgColor={'design.200'} border={'solid'}  borderColor={'design.100'} flexDir={'row'} minH={{base:"9rem",lg:'18rem'}} >
          <Box w={"50%"}>
            <Heading
            paddingTop={4}
            paddingLeft={4}
            paddingRight={1}
              as={"h2"}
              size={{ base: "sm",sm:'md', lg: "lg" }}
              
              color={"blackAlpha.700"}
            >
              {TECHNOLOGY[0].label}
            </Heading>
            <Text paddingLeft={4} paddingRight={6} fontSize={{base:'xs',sm:"sm",lg:"md"}} paddingTop={{base:1,lg:4}}>
              {TECHNOLOGY[0].use}
            </Text>
          </Box>

          <Box w={"50%"} bgColor={'white'} borderRightRadius={24}>
            <Image
             
             w={"100%"}
             h={"100%"}
              objectFit={"contain"}
              src={TECHNOLOGY[0].image}
            ></Image>
          </Box>
          </Flex>

          <Flex borderWidth={'thick'}  borderRadius={24} bgColor={'design.200'}  border={'solid'}  borderColor={'design.100'} maxH={{sm:"9rem",md:"18rem"}}>
          <Box w={"50%"}>
            <Heading
            paddingTop={4}
            paddingLeft={4}
              as={"h2"}
              size={{ base: "sm",sm:'md', lg: "lg" }}
              
              color={"blackAlpha.700"}
            >
              {TECHNOLOGY[1].label}
            </Heading>
            <Text
              paddingLeft={4}
              paddingTop={{base:1,lg:4}}
              paddingRight={6}
              fontSize={{base:'xs',sm:"sm",lg:"md"}}
            >
              {TECHNOLOGY[1].use}
            </Text>
          </Box>
          <Box w={"50%"} bgColor={'white'} borderRightRadius={24}>
            <Image
             w={"100%"}
             h={"100%"}
              objectFit={"contain"}
              src={TECHNOLOGY[1].image}
            ></Image>
          </Box>
          </Flex>
          <Flex borderRadius={24} bgColor={'design.200'}  border={'solid'}  borderColor={'design.100'} flexDir={'row'} justifyContent={'space-between'} minH={{base:"9rem",lg:'18rem'}}>
          <Box w={"50%"}>
            <Heading
            paddingTop={4}
            paddingLeft={4}
            paddingRight={1}
              as={"h2"}
              size={{ base: "sm",sm:"md", lg: "lg" }}
              
              color={"blackAlpha.700"}
            >
              {TECHNOLOGY[2].label}
            </Heading>
            <Text paddingLeft={4} fontSize={{base:'xs',sm:"sm",lg:"md"}} paddingTop={{base:1,lg:4}} paddingRight={6}>
              {TECHNOLOGY[2].use}
            </Text>
          </Box>

          <Box w={"50%"} bgColor={'white'} borderRightRadius={24}>
            <Image
              
              w={"100%"}
              h={"100%"}
              objectFit={"contain"}
              src={TECHNOLOGY[2].image}
            ></Image>
          </Box></Flex>
          
        </SimpleGrid>
      </Box>
    </>
  );
}
