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
        paddingBottom={2}
        paddingInline={12}
        bgColor={"design.500"}
      >
        <Heading color={"brand.400"} size={"2xl"}>
          Researchers
        </Heading>

        <Flex
          paddingBlock={8}
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          paddingInline={4}
        >
          <Stack flexBasis={{ base: "100%", sm: "50%", md: "20.40%" }}>
            <Image objectFit={"cover"} src={kensh} borderRadius={8}></Image>

            <Box padding={1}>
              <Text textAlign={"center"} fontSize={"lg"} fontWeight={600}>
                Professor Paul Simon Kench
              </Text>
              <Text paddingBottom={2} fontSize={"lg"} textAlign={"center"}>
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
            </Box>
          </Stack>

          <Stack flexBasis={{ base: "100%", sm: "50%", md: "20.40%" }}>
            <Image borderRadius={8} objectFit={"cover"} src={aslam}></Image>

            <Box padding={2}>
              <Text textAlign={"center"} fontSize={"lg"} fontWeight={600}>
                Mohamed Aslam
              </Text>
              <Text paddingBottom={1} fontSize={"lg"} textAlign={"center"}>
                MSc in Geography (Auckland) , B.Sc Geological Oceanography (UK)
              </Text>
              <Text fontSize={"sm"}>
                Director at small island research Group, with several years of
                experience in coastal development projects and studies and
                researches in island morphology.
              </Text>
            </Box>
          </Stack>

          <Stack flexBasis={{ base: "100%", sm: "50%", md: "20.40%" }}>
            <Image borderRadius={8} src={hussein} objectFit={"cover"}></Image>

            <Box padding={1}>
              <Text textAlign={"center"} fontSize={"lg"} fontWeight={600}>
                Hussein Zahir
              </Text>
              <Text paddingBottom={2} fontSize={"lg"} textAlign={"center"}>
                B.Sc. (Hon) Marine Biology(UK) , MPhil in Coral Reef Ecology
                (UK)
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
            </Box>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
