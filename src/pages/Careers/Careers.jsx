import {
  Box,
  Heading,
  Container,
  Text,
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Icon,
  useColorModeValue,
  Badge,
  Divider,
  AspectRatio,
  Image,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  GraduationCap,
  Shield,
  Coffee,
  TrendingUp,
  Award,
  Globe,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { useLoaderData, Link } from "react-router-dom";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function Careers() {
  const vacancies = useLoaderData();

  // Color scheme matching the rest of the application
  const bgColor = useColorModeValue("white", "gray.800");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");

  const benefits = [
    {
      icon: GraduationCap,
      title: "Professional Development",
      description:
        "Comprehensive training programs and opportunities for career advancement with mentorship from industry experts.",
      color: "blue",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Complete health insurance coverage and wellness programs to ensure you and your family are well taken care of.",
      color: "red",
    },
    {
      icon: Users,
      title: "Collaborative Environment",
      description:
        "Work alongside experienced professionals in a supportive team environment that values knowledge sharing.",
      color: "green",
    },
    {
      icon: Shield,
      title: "Job Security",
      description:
        "Stable employment with competitive compensation packages and long-term career opportunities.",
      color: "purple",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description:
        "Flexible working arrangements and a comfortable office environment that promotes productivity.",
      color: "orange",
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description:
        "Clear career progression paths with opportunities to work on cutting-edge marine research projects.",
      color: "teal",
    },
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
              Join Our Team
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="container.md"
            >
              Build your career with a leading marine environmental consultancy
              that values innovation, expertise, and commitment to ocean
              conservation
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box bg={bgColor} py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              bg={cardBg}
              shadow="xl"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              maxW="container.lg"
              mx="auto"
            >
              <CardHeader bg={accentColor} color="white" py={8}>
                <VStack spacing={4} textAlign="center">
                  <HStack spacing={3}>
                    <Icon as={Briefcase} w={8} h={8} />
                    <Heading size="xl">Why Choose LaMer?</Heading>
                  </HStack>
                  <Text fontSize="lg" opacity={0.9} maxW="600px">
                    Join a passionate team dedicated to marine conservation and
                    environmental excellence
                  </Text>
                </VStack>
              </CardHeader>
              <CardBody p={{ base: 8, md: 12 }}>
                <VStack spacing={6} textAlign="center">
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color={textColor}
                    lineHeight="tall"
                    maxW="700px"
                  >
                    We're looking for talented individuals who share our passion
                    for marine environmental research and sustainable solutions.
                    At LaMer, you'll work on meaningful projects that make a
                    real difference to our oceans.
                  </Text>

                  <Divider />

                  <VStack spacing={4}>
                    <HStack spacing={4} flexWrap="wrap" justify="center">
                      <Badge
                        colorScheme="brand"
                        px={4}
                        py={2}
                        borderRadius="full"
                      >
                        25+ Years of Service
                      </Badge>
                      <Badge
                        colorScheme="blue"
                        px={4}
                        py={2}
                        borderRadius="full"
                      >
                        International Projects
                      </Badge>
                    </HStack>

                    <Link to="/Careers/Vacancies" style={{ width: "auto" }}>
                      <Button
                        size="lg"
                        bg={accentColor}
                        color="white"
                        rightIcon={<ArrowRight />}
                        _hover={{
                          bg: useColorModeValue("brand.600", "brand.300"),
                          transform: "translateY(-2px)",
                        }}
                        transition="all 0.2s"
                      >
                        View Open Positions
                      </Button>
                    </Link>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </MotionBox>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box bg={sectionBg} py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VStack spacing={{ base: 8, md: 12 }}>
              <VStack spacing={4} textAlign="center">
                <Heading size={{ base: "xl", md: "2xl" }} color={headingColor}>
                  Why Work With Us?
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color={textColor}
                  maxW="600px"
                >
                  Discover the benefits and opportunities that make LaMer an
                  exceptional place to build your career
                </Text>
              </VStack>

              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={{ base: 6, md: 8 }}
                w="100%"
              >
                {benefits.map((benefit, index) => (
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
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <CardHeader bg={accentColor} color="white" py={4}>
                      <HStack justify="center">
                        <Icon as={benefit.icon} w={6} h={6} />
                      </HStack>
                    </CardHeader>
                    <CardBody p={6}>
                      <VStack spacing={3} textAlign="center">
                        <Heading size="md" color={headingColor}>
                          {benefit.title}
                        </Heading>
                        <Text fontSize="sm" color={textColor} lineHeight="tall">
                          {benefit.description}
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

      {/* Call to Action Section */}
      <Box bg={bgColor} py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
            ></Card>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}

export async function loader({ request, params }) {
  // Placeholder for future vacancy loading functionality
  return [];
}
