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
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useLoaderData,
  Outlet,
  NavLink,
  redirect,
  Form,
  useLocation,
} from "react-router-dom";
import {
  getApiUrlWithId,
  getApiUrl,
  API_ENDPOINTS,
} from "../../../config/api.js";
import { Search, Loader, X } from "lucide-react";
import Pagination from "../../../components/Pagination";

export default function AdminClients() {
  const initialClients = useLoaderData();
  const [isFetching, setIsFetching] = useState(false);
  const [clients, setClients] = useState(initialClients);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName, setDebouncedSearchName] = useState("");
  const [projPerPage, setProjPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageClients, setCurrentPageClients] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  // Trigger refresh when returning from deletion
  useEffect(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, [location.key]);

  // Debounce search name
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchName(searchName);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchName]);

  useEffect(() => {
    async function fetchClients() {
      setIsFetching(true);
      const params = {};

      if (debouncedSearchName && debouncedSearchName !== "") {
        params.name = debouncedSearchName;
      }

      const url = getApiUrl("clients", params);

      console.log("Fetching clients with URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": null,
        },
        credentials: "include",
      });
      const resData = await response.json();

      console.log("Received clients:", resData.length);

      // Format logo data
      resData.forEach((client) => {
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

      setClients(resData);
      setCurrentPage(1);
      const indexOfLastClient = 1 * projPerPage;
      const indexOfFirstClient = indexOfLastClient - projPerPage;
      setCurrentPageClients(
        resData.slice(indexOfFirstClient, indexOfLastClient)
      );
      setIsFetching(false);
    }

    fetchClients();
  }, [debouncedSearchName, projPerPage, refreshTrigger]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const clearSearch = () => {
    setSearchName("");
    setDebouncedSearchName("");
  };

  function paginate(number) {
    setCurrentPage(number);
    if (number < Math.ceil(clients.length / projPerPage + 1) && number > 0) {
      const indexOfLastClient = number * projPerPage;
      const indexOfFirstClient = indexOfLastClient - projPerPage;
      setCurrentPageClients(
        clients.slice(indexOfFirstClient, indexOfLastClient)
      );
      window.scrollTo(0, 0);
    }
  }

  return (
    <>
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
                Admin Clients
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                maxW="container.md"
              >
                Manage your client portfolio and relationships
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Search Section */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
          <Box mb={8}>
            {/* Search Bar and Create Button */}
            <Flex justify="space-between" align="center" mb={4}>
              <Box flex="1" maxW="400px">
                <InputGroup size="lg">
                  <InputLeftElement>
                    <Icon as={Search} color={accentColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search clients by name..."
                    value={searchName}
                    onChange={handleSearchChange}
                    borderColor={borderColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{
                      borderColor: accentColor,
                      boxShadow: `0 0 0 1px ${accentColor}`,
                    }}
                    bg={bgColor}
                  />
                </InputGroup>
              </Box>
              <HStack spacing={3}>
                {searchName && (
                  <Badge colorScheme="blue" fontSize="sm">
                    1 active filter
                  </Badge>
                )}
                {searchName && (
                  <Button
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<X />}
                    onClick={clearSearch}
                    size="md"
                  >
                    Clear
                  </Button>
                )}
                <NavLink to={`new`}>
                  <Button
                    color={"white"}
                    bg={"brand.400"}
                    size={"md"}
                    _hover={{ bg: "brand.300" }}
                  >
                    Create
                  </Button>
                </NavLink>
              </HStack>
            </Flex>

            {/* Active Search Display */}
            {searchName && (
              <Box>
                <Text fontSize="sm" fontWeight="600" color={textColor} mb={2}>
                  Active Search:
                </Text>
                <Box
                  bg={accentColor}
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="500"
                  display="inline-block"
                >
                  Search: "{searchName}"
                </Box>
              </Box>
            )}
          </Box>

          {/* Clients List */}
          {clients.length === 0 && !isFetching ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={12}
              color={textColor}
            >
              <Text fontSize="xl" mb={2}>
                {searchName ? "No clients found" : "No Clients Available"}
              </Text>
              <Text>
                {searchName
                  ? "Try adjusting your search criteria"
                  : "Add clients to get started"}
              </Text>
            </Flex>
          ) : null}

          {isFetching ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={12}
              color={accentColor}
            >
              <Icon as={Loader} size={40} mb={4} />
              <Text fontSize="xl">Loading Clients...</Text>
            </Flex>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {currentPageClients.map((client) => (
                <Card
                  key={client.id}
                  variant="outline"
                  borderRadius={{ base: 15, md: 30 }}
                  boxShadow="sm"
                  overflow="hidden"
                  bg={cardBg}
                  borderColor={borderColor}
                >
                  <CardHeader
                    borderBottom="1px solid"
                    borderColor={borderColor}
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
                            fallbackSrc="https://via.placeholder.com/80x80?text=Logo"
                          />
                        </Box>
                        <Box>
                          <Heading
                            as="h2"
                            size={{ base: "lg", md: "xl" }}
                            fontWeight={500}
                            color={accentColor}
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

          {/* Pagination */}
          {clients.length > 0 && !isFetching && (
            <Box py={8}>
              <Pagination
                projPerPage={projPerPage}
                totalProj={clients.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </Box>
          )}
        </Container>
      </Box>

      <Outlet />
    </>
  );
}

export async function clientsLoader({ request }) {
  const url = new URL(request.url);

  const response = await fetch(API_ENDPOINTS.CLIENTS + url.search, {
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

  const response = await fetch(getApiUrlWithId("clients", params.id), {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
