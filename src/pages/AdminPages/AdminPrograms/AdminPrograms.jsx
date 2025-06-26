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
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
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
import {
  getApiUrl,
  getApiUrlWithId,
  API_ENDPOINTS,
} from "../../../config/api.js";
import { Search, Loader, X } from "lucide-react";
import Pagination from "../../../components/Pagination";

export default function AdminPrograms() {
  const initialPrograms = useLoaderData();
  const [isFetching, setIsFetching] = useState(false);
  const [programs, setPrograms] = useState(initialPrograms);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName, setDebouncedSearchName] = useState("");
  const [progPerPage, setProgPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePrograms, setCurrentPagePrograms] = useState([]);
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

  // Refresh data when needed
  useEffect(() => {
    async function fetchPrograms() {
      setIsFetching(true);
      const params = {};

      if (debouncedSearchName && debouncedSearchName !== "") {
        params.title = debouncedSearchName;
      }

      const url = getApiUrl("programs", params);

      console.log("Fetching programs with URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();

      console.log("Received programs:", resData.length);

      setPrograms(resData);
      setCurrentPage(1);
      const indexOfLastProgram = 1 * progPerPage;
      const indexOfFirstProgram = indexOfLastProgram - progPerPage;
      setCurrentPagePrograms(
        resData.slice(indexOfFirstProgram, indexOfLastProgram)
      );
      setIsFetching(false);
    }

    fetchPrograms();
  }, [debouncedSearchName, progPerPage, refreshTrigger]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const clearSearch = () => {
    setSearchName("");
    setDebouncedSearchName("");
  };

  function paginate(number) {
    setCurrentPage(number);
    if (number < Math.ceil(programs.length / progPerPage + 1) && number > 0) {
      const indexOfLastProgram = number * progPerPage;
      const indexOfFirstProgram = indexOfLastProgram - progPerPage;
      setCurrentPagePrograms(
        programs.slice(indexOfFirstProgram, indexOfLastProgram)
      );
      window.scrollTo(0, 0);
    }
  }

  return (
    <>
      <Box minH="72vh" bg={bgColor} pt={{ base: "80px", md: "100px" }}>
        {/* Header Section */}
        <Box
          bg={headerBg}
          py={{ base: 8, md: 12 }}
          borderBottom="1px"
          borderColor={borderColor}
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
                Programs
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                maxW="container.md"
              >
                Manage your research and academic programs
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Search and Controls Section */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
          <Box mb={8}>
            {/* Search Bar and Create Button */}
            <VStack spacing={4} align="stretch">
              {/* Search Bar */}
              <Box w="100%">
                <InputGroup size={{ base: "md", md: "lg" }}>
                  <InputLeftElement>
                    <Icon as={Search} color={accentColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search programs by name..."
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

              {/* Controls Row */}
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify={{ base: "stretch", sm: "space-between" }}
                align={{ base: "stretch", sm: "center" }}
                gap={{ base: 3, sm: 0 }}
              >
                <HStack
                  spacing={2}
                  justify={{ base: "center", sm: "flex-start" }}
                  flexWrap="wrap"
                >
                  {searchName && (
                    <Badge colorScheme="blue" fontSize="sm">
                      1 active filter
                    </Badge>
                  )}
                </HStack>

                <HStack
                  spacing={3}
                  w={{ base: "100%", sm: "auto" }}
                  justify={{ base: "stretch", sm: "flex-end" }}
                >
                  {searchName && (
                    <Button
                      variant="outline"
                      colorScheme="red"
                      leftIcon={<X />}
                      onClick={clearSearch}
                      size={{ base: "md", sm: "md" }}
                      flex={{ base: 1, sm: "none" }}
                    >
                      Clear
                    </Button>
                  )}
                  <NavLink to="new">
                    <Button
                      color={"white"}
                      bg={"brand.400"}
                      size={{ base: "md", sm: "md" }}
                      _hover={{ bg: "brand.300" }}
                      flex={{ base: 1, sm: "none" }}
                      w={{ base: "100%", sm: "auto" }}
                    >
                      Create
                    </Button>
                  </NavLink>
                </HStack>
              </Flex>
            </VStack>

            {/* Active Search Display */}
            {searchName && (
              <Box mt={4}>
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

          {/* Programs List */}
          {programs.length === 0 && !isFetching ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={12}
              color={textColor}
            >
              <Text fontSize="xl" mb={2}>
                {searchName ? "No programs found" : "No Programs Available"}
              </Text>
              <Text>
                {searchName
                  ? "Try adjusting your search criteria"
                  : "Add programs to get started"}
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
              <Text fontSize="xl">Loading Programs...</Text>
            </Flex>
          ) : (
            <>
              {programs.length > 0 && (
                <>
                  <Stack spacing={{ base: 4, md: 6 }}>
                    {(currentPagePrograms.length > 0
                      ? currentPagePrograms
                      : programs
                    ).map((program) => (
                      <Card
                        key={program.id}
                        bg={cardBg}
                        variant="outline"
                        borderRadius="xl"
                        boxShadow="sm"
                        overflow="hidden"
                        _hover={{
                          shadow: "md",
                          transform: "translateY(-2px)",
                          transition: "all 0.2s",
                        }}
                      >
                        <CardHeader
                          borderBottom="1px solid"
                          borderColor={borderColor}
                          pb={{ base: 3, md: 4 }}
                          pt={{ base: 4, md: 5 }}
                          px={{ base: 4, md: 6 }}
                        >
                          <Flex
                            justifyContent="space-between"
                            alignItems={{ base: "flex-start", md: "center" }}
                            flexDirection={{ base: "column", sm: "row" }}
                            gap={{ base: 3, sm: 0 }}
                          >
                            <Box flex="1">
                              <Heading
                                as="h3"
                                size={{ base: "lg", md: "xl" }}
                                color={accentColor}
                                fontWeight={600}
                                mb={{ base: 1, md: 2 }}
                              >
                                {program.title}
                              </Heading>
                              {program.createdAt && (
                                <Text
                                  fontSize={{ base: "sm", md: "md" }}
                                  color={textColor}
                                >
                                  Created:{" "}
                                  {new Date(
                                    program.createdAt
                                  ).toLocaleDateString()}
                                </Text>
                              )}
                            </Box>

                            <HStack
                              spacing={2}
                              w={{ base: "100%", sm: "auto" }}
                              justify={{ base: "stretch", sm: "flex-end" }}
                            >
                              <NavLink to={`modify/${program.id}`}>
                                <Button
                                  bg={accentColor}
                                  color="white"
                                  size={{ base: "sm", md: "md" }}
                                  w={{ base: "100%", sm: "auto" }}
                                  _hover={{ bg: `${accentColor}.600` }}
                                >
                                  Edit
                                </Button>
                              </NavLink>

                              <Form
                                method="post"
                                action={`${program.id}/destroy`}
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
                                  size={{ base: "sm", md: "md" }}
                                  w={{ base: "100%", sm: "auto" }}
                                  _hover={{ bg: "red.600" }}
                                >
                                  Delete
                                </Button>
                              </Form>
                            </HStack>
                          </Flex>
                        </CardHeader>

                        <CardBody
                          px={{ base: 4, md: 6 }}
                          py={{ base: 3, md: 4 }}
                        >
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <Box>
                              {program.desc && (
                                <>
                                  <Text fontWeight="bold" mb={1}>
                                    Description
                                  </Text>
                                  <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    noOfLines={{ base: 3, md: 4 }}
                                    mb={3}
                                    color={textColor}
                                  >
                                    {program.desc}
                                  </Text>
                                </>
                              )}
                            </Box>
                            <Box>
                              {program.duration && (
                                <>
                                  <Text fontWeight="bold" mb={1}>
                                    Duration
                                  </Text>
                                  <Text fontSize="sm" color={textColor}>
                                    {program.duration}
                                  </Text>
                                </>
                              )}
                            </Box>
                          </SimpleGrid>
                        </CardBody>
                      </Card>
                    ))}
                  </Stack>
                </>
              )}
            </>
          )}

          {/* Pagination */}
          {!isFetching && (
            <Box py={8}>
              <Pagination
                projPerPage={progPerPage}
                totalProj={programs.length}
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

export async function loader({ request }) {
  const url = new URL(request.url);

  let endpoint = API_ENDPOINTS.PROGRAMS;

  if (url.searchParams.has("title")) {
    endpoint = getApiUrl("programs", {
      title: url.searchParams.get("title"),
    });
  }

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const programs = await response.json();
  return programs;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch(getApiUrlWithId("programs", params.id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
