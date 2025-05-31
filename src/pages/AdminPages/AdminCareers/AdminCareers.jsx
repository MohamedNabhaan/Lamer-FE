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
  Select,
  Collapse,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  NavLink,
  redirect,
  Form,
  useLocation,
} from "react-router-dom";
import {
  Search,
  Loader,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  getApiUrlWithId,
  getApiUrl,
  API_ENDPOINTS,
} from "../../../config/api.js";
import Pagination from "../../../components/Pagination";

export default function AdminCareers() {
  const initialVacancies = useLoaderData();
  const [isFetching, setIsFetching] = useState(false);
  const [vacancies, setVacancies] = useState(initialVacancies);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName, setDebouncedSearchName] = useState("");
  const [positionStatus, setPositionStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [projPerPage, setProjPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageVacancies, setCurrentPageVacancies] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  // Position Status options
  const positionStatusOptions = [
    { value: "", label: "All Types" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ];

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
    async function fetchVacancies() {
      setIsFetching(true);
      const params = {};

      if (debouncedSearchName && debouncedSearchName !== "") {
        params.positionName = debouncedSearchName;
      }

      if (positionStatus && positionStatus !== "") {
        params.positionStatus = positionStatus;
      }

      const url = getApiUrl("vacancies", params);

      console.log("Fetching vacancies with URL:", url);

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

      console.log("Received vacancies:", resData.length);

      setVacancies(resData);
      setCurrentPage(1);
      const indexOfLastVacancy = 1 * projPerPage;
      const indexOfFirstVacancy = indexOfLastVacancy - projPerPage;
      setCurrentPageVacancies(
        resData.slice(indexOfFirstVacancy, indexOfLastVacancy)
      );
      setIsFetching(false);
    }

    fetchVacancies();
  }, [debouncedSearchName, positionStatus, projPerPage, refreshTrigger]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleStatusChange = (e) => {
    setPositionStatus(e.target.value);
  };

  const clearFilters = () => {
    setSearchName("");
    setDebouncedSearchName("");
    setPositionStatus("");
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchName) count++;
    if (positionStatus) count++;
    return count;
  };

  function paginate(number) {
    setCurrentPage(number);
    if (number < Math.ceil(vacancies.length / projPerPage + 1) && number > 0) {
      const indexOfLastVacancy = number * projPerPage;
      const indexOfFirstVacancy = indexOfLastVacancy - projPerPage;
      setCurrentPageVacancies(
        vacancies.slice(indexOfFirstVacancy, indexOfLastVacancy)
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
                Admin Careers
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                maxW="container.md"
              >
                Manage job vacancies and career opportunities
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Filter and Search Section */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
          <Box mb={8}>
            {/* Search Bar and Controls */}
            <Flex justify="space-between" align="center" mb={4}>
              <Box flex="1" maxW="400px">
                <InputGroup size="lg">
                  <InputLeftElement>
                    <Icon as={Search} color={accentColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search by position name..."
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
                <Button
                  variant="outline"
                  colorScheme="blue"
                  leftIcon={<Filter />}
                  rightIcon={showFilters ? <ChevronUp /> : <ChevronDown />}
                  onClick={() => setShowFilters(!showFilters)}
                  size="md"
                >
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <Badge ml={2} colorScheme="red" borderRadius="full">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
                {getActiveFilterCount() > 0 && (
                  <Button
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<X />}
                    onClick={clearFilters}
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

            {/* Collapsible Filters */}
            <Collapse in={showFilters} animateOpacity>
              <Box
                bg={cardBg}
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                shadow="sm"
                mb={4}
              >
                <VStack spacing={4} align="stretch">
                  <Text fontWeight="600" color={textColor}>
                    Filter Options
                  </Text>
                  <HStack spacing={4} flexWrap="wrap">
                    <Box flex="1" minW="250px">
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={textColor}
                        mb={2}
                      >
                        Employment Type
                      </Text>
                      <Select
                        size="lg"
                        value={positionStatus}
                        onChange={handleStatusChange}
                        borderColor={borderColor}
                        _hover={{ borderColor: accentColor }}
                        bg={bgColor}
                      >
                        {positionStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </Box>
                  </HStack>
                </VStack>
              </Box>
            </Collapse>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <Box>
                <Text fontSize="sm" fontWeight="600" color={textColor} mb={2}>
                  Active Filters:
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  {searchName && (
                    <Badge
                      bg={accentColor}
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="500"
                    >
                      Search: "{searchName}"
                    </Badge>
                  )}
                  {positionStatus && (
                    <Badge
                      bg={accentColor}
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="500"
                    >
                      Type: {positionStatus}
                    </Badge>
                  )}
                </HStack>
              </Box>
            )}
          </Box>

          {/* Vacancies List */}
          {vacancies.length === 0 && !isFetching ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={12}
              color={textColor}
            >
              <Text fontSize="xl" mb={2}>
                {getActiveFilterCount() > 0
                  ? "No vacancies found"
                  : "No Vacancies Available"}
              </Text>
              <Text>
                {getActiveFilterCount() > 0
                  ? "Try adjusting your search criteria"
                  : "Add vacancies to get started"}
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
              <Text fontSize="xl">Loading Vacancies...</Text>
            </Flex>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {currentPageVacancies.map((vacancy) => (
                <Card
                  key={vacancy.id}
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
                      <Box>
                        <Heading
                          as="h2"
                          size={{ base: "lg", md: "xl" }}
                          fontWeight={500}
                          mb={{ base: 1, md: 2 }}
                          color={accentColor}
                        >
                          {vacancy.positionName}
                        </Heading>
                        <Text
                          fontSize={{ base: "sm", md: "md" }}
                          color={textColor}
                        >
                          Posted On: {vacancy.created_at}
                        </Text>
                      </Box>

                      <Flex
                        mt={{ base: 2, sm: 0 }}
                        gap={2}
                        flexDirection={{ base: "column", xs: "row" }}
                        w={{ base: "100%", sm: "auto" }}
                      >
                        <NavLink
                          to={`modify/${vacancy.id}`}
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
                          action={`${vacancy.id}/destroy`}
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
                      color={textColor}
                    >
                      {vacancy.desc}
                    </Text>
                  </CardBody>

                  <CardFooter
                    justifyContent="space-between"
                    px={{ base: 3, md: 6 }}
                    py={{ base: 2, md: 4 }}
                    bg={useColorModeValue("gray.50", "gray.700")}
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
                        {vacancy.positionStatus}
                      </Badge>

                      <Badge
                        borderRadius={20}
                        px={3}
                        py={1.5}
                        bg="brand.400"
                        color="white"
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        {vacancy.experience} Years
                      </Badge>
                    </Stack>
                  </CardFooter>
                </Card>
              ))}
            </Stack>
          )}

          {/* Pagination */}
          {vacancies.length > 0 && !isFetching && (
            <Box py={8}>
              <Pagination
                projPerPage={projPerPage}
                totalProj={vacancies.length}
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

export async function vacanciesLoader({ request }) {
  const url = new URL(request.url);

  const response = await fetch(API_ENDPOINTS.VACANCIES + url.search, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const vacancies = await response.json();

  return vacancies;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch(getApiUrlWithId("vacancies", params.id), {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
