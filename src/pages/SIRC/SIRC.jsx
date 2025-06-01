import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  SimpleGrid,
  List,
  ListItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Grid,
  GridItem,
  Badge,
  Icon,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Divider,
  Stack,
  Button,
  AspectRatio,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Microscope,
  BookOpen,
  Award,
  Globe,
  Calendar,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/SIRC/logo.png";
import sirc from "../../assets/SIRC/SIRC.png";
import StudyItem from "../../components/StudyItem";
import ProgramTab from "../../components/ProgramTab";
import SiteTab from "../../components/SiteTab";
import FacilityTab from "../../components/FacilityTab";
import ResearchersTab from "../../components/ResearchersTab";
import { useLoaderData } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api.js";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionGrid = motion(Grid);

// Move fetch functions outside component
const fetchPrograms = async () => {
  const programsResponse = await fetch(API_ENDPOINTS.PROGRAMS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const programs = await programsResponse.json();
  return programs;
};

const fetchResearch = async () => {
  const researchResponse = await fetch(API_ENDPOINTS.RESEARCH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const research = await researchResponse.json();
  return research;
};

const fetchEquipment = async () => {
  const equipmentResponse = await fetch(API_ENDPOINTS.EQUIPMENT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const equipment = await equipmentResponse.json();
  return equipment;
};

export default function SIRC() {
  const data = useLoaderData();

  // Color scheme matching other pages
  const bgColor = useColorModeValue("white", "gray.800");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const tabActiveBg = useColorModeValue("brand.400", "brand.300");
  const tabHoverBg = useColorModeValue("brand.50", "brand.900");

  const features = [
    {
      icon: Globe,
      title: "3 Research Islands",
      description: "GDh. Mahutigala, GDh. Hoothodaa, and GDh. Faathiyehutta",
    },
    {
      icon: Award,
      title: "Since 2016",
      description:
        "Established by LaMer Pte Ltd for marine research excellence",
    },
    {
      icon: Calendar,
      title: "Year-Round Access",
      description: "Accommodation and facilities available throughout the year",
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor} pt={0}>
      {/* Enhanced Hero Section */}
      <Box
        position="relative"
        h={{ base: "400px", md: "500px", lg: "600px" }}
        overflow="hidden"
        mt={{ base: "70px", md: "90px" }}
      >
        {/* Background with enhanced overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage={`url(${sirc})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundAttachment={{ base: "scroll", md: "fixed" }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-r, blackAlpha.700, blackAlpha.500, blackAlpha.700)"
        />

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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VStack
              spacing={{ base: 6, md: 8 }}
              align="center"
              textAlign="center"
            >
              <Image
                src={logo}
                h={{ base: "80px", md: "120px", lg: "140px" }}
                w="auto"
                filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
              />

              <VStack spacing={{ base: 3, md: 4 }}>
                <Heading
                  color="white"
                  fontSize={{
                    base: "2xl",
                    sm: "3xl",
                    md: "4xl",
                    lg: "5xl",
                    xl: "6xl",
                  }}
                  fontWeight="bold"
                  textShadow="2px 2px 8px rgba(0,0,0,0.5)"
                  lineHeight="1.1"
                  maxW="900px"
                  px={{ base: 2, md: 0 }}
                >
                  Small Island Research Center
                </Heading>

                <Text
                  color="white"
                  fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                  textShadow="1px 1px 4px rgba(0,0,0,0.4)"
                  maxW={{ base: "320px", sm: "400px", md: "600px" }}
                  fontWeight="300"
                  px={{ base: 2, md: 0 }}
                >
                  Pioneering marine sciences and climate research in the
                  pristine waters of the Maldives
                </Text>
              </VStack>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Feature Highlights */}
      <Box bg={sectionBg} py={{ base: 12, md: 16 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionGrid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={{ base: 6, md: 8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <MotionCard
                key={index}
                bg={cardBg}
                shadow="lg"
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                gridColumn={{
                  base: "span 1",
                  sm: index === 2 ? "span 2" : "span 1",
                  lg: "span 1",
                }}
              >
                <Box
                  bg={accentColor}
                  color="white"
                  py={{ base: 3, md: 4 }}
                  px={{ base: 4, md: 6 }}
                >
                  <HStack justify="center" spacing={3}>
                    <Icon
                      as={feature.icon}
                      w={{ base: 5, md: 6 }}
                      h={{ base: 5, md: 6 }}
                    />
                    <Heading
                      size={{ base: "md", md: "lg" }}
                      color="white"
                      textAlign="center"
                    >
                      {feature.title}
                    </Heading>
                  </HStack>
                </Box>
                <CardBody p={{ base: 6, md: 8 }} textAlign="center">
                  <Text
                    color={textColor}
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="tall"
                  >
                    {feature.description}
                  </Text>
                </CardBody>
              </MotionCard>
            ))}
          </MotionGrid>
        </Container>
      </Box>

      {/* About & Research Section */}
      <Box bg={bgColor} py={{ base: 12, md: 16 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionGrid
            templateColumns={{ base: "1fr", xl: "1.5fr 1fr" }}
            gap={{ base: 8, md: 12 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Enhanced About Section */}
            <GridItem>
              <Card
                bg={cardBg}
                shadow="lg"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
              >
                <CardHeader
                  bg={accentColor}
                  color="white"
                  py={{ base: 4, md: 6 }}
                >
                  <HStack spacing={3}>
                    <Icon
                      as={BookOpen}
                      w={{ base: 5, md: 6 }}
                      h={{ base: 5, md: 6 }}
                    />
                    <Heading size={{ base: "lg", md: "xl" }}>
                      About the Research Center
                    </Heading>
                  </HStack>
                </CardHeader>
                <CardBody p={{ base: 6, md: 8 }}>
                  <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                    <Text
                      fontSize={{ base: "md", md: "lg", lg: "xl" }}
                      color={textColor}
                      lineHeight="tall"
                    >
                      The Small Island Research Center was established by Land
                      and Marine Environmental Resource Group (LaMer) Pte Ltd in
                      2016, dedicated to advancing research in marine sciences,
                      island morphology, and climate change.
                    </Text>

                    <Divider />

                    <Text
                      fontSize={{ base: "md", md: "lg", lg: "xl" }}
                      color={textColor}
                      lineHeight="tall"
                    >
                      Located in the pristine Faresmaathoda in Huvadhoo Atoll,
                      our center provides world-class accommodation, laboratory
                      facilities, classrooms, and high-speed internet
                      connectivity for researchers worldwide.
                    </Text>

                    <Box
                      bg={sectionBg}
                      p={{ base: 4, md: 6 }}
                      borderRadius="xl"
                      borderLeft="4px solid"
                      borderColor={accentColor}
                    >
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color={textColor}
                        fontStyle="italic"
                      >
                        "Our three dedicated research islands provide
                        unparalleled access to diverse marine ecosystems and
                        climate research opportunities."
                      </Text>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            {/* Revamped Research Studies */}
            <GridItem>
              <Card
                bg={cardBg}
                shadow="xl"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                h="fit-content"
              >
                <CardHeader
                  bg={accentColor}
                  color="white"
                  py={{ base: 6, md: 8 }}
                >
                  <VStack spacing={3} align="stretch">
                    <HStack
                      justify="space-between"
                      align="center"
                      flexWrap="wrap"
                      gap={2}
                    >
                      <HStack spacing={3} minW="0">
                        <Icon
                          as={Microscope}
                          w={{ base: 6, md: 8 }}
                          h={{ base: 6, md: 8 }}
                        />
                        <Heading size={{ base: "lg", md: "xl" }} minW="0">
                          Research & Studies
                        </Heading>
                      </HStack>
                      <Badge
                        bg="rgba(255, 255, 255, 0.2)"
                        color="white"
                        px={{ base: 3, md: 4 }}
                        py={{ base: 1, md: 2 }}
                        borderRadius="full"
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="600"
                        flexShrink={0}
                      >
                        {data.research.length} Studies
                      </Badge>
                    </HStack>
                    <Text fontSize={{ base: "xs", md: "sm" }} opacity={0.9}>
                      Completed research projects at our center
                    </Text>
                  </VStack>
                </CardHeader>
                <CardBody
                  paddingBottom={{ base: 4, md: 6 }}
                  paddingInline={{ base: 4, md: 6 }}
                >
                  <VStack spacing={4} align="stretch">
                    <Box
                      maxH={{ base: "300px", md: "400px", lg: "500px" }}
                      overflowY="auto"
                      pr={2}
                      sx={{
                        "::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "::-webkit-scrollbar-track": {
                          bg: useColorModeValue("gray.100", "gray.700"),
                          borderRadius: "full",
                        },
                        "::-webkit-scrollbar-thumb": {
                          bg: useColorModeValue("gray.400", "gray.500"),
                          borderRadius: "full",
                          _hover: {
                            bg: useColorModeValue("gray.500", "gray.400"),
                          },
                        },
                      }}
                    >
                      {data.research.map((study, index) => (
                        <MotionBox
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card
                            bg={useColorModeValue("white", "gray.750")}
                            shadow="md"
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="lg"
                            mb={4}
                            cursor="pointer"
                            transition="all 0.2s"
                            _hover={{
                              shadow: "lg",
                              borderColor: accentColor,
                            }}
                          >
                            <CardBody p={{ base: 4, md: 5 }}>
                              <VStack align="stretch" spacing={3}>
                                <VStack align="stretch" spacing={2}>
                                  <HStack justify="space-between" align="start">
                                    <Heading
                                      size={{ base: "sm", md: "md" }}
                                      color={headingColor}
                                      lineHeight="1.3"
                                      flex={1}
                                      pr={2}
                                    >
                                      {study.title}
                                    </Heading>
                                  </HStack>
                                  <Text
                                    fontSize="xs"
                                    color={useColorModeValue(
                                      "gray.500",
                                      "gray.400"
                                    )}
                                    fontWeight="600"
                                    textTransform="uppercase"
                                    letterSpacing="wide"
                                  >
                                    Published {study.year}
                                  </Text>
                                </VStack>

                                <Divider />

                                <HStack spacing={3} align="center">
                                  <Box
                                    w={3}
                                    h={3}
                                    bg={accentColor}
                                    borderRadius="full"
                                    flexShrink={0}
                                  />
                                  <Text
                                    fontSize={{ base: "xs", md: "sm" }}
                                    color={textColor}
                                    fontWeight="500"
                                    lineHeight="1.4"
                                  >
                                    {study.authors}
                                  </Text>
                                </HStack>

                                {study.description && (
                                  <Text
                                    fontSize={{ base: "xs", md: "sm" }}
                                    color={useColorModeValue(
                                      "gray.600",
                                      "gray.400"
                                    )}
                                    lineHeight="1.5"
                                    fontStyle="italic"
                                  >
                                    {study.description}
                                  </Text>
                                )}

                                <HStack
                                  justify="space-between"
                                  align="center"
                                  pt={2}
                                >
                                  <Text
                                    fontSize="xs"
                                    color={accentColor}
                                    fontWeight="600"
                                  >
                                    Click to view published study
                                  </Text>
                                  <Icon
                                    as={ChevronRight}
                                    w={4}
                                    h={4}
                                    color={accentColor}
                                  />
                                </HStack>
                              </VStack>
                            </CardBody>
                          </Card>
                        </MotionBox>
                      ))}
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </MotionGrid>
        </Container>
      </Box>

      {/* Enhanced Tabs Section */}
      <Box bg={sectionBg} py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <VStack spacing={{ base: 6, md: 8 }}>
              <VStack spacing={4} textAlign="center">
                <Heading
                  size={{ base: "lg", md: "xl", lg: "2xl" }}
                  color={headingColor}
                >
                  Explore Our Facilities
                </Heading>
                <Text
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  color={textColor}
                  maxW="600px"
                  px={{ base: 4, md: 0 }}
                >
                  Discover our comprehensive programs, research sites,
                  cutting-edge equipment, and expert team
                </Text>
              </VStack>

              <Tabs
                variant="unstyled"
                isFitted={{ base: false, lg: true }}
                w="100%"
              >
                <Box
                  bg={cardBg}
                  borderRadius="2xl"
                  p={2}
                  shadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  mb={{ base: 6, md: 8 }}
                  overflowX="auto"
                >
                  <TabList
                    gap={2}
                    flexWrap={{ base: "nowrap", lg: "wrap" }}
                    minW="max-content"
                  >
                    {[
                      {
                        icon: BookOpen,
                        label: "Research Programs",
                        mobileLabel: "Programs",
                      },
                      {
                        icon: MapPin,
                        label: "Research Sites",
                        mobileLabel: "Sites",
                      },
                      {
                        icon: Microscope,
                        label: "Equipment & Facilities",
                        mobileLabel: "Equipment",
                      },
                      {
                        icon: Users,
                        label: "Our Researchers",
                        mobileLabel: "Researchers",
                      },
                    ].map((tab, index) => (
                      <Tab
                        key={index}
                        borderRadius="xl"
                        fontWeight="600"
                        py={{ base: 3, md: 4 }}
                        px={{ base: 4, md: 6 }}
                        whiteSpace="nowrap"
                        minW="max-content"
                        fontSize={{ base: "sm", md: "md" }}
                        _selected={{
                          bg: tabActiveBg,
                          color: "white",
                          shadow: "md",
                          transform: "translateY(-2px)",
                        }}
                        _hover={{
                          bg: tabHoverBg,
                          transform: "translateY(-1px)",
                        }}
                        transition="all 0.2s"
                      >
                        <HStack spacing={{ base: 2, md: 3 }}>
                          <Icon
                            as={tab.icon}
                            w={{ base: 4, md: 5 }}
                            h={{ base: 4, md: 5 }}
                          />
                          <Text display={{ base: "none", sm: "block" }}>
                            {tab.label}
                          </Text>
                          <Text display={{ base: "block", sm: "none" }}>
                            {tab.mobileLabel}
                          </Text>
                        </HStack>
                      </Tab>
                    ))}
                  </TabList>
                </Box>

                <Card
                  bg={cardBg}
                  shadow="xl"
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor={borderColor}
                  overflow="hidden"
                >
                  <TabPanels>
                    <TabPanel p={{ base: 6, md: 8, lg: 12 }}>
                      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
                        <Box textAlign="center">
                          <Box
                            bg={accentColor}
                            color="white"
                            py={{ base: 3, md: 4 }}
                            px={{ base: 4, md: 6 }}
                            borderRadius="xl"
                            mb={4}
                          >
                            <HStack justify="center" spacing={3}>
                              <Icon
                                as={BookOpen}
                                w={{ base: 5, md: 6 }}
                                h={{ base: 5, md: 6 }}
                                color="white"
                              />
                              <Heading
                                size={{ base: "md", md: "lg" }}
                                color="white"
                              >
                                Research Programs
                              </Heading>
                            </HStack>
                          </Box>
                          <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={textColor}
                            fontStyle="italic"
                          >
                            Available Programs and Academic Opportunities
                          </Text>
                        </Box>
                        <ProgramTab program={data.programs} />
                      </VStack>
                    </TabPanel>

                    <TabPanel p={{ base: 6, md: 8, lg: 12 }}>
                      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
                        <Box textAlign="center">
                          <Box
                            bg={accentColor}
                            color="white"
                            py={{ base: 3, md: 4 }}
                            px={{ base: 4, md: 6 }}
                            borderRadius="xl"
                            mb={4}
                          >
                            <HStack justify="center" spacing={3}>
                              <Icon
                                as={MapPin}
                                w={{ base: 5, md: 6 }}
                                h={{ base: 5, md: 6 }}
                                color="white"
                              />
                              <Heading
                                size={{ base: "md", md: "lg" }}
                                color="white"
                              >
                                Research Sites
                              </Heading>
                            </HStack>
                          </Box>
                          <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={textColor}
                            fontStyle="italic"
                          >
                            Location Overview and Available Research Sites
                          </Text>
                        </Box>
                        <SiteTab />
                      </VStack>
                    </TabPanel>

                    <TabPanel p={{ base: 6, md: 8, lg: 12 }}>
                      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
                        <Box textAlign="center">
                          <Box
                            bg={accentColor}
                            color="white"
                            py={{ base: 3, md: 4 }}
                            px={{ base: 4, md: 6 }}
                            borderRadius="xl"
                            mb={4}
                          >
                            <HStack justify="center" spacing={3}>
                              <Icon
                                as={Microscope}
                                w={{ base: 5, md: 6 }}
                                h={{ base: 5, md: 6 }}
                                color="white"
                              />
                              <Heading
                                size={{ base: "md", md: "lg" }}
                                color="white"
                              >
                                Equipment & Facilities
                              </Heading>
                            </HStack>
                          </Box>
                          <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={textColor}
                            fontStyle="italic"
                          >
                            Available Equipment and Facilities Overview
                          </Text>
                        </Box>
                        <FacilityTab equipment={data.equipment} />
                      </VStack>
                    </TabPanel>

                    <TabPanel p={{ base: 6, md: 8, lg: 12 }}>
                      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
                        <Box textAlign="center">
                          <Box
                            bg={accentColor}
                            color="white"
                            py={{ base: 3, md: 4 }}
                            px={{ base: 4, md: 6 }}
                            borderRadius="xl"
                            mb={4}
                          >
                            <HStack justify="center" spacing={3}>
                              <Icon
                                as={Users}
                                w={{ base: 5, md: 6 }}
                                h={{ base: 5, md: 6 }}
                                color="white"
                              />
                              <Heading
                                size={{ base: "md", md: "lg" }}
                                color="white"
                              >
                                Researchers
                              </Heading>
                            </HStack>
                          </Box>
                          <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={textColor}
                            fontStyle="italic"
                          >
                            Our Mentor and Research Staff
                          </Text>
                        </Box>
                        <ResearchersTab />
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Card>
              </Tabs>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}

export async function loader({ request, params }) {
  const url = new URL(request.url);

  const programs = await fetchPrograms();

  const research = await fetchResearch();

  const equipment = await fetchEquipment();

  return { programs, research, equipment };
}
