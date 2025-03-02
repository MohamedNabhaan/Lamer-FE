import {
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Image,
  ListItem,
  UnorderedList,
  Flex
} from "@chakra-ui/react";
import aboutus from "../../assets/aboutus/aboutus.png";
import { ABOUT_US } from "../../index.js";
import { useLoaderData } from "react-router-dom";
import pfp from "../../assets/pfp.png";
export default function AboutUs() {
  const employees = useLoaderData();
  return (
    <Box marginBottom={4}>
      <Container
        maxW={"container.xl"}
        paddingTop={12}
        paddingLeft={20}
        paddingBottom={12}
        borderBottom={"solid"}
        borderColor={"design.100"}
        justifyContent={"center"}
      >
        <Heading
          borderLeft={"solid 20px"}
          paddingLeft={2}
          as="h1"
          size={"3xl"}
          fontWeight={500}
          color={"brand.400"}
          display={"block"}
          textAlign={{ base: "center", md: "left" }}
        >
          About Us
        </Heading>
        <Text paddingTop={2} fontSize={{base:"xl",md:"2xl"}} paddingRight={{base:12,md:0}}>
          
        </Text>
      </Container>
      <Flex paddingInline={16} paddingTop={8} paddingBottom={12}  flexDir={{base:'column',md:'row'}}>    
        <Flex direction={{ base: "column", md: "column" }} spacing={2}>
        <Heading as="h2" size={"lg"} paddingBottom={4}>
          Company History
        </Heading>
          
            <Text w={"95%"}>{ABOUT_US.history}</Text>
            <Text paddingTop={12} w={"95%"}>
              Our <b>Vision</b>
              {ABOUT_US.vision}
            </Text>
        </Flex>
        <Image padding={6} objectFit={"contain"} src={aboutus}></Image>
      </Flex>
      <Box
        bgColor={"design.100"}
        paddingInline={16}
        paddingTop={8}
        paddingBottom={8}
      >
        <Heading paddingBottom={6} textAlign={{ base: "center", md: "left" }}>
          Our Mission and Values
        </Heading>
        <UnorderedList spacing={2}>
          {ABOUT_US.missionValues.map((value) => {
            return <ListItem>{value}</ListItem>;
          })}
        </UnorderedList>
      </Box>
      
      <Box 
        paddingInline={16}
        paddingTop={8}
        paddingBottom={8}>
        <Heading textAlign={{base:'center',md:'left'}}>
          Our Team
        </Heading>
      </Box>
      <Flex padding={0}  paddingInline={8}>
                  <Flex
                    display={"flex"}
                    flexWrap={"wrap"}
                    justifyContent={"space-evenly"}
                  >
                    {employees.map((employee) => {
                      return (
                        <Stack
                          flexBasis={{ base: "50%%", sm: "50%", md: "33.33" }}
                          padding={8}
                        >
                          <Box
                            width={{ base: "50vh", md: "20vh" }}
                            height={{ base: "60vh", md: "30vh" }}
                            justifyContent={{ base: "center", md: "flex-start" }}
                            alignItems={{ base: "center", md: "flex-start" }}
                          >
                            <Image
                              borderRadius={10}
                              width={"100%"}
                              height={"100%"}
                              objectFit={"cover"}
                              src={employee.displayPic}
                              fallbackSrc={pfp}
                              boxShadow={"lg"}
                              border="0.5px solid"
                            ></Image>
                          </Box>
                          <Box paddingBlock={2}>
                            <Text
                              fontSize={"xl"}
                              fontWeight={"800"}
                              paddingTop={1}
                              paddingLeft={2}
                            >
                              {employee.name}
                            </Text>
                            <Text
                              fontSize={"lg"}
                              fontWeight={"500"}
                              paddingBottom={1}
                              paddingLeft={2}
                            >
                              {employee.position}
                            </Text>
      
                            <Text
                              fontSize={"md"}
                              color={"gray.500"}
                              fontWeight={"500"}
                              paddingTop={2}
                              paddingBottom={1}
                              paddingLeft={2}
                            >
                              {employee.qualifications}
                            </Text>
                          </Box>
                        </Stack>
                      );
                    })}
                  </Flex>
                </Flex>
    </Box>
  );
}

export async function loader({ request, params }) {
  const url = new URL(request.url);

  const response = await fetch("http://localhost:3000/employee", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const employees = await response.json();

  employees.map((data) => {
    const vals = data.displayPic
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    data.displayPic = vals;
  });

  
  console.log(employees);
  return employees;
}