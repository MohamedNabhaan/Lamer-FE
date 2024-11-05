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
        paddingBlock={{ base: 0, md: 12 }}
        paddingLeft={14}
        bgColor={"design.500"}
      >
        <SimpleGrid columns={2} paddingInline={4}>
          <Box paddingRight={8}>
            <Heading
              textColor={"brand.400"}
              size={"3xl"}
              paddingLeft={1}
              paddingBottom={6}
              paddingRight={68}
            >
              Small Island Research Center (SIRC)
            </Heading>
            <Text paddingBottom={2} paddingTop={2}>
              Located in Faresmaathoda in Huvadhoo Atoll of Maldives, the SIRC
              is for students and researchers in the field of marine sciences,
              island morphology and climate change.
            </Text>
            <Text paddingBottom={2}>
              The Research Center has worked closely with departments within
              Universities such as University of Auckland, New Zealand and
              University of Derby , United Kingdom.
            </Text>

            <Text paddingBottom={2}>
              The Center has two in-house programs, A summer coral reef ecology
              course and a coral reef system course.
            </Text>
            <Text paddingBottom={2}>
              The Center has facilitated several research papers and studies.
            </Text>
            <Link to={"/SIRC"}>
              <Text fontWeight={600} _hover={{ textDecoration: "underline" }}>
                {" "}
                Learn More...
              </Text>
            </Link>
          </Box>
          <Box>
            <Image src={SIRC}></Image>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
