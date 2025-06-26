import { useLoaderData, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Image,
  Text,
  Divider,
  SimpleGrid,
  Icon,
  HStack,
  useColorModeValue,
  Badge,
  Grid,
  GridItem,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
  Card,
  CardBody,
  Center,
} from "@chakra-ui/react";
import {
  Monitor,
  Wrench,
  Package2,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  ChevronRight,
  Calendar,
  Building2,
  ImageOff,
} from "lucide-react";
import { motion } from "framer-motion";
import { getApiUrl } from "../../config/api.js";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function ServicePage() {
  const service = useLoaderData();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Color scheme
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const highlightColor = useColorModeValue("brand.50", "brand.900");
  const iconBg = useColorModeValue("gray.100", "gray.600");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  const openImageModal = (img) => {
    setSelectedImage(img);
    onOpen();
  };

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

  // Fetch related projects
  useEffect(() => {
    const fetchRelatedProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const url = getApiUrl("projects", { projectService: service.id });
        const response = await fetch(url);
        const projects = await response.json();

        // Process project data
        const processedProjects = projects.map((project) => {
          try {
            const vals = project.images
              .replace("[", "")
              .replace("]", "")
              .replace(/["]/g, "")
              .split(",");
            const date = new Date(project.projectDate);
            project.projectDate = `${date
              .getDate()
              .toString()
              .padStart(2, "0")}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getFullYear()}`;
            project.images = vals;
            return project;
          } catch (error) {
            project.images = [];
            return project;
          }
        });

        // Sort by date (most recent first) and take only 3
        const sortedProjects = processedProjects
          .sort((a, b) => new Date(b.projectDate) - new Date(a.projectDate))
          .slice(0, 3);

        setRelatedProjects(sortedProjects);
      } catch (error) {
        console.error("Error fetching related projects:", error);
        setRelatedProjects([]);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    if (service.id) {
      fetchRelatedProjects();
    }
  }, [service.id]);

  // Scroll to the expanded service section if specified in navigation state
  useEffect(() => {
    if (location.state?.expandedService) {
      const element = document.getElementById(location.state.expandedService);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  return (
    <Box minH="100vh" bg={bgColor} pt={0}>
      {/* Hero Section with Parallax Effect */}
      <Box
        position="relative"
        h={{ base: "300px", md: "400px" }}
        overflow="hidden"
        mb={0}
        mt={{ base: "70px", md: "90px" }}
      >
        {service.bannerPic &&
        service.bannerPic.length > 0 &&
        service.bannerPic[0] ? (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundImage={`url(${service.bannerPic[0]})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundAttachment="fixed"
            filter="brightness(0.7)"
          />
        ) : (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="brand.400"
            bgGradient="linear(to-br, brand.400, brand.700)"
          />
        )}
        <Container
          maxW="container.xl"
          h="100%"
          position="relative"
          zIndex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={{ base: 4, md: 8 }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              color="white"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              maxW="800px"
              textShadow="2px 2px 4px rgba(0,0,0,0.4)"
              lineHeight="1.2"
              mb={4}
            >
              {service.serviceName}
            </Heading>
          </MotionBox>
        </Container>
      </Box>

      {/* Main Content */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
            {/* Left Column - Main Content */}
            <GridItem>
              {/* Overview Section */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <VStack spacing={8} align="stretch">
                  <Box
                    bg={cardBg}
                    p={8}
                    borderRadius="xl"
                    shadow="md"
                    id={service.path}
                  >
                    <Heading as="h2" size="lg" color={headingColor} mb={6}>
                      Overview
                    </Heading>
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      color={textColor}
                      lineHeight="tall"
                    >
                      {service.intro}
                    </Text>
                  </Box>

                  {/* What We Offer Section */}
                  <Box bg={cardBg} p={8} borderRadius="xl" shadow="md">
                    <Heading as="h3" size="lg" color={headingColor} mb={6}>
                      What We Offer
                    </Heading>
                    <List spacing={4}>
                      {service.body
                        .split("\n")
                        .filter((item) => item.trim())
                        .map((point, index) => (
                          <ListItem
                            key={index}
                            display="flex"
                            alignItems="flex-start"
                          >
                            <ListIcon
                              as={ChevronRight}
                              color={headingColor}
                              w={5}
                              h={5}
                              mt={1}
                            />
                            <Text color={textColor}>{point}</Text>
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Right Column - Tools & Technologies */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <VStack spacing={6}>
                  {/* Software Tools Card - Only show if there's actual content */}
                  {service.softwares &&
                    service.softwares.trim() !== "" &&
                    service.softwares.toLowerCase() !== "not specified" && (
                      <Box
                        bg={cardBg}
                        p={6}
                        borderRadius="xl"
                        shadow="md"
                        w="100%"
                        border="1px solid"
                        borderColor={borderColor}
                        _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                        transition="all 0.3s"
                      >
                        <HStack spacing={3} mb={4}>
                          <Icon as={Monitor} w={6} h={6} color={headingColor} />
                          <Heading as="h3" size="md" color={headingColor}>
                            Software Tools
                          </Heading>
                        </HStack>
                        <List spacing={3}>
                          {service.softwares
                            .split(",")
                            .filter((software) => software.trim() !== "")
                            .map((software, index) => (
                              <ListItem
                                key={index}
                                display="flex"
                                alignItems="center"
                              >
                                <ListIcon
                                  as={CheckCircle2}
                                  color={headingColor}
                                />
                                <Text color={textColor}>{software.trim()}</Text>
                              </ListItem>
                            ))}
                        </List>
                      </Box>
                    )}

                  {/* Equipment Card - Only show if there's actual content */}
                  {service.equipment &&
                    service.equipment.trim() !== "" &&
                    service.equipment.toLowerCase() !== "not specified" && (
                      <Box
                        bg={cardBg}
                        p={6}
                        borderRadius="xl"
                        shadow="md"
                        w="100%"
                        border="1px solid"
                        borderColor={borderColor}
                        _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                        transition="all 0.3s"
                      >
                        <HStack spacing={3} mb={4}>
                          <Icon as={Wrench} w={6} h={6} color={headingColor} />
                          <Heading as="h3" size="md" color={headingColor}>
                            Equipment Used
                          </Heading>
                        </HStack>
                        <List spacing={3}>
                          {service.equipment
                            .split(",")
                            .filter((equipment) => equipment.trim() !== "")
                            .map((equipment, index) => (
                              <ListItem
                                key={index}
                                display="flex"
                                alignItems="center"
                              >
                                <ListIcon
                                  as={CheckCircle2}
                                  color={headingColor}
                                />
                                <Text color={textColor}>
                                  {equipment.trim()}
                                </Text>
                              </ListItem>
                            ))}
                        </List>
                      </Box>
                    )}
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>

          {/* Related Projects Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            mt={16}
          >
            <Heading
              as="h3"
              size="lg"
              color={headingColor}
              mb={8}
              textAlign="center"
            >
              Recent Projects Using This Service
            </Heading>

            {isLoadingProjects ? (
              <Flex
                direction="column"
                align="center"
                justify="center"
                py={12}
                color={headingColor}
              >
                <Text fontSize="lg">Loading related projects...</Text>
              </Flex>
            ) : relatedProjects.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {relatedProjects.map((project) => (
                  <MotionBox
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={`/Projects/${project.id}`}>
                      <Card
                        bg={cardBg}
                        borderRadius="xl"
                        overflow="hidden"
                        shadow="md"
                        border="1px solid"
                        borderColor={borderColor}
                        _hover={{
                          transform: "translateY(-4px)",
                          shadow: "xl",
                          borderColor: headingColor,
                        }}
                        transition="all 0.3s"
                        cursor="pointer"
                        h="100%"
                      >
                        {/* Project Image */}
                        <Box
                          h={{ base: "200px", md: "250px" }}
                          position="relative"
                          overflow="hidden"
                        >
                          {project.images &&
                          project.images[0] &&
                          project.images[0] !== "" ? (
                            <Image
                              src={project.images[0]}
                              alt={project.title}
                              w="100%"
                              h="100%"
                              objectFit="cover"
                              fallbackSrc="https://via.placeholder.com/300x250?text=Project+Image"
                            />
                          ) : (
                            <NoImageFallback />
                          )}
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bg="rgba(0, 0, 0, 0.2)"
                            opacity={0}
                            transition="opacity 0.3s"
                            _hover={{ opacity: 1 }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon as={ArrowRight} color="white" w={8} h={8} />
                          </Box>
                        </Box>

                        {/* Project Details */}
                        <CardBody p={6}>
                          <VStack align="start" spacing={3}>
                            <Heading
                              as="h4"
                              size="md"
                              color={headingColor}
                              lineHeight="1.3"
                              noOfLines={2}
                            >
                              {project.title}
                            </Heading>

                            <VStack align="start" spacing={2} w="100%">
                              <HStack spacing={2}>
                                <Icon
                                  as={Building2}
                                  w={4}
                                  h={4}
                                  color={textColor}
                                />
                                <Text
                                  fontSize="sm"
                                  color={textColor}
                                  noOfLines={1}
                                >
                                  {project.clientName}
                                </Text>
                              </HStack>

                              <HStack spacing={2}>
                                <Icon
                                  as={Calendar}
                                  w={4}
                                  h={4}
                                  color={textColor}
                                />
                                <Text fontSize="sm" color={textColor}>
                                  {project.projectDate}
                                </Text>
                              </HStack>
                            </VStack>

                            <Badge
                              colorScheme="brand"
                              variant="subtle"
                              px={3}
                              py={1}
                              borderRadius="full"
                              fontSize="xs"
                            >
                              {project.projectCategory}
                            </Badge>
                          </VStack>
                        </CardBody>
                      </Card>
                    </Link>
                  </MotionBox>
                ))}
              </SimpleGrid>
            ) : (
              <Box
                bg={cardBg}
                borderRadius="xl"
                p={8}
                textAlign="center"
                border="2px dashed"
                borderColor={borderColor}
                maxW="600px"
                mx="auto"
              >
                <Text color={textColor} fontSize="lg" fontWeight="500">
                  No projects available for this service yet
                </Text>
                <Text color={textColor} fontSize="sm" mt={2}>
                  Check back later for updates
                </Text>
              </Box>
            )}
          </MotionBox>
        </Container>
      </Box>

      {/* Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="transparent" shadow="none">
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            <Image
              src={selectedImage}
              alt="Enlarged view"
              w="100%"
              h="auto"
              maxH="90vh"
              objectFit="contain"
              fallbackSrc="https://via.placeholder.com/300x250?text=Gallery+Image"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
