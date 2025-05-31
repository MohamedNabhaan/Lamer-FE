import {
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Select,
  useColorModeValue,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Flex,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PROJ_CATEGORIES, SERVICE_CATEGORIES } from "../..";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { ProjectCard } from "../../components/ProjectCard";
import { Filter, Loader, X, Search } from "lucide-react";
import { getApiUrl, API_ENDPOINTS } from "../../config/api.js";

export default function Projects() {
  const [isFetching, setIsFetching] = useState(false);
  let [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [projPerPage, setProjPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProjs, setCurrentPageProjs] = useState([]);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

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

      if (selectedCategory && selectedCategory !== "") {
        params.projectCategory = selectedCategory;
      }
      if (selectedService && selectedService !== "") {
        params.projectService = selectedService;
      }
      if (debouncedSearchTitle && debouncedSearchTitle !== "") {
        params.title = debouncedSearchTitle;
      }

      const url = getApiUrl("projects", params);

      console.log("Fetching projects with URL:", url);
      console.log("Search title:", debouncedSearchTitle);

      const response = await fetch(url);
      const resData = await response.json();

      console.log("Received projects:", resData.length);

      resData.map((data) => {
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
      });

      setProjects(resData);
      setCurrentPage(1);
      const indexOfLastProj = 1 * projPerPage;
      const indexOfFirstProj = indexOfLastProj - projPerPage;
      setCurrentPageProjs(resData.slice(indexOfFirstProj, indexOfLastProj));
      setIsFetching(false);
    }

    fetchProjects();
  }, [selectedCategory, selectedService, debouncedSearchTitle, projPerPage]);

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
      setCurrentPageProjs(projects.slice(indexOfFirstProj, indexOfLastProj));
      window.scrollTo(0, 0);
    }
  }

  return (
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
              Our Projects
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="container.md"
            >
              Explore our diverse portfolio of successful projects across
              various domains
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Filter Section */}
      <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
        <Box mb={8}>
          {/* Filter Toggle Button */}
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
        {projects.length === 0 ? (
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
          <VStack spacing={6}>
            {currentPageProjs.map((project) => (
              <Link
                key={project.id}
                to={`${project.id}`}
                style={{ width: "100%" }}
              >
                <ProjectCard
                  images={project.images}
                  title={project.title}
                  clientName={project.clientName}
                  projectDate={project.projectDate}
                  projectCategory={project.projectCategory}
                />
              </Link>
            ))}
          </VStack>
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
  );
}
