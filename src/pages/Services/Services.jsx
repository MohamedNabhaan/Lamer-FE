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
    <Box overflow={"hidden"}>
      <Container
        maxW={"container.xl"}
        paddingTop={12}
        paddingLeft={20}
        paddingBottom={16}
        borderBottom={"solid"}
        borderColor={"design.200"}
        justifyContent={"center"}
      >
        <Stack direction={"column"} spacing={10}>
          <Heading
            as="h1"
            size={"3xl"}
            fontWeight={500}
            color={"brand.400"}
            display={"block"}
          >
            Services
          </Heading>
          <Text fontSize={"2xl"}>
            To ensure our clients recieve the best possible solutions, we offer
            a variety of specific services.
          </Text>
        </Stack>
      </Container>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
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
