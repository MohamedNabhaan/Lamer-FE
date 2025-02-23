import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import ServiceCard from "../../components/ServiceCard";
import { SERVICE_DETAILS } from "../../index.js";
import { useEffect } from "react";

export default function Services() {
  return (
    <Box overflow={"hidden"} minH={"72vh"} paddingBottom={4}>
      <Container
        maxW={"container.xl"}
        paddingTop={12}
        paddingLeft={20}
        paddingBottom={16}
        borderBottom={"solid"}
        borderColor={"design.100"}
        justifyContent={"center"}
      >
        <Stack direction={"column"} spacing={10}>
          <Heading
            borderLeft={"solid 20px"}
            paddingLeft={2}
            as="h1"
            size={"3xl"}
            fontWeight={500}
            color={"brand.400"}
            display={"block"}
          >
            Services
          </Heading>
          <Text fontSize={{base:"xl",md:"2xl"}}>
            To ensure our clients recieve the best possible solutions, we offer
            a variety of specific services.
          </Text>
        </Stack>
      </Container>
      <SimpleGrid
        columns={{ base: 1, md: 1 }}
        spacing={4}
        paddingTop={8}
        paddingInline={16}
      >
        {SERVICE_DETAILS.map((service) => (
          <ServiceCard service={service} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
