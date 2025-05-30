import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  useColorModeValue,
  VStack,
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
  const location = useLocation();

  // Color scheme
  const bgColor = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");

  // Add scroll effect when defaultExpanded is present
  useEffect(() => {
    if (location.state?.defaultExpanded) {
      const element = document.getElementById(location.state.defaultExpanded);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100); // Small delay to ensure component is rendered
      }
    }
  }, [location.state?.defaultExpanded]);

  return (
    <Box minH="72vh" bg={bgColor} pt={0}>
      {/* Header Section */}
      <Box
        bg={headerBg}
        py={{ base: 8, md: 12 }}
        borderBottom="1px"
        borderColor={borderColor}
        mt={{ base: "70px", md: "90px" }}
      >
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={4} align="stretch">
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              color={accentColor}
              borderLeft="6px solid"
              pl={4}
              lineHeight="1.2"
            >
              Our Services
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="container.md"
            >
              Explore our comprehensive range of specialized services designed
              to deliver innovative solutions across multiple domains.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container
        maxW="container.xl"
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
      >
        <SimpleGrid columns={{ base: 1 }} spacing={8}>
          {SERVICE_DETAILS.map((service) => (
            <ServiceCard
              key={service.path}
              service={service}
              subServices={services}
              defaultExpanded={location.state?.defaultExpanded === service.path}
            />
          ))}
        </SimpleGrid>
      </Container>
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
    data.pagePics = vals2;
  });
  console.log(services);
  return services;
}
