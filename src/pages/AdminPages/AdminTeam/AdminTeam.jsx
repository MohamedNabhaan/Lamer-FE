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

export default function AdminTeam() {
  const employees = useLoaderData();
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
            Team Members
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

          {employees.length === 0 ? (
            <Text
              color="brand.400"
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              No Team Members
            </Text>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {employees.map((employee) => (
                <Card
                  key={employee.id}
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
                          borderRadius="full"
                          overflow="hidden"
                          bg="gray.100"
                        >
                          <Image
                            src={
                              employee.displayPic && employee.displayPic[0]
                                ? employee.displayPic[0]
                                : undefined
                            }
                            alt={employee.name}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            fallbackSrc="https://via.placeholder.com/80?text=Photo"
                          />
                        </Box>
                        <Box>
                          <Heading
                            as="h2"
                            size={{ base: "lg", md: "xl" }}
                            fontWeight={500}
                          >
                            {employee.name}
                          </Heading>
                          <Text
                            color="gray.600"
                            fontSize={{ base: "sm", md: "md" }}
                          >
                            {employee.position}
                          </Text>
                        </Box>
                      </Flex>

                      <Flex
                        mt={{ base: 2, sm: 0 }}
                        gap={2}
                        flexDirection={{ base: "column", xs: "row" }}
                        w={{ base: "100%", sm: "auto" }}
                      >
                        <NavLink
                          to={`/Admin/Team/Edit/${employee.id}`}
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
                          action={`${employee.id}/destroy`}
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
                      noOfLines={{ base: 3, md: 4 }}
                    >
                      {employee.description}
                    </Text>
                  </CardBody>

                  {employee.qualifications && (
                    <CardFooter
                      px={{ base: 3, md: 6 }}
                      py={{ base: 2, md: 4 }}
                      bg="gray.50"
                    >
                      <Stack spacing={2}>
                        <Text
                          fontWeight="medium"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          Qualifications:
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          {employee.qualifications}
                        </Text>
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

export async function employeesLoader({ request }) {
  const url = new URL(request.url);

  const response = await fetch("http://localhost:3000/employee" + url.search, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const employees = await response.json();

  // Format displayPic data
  employees.forEach((employee) => {
    if (typeof employee.displayPic === "string") {
      try {
        employee.displayPic = employee.displayPic
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");
      } catch (error) {
        employee.displayPic = [];
      }
    }
  });

  return employees;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch("http://localhost:3000/employee/" + params.id, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
