import {
  Box,
  Heading,
  Container,
  Text,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  Icon,
  AspectRatio,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Users, Globe } from "lucide-react";
import aboutus from "../../assets/aboutus/aboutus.png";
import { ABOUT_US } from "../../index.js";
import { useLoaderData } from "react-router-dom";
import pfp from "../../assets/pfp.png";
import { API_ENDPOINTS } from "../../config/api.js";

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
                          fallbackSrc="https://via.placeholder.com/600x400?text=About+Us"
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

  const response = await fetch(API_ENDPOINTS.EMPLOYEE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
