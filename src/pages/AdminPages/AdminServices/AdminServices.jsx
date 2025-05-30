import {
  Box,
  Heading,
  Container,
  Stack,
  Button,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  NavLink,
  redirect,
  Form,
} from "react-router-dom";

export default function AdminServices() {
  const services = useLoaderData();
  const location = useLocation();

  return (
    <>
      <Box minH="72vh" pt={0}>
        <Container
          maxW="container.xl"
          pt={{ base: 6, md: 12 }}
          px={{ base: 4, md: 8, lg: 20 }}
          pb={{ base: 4, md: 6 }}
          borderBottom="1px solid"
          borderColor="design.100"
          mt={{ base: "70px", md: "90px" }}
        >
          <Heading
            borderLeft={{ base: "solid 10px", md: "solid 20px" }}
            pl={{ base: 2, md: 4 }}
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
            fontWeight={500}
            color="brand.400"
            textAlign={{ base: "center", md: "left" }}
          >
            Services
          </Heading>
        </Container>

        <Container
          maxW="container.xl"
          px={{ base: 4, md: 8, lg: 16 }}
          py={{ base: 4, md: 8 }}
        >
          <Flex
            pb={{ base: 3, md: 5 }}
            justify={{ base: "center", md: "flex-end" }}
            mb={{ base: 2, md: 4 }}
          >
            <NavLink to={`Create`}>
              <Button
                bg="brand.400"
                color="white"
                size={{ base: "md", md: "lg" }}
                _hover={{ bg: "brand.500" }}
              >
                Create
              </Button>
            </NavLink>
          </Flex>

          {services.length === 0 ? (
            <Text
              color="brand.400"
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              No Services
            </Text>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {services.map((service) => (
                <Card
                  key={service.id}
                  variant="outline"
                  borderRadius={{ base: 15, md: 30 }}
                  boxShadow="sm"
                  overflow="hidden"
                >
                  <CardHeader
                    borderBottom="1px solid"
                    borderColor="design.100"
                    pb={{ base: 2, md: 4 }}
                    pt={{ base: 3, md: 5 }}
                    px={{ base: 3, md: 6 }}
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems={{ base: "flex-start", md: "center" }}
                      flexDirection={{ base: "column", sm: "row" }}
                      gap={{ base: 3, sm: 0 }}
                    >
                      <Box>
                        <Heading
                          as="h2"
                          size={{ base: "lg", md: "xl" }}
                          fontWeight={500}
                          mb={{ base: 1, md: 2 }}
                        >
                          {service.serviceName}
                        </Heading>
                        {service.createdAt && (
                          <Text fontSize={{ base: "sm", md: "md" }}>
                            Created:{" "}
                            {new Date(service.createdAt).toLocaleDateString()}
                          </Text>
                        )}
                      </Box>

                      <Flex
                        mt={{ base: 2, sm: 0 }}
                        gap={2}
                        flexDirection={{ base: "column", xs: "row" }}
                        w={{ base: "100%", sm: "auto" }}
                      >
                        <NavLink
                          to={`Edit/${service.id}`}
                          state={{
                            from: location.pathname + location.search,
                          }}
                          style={{ width: "100%" }}
                        >
                          <Button
                            bg="brand.400"
                            color="white"
                            mr={{ base: 0, xs: 2 }}
                            w={{ base: "100%", sm: "auto" }}
                            mb={{ base: 2, xs: 0 }}
                            size={{ base: "sm", md: "md" }}
                            _hover={{ bg: "brand.500" }}
                          >
                            Edit
                          </Button>
                        </NavLink>

                        <Form
                          method="post"
                          action={`${service.id}/destroy`}
                          style={{ width: "100%" }}
                        >
                          <input
                            type="hidden"
                            name="redirect"
                            value={location.pathname + location.search}
                          />
                          <Button
                            type="submit"
                            bg="red.500"
                            color="white"
                            w={{ base: "100%", sm: "auto" }}
                            size={{ base: "sm", md: "md" }}
                            _hover={{ bg: "red.600" }}
                          >
                            Delete
                          </Button>
                        </Form>
                      </Flex>
                    </Flex>
                  </CardHeader>

                  <CardBody px={{ base: 3, md: 6 }} py={{ base: 3, md: 4 }}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <Box>
                        <Text
                          fontSize={{ base: "sm", md: "md" }}
                          noOfLines={{ base: 3, md: 4 }}
                          mb={3}
                        >
                          {service.intro}
                        </Text>
                        {service.bannerPic && (
                          <Box
                            maxW="300px"
                            h="150px"
                            overflow="hidden"
                            mb={3}
                            boxShadow="sm"
                            borderRadius="md"
                          >
                            <Image
                              src={service.bannerPic}
                              alt={service.serviceName}
                              w="100%"
                              h="100%"
                              objectFit="cover"
                              fallbackSrc="https://via.placeholder.com/300x150?text=Banner"
                            />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Text fontWeight="bold" mb={1}>
                          Softwares
                        </Text>
                        <Text fontSize="sm" mb={3}>
                          {service.softwares || "None specified"}
                        </Text>

                        <Text fontWeight="bold" mb={1}>
                          Equipment
                        </Text>
                        <Text fontSize="sm">
                          {service.equipment || "None specified"}
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </CardBody>

                  <CardFooter
                    justifyContent="space-between"
                    px={{ base: 3, md: 6 }}
                    py={{ base: 2, md: 4 }}
                    bg="gray.50"
                  >
                    <Stack
                      direction={{ base: "column", xs: "row" }}
                      spacing={{ base: 2, md: 4 }}
                      w="100%"
                      justify={{ base: "center", sm: "flex-start" }}
                    >
                      <Badge
                        borderRadius={20}
                        px={3}
                        py={1.5}
                        bg="brand.400"
                        color="white"
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        Category: {service.serviceCategory}
                      </Badge>
                    </Stack>
                  </CardFooter>
                </Card>
              ))}
            </Stack>
          )}
        </Container>
      </Box>

      <Outlet />
    </>
  );
}

export async function servicesLoader({ request }) {
  const url = new URL(request.url);
  const serviceName = url.searchParams.get("serviceName");
  const serviceCategory = url.searchParams.get("serviceCategory");

  let endpoint = "http://localhost:3000/services";
  const params = new URLSearchParams();

  if (serviceName) params.append("serviceName", serviceName);
  if (serviceCategory) params.append("serviceCategory", serviceCategory);

  const queryString = params.toString();
  if (queryString) endpoint += `?${queryString}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const services = await response.json();

  // Extract and format image fields
  services.map((data) => {
    if (data.bannerPic) {
      const vals = data.bannerPic
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",");
      data.bannerPic = vals;
    }

    if (data.pagePics) {
      const vals2 = data.pagePics
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",");
      data.pagePics = vals2;
    }
  });

  return services;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch("http://localhost:3000/services/" + params.id, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
