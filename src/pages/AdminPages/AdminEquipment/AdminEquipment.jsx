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

export default function AdminEquipment() {
  const equipments = useLoaderData();
  const location = useLocation();

  return (
    <>
      <Box minH="72vh" pt={{ base: "90px", md: "90px" }}>
        <Container
          maxW="container.xl"
          pt={{ base: 6, md: 12 }}
          px={{ base: 4, md: 8, lg: 20 }}
          pb={{ base: 4, md: 6 }}
          borderBottom="1px solid"
          borderColor="design.100"
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
            Equipment
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

          {equipments.length === 0 ? (
            <Text
              color="brand.400"
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              No Equipment Entries
            </Text>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {equipments.map((equipment) => (
                <Card
                  key={equipment.id}
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
                          {equipment.equipmentName}
                        </Heading>
                        {equipment.createdAt && (
                          <Text fontSize={{ base: "sm", md: "md" }}>
                            Created:{" "}
                            {new Date(equipment.createdAt).toLocaleDateString()}
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
                          to={`Edit/${equipment.id}`}
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
                          action={`${equipment.id}/destroy`}
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
                      <Stack spacing={2}>
                        {equipment.brand && (
                          <Text fontSize={{ base: "sm", md: "md" }}>
                            <strong>Brand:</strong> {equipment.brand}
                          </Text>
                        )}
                        {equipment.modelNo && (
                          <Text fontSize={{ base: "sm", md: "md" }}>
                            <strong>Model No:</strong> {equipment.modelNo}
                          </Text>
                        )}
                      </Stack>
                      <Stack spacing={2}>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          <strong>Quantity:</strong> {equipment.quantity}
                        </Text>
                        {equipment.charge !== null &&
                          equipment.charge !== undefined && (
                            <Text fontSize={{ base: "sm", md: "md" }}>
                              <strong>Charge:</strong> $
                              {equipment.charge.toFixed(2)}
                            </Text>
                          )}
                      </Stack>
                    </SimpleGrid>
                  </CardBody>
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

export async function equipmentAdminLoader({ request }) {
  const url = new URL(request.url);
  const equipmentName = url.searchParams.get("equipmentName");

  const endpoint = equipmentName
    ? `http://localhost:3000/equipment?equipmentName=${equipmentName}`
    : "http://localhost:3000/equipment";

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const equipments = await response.json();
  return equipments;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch("http://localhost:3000/equipment/" + params.id, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
