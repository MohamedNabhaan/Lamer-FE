import {
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Image,
  ListItem,
  UnorderedList,
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
      </Container>
      <Box paddingInline={16} paddingTop={8} paddingBottom={12}>
        <Heading as="h2" size={"lg"} paddingBottom={4}>
          Company History
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={2}>
          <Box>
            <Text w={"95%"}>{ABOUT_US.history}</Text>
            <Text paddingTop={12} w={"95%"}>
              Our <b>Vision</b>
              {ABOUT_US.vision}
            </Text>
          </Box>
          <Image objectFit={"contain"} src={aboutus}></Image>
        </Stack>
      </Box>
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
