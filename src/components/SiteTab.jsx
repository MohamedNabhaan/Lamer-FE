import {
  Box,
  Image,
  Text,
  Heading,
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
  Link,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Globe, Waves, Ship } from "lucide-react";
import fm from "../assets/SIRC/fm.png";
import mhg from "../assets/SIRC/Maahutigalaa.png";
import htd from "../assets/SIRC/Hoothodaa.png";
import fth from "../assets/SIRC/Faathiyehuttaa.png";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function SiteTab() {
  // Color scheme - standardized to match SIRC page
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");
  const sectionBg = useColorModeValue("gray.50", "gray.700");

  const researchSites = [
    {
      name: "GDh. Mahutigala",
      image: mhg,
      description:
        "Primary research station with comprehensive facilities for marine biology studies and coral reef research.",
      features: ["Coral Reef Systems", "Marine Biology Lab", "Accommodation"],
    },
    {
      name: "GDh. Hoothodaa",
      image: htd,
      description:
        "Specialized site for island morphology studies and coastal erosion research with pristine natural conditions.",
      features: [
        "Coastal Studies",
        "Morphology Research",
        "Natural Preservation",
      ],
    },
    {
      name: "GDh. Faathiyehutta",
      image: fth,
      description:
        "Climate change research hub focusing on sea level rise impact and environmental monitoring.",
      features: [
        "Climate Research",
        "Environmental Monitoring",
        "Data Collection",
      ],
    },
  ];

  return (
    <VStack spacing={{ base: 8, md: 10 }} align="stretch">
      {/* Research Region Overview with Map */}
      <Card
        bg={cardBg}
        shadow="lg"
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        overflow="hidden"
      >
        <CardHeader bg={accentColor} color="white" py={{ base: 4, md: 6 }}>
          <VStack spacing={3} align="stretch">
            <HStack
              justify="space-between"
              align="center"
              flexWrap="wrap"
              gap={2}
            >
              <HStack spacing={3} minW="0">
                <Icon
                  as={MapPin}
                  w={{ base: 5, md: 6 }}
                  h={{ base: 5, md: 6 }}
                />
                <Heading size={{ base: "md", md: "lg" }} minW="0">
                  Research Region Overview
                </Heading>
              </HStack>
              <Badge
                bg="rgba(255, 255, 255, 0.2)"
                color="white"
                px={{ base: 2, md: 3 }}
                py={1}
                borderRadius="full"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                flexShrink={0}
              >
                Huvadhoo Atoll
              </Badge>
            </HStack>
            <Text fontSize={{ base: "xs", md: "sm" }} opacity={0.9}>
              Comprehensive research area with diverse marine ecosystems
            </Text>
          </VStack>
        </CardHeader>
        <CardBody p={{ base: 4, md: 8 }}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 6, md: 8 }}
          >
            <GridItem>
              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color={textColor}
                  lineHeight="tall"
                >
                  All islands, lagoons and reefs within the designated research
                  area (excluding resort islands) are available for scientific
                  research and field studies.
                </Text>
                <Divider />
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color={textColor}
                  lineHeight="tall"
                >
                  The research area provides diverse marine ecosystems, pristine
                  coral reefs, and unique geological formations perfect for
                  comprehensive environmental studies.
                </Text>
                <Box bg={sectionBg} p={{ base: 3, md: 4 }} borderRadius="lg">
                  <VStack spacing={3} align="stretch">
                    <HStack spacing={2}>
                      <Icon
                        as={Waves}
                        w={{ base: 4, md: 5 }}
                        h={{ base: 4, md: 5 }}
                        color={accentColor}
                      />
                      <Text
                        fontWeight="600"
                        color={headingColor}
                        fontSize={{ base: "sm", md: "md" }}
                      >
                        Research Accessibility
                      </Text>
                    </HStack>
                    <Text fontSize={{ base: "xs", md: "sm" }} color={textColor}>
                      Unrestricted access to natural research sites with
                      coordination through our research center for safety and
                      environmental protection.
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>

            <GridItem>
              <Box
                bg={sectionBg}
                p={{ base: 4, md: 6 }}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                h="100%"
              >
                <VStack spacing={{ base: 4, md: 6 }} h="100%">
                  <HStack spacing={3} w="100%">
                    <Icon
                      as={Globe}
                      w={{ base: 5, md: 6 }}
                      h={{ base: 5, md: 6 }}
                      color={accentColor}
                    />
                    <Heading
                      size={{ base: "sm", md: "md" }}
                      color={headingColor}
                    >
                      Interactive Research Map
                    </Heading>
                  </HStack>

                  <Box
                    position="relative"
                    w="100%"
                    flex={1}
                    minH={{ base: "200px", md: "250px" }}
                  >
                    <AspectRatio ratio={{ base: 16 / 10, md: 4 / 3 }} h="100%">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.123456789!2d73.0731!3d0.6055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFares-Maathodaa!5e1!3m2!1sen!2smv!4v1234567890&z=18&maptype=satellite"
                        style={{
                          border: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </AspectRatio>
                    <Badge
                      position="absolute"
                      bottom={2}
                      right={2}
                      bg={badgeBg}
                      color={accentColor}
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="600"
                      backdropFilter="blur(10px)"
                    >
                      Satellite View
                    </Badge>
                  </Box>

                  <VStack spacing={2} w="100%">
                    <HStack spacing={2} w="100%">
                      <Icon as={Ship} w={4} h={4} color={accentColor} />
                      <Text
                        fontWeight="600"
                        color={headingColor}
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        Access Information
                      </Text>
                    </HStack>
                    <Text
                      color={textColor}
                      fontSize={{ base: "xs", md: "sm" }}
                      textAlign="center"
                    >
                      30-minute speedboat journey from Thinadhoo or direct
                      seaplane transfer from Malé
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>

      {/* Research Islands */}
      <Box>
        <VStack spacing={6} mb={8}>
          <HStack spacing={3}>
            <Icon as={Globe} w={8} h={8} color={accentColor} />
            <Heading size="lg" color={headingColor}>
              Dedicated Research Islands
            </Heading>
          </HStack>
          <Text fontSize="lg" color={textColor} textAlign="center" maxW="800px">
            Three specialized islands leased exclusively for research purposes,
            each offering unique environmental conditions and research
            opportunities.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {researchSites.map((site, index) => (
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
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Box position="relative">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src={site.image}
                    alt={site.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </AspectRatio>
              </Box>

              <CardBody p={6}>
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between" align="center">
                    <Heading size="md" color={headingColor}>
                      {site.name}
                    </Heading>
                    <Icon as={MapPin} w={5} h={5} color={accentColor} />
                  </HStack>

                  <Text fontSize="sm" color={textColor} lineHeight="tall">
                    {site.description}
                  </Text>

                  <Divider />

                  <VStack align="stretch" spacing={2}>
                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                      Key Features:
                    </Text>
                    {site.features.map((feature, idx) => (
                      <HStack key={idx} spacing={2}>
                        <Box w={2} h={2} bg={accentColor} borderRadius="full" />
                        <Text fontSize="sm" color={textColor}>
                          {feature}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>
      </Box>

      
    </VStack>
  );
}
