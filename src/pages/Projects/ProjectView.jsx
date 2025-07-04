import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Flex,
  useColorModeValue,
  Badge,
  Icon,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProjectSlider from "../../components/ProjectSlider";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  CheckCircle,
  Info,
} from "lucide-react";
import { PROJ_CATEGORIES, SERVICES } from "../..";
import { useEffect, useState } from "react";
import { getApiUrlWithId } from "../../config/api.js";

export default function ProjectView() {
  const { project } = useLoaderData();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const [serviceDetails, setServiceDetails] = useState(null);

  // Find the full category name
  const category = PROJ_CATEGORIES.find(
    (cat) => cat.value === project.projectCategory
  );
  const categoryName = category ? category.label : project.projectCategory;

  // Find the full service category name (CE -> Coastal Engineering)
  const serviceCategory = SERVICES.find(
    (service) => service.path === project.projectCategory
  );
  const serviceCategoryName = serviceCategory
    ? serviceCategory.label
    : project.projectCategory;

  // Format the date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    // Fetch service details if we have a service ID
    if (project.projectService) {
      fetch(getApiUrlWithId("services", project.projectService), {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setServiceDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching service details:", error);
        });
    }
  }, [project.projectService]);

  return (
    <Box minH="72vh" bg={bgColor} py={{ base: 4, md: 8 }}>
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Button
          leftIcon={<ArrowLeft size={20} />}
          mb={{ base: 4, md: 8 }}
          onClick={() => navigate("/Projects")}
          variant="ghost"
          _hover={{ bg: "gray.100" }}
          size={{ base: "md", md: "lg" }}
          color={accentColor}
        >
          Back to Projects
        </Button>

        <Box
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius={{ base: "lg", md: "xl" }}
          overflow="hidden"
          bg={bgColor}
          boxShadow="xl"
        >
          {/* Header Section */}
          <Box
            bg={sectionBg}
            p={{ base: 4, md: 6, lg: 10 }}
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <Heading
              as="h1"
              size={{ base: "lg", md: "xl", lg: "2xl" }}
              color={accentColor}
              borderLeft="6px solid"
              pl={4}
              lineHeight="1.2"
            >
              {project.title}
            </Heading>
          </Box>

          {/* Main Content */}
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 6, md: 8, lg: 10 }}
            p={{ base: 4, md: 6, lg: 10 }}
          >
            <Box>
              {/* Key Information Section */}
              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                {/* Client and Date */}
                <SimpleGrid
                  columns={{ base: 1, sm: 2 }}
                  spacing={{ base: 4, md: 6 }}
                >
                  <Box>
                    <HStack spacing={3} mb={2}>
                      <Icon
                        as={User}
                        color={accentColor}
                        w={{ base: 4, md: 5 }}
                        h={{ base: 4, md: 5 }}
                      />
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="600"
                        color={accentColor}
                      >
                        Client
                      </Text>
                    </HStack>
                    <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
                      {project.clientName}
                    </Text>
                  </Box>
                  <Box>
                    <HStack spacing={3} mb={2}>
                      <Icon
                        as={Calendar}
                        color={accentColor}
                        w={{ base: 4, md: 5 }}
                        h={{ base: 4, md: 5 }}
                      />
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="600"
                        color={accentColor}
                      >
                        Date
                      </Text>
                    </HStack>
                    <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
                      {formatDate(project.projectDate)}
                    </Text>
                  </Box>
                </SimpleGrid>

                <Divider />

                {/* Category & Service Section */}
                <Box>
                  <HStack spacing={3} mb={4}>
                    <Icon
                      as={Tag}
                      color={accentColor}
                      w={{ base: 4, md: 5 }}
                      h={{ base: 4, md: 5 }}
                    />
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="600"
                      color={accentColor}
                    >
                      Category & Service
                    </Text>
                  </HStack>
                  <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                    <Box>
                      <Text
                        fontSize={{ base: "sm", md: "md" }}
                        color={textColor}
                        mb={2}
                        fontWeight="500"
                      >
                        Service Category:
                      </Text>
                      <Badge
                        fontSize={{ base: "sm", md: "md" }}
                        colorScheme="blue"
                        p={{ base: 1.5, md: 2 }}
                        borderRadius="md"
                        textTransform="none"
                      >
                        {serviceCategoryName}
                      </Badge>
                    </Box>
                    {serviceDetails && (
                      <Box>
                        <Text
                          fontSize={{ base: "sm", md: "md" }}
                          color={textColor}
                          mb={2}
                          fontWeight="500"
                        >
                          Service:
                        </Text>
                        <Badge
                          fontSize={{ base: "sm", md: "md" }}
                          colorScheme="purple"
                          p={{ base: 1.5, md: 2 }}
                          borderRadius="md"
                          textTransform="none"
                        >
                          {serviceDetails.serviceName}
                        </Badge>
                      </Box>
                    )}
                  </VStack>
                </Box>

                <Divider />

                {/* Status Section */}
                <Box>
                  <HStack spacing={3} mb={2}>
                    <Icon
                      as={CheckCircle}
                      color={accentColor}
                      w={{ base: 4, md: 5 }}
                      h={{ base: 4, md: 5 }}
                    />
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="600"
                      color={accentColor}
                    >
                      Status
                    </Text>
                  </HStack>
                  <Badge
                    fontSize={{ base: "sm", md: "md" }}
                    colorScheme={
                      project.projectStatus === "Completed" ? "green" : "orange"
                    }
                    p={{ base: 1.5, md: 2 }}
                    borderRadius="md"
                    textTransform="none"
                  >
                    {project.projectStatus || "Completed"}
                  </Badge>
                </Box>

                <Divider />

                {/* Description Section */}
                {project.projectDescription && (
                  <Box>
                    <HStack spacing={3} mb={4}>
                      <Icon
                        as={Info}
                        color={accentColor}
                        w={{ base: 4, md: 5 }}
                        h={{ base: 4, md: 5 }}
                      />
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="600"
                        color={accentColor}
                      >
                        Description
                      </Text>
                    </HStack>
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color={textColor}
                      lineHeight="tall"
                    >
                      {project.projectDescription}
                    </Text>
                  </Box>
                )}
              </VStack>
            </Box>

            {/* Image Slider Section */}
            <Box>
              {project.images &&
              project.images.length > 0 &&
              project.images[0] !== "" ? (
                <ProjectSlider images={project.images} />
              ) : (
                <Box
                  bg={sectionBg}
                  borderRadius={{ base: "lg", md: "xl" }}
                  p={{ base: 6, md: 8 }}
                  textAlign="center"
                  border="2px dashed"
                  borderColor={borderColor}
                >
                  <Text
                    color={textColor}
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="500"
                  >
                    No images available for this project
                  </Text>
                </Box>
              )}
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
