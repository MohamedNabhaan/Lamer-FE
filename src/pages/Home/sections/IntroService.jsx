import {
  Flex,
  Image,
  Box,
  Heading,
  Center,
  Container,
  Stack,
  SimpleGrid,
  Text,
  textDecoration,
} from "@chakra-ui/react";

import { SERVICES } from "../../../index.js";
import { Link } from "react-router-dom";

export default function IntroServices() {
  return (
    <Box
      minH={"28rem"}
      paddingBlock={{ base: 0, md: 12 }}
      paddingInline={16}
      bgColor={"design.500"}
    >
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={8}>
        <Box>
          <Heading
            textColor={"brand.400"}
            size={"3xl"}
            paddingBottom={4}
            paddingLeft={{ base: 0, md: 4 }}
          >
            Core Services
          </Heading>
          <Heading
            color={"blackAlpha.600"}
            paddingLeft={{ base: 0, md: 6 }}
            fontWeight={400}
            size={"lg"}
          >
            We provide an array of services under these categories
          </Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 4 }} h={"100%"} spacing={2}>
          {SERVICES.map((service) => (
            <Flex
              role="group"
              border={"solid"}
              h={"20rem"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              paddingBlockStart={12}
              borderColor={"design.100"}
              borderRadius={"1rem"}
              transitionDuration={"600ms"}
              _hover={{
                bgColor: "blackAlpha.200",
              }}
            >
              <Image
                h={"50%"}
                border={"solid"}
                borderColor={"design.100"}
                borderRadius={"50%"}
                objectFit={"cover"}
                src={service.img}
              />

              <Box
                fontSize={"xl"}
                paddingTop={8}
                color={"blackAlpha.700"}
                textAlign={"center"}
              >
                <Text paddingInline={8} paddingBottom={8}>
                  {service.label}
                </Text>
              </Box>

              <Text _groupHover={{ textDecoration: "underline" }}>
                Learn More...
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
