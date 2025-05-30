import {
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Image,
  ListItem,
  UnorderedList,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Icon,
  Badge,
  AspectRatio,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Globe,
  Award,
  Heart,
  Lightbulb,
  Shield,
  TrendingUp,
} from "lucide-react";
import aboutus from "../../assets/aboutus/aboutus.png";
import { ABOUT_US } from "../../index.js";
import { useLoaderData } from "react-router-dom";
import pfp from "../../assets/pfp.png";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionGrid = motion(Grid);

export default function AboutUs() {
  const employees = useLoaderData();

  // Color scheme
  const bgColor = useColorModeValue("white", "gray.800");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");

  const missionIcons = [
    Heart,
    Shield,
    Globe,
    TrendingUp,
    Award,
    Lightbulb,
    Users,
    Target,
  ];

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
              About Our Company
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="container.md"
            >
              Leading the way in marine research, environmental conservation,
              and sustainable solutions for a better tomorrow
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Company History Section */}
      <Box bg={bgColor} py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Company History */}
            <Card
              bg={cardBg}
              shadow="lg"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              maxW="container.lg"
              mx="auto"
            >
              <CardHeader bg={accentColor} color="white" py={6}>
                <HStack spacing={3} justify="center">
                  <Icon as={Globe} w={6} h={6} />
                  <Heading size="xl">Company History</Heading>
                </HStack>
              </CardHeader>
              <CardBody p={0}>
                <Grid
                  templateColumns={{ base: "1fr", md: "1fr 1.2fr" }}
                  gap={0}
                  h="100%"
                >
                  <GridItem>
                    <Box
                      p={{ base: 4, md: 6 }}
                      pt={{ base: 4, md: 6 }}
                      pl={{ base: 4, md: 6 }}
                    >
                      <AspectRatio ratio={{ base: 16 / 9, md: 4 / 3 }}>
                        <Image
                          src={aboutus}
                          alt="About Us"
                          objectFit="cover"
                          w="100%"
                          h="100%"
                          filter="brightness(1.1)"
                          borderRadius="lg"
                        />
                      </AspectRatio>
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box
                      p={{ base: 6, md: 8 }}
                      h="100%"
                      display="flex"
                      alignItems="center"
                    >
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color={textColor}
                        lineHeight="tall"
                      >
                        {ABOUT_US.history}
                      </Text>
                    </Box>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          </MotionBox>
        </Container>
      </Box>

      {/* Mission, Vision & Values Section */}
      <Box bg={sectionBg} py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <VStack spacing={{ base: 8, md: 12 }}>
              <VStack spacing={4} textAlign="center">
                <Heading
                  size={{ base: "xl", md: "2xl" }}
                  color={headingColor}
                  textAlign="center"
                >
                  Our Mission, Vision & Values
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color={textColor}
                  maxW="700px"
                >
                  The core principles, vision, and values that drive our
                  commitment to excellence in marine environmental solutions
                </Text>
              </VStack>

              {/* Vision Section */}
              <MotionCard
                bg={cardBg}
                shadow="xl"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                w="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <CardHeader bg={accentColor} color="white" py={6}>
                  <HStack spacing={3} justify="center">
                    <Icon as={Target} w={6} h={6} />
                    <Heading size="xl">Our Vision</Heading>
                  </HStack>
                </CardHeader>
                <CardBody p={{ base: 6, md: 8 }}>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color={textColor}
                    lineHeight="tall"
                    textAlign="center"
                    maxW="800px"
                    mx="auto"
                  >
                    {ABOUT_US.vision}
                  </Text>
                </CardBody>
              </MotionCard>

              {/* Mission & Values Grid */}
              <VStack spacing={6} w="100%">
                <Heading
                  size={{ base: "lg", md: "xl" }}
                  color={headingColor}
                  textAlign="center"
                >
                  Our Core Values
                </Heading>

                <Flex
                  wrap="wrap"
                  justify="center"
                  gap={{ base: 6, md: 8 }}
                  w="100%"
                >
                  {ABOUT_US.missionValues.map((value, index) => (
                    <MotionCard
                      key={index}
                      bg={cardBg}
                      shadow="lg"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor={borderColor}
                      overflow="hidden"
                      w={{
                        base: "100%",
                        md: "calc(50% - 16px)",
                        lg: "calc(33.333% - 21.33px)",
                      }}
                      maxW={{ base: "none", md: "400px" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                    >
                      <CardHeader bg={accentColor} color="white" py={4}>
                        <HStack justify="center">
                          <Icon
                            as={missionIcons[index % missionIcons.length]}
                            w={6}
                            h={6}
                          />
                        </HStack>
                      </CardHeader>
                      <CardBody p={6}>
                        <Text
                          fontSize="md"
                          color={textColor}
                          lineHeight="tall"
                          textAlign="center"
                        >
                          {value}
                        </Text>
                      </CardBody>
                    </MotionCard>
                  ))}
                </Flex>
              </VStack>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Team Section */}
      <Box bg={bgColor} py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <VStack spacing={{ base: 8, md: 12 }}>
              <VStack spacing={4} textAlign="center">
                <Heading
                  size={{ base: "xl", md: "2xl" }}
                  color={headingColor}
                  textAlign="center"
                >
                  Meet Our Team
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color={textColor}
                  maxW="600px"
                >
                  Dedicated professionals working together to advance marine
                  environmental research and conservation
                </Text>
              </VStack>

              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                spacing={{ base: 6, md: 8 }}
                w="100%"
              >
                {employees.map((employee, index) => (
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
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    <Box position="relative">
                      <AspectRatio ratio={4 / 3}>
                        <Image
                          src={employee.displayPic}
                          fallbackSrc={pfp}
                          alt={employee.name}
                          objectFit="cover"
                          w="100%"
                          h="100%"
                          filter="brightness(1.1)"
                        />
                      </AspectRatio>
                    </Box>

                    <CardBody p={6}>
                      <VStack align="stretch" spacing={3}>
                        <VStack align="start" spacing={2}>
                          <Heading
                            size="md"
                            color={headingColor}
                            lineHeight="1.3"
                          >
                            {employee.name}
                          </Heading>
                          <Text
                            fontSize="sm"
                            color={accentColor}
                            fontWeight="600"
                          >
                            {employee.position}
                          </Text>
                        </VStack>

                        <Divider />

                        <Text fontSize="sm" color={textColor} lineHeight="tall">
                          {employee.qualifications}
                        </Text>
                      </VStack>
                    </CardBody>
                  </MotionCard>
                ))}
              </SimpleGrid>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}

export async function loader({ request, params }) {
  const url = new URL(request.url);

  const response = await fetch("http://localhost:3000/employee", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const employees = await response.json();

  employees.map((data) => {
    const vals = data.displayPic
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    data.displayPic = vals;
  });

  console.log(employees);
  return employees;
}
