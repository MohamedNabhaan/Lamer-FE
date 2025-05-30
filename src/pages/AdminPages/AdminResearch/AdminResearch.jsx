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
  Link as ChakraLink,
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
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

export default function AdminResearch() {
  const researches = useLoaderData();
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
            Research
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

          {researches.length === 0 ? (
            <Text
              color="brand.400"
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              No Research Entries
            </Text>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {researches.map((research) => (
                <Card
                  key={research.id}
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
                          {research.title}
                        </Heading>
                        {research.createdAt && (
                          <Text fontSize={{ base: "sm", md: "md" }}>
                            Created:{" "}
                            {new Date(research.createdAt).toLocaleDateString()}
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
                          to={`Edit/${research.id}`}
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
                          action={`${research.id}/destroy`}
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
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight="bold"
                      mb={2}
                    >
                      Authors: {research.authors}
                    </Text>
                    <ChakraLink
                      href={research.link}
                      isExternal
                      color="blue.500"
                      fontWeight="medium"
                      fontSize={{ base: "sm", md: "md" }}
                      display="inline-flex"
                      alignItems="center"
                    >
                      View Research <ExternalLinkIcon mx="2px" />
                    </ChakraLink>
                  </CardBody>

                  {research.year && (
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
                          Year: {research.year}
                        </Badge>
                      </Stack>
                    </CardFooter>
                  )}
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

export async function researchAdminLoader({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");

  const endpoint = title
    ? `http://localhost:3000/research?title=${title}`
    : "http://localhost:3000/research";

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const researches = await response.json();
  return researches;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch("http://localhost:3000/research/" + params.id, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
