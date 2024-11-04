import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Center,
} from "@chakra-ui/react";
import { TECHNOLOGY } from "../../..";
import bg from "../../../assets/bg.png";

export default function IntroTechnology() {
  return (
    <>
      <Box paddingBlock={{ base: 0, md: 12 }} paddingInline={16}>
        <Heading
          textColor={"brand.400"}
          size={"3xl"}
          paddingBottom={4}
          paddingLeft={{ base: 0, md: 4 }}
        >
          State of the Art Technologies
        </Heading>
        <SimpleGrid columns={2} paddingTop={12} spacing={{ base: 0, md: 4 }}>
          <Box>
            <Heading
              as={"h2"}
              size={{ base: "md", md: "2xl" }}
              paddingInline={6}
              paddingTop={12}
              color={"blackAlpha.700"}
            >
              {TECHNOLOGY[0].label}
            </Heading>
            <Text paddingInline={6} fontSize={"xl"} paddingTop={4}>
              {TECHNOLOGY[0].use}
            </Text>
          </Box>

          <Box h={"100%"}>
            <Image
              borderRadius={24}
              bgColor={"white"}
              w={"100%"}
              h={"100%"}
              objectFit={"contain"}
              src={TECHNOLOGY[0].image}
            ></Image>
          </Box>

          <Box h={"20rem"}>
            <Image
              borderRadius={24}
              w={"100%"}
              h={"100%"}
              objectFit={"contain"}
              src={TECHNOLOGY[1].image}
            ></Image>
          </Box>

          <Box h={"50%"}>
            <Heading
              as={"h2"}
              size={{ base: "md", md: "2xl" }}
              paddingInline={6}
              paddingTop={12}
              color={"blackAlpha.700"}
            >
              {TECHNOLOGY[1].label}
            </Heading>
            <Text
              paddingLeft={6}
              paddingTop={4}
              fontSize={{ base: "sm", md: "xl" }}
            >
              {TECHNOLOGY[1].use}
            </Text>
          </Box>
          <Box>
            <Heading
              as={"h2"}
              size={{ base: "md", md: "2xl" }}
              paddingInline={6}
              paddingTop={12}
              color={"blackAlpha.700"}
            >
              {TECHNOLOGY[2].label}
            </Heading>
            <Text paddingInline={6} fontSize={"xl"} paddingTop={4}>
              {TECHNOLOGY[2].use}
            </Text>
          </Box>

          <Box h={"100%"}>
            <Image
              borderRadius={24}
              w={"100%"}
              h={"100%"}
              objectFit={"contain"}
              src={TECHNOLOGY[2].image}
            ></Image>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
