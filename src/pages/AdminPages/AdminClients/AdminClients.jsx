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
} from "@chakra-ui/react";
import {
  useLoaderData,
  Outlet,
  NavLink,
  redirect,
  Form,
  useLocation,
} from "react-router-dom";

export default function AdminClients() {
  const clients = useLoaderData();
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
            Clients
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

          {clients.length === 0 ? (
            <Text
              color="brand.400"
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              No Clients
            </Text>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {clients.map((client) => (
                <Card
                  key={client.id}
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
                      <Flex alignItems="center" gap={4}>
                        <Box
                          width={{ base: "60px", md: "80px" }}
                          height={{ base: "60px", md: "80px" }}
                          borderRadius="md"
                          overflow="hidden"
                          bg="gray.100"
                        >
                          <Image
                            src={client.logo[0]}
                            alt={client.clientName}
                            objectFit="contain"
                            width="100%"
                            height="100%"
                          />
                        </Box>
                        <Box>
                          <Heading
                            as="h2"
                            size={{ base: "lg", md: "xl" }}
                            fontWeight={500}
                          >
                            {client.clientName}
                          </Heading>
                        </Box>
                      </Flex>

                      <Form
                        method="post"
                        action={`${client.id}/destroy`}
                        style={{ width: { base: "100%", sm: "auto" } }}
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
                  </CardHeader>
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

export async function clientsLoader({ request }) {
  const url = new URL(request.url);

  const response = await fetch("http://localhost:3000/clients" + url.search, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const clients = await response.json();

  // Format logo data
  clients.forEach((client) => {
    if (typeof client.logo === "string") {
      try {
        client.logo = client.logo
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");
      } catch (error) {
        client.logo = [];
      }
    }
  });

  return clients;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch("http://localhost:3000/clients/" + params.id, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
