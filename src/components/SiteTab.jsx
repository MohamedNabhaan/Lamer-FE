import {
  Box,
  Image,
  Stack,
  Text,
  Heading,
  Flex,
  HStack,
} from "@chakra-ui/react";
import fm from "../assets/SIRC/fm.png";
import mhg from "../assets/SIRC/Maahutigalaa.png";
import htd from "../assets/SIRC/Hoothodaa.png";
import fth from "../assets/SIRC/Faathiyehuttaa.png";

export default function SiteTab() {
  return (
    <>
      <Box
        paddingTop={6}
        paddingBottom={2}
        paddingInline={12}
        bgColor={"design.500"}
      >
        <Heading color={"brand.400"} size={"2xl"}>
          Research Sites
        </Heading>

        <Text
          paddingTop={6}
          paddingRight={12}
          fontSize={{ base: "lg", md: "xl" }}
        >
          All islands, lagoons and reefs within the red outline (with the
          exception of resort island) are available research sites for students
          and researchers interested in carrying out research in the area.
        </Text>
        <Text
          paddingTop={2}
          paddingRight={8}
          fontSize={{ base: "lg", md: "xl" }}
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
        <Flex alignItems={"center"} justifyContent={"center"} paddingTop={8}>
          <Image h={"50%"} w={"50%"} objectFit={"cover"} src={fm}></Image>
        </Flex>

        <Box paddingBlock={8}>
          <Heading paddingTop={4} paddingBottom={2} color={"brand.400"}>
            Maahutigalaa
          </Heading>

          <Box>
            <Text
              paddingBottom={2}
              paddingRight={16}
              fontSize={{ base: "lg", md: "xl" }}
            >
              The island is our Coral Reef laboratory and the reef system around
              the island has good potential as a coral reef research habitat.
              The island has large potential for the study of beach dynamics and
              beach morphology.
            </Text>
          </Box>
          <Flex alignItems={"center"} justifyContent={"center"} paddingTop={8}>
            <Image h={"25%"} w={"40%"} objectFit={"cover"} src={mhg}></Image>
          </Flex>

          <Heading paddingTop={4} paddingBottom={2} color={"brand.400"}>
            {" "}
            Hoothodaa
          </Heading>

          <Box>
            <Text
              paddingBottom={2}
              paddingRight={16}
              fontSize={{ base: "lg", md: "xl" }}
            >
              The island of Hoothodaa is located to the immediate west of Fares
              Maathodaa on the same reef system. The island has a rocky
              shoreline all around and exposed beach rock.
            </Text>
          </Box>

          <Flex alignItems={"center"} justifyContent={"center"} paddingTop={8}>
            <Image h={"15%"} w={"40%"} objectFit={"cover"} src={htd}></Image>
          </Flex>

          <Heading paddingTop={4} paddingBottom={2} color={"brand.400"}>
            {" "}
            Faathiyehuttaa
          </Heading>

          <Box>
            <Text
              paddingBottom={2}
              paddingRight={16}
              fontSize={{ base: "lg", md: "xl" }}
            >
              In comparison to most of the islands on the peripheral reef
              system, the island of Faathiyehuttaa has beach all around the
              island.
            </Text>
          </Box>
          <Flex alignItems={"center"} justifyContent={"center"} paddingTop={8}>
            <Image h={"15%"} w={"40%"} objectFit={"cover"} src={fth}></Image>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
