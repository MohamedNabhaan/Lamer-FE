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
import {
  Outlet,
  useLoaderData,
  useSearchParams,
  useLocation,
  NavLink,
  useSubmit,
  redirect,
} from "react-router-dom";

export default function Services() {
  const services = useLoaderData();
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
          <Text fontSize={{base:"xl",md:"2xl"}} paddingRight={{base:12,md:0}}>
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
          <ServiceCard service={service} subServices={services} />
        ))}
      </SimpleGrid>
    </Box>
  );
}


export async function loader({ request, params }) {
  const url = new URL(request.url);

  const response = await fetch("http://localhost:3000/services/" + url.search, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const services = await response.json();

  services.map((data) => {
    const vals = data.bannerPic
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    const vals2 = data.pagePics
    .replace("[", "")
    .replace("]", "")
    .replace(/["]/g, "")
    .split(",");

    
    data.bannerPic = vals;
    data.pagePics = vals2
  });
  console.log(services);
  return services;
}