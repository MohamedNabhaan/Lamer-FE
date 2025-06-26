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
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Select,
  Collapse,
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
  ExternalLink as ExternalLinkIcon,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  getApiUrl,
  getApiUrlWithId,
  API_ENDPOINTS,
} from "../../../config/api.js";
import Pagination from "../../../components/Pagination";

export default function AdminResearch() {
  const initialResearchData = useLoaderData();
  const [researchData, setResearchData] = useState(initialResearchData);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [researchPerPage, setResearchPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageResearch, setCurrentPageResearch] = useState([]);
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const headerBg = useColorModeValue("gray.50", "gray.700");

  // Debounce search title
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTitle(searchTitle);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTitle]);

  // Auto-show filters when they become active
  useEffect(() => {
    if (selectedYear) {
      setShowFilters(true);
    }
  }, [selectedYear]);

  // Trigger refresh when returning from deletion
  useEffect(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, [location.key]);

  // Initialize pagination on first load
  useEffect(() => {
    const indexOfLastResearch = currentPage * researchPerPage;
    const indexOfFirstResearch = indexOfLastResearch - researchPerPage;
    setCurrentPageResearch(
      researchData.slice(indexOfFirstResearch, indexOfLastResearch)
    );
  }, [researchData, currentPage, researchPerPage]);

  // Refresh data when search or filters change
  useEffect(() => {
    async function fetchResearch() {
      setIsFetching(true);
      const params = {};

      if (debouncedSearchTitle && debouncedSearchTitle !== "") {
        params.title = debouncedSearchTitle;
      }

      if (selectedYear && selectedYear !== "") {
        params.year = selectedYear;
      }

      const url =
        params.title || params.year
          ? getApiUrl("research", params)
          : API_ENDPOINTS.RESEARCH;

      console.log("Fetching research with URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();

      console.log("Received research:", resData.length);

      setResearchData(resData);
      setCurrentPage(1);
      const indexOfLastResearch = 1 * researchPerPage;
      const indexOfFirstResearch = indexOfLastResearch - researchPerPage;
      setCurrentPageResearch(
        resData.slice(indexOfFirstResearch, indexOfLastResearch)
      );
      setIsFetching(false);
    }

    fetchResearch();
  }, [debouncedSearchTitle, selectedYear, refreshTrigger, researchPerPage]);

  // Get unique years from the data for filter dropdown
  const getAvailableYears = () => {
    const years = new Set();
    researchData.forEach((research) => {
      if (research.year) {
        years.add(research.year);
      }
    });
    return Array.from(years).sort((a, b) => b - a); // Sort descending
  };

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const clearFilters = () => {
    setSearchTitle("");
    setDebouncedSearchTitle("");
    setSelectedYear("");
    setShowFilters(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchTitle) count++;
    if (selectedYear) count++;
    return count;
  };

  function paginate(number) {
    setCurrentPage(number);
    if (
      number < Math.ceil(researchData.length / researchPerPage + 1) &&
      number > 0
    ) {
      const indexOfLastResearch = number * researchPerPage;
      const indexOfFirstResearch = indexOfLastResearch - researchPerPage;
      setCurrentPageResearch(
        researchData.slice(indexOfFirstResearch, indexOfLastResearch)
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
                Research
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                maxW="container.md"
              >
                Manage research papers and publications
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Search and Controls Section */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
          <Box mb={8}>
            {/* Search Bar and Filter Toggle */}
            <VStack spacing={4} align="stretch">
              {/* Search Bar */}
              <Box w="100%">
                <InputGroup size={{ base: "md", md: "lg" }}>
                  <InputLeftElement>
                    <Icon as={Search} color={accentColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search research by title..."
                    value={searchTitle}
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
                <Box />

                <HStack
                  spacing={4}
                  w={{ base: "100%", sm: "auto" }}
                  justify={{ base: "stretch", sm: "flex-end" }}
                >
                  {/* Filter Toggle Button */}
                  <Button
                    leftIcon={<Filter />}
                    rightIcon={showFilters ? <ChevronUp /> : <ChevronDown />}
                    variant="outline"
                    size={{ base: "md", sm: "md" }}
                    onClick={() => setShowFilters(!showFilters)}
                    borderColor={borderColor}
                    _hover={{ borderColor: accentColor }}
                    bg={bgColor}
                    flex={{ base: 1, sm: "none" }}
                  >
                    Filters{" "}
                    {getActiveFilterCount() > 0 &&
                      `(${getActiveFilterCount()})`}
                  </Button>

                  {/* Create Button */}
                  <NavLink to={`new`}>
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

            {/* Filter Controls - Collapsible */}
            <Collapse in={showFilters} animateOpacity>
              <Box
                p={{ base: 4, md: 4 }}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="md"
                bg={bgColor}
                mb={4}
                mt={4}
              >
                <VStack spacing={4} align="stretch">
                  <VStack spacing={4} align="stretch">
                    {/* Year Filter */}
                    <Box w="100%">
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={textColor}
                        mb={2}
                      >
                        Filter by Year
                      </Text>
                      <Select
                        placeholder="All Years"
                        value={selectedYear}
                        onChange={handleYearChange}
                        size={{ base: "md", md: "lg" }}
                        borderColor={borderColor}
                        _hover={{ borderColor: accentColor }}
                        _focus={{
                          borderColor: accentColor,
                          boxShadow: `0 0 0 1px ${accentColor}`,
                        }}
                        bg={bgColor}
                      >
                        {getAvailableYears().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Select>
                    </Box>

                    {/* Clear Filters Button */}
                    {(selectedYear || searchTitle) && (
                      <Box w={{ base: "100%", sm: "auto" }}>
                        <Button
                          size={{ base: "md", md: "lg" }}
                          variant="outline"
                          colorScheme="red"
                          leftIcon={<X />}
                          onClick={clearFilters}
                          w={{ base: "100%", sm: "auto" }}
                        >
                          Clear Filters
                        </Button>
                      </Box>
                    )}
                  </VStack>

                  {/* Active Filters Display */}
                  {(selectedYear || searchTitle) && (
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={textColor}
                        mb={2}
                      >
                        Active Filters:
                      </Text>
                      <Flex spacing={2} flexWrap="wrap" gap={2}>
                        {searchTitle && (
                          <Box
                            bg={accentColor}
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="500"
                          >
                            Search: "{searchTitle}"
                          </Box>
                        )}
                        {selectedYear && (
                          <Box
                            bg={accentColor}
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="500"
                          >
                            Year: {selectedYear}
                          </Box>
                        )}
                      </Flex>
                    </Box>
                  )}
                </VStack>
              </Box>
            </Collapse>
          </Box>

          {/* Loading State */}
          {isFetching && (
            <Text textAlign="center" color={accentColor} fontSize="lg" py={8}>
              Loading research...
            </Text>
          )}

          {/* Results */}
          {!isFetching && (
            <>
              {researchData.length === 0 ? (
                <Text
                  color="brand.400"
                  textAlign="center"
                  fontSize={{ base: "xl", md: "2xl" }}
                >
                  {searchTitle || selectedYear
                    ? "No research found matching your criteria"
                    : "No Research Entries"}
                </Text>
              ) : (
                <Stack spacing={{ base: 3, md: 5 }}>
                  {(currentPageResearch.length > 0
                    ? currentPageResearch
                    : researchData
                  ).map((research) => (
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
                                {new Date(
                                  research.createdAt
                                ).toLocaleDateString()}
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
                              to={`modify/${research.id}`}
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

              {/* Pagination */}
              {!isFetching && (
                <Box mt={8}>
                  <Pagination
                    currentPage={currentPage}
                    projPerPage={researchPerPage}
                    totalProj={researchData.length}
                    paginate={paginate}
                    setCurrentPage={setCurrentPage}
                    setProjPerPage={setResearchPerPage}
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      <Outlet />
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  const year = url.searchParams.get("year");

  const params = {};
  if (title) params.title = title;
  if (year) params.year = year;

  const endpoint =
    Object.keys(params).length > 0
      ? getApiUrl("research", params)
      : API_ENDPOINTS.RESEARCH;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const researches = await response.json();
  return researches;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch(getApiUrlWithId("research", params.id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}

export async function researchDetailLoader({ params }) {
  const response = await fetch(getApiUrlWithId("research", params.id), {
    // ... existing code ...
  });
  // ... existing code ...
}
