import {
  Box,
  Heading,
  Container,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  VStack,
  HStack,
  Badge,
  Button,
  Icon,
  useColorModeValue,
  Divider,
  Flex,
  Grid,
  GridItem,
  Link as ChakraLink,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Briefcase,
  Clock,
  Users,
  MapPin,
  Calendar,
  FileText,
  Send,
  AlertCircle,
  Filter,
  X,
} from "lucide-react";
import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function Vacancies() {
  const vacancies = useLoaderData();

  // Pagination state
  const [vacanciesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageVacancies, setCurrentPageVacancies] = useState([]);

  // Filter state
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  // Color scheme matching the rest of the application
  const bgColor = useColorModeValue("white", "gray.800");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");

  // Filter options
  const experienceOptions = [
    { value: "", label: "All Experience Levels" },
    { value: "0", label: "Entry Level (0 years)" },
    { value: "1", label: "1+ years" },
    { value: "2", label: "2+ years" },
    { value: "3", label: "3+ years" },
    { value: "5", label: "5+ years" },
    { value: "10", label: "10+ years" },
  ];

  const statusOptions = [
    { value: "", label: "All Position Types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  // Auto-show filters when they become active
  useEffect(() => {
    if (selectedExperience || selectedStatus) {
      setShowFilters(true);
    }
  }, [selectedExperience, selectedStatus]);

  // Apply filters to vacancies
  useEffect(() => {
    let filtered = [...vacancies];

    // Filter by experience
    if (selectedExperience && selectedExperience !== "") {
      const expValue = parseInt(selectedExperience);
      filtered = filtered.filter((vacancy) => {
        const vacancyExp = parseInt(vacancy.experience) || 0;
        return vacancyExp >= expValue;
      });
    }

    // Filter by status
    if (selectedStatus && selectedStatus !== "") {
      filtered = filtered.filter(
        (vacancy) =>
          vacancy.positionStatus?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    setFilteredVacancies(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [vacancies, selectedExperience, selectedStatus]);

  // Initialize pagination when filtered vacancies change
  useEffect(() => {
    const indexOfLastVacancy = currentPage * vacanciesPerPage;
    const indexOfFirstVacancy = indexOfLastVacancy - vacanciesPerPage;
    setCurrentPageVacancies(
      filteredVacancies.slice(indexOfFirstVacancy, indexOfLastVacancy)
    );
  }, [filteredVacancies, currentPage, vacanciesPerPage]);

  // Pagination function
  function paginate(pageNumber) {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredVacancies.length / vacanciesPerPage)
    ) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  }

  // Filter handlers
  const handleExperienceChange = (e) => {
    setSelectedExperience(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const clearFilters = () => {
    setSelectedExperience("");
    setSelectedStatus("");
    setShowFilters(false);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "full-time":
        return "brand";
      case "part-time":
        return "blue";
      case "contract":
        return "purple";
      case "internship":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <Box minH="100vh" bg={bgColor} pt={0}>
      {/* Header Section */}
      <Box
        bg={sectionBg}
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
              color={headingColor}
              borderLeft="6px solid"
              pl={4}
              lineHeight="1.2"
            >
              Current Openings
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="container.md"
            >
              Explore exciting career opportunities and join our mission to
              protect marine environments for future generations
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Filter Section */}
      <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
        <Box mb={8}>
          {/* Filter Toggle Button */}
          <Flex justify="space-between" align="center" mb={4}>
            <HStack spacing={3}>
              <Icon as={Filter} color={headingColor} />
              <Text fontSize="lg" fontWeight="600" color={headingColor}>
                Filter Vacancies
              </Text>
              {(selectedExperience || selectedStatus) && (
                <Badge colorScheme="blue" fontSize="sm">
                  {[selectedExperience, selectedStatus].filter(Boolean).length}{" "}
                  active
                </Badge>
              )}
            </HStack>
            <Button
              leftIcon={<Filter />}
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "solid" : "outline"}
              colorScheme="brand"
              size="md"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
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
                  {/* Experience Filter */}
                  <Box flex="1" minW="250px">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color={textColor}
                      mb={2}
                    >
                      Filter by Experience
                    </Text>
                    <Select
                      size="lg"
                      value={selectedExperience}
                      onChange={handleExperienceChange}
                      borderColor={borderColor}
                      _hover={{ borderColor: headingColor }}
                      bg={bgColor}
                    >
                      {experienceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  {/* Status Filter */}
                  <Box flex="1" minW="250px">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color={textColor}
                      mb={2}
                    >
                      Filter by Position Type
                    </Text>
                    <Select
                      size="lg"
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      borderColor={borderColor}
                      _hover={{ borderColor: headingColor }}
                      bg={bgColor}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  {/* Clear Filters Button */}
                  {(selectedExperience || selectedStatus) && (
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
                {(selectedExperience || selectedStatus) && (
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
                      {selectedExperience && (
                        <Box
                          bg={headingColor}
                          color="white"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="sm"
                          fontWeight="500"
                        >
                          Experience:{" "}
                          {
                            experienceOptions.find(
                              (opt) => opt.value === selectedExperience
                            )?.label
                          }
                        </Box>
                      )}
                      {selectedStatus && (
                        <Box
                          bg={headingColor}
                          color="white"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="sm"
                          fontWeight="500"
                        >
                          Type:{" "}
                          {
                            statusOptions.find(
                              (opt) => opt.value === selectedStatus
                            )?.label
                          }
                        </Box>
                      )}
                    </HStack>
                  </Box>
                )}
              </VStack>
            </Box>
          )}
        </Box>
      </Container>

      {/* Vacancies Content */}
      <Container
        maxW="container.xl"
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 12 }}
      >
        {vacancies.length === 0 ? (
          // Empty State - No vacancies at all
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              bg={cardBg}
              shadow="lg"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              maxW="container.md"
              mx="auto"
            >
              <CardBody p={{ base: 8, md: 12 }}>
                <VStack spacing={6} textAlign="center">
                  <Icon as={AlertCircle} w={16} h={16} color={mutedTextColor} />
                  <VStack spacing={4}>
                    <Heading size="xl" color={headingColor}>
                      No Current Openings
                    </Heading>
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color={textColor}
                      lineHeight="tall"
                    >
                      We don't have any open positions at the moment, but we're
                      always looking for talented individuals to join our team.
                    </Text>
                  </VStack>

                  <Divider />

                  <VStack spacing={4}>
                    <Text
                      fontSize="md"
                      color={mutedTextColor}
                      textAlign="center"
                    >
                      Don't see an opening that matches your profile? Send us
                      your CV and we'll keep you in mind for future
                      opportunities.
                    </Text>
                    <Button
                      size="lg"
                      bg={accentColor}
                      color="white"
                      rightIcon={<Send />}
                      _hover={{
                        bg: useColorModeValue("brand.600", "brand.300"),
                      }}
                    >
                      Submit Your CV
                    </Button>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </MotionBox>
        ) : filteredVacancies.length === 0 ? (
          // Empty State - No vacancies match filters
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              bg={cardBg}
              shadow="lg"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              maxW="container.md"
              mx="auto"
            >
              <CardBody p={{ base: 8, md: 12 }}>
                <VStack spacing={6} textAlign="center">
                  <Icon as={AlertCircle} w={16} h={16} color={mutedTextColor} />
                  <VStack spacing={4}>
                    <Heading size="xl" color={headingColor}>
                      No Matching Positions
                    </Heading>
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color={textColor}
                      lineHeight="tall"
                    >
                      No positions match your current filter criteria. Try
                      adjusting your filters or check back later for new
                      opportunities.
                    </Text>
                  </VStack>

                  <Button
                    size="lg"
                    variant="outline"
                    borderColor={accentColor}
                    color={accentColor}
                    onClick={clearFilters}
                    _hover={{ bg: badgeBg }}
                  >
                    Clear All Filters
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </MotionBox>
        ) : (
          // Vacancies List
          <VStack spacing={{ base: 6, md: 8 }}>
            {/* CTA Message */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              w="100%"
            >
              <Card
                bg={badgeBg}
                borderRadius="xl"
                border="1px solid"
                borderColor={accentColor}
                p={{ base: 4, md: 6 }}
              >
                <HStack spacing={3} justify="center" flexWrap="wrap">
                  <Icon as={Send} color={accentColor} />
                  <Text
                    color={accentColor}
                    fontWeight="600"
                    textAlign="center"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Don't see a perfect match? Submit your CV anyway — we'll
                    reach out when the right opportunity arises!
                  </Text>
                </HStack>
              </Card>
            </MotionBox>

            {/* Vacancies Grid */}
            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
              gap={{ base: 6, md: 8 }}
              w="100%"
            >
              {currentPageVacancies.map((vacancy, index) => (
                <MotionCard
                  key={vacancy.id}
                  bg={cardBg}
                  shadow="lg"
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor={borderColor}
                  overflow="hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  _hover={{
                    transform: "translateY(-4px)",
                    shadow: "xl",
                  }}
                >
                  <CardHeader bg={accentColor} color="white" py={6}>
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between" align="flex-start">
                        <HStack spacing={3} flex="1" minW="0">
                          <Icon as={Briefcase} w={6} h={6} flexShrink={0} />
                          <Heading
                            size={{ base: "md", md: "lg" }}
                            color="white"
                            isTruncated
                          >
                            {vacancy.positionName}
                          </Heading>
                        </HStack>
                        <Badge
                          colorScheme={getStatusColor(vacancy.positionStatus)}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          flexShrink={0}
                        >
                          {vacancy.positionStatus}
                        </Badge>
                      </HStack>

                      <HStack spacing={4} fontSize="sm" opacity={0.9}>
                        <HStack spacing={2}>
                          <Icon as={Calendar} w={4} h={4} />
                          <Text>Posted {formatDate(vacancy.created_at)}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={Clock} w={4} h={4} />
                          <Text>{vacancy.experience} years exp.</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </CardHeader>

                  <CardBody p={6}>
                    <VStack spacing={4} align="stretch">
                      <Text
                        color={textColor}
                        lineHeight="tall"
                        fontSize={{ base: "sm", md: "md" }}
                        noOfLines={4}
                      >
                        {vacancy.desc}
                      </Text>

                      <Divider />

                      <HStack justify="space-between" align="center">
                        <HStack spacing={2}>
                          <Icon as={MapPin} w={4} h={4} color={accentColor} />
                          <Text fontSize="sm" color={mutedTextColor}>
                            Maldives
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </CardBody>

                  <CardFooter bg={sectionBg} py={4} px={6}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Text fontSize="xs" color={mutedTextColor}>
                        {vacancy.positionStatus} Position
                      </Text>
                      {vacancy.image && vacancy.image[0] && (
                        <ChakraLink
                          href={vacancy.image[0]}
                          isExternal
                          _hover={{ textDecoration: "none" }}
                        >
                          <Button
                            size="sm"
                            bg={accentColor}
                            color="white"
                            rightIcon={<ExternalLink size={16} />}
                            _hover={{
                              bg: useColorModeValue("brand.600", "brand.300"),
                            }}
                          >
                            View Details
                          </Button>
                        </ChakraLink>
                      )}
                    </Flex>
                  </CardFooter>
                </MotionCard>
              ))}
            </Grid>

            {/* Pagination */}
            {filteredVacancies.length > vacanciesPerPage && (
              <Box w="100%">
                <Pagination
                  projPerPage={vacanciesPerPage}
                  totalProj={filteredVacancies.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </Box>
            )}

            {/* Bottom CTA */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              w="100%"
            >
              <Card
                bg={cardBg}
                shadow="xl"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                maxW="container.md"
                mx="auto"
              >
                <CardBody p={{ base: 6, md: 8 }}>
                  <VStack spacing={6} textAlign="center">
                    <Icon as={FileText} w={12} h={12} color={accentColor} />
                    <VStack spacing={4}>
                      <Heading size="lg" color={headingColor}>
                        Ready to Apply?
                      </Heading>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color={textColor}
                        lineHeight="tall"
                      >
                        Take the next step in your career and become part of our
                        mission to protect marine environments.
                      </Text>
                    </VStack>

                    <HStack spacing={4} flexWrap="wrap" justify="center">
                      <Link to="/Careers" style={{ textDecoration: "none" }}>
                        <Button
                          size="lg"
                          variant="outline"
                          borderColor={accentColor}
                          color={accentColor}
                          _hover={{
                            bg: badgeBg,
                          }}
                        >
                          Learn More About Us
                        </Button>
                      </Link>
                      <Link to="/ContactUs" style={{ textDecoration: "none" }}>
                        <Button
                          size="lg"
                          bg={accentColor}
                          color="white"
                          rightIcon={<Send />}
                          _hover={{
                            bg: useColorModeValue("brand.600", "brand.300"),
                          }}
                        >
                          Contact HR Team
                        </Button>
                      </Link>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </MotionBox>
          </VStack>
        )}
      </Container>
    </Box>
  );
}

export async function loader({ request, params }) {
  const url = new URL(request.url);

  const response = await fetch("http://localhost:3000/vacancies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const vacancies = await response.json();

  // Extract and format image fields
  vacancies.forEach((vacancy) => {
    if (vacancy.image) {
      const vals = vacancy.image
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",");
      vacancy.image = vals;
    }
  });

  console.log(vacancies);
  return vacancies;
}
