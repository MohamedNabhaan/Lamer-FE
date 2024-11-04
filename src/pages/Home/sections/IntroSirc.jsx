import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import SIRC from "../../../assets/SIRC/SIRC2.png";
export default function IntroSirc() {
  return (
    <>
      <Box
        minH={"32rem"}
        paddingBlock={{ base: 0, md: 12 }}
        paddingLeft={16}
        bgColor={"design.500"}
      >
        <SimpleGrid columns={2} paddingInline={6}>
          <Box paddingRight={8}>
            <Heading
              whiteSpace={"pre-line"}
              textColor={"brand.400"}
              size={"3xl"}
              paddingBottom={4}
              paddingLeft={{ base: 0, md: 4 }}
              paddingRight={69}
            >
              Small Island Research Center (SIRC)
            </Heading>
            <Text>
              Located in Faresmaathoda in Huvadhoo Atoll of Maldives, the SIRC
              is for students and researchers in the field of marine sciences,
              island morphology and climate change.
            </Text>
            <Text>
              The Research Center has worked closely with departments within
              Universities such as University of Auckland, New Zealand and
              University of Derby , United Kingdom.
            </Text>
            <Text>
              The Center has two in-house programs, A summer coral reef ecology
              course and a coral reef system course.
            </Text>
          </Box>
          <Box>
            <Image src={SIRC}></Image>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
