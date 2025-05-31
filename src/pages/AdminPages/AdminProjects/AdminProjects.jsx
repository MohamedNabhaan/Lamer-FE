import {
  Box,
  Heading,
  Container,
  Stack,
  Select,
  Button,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  Image,
  Center,
  Icon,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PROJ_CATEGORIES, SERVICE_CATEGORIES } from "../../..";
import {
  Outlet,
  useLoaderData,
  useSearchParams,
  useLocation,
  NavLink,
  useSubmit,
  redirect,
  Form,
} from "react-router-dom";
import { ProjectCard } from "../../../components/ProjectCard";
import { ImageOff, Filter, Loader, X, Search } from "lucide-react";
import {
  getApiUrlWithId,
  getApiUrl,
  API_ENDPOINTS,
} from "../../../config/api.js";
import Pagination from "../../../components/Pagination";

export default function AdminProjects() {
  const initialProjects = useLoaderData();
  const [isFetching, setIsFetching] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [filtered, setFiltered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [projPerPage, setProjPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProjects, setCurrentPageProjects] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const iconBg = useColorModeValue("gray.100", "gray.600");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  // Component for when no image is available
  const NoImageFallback = () => (
    <Center
      width="100%"
      height="100%"
      bg={iconBg}
      flexDirection="column"
      gap={2}
    >
      <Icon as={ImageOff} w={8} h={8} color={iconColor} />
      <Text fontSize="xs" color={iconColor} textAlign="center">
        No Image
      </Text>
    </Center>
  );

  // Get available services based on selected category
  const getAvailableServices = () => {
    if (!selectedCategory) return [];
    const categoryData = SERVICE_CATEGORIES.find(
      (cat) => cat.category === selectedCategory
    );
    return categoryData ? categoryData.services : [];
  };

  // Trigger refresh when returning from deletion
  useEffect(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, [location.key]);

  // Debounce search title
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTitle(searchTitle);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTitle]);

  // Fetch services for selected category
  useEffect(() => {
    if (selectedCategory) {
      fetchServicesForCategory(selectedCategory);
    } else {
      setAvailableServices([]);
      setSelectedService("");
    }
  }, [selectedCategory]);

  // Auto-show filters when they become active
  useEffect(() => {
    if (selectedCategory || selectedService) {
      setShowFilters(true);
    }
  }, [selectedCategory, selectedService]);

  const fetchServicesForCategory = async (category) => {
    try {
      const response = await fetch(
        getApiUrl("services", { serviceCategory: category })
      );
      const services = await response.json();
      setAvailableServices(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      setAvailableServices([]);
    }
  };

  useEffect(() => {
    async function fetchProjects() {
      setIsFetching(true);
      const params = {};

      if (debouncedSearchTitle && debouncedSearchTitle !== "") {
        params.title = debouncedSearchTitle;
      }

      if (selectedCategory && selectedCategory !== "") {
        params.category = selectedCategory;
      }

      if (selectedService && selectedService !== "") {
        params.service = selectedService;
      }

      const url = getApiUrl("projects", params);

      console.log("Fetching projects with URL:", url);

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

      console.log("Received projects:", resData.length);

      resData.forEach((data) => {
        try {
          const vals = data.images
            .replace("[", "")
            .replace("]", "")
            .replace(/["]/g, "")
            .split(",");
          const date = new Date(data.projectDate);
          data.projectDate = `${date.getDate().toString().padStart(2, "0")}-${(
            date.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`;
          data.images = vals;
        } catch (error) {
          data.images = [];
        }
      });

      setProjects(resData);
      setCurrentPage(1);
      const indexOfLastProject = 1 * projPerPage;
      const indexOfFirstProject = indexOfLastProject - projPerPage;
      setCurrentPageProjects(
        resData.slice(indexOfFirstProject, indexOfLastProject)
      );
      setIsFetching(false);
    }

    fetchProjects();
  }, [
    debouncedSearchTitle,
    selectedCategory,
    selectedService,
    projPerPage,
    refreshTrigger,
  ]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedService(""); // Reset service when category changes
    setFiltered(category !== "");
  };

  const handleServiceChange = (e) => {
    const service = e.target.value;
    setSelectedService(service);
  };

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedService("");
    setSearchTitle("");
    setDebouncedSearchTitle("");
    setAvailableServices([]);
    setFiltered(false);
    setShowFilters(false);
  };

  function paginate(number) {
    setCurrentPage(number);
    if (number < Math.ceil(projects.length / projPerPage + 1) && number > 0) {
      const indexOfLastProj = number * projPerPage;
      const indexOfFirstProj = indexOfLastProj - projPerPage;
      setCurrentPageProjects(projects.slice(indexOfFirstProj, indexOfLastProj));
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
                Admin Projects
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                maxW="container.md"
              >
                Manage and organize your project portfolio
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Filter Section */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
          <Box mb={8}>
            {/* Filter Toggle Button and Create Button */}
            <Flex justify="space-between" align="center" mb={4}>
              <Box flex="1" maxW="400px">
                <InputGroup size="lg">
                  <InputLeftElement>
                    <Icon as={Search} color={accentColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search projects by title..."
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
              <HStack spacing={3}>
                {(selectedCategory || selectedService || searchTitle) && (
                  <Badge colorScheme="blue" fontSize="sm">
                    {
                      [selectedCategory, selectedService, searchTitle].filter(
                        Boolean
                      ).length
                    }{" "}
                    active
                  </Badge>
                )}
                <Button
                  leftIcon={<Filter />}
                  onClick={() => setShowFilters(!showFilters)}
                  variant={showFilters ? "solid" : "outline"}
                  colorScheme="brand"
                  size="md"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
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

            {/* Filter Controls - Collapsible */}
            {showFilters && (
              <Box
                bg={cardBg}
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                shadow="sm"
                transition="all 0.3s ease"
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
                        size="lg"
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

                    {/* Service Filter - Only show when category is selected */}
                    {selectedCategory && (
                      <Box flex="1" minW="250px">
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color={textColor}
                          mb={2}
                        >
                          Filter by Service
                        </Text>
                        <Select
                          size="lg"
                          placeholder="All Services"
                          value={selectedService}
                          onChange={handleServiceChange}
                          borderColor={borderColor}
                          _hover={{ borderColor: accentColor }}
                          bg={bgColor}
                          isDisabled={availableServices.length === 0}
                        >
                          {availableServices.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.serviceName}
                            </option>
                          ))}
                        </Select>
                      </Box>
                    )}

                    {/* Clear Filters Button */}
                    {(selectedCategory || selectedService || searchTitle) && (
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
                          size="lg"
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
                  {(selectedCategory || selectedService || searchTitle) && (
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
                        {selectedService && (
                          <Box
                            bg={accentColor}
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="500"
                          >
                            Service:{" "}
                            {availableServices.find(
                              (service) =>
                                service.id === parseInt(selectedService)
                            )?.serviceName || selectedService}
                          </Box>
                        )}
                      </HStack>
                    </Box>
                  )}
                </VStack>
              </Box>
            )}
          </Box>

          {/* Projects List */}
          {projects.length === 0 && !isFetching ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={12}
              color={textColor}
            >
              <Text fontSize="xl" mb={2}>
                No Projects Available
              </Text>
              <Text>Check back later for updates</Text>
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
              <Text fontSize="xl">Loading Projects...</Text>
            </Flex>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {currentPageProjects.map((project, index) => (
                <Card
                  key={project.id}
                  variant="outline"
                  borderRadius={{ base: 15, md: 30 }}
                  boxShadow="sm"
                  overflow="hidden"
                  direction={{ base: "column", md: "row" }}
                >
                  <Box
                    width={{ base: "100%", md: "250px" }}
                    height={{ base: "200px", md: "250px" }}
                    bg="gray.100"
                  >
                    {project.images &&
                    project.images[0] &&
                    project.images[0] !== "" ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        fallbackSrc="https://via.placeholder.com/250x250?text=Project+Image"
                      />
                    ) : (
                      <NoImageFallback />
                    )}
                  </Box>

                  <CardBody p={{ base: 3, md: 5 }}>
                    <Flex
                      justifyContent="space-between"
                      alignItems={{ base: "flex-start", md: "flex-start" }}
                      flexDirection={{ base: "column", sm: "row" }}
                      gap={{ base: 3, sm: 0 }}
                      mb={3}
                    >
                      <Box>
                        <Heading
                          as="h2"
                          size={{ base: "lg", md: "xl" }}
                          fontWeight={500}
                          mb={2}
                        >
                          {project.title}
                        </Heading>
                        <Text fontSize={{ base: "sm", md: "md" }} mb={1}>
                          <strong>Client:</strong> {project.clientName}
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} mb={1}>
                          <strong>Date:</strong> {project.projectDate}
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          <strong>Category:</strong> {project.projectCategory}
                        </Text>
                      </Box>

                      <Flex
                        mt={{ base: 2, sm: 0 }}
                        gap={2}
                        flexDirection={{ base: "column", xs: "row" }}
                        w={{ base: "100%", sm: "auto" }}
                      >
                        <NavLink to={`modify/${project.id}`}>
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
                          action={`${project.id}/destroy`}
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
                  </CardBody>
                </Card>
              ))}
            </Stack>
          )}

          {/* Pagination */}
          {projects.length > 0 && !isFetching && (
            <Box py={8}>
              <Pagination
                projPerPage={projPerPage}
                totalProj={projects.length}
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

  const response = await fetch(API_ENDPOINTS.PROJECTS + url.search, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const projects = await response.json();

  projects.forEach((data) => {
    try {
      const vals = data.images
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",");
      const date = new Date(data.projectDate);

      data.projectDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      data.images = vals;
    } catch (error) {
      data.images = [];
    }
  });

  return projects;
}

export async function projectDetailLoader({ params }) {
  const response = await fetch(getApiUrlWithId("projects", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const project = await response.json();

  project.forEach((data) => {
    try {
      const vals = data.images
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",");
      const date = new Date(data.projectDate);

      data.projectDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      data.images = vals;
    } catch (error) {
      data.images = [];
    }
  });

  return project;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch(getApiUrlWithId("projects", params.id), {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
