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
      paddingBottom={{base:4,lg:0}}
      
    >
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={8}>
        <Box>
          <Heading
          textAlign={{base:"center",md:"left"}}
            textColor={"brand.400"}
            size={{base:"2xl",md:"3xl"}}
            paddingBottom={4}
            paddingLeft={{ base: 0, md: 4 }}
          >
            Core Services
          </Heading>
          <Heading
            color={"blackAlpha.600"}
            paddingLeft={{ base: 0, md: 6 }}
            fontWeight={400}
            size={{base:"md",md:"lg"}}
            textAlign={{base:"center",md:"left"}}
          >
            We provide an array of services under these categories
          </Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2,lg:4 }} h={"100%"} spacing={2}>
          {SERVICES.map((service) => (
            <Link to={`/Services#${service.path}`}>
              <Flex
                role="group"
                border={"solid"}
                h={{base:"10rem",md:"20rem"}}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                paddingBlockStart={{base:4,md:12}}
                borderColor={"design.100"}
                borderRadius={"1rem"}
                transitionDuration={"600ms"}
                _hover={{
                  bgColor: "blackAlpha.200",
                }}
              >
                <Image
                  h={{base:"50%",md:"50%"}}
                  border={"solid"}
                  borderColor={"design.100"}
                  borderRadius={"50%"}
                  objectFit={"cover"}
                  src={service.img}
                />

                <Box
                  fontSize={{base:"md",lg:"lg"}}
                  paddingTop={{base:1,md:8}}
                  color={"blackAlpha.700"}
                  textAlign={"center"}
                >
                  <Text paddingInline={{base:2,lg:8}} paddingBottom={{base:1,lg:8}}>
                    {service.label}
                  </Text>
                </Box>

                <Text fontSize={{base:"small",lg:"md"}} _groupHover={{ textDecoration: "underline" }}>
                  Learn More...
                </Text>
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
