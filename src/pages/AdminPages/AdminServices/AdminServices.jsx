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
  getApiUrl,
  getApiUrlWithId,
  API_ENDPOINTS,
} from "../../../config/api.js";
import { SERVICE_CATEGORIES } from "../../..";
import {
  Search,
  Loader,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Pagination from "../../../components/Pagination";

export default function AdminServices() {
  const initialServices = useLoaderData();
  const [isFetching, setIsFetching] = useState(false);
  const [services, setServices] = useState(initialServices);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName, setDebouncedSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [servicesPerPage, setServicesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageServices, setCurrentPageServices] = useState([]);
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

  // Auto-show filters when they become active
  useEffect(() => {
    if (selectedCategory) {
      setShowFilters(true);
    }
  }, [selectedCategory]);

  // Initialize pagination on first load
  useEffect(() => {
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    setCurrentPageServices(
      services.slice(indexOfFirstService, indexOfLastService)
    );
  }, [services, currentPage, servicesPerPage]);

  // Refresh data when needed
  useEffect(() => {
    async function fetchServices() {
      setIsFetching(true);
      const params = {};

      if (debouncedSearchName && debouncedSearchName !== "") {
        params.serviceName = debouncedSearchName;
      }

      if (selectedCategory && selectedCategory !== "") {
        params.serviceCategory = selectedCategory;
      }

      const url = getApiUrl("services", params);

      console.log("Fetching services with URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();

      console.log("Received services:", resData.length);

      // Format image data consistently with loader
      resData.forEach((service) => {
        if (service.bannerPic && typeof service.bannerPic === "string") {
          try {
            const vals = service.bannerPic
              .replace("[", "")
              .replace("]", "")
              .replace(/["]/g, "")
              .split(",")
              .filter((val) => val.trim() !== "");
            service.bannerPic = vals;
          } catch (error) {
            service.bannerPic = [];
          }
        } else if (!service.bannerPic) {
          service.bannerPic = [];
        }

        if (service.pagePics && typeof service.pagePics === "string") {
          try {
            const vals2 = service.pagePics
              .replace("[", "")
              .replace("]", "")
              .replace(/["]/g, "")
              .split(",")
              .filter((val) => val.trim() !== "");
            service.pagePics = vals2;
          } catch (error) {
            service.pagePics = [];
          }
        } else if (!service.pagePics) {
          service.pagePics = [];
        }
      });

      setServices(resData);
      setCurrentPage(1); // Reset to first page after refresh
      setIsFetching(false);
    }

    fetchServices();
  }, [debouncedSearchName, selectedCategory, servicesPerPage, refreshTrigger]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const clearFilters = () => {
    setSearchName("");
    setDebouncedSearchName("");
    setSelectedCategory("");
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchName) count++;
    if (selectedCategory) count++;
    return count;
  };

  function paginate(number) {
    setCurrentPage(number);
    if (
      number < Math.ceil(services.length / servicesPerPage + 1) &&
      number > 0
    ) {
      const indexOfLastService = number * servicesPerPage;
      const indexOfFirstService = indexOfLastService - servicesPerPage;
      setCurrentPageServices(
        services.slice(indexOfFirstService, indexOfLastService)
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
                Admin Services
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                maxW="container.md"
              >
                Manage your service offerings and capabilities
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Filter and Search Section */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
          <Box mb={8}>
            {/* Search Bar and Filter Toggle */}
            <Flex justify="space-between" align="center" mb={4}>
              <Box flex="1" maxW="400px">
                <InputGroup size="lg">
                  <InputLeftElement>
                    <Icon as={Search} color={accentColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search services by name..."
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

              <HStack spacing={4}>
                {/* Filter Toggle Button */}
                <Button
                  leftIcon={<Filter />}
                  rightIcon={showFilters ? <ChevronUp /> : <ChevronDown />}
                  variant="outline"
                  size="md"
                  onClick={() => setShowFilters(!showFilters)}
                  borderColor={borderColor}
                  _hover={{ borderColor: accentColor }}
                  bg={bgColor}
                >
                  Filters{" "}
                  {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
                </Button>

                {/* Create Button */}
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

            {/* Filters Panel */}
            <Collapse in={showFilters} animateOpacity>
              <Box
                bg={cardBg}
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                shadow="sm"
                transition="all 0.3s ease"
                mb={6}
              >
                <VStack spacing={4} align="stretch">
                  <HStack spacing={4} flexWrap="wrap">
                    {/* Category Filter */}
                    <Box flex="1" minW="250px">
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={textColor}
                        mb={2}
                      >
                        Filter by Category
                      </Text>
                      <Select
                        size="md"
                        placeholder="All Categories"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        borderColor={borderColor}
                        _hover={{ borderColor: accentColor }}
                        bg={bgColor}
                      >
                        {SERVICE_CATEGORIES.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </Select>
                    </Box>

                    {/* Clear Filters Button */}
                    {(selectedCategory || searchName) && (
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="transparent"
                          mb={2}
                        >
                          Clear
                        </Text>
                        <Button
                          size="md"
                          variant="outline"
                          colorScheme="red"
                          leftIcon={<X />}
                          onClick={clearFilters}
                        >
                          Clear Filters
                        </Button>
                      </Box>
                    )}
                  </HStack>

                  {/* Active Filters Display */}
                  {(selectedCategory || searchName) && (
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={textColor}
                        mb={2}
                      >
                        Active Filters:
                      </Text>
                      <HStack spacing={2} flexWrap="wrap">
                        {searchName && (
                          <Box
                            bg={accentColor}
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="500"
                          >
                            Search: "{searchName}"
                          </Box>
                        )}
                        {selectedCategory && (
                          <Box
                            bg={accentColor}
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="500"
                          >
                            Category:{" "}
                            {
                              SERVICE_CATEGORIES.find(
                                (cat) => cat.value === selectedCategory
                              )?.label
                            }
                          </Box>
                        )}
                      </HStack>
                    </Box>
                  )}
                </VStack>
              </Box>
            </Collapse>
          </Box>

          {/* Loading State */}
          {isFetching && (
            <Flex justify="center" align="center" py={12}>
              <Icon
                as={Loader}
                w={8}
                h={8}
                color={accentColor}
                className="animate-spin"
              />
              <Text ml={3} fontSize="lg" color={textColor}>
                Loading services...
              </Text>
            </Flex>
          )}

          {/* Services List */}
          {!isFetching && services.length === 0 ? (
            <Text
              color="brand.400"
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              No Services Found
            </Text>
          ) : (
            !isFetching && (
              <Stack spacing={{ base: 3, md: 5 }}>
                {currentPageServices.map((service) => (
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
                            to={`modify/${service.id}`}
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
                          {service.bannerPic &&
                            service.bannerPic.length > 0 &&
                            service.bannerPic[0] && (
                              <Box
                                maxW="300px"
                                h="150px"
                                overflow="hidden"
                                mb={3}
                                boxShadow="sm"
                                borderRadius="md"
                              >
                                <Image
                                  src={service.bannerPic[0]}
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
            )
          )}

          {/* Pagination */}
          {services.length > 0 && !isFetching && (
            <Box py={8}>
              <Pagination
                projPerPage={servicesPerPage}
                totalProj={services.length}
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

  let endpoint = API_ENDPOINTS.SERVICES;

  if (url.searchParams.has("serviceCategory")) {
    endpoint = getApiUrl("services", {
      serviceCategory: url.searchParams.get("serviceCategory"),
    });
  }

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const services = await response.json();

  // Extract and format image fields
  services.map((data) => {
    if (data.bannerPic && typeof data.bannerPic === "string") {
      try {
        const vals = data.bannerPic
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",")
          .filter((val) => val.trim() !== "");
        data.bannerPic = vals;
      } catch (error) {
        data.bannerPic = [];
      }
    } else if (!data.bannerPic) {
      data.bannerPic = [];
    }

    if (data.pagePics && typeof data.pagePics === "string") {
      try {
        const vals2 = data.pagePics
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",")
          .filter((val) => val.trim() !== "");
        data.pagePics = vals2;
      } catch (error) {
        data.pagePics = [];
      }
    } else if (!data.pagePics) {
      data.pagePics = [];
    }
  });

  return services;
}

export async function serviceDetailLoader({ params }) {
  const response = await fetch(getApiUrlWithId("services", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const service = await response.json();

  // Extract and format image fields
  if (service.bannerPic) {
    const vals = service.bannerPic
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    service.bannerPic = vals;
  }

  if (service.pagePics) {
    const vals2 = service.pagePics
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    service.pagePics = vals2;
  }

  return service;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch(getApiUrlWithId("services", params.id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
