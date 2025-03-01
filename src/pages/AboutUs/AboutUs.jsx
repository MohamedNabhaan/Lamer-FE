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

export default function AboutUs() {
  return (
    <Box>
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
      <Box paddingInline={16} paddingTop={8} paddingBottom={8}>
        <Heading paddingBottom={6} textAlign={{ base: "center", md: "left" }}>
          Associated Establishments of LAMER Group
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          alignItems={"center"}
        >
          {ABOUT_US.relatedEstablishment.map((associate) => {
            return <Image w={"120px"} height={"90px"} src={associate}></Image>;
          })}
        </Stack>
      </Box>
    </Box>
  );
}
