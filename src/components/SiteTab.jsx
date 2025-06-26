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
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Globe,
  Waves,
  Ship,
  ImageOff,
} from "lucide-react";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function SiteTab({ sites = [] }) {
  // Color scheme - standardized to match SIRC page
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");
  const sectionBg = useColorModeValue("gray.50", "gray.700");

  // Helper function to get all images for a site
  const getSiteImages = (site) => {
    const images = [];
    if (site.sitePicture1 && Array.isArray(site.sitePicture1)) {
      images.push(...site.sitePicture1);
    }
    if (site.sitePicture2 && Array.isArray(site.sitePicture2)) {
      images.push(...site.sitePicture2);
    }
    if (site.sitePicture3 && Array.isArray(site.sitePicture3)) {
      images.push(...site.sitePicture3);
    }
    return images.filter((img) => img && img.trim() !== "");
  };

  // Component for when no image is available
  const NoImageFallback = () => (
    <Center
      width="100%"
      height="100%"
      bg={sectionBg}
      flexDirection="column"
      gap={2}
    >
      <Icon as={ImageOff} w={8} h={8} color={textColor} />
      <Text fontSize="xs" color={textColor} textAlign="center">
        No Image Available
      </Text>
    </Center>
  );

  return (
    <VStack spacing={{ base: 8, md: 10 }} align="stretch" overflow="visible">
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
      <Box overflow="visible">
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

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={6}
          overflow="visible"
        >
          {sites && sites.length > 0 ? (
            sites.map((site, index) => (
              <MotionCard
                key={site.id || index}
                bg={cardBg}
                shadow="lg"
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="visible"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Images Grid */}
                <Box overflow="visible" position="relative">
                  {(() => {
                    const images = getSiteImages(site);

                    if (images.length === 0) {
                      return (
                        <AspectRatio ratio={16 / 10}>
                          <NoImageFallback />
                        </AspectRatio>
                      );
                    }

                    // Single image - full width
                    if (images.length === 1) {
                      return (
                        <Box
                          position="relative"
                          width="100%"
                          height="250px"
                          overflow="visible"
                          style={{
                            perspective: "1200px",
                            perspectiveOrigin: "center center",
                          }}
                        >
                          <Image
                            src={images[0]}
                            alt={site.siteName || site.name}
                            objectFit="contain"
                            w="100%"
                            h="100%"
                            position="absolute"
                            top="0"
                            left="0"
                            transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                            _hover={{
                              transform: "scale(1.1)",
                              zIndex: 10,
                              cursor: "pointer",
                              boxShadow:
                                "0 20px 40px -12px rgba(0, 0, 0, 0.4), 0 10px 20px -8px rgba(0, 0, 0, 0.2)",
                              borderRadius: "xl",
                            }}
                            borderRadius="md"
                            transformStyle="preserve-3d"
                          />
                        </Box>
                      );
                    }

                    // Multiple images - grid layout
                    const gridCols =
                      images.length === 2
                        ? 2
                        : images.length === 3
                        ? 3
                        : images.length === 4
                        ? 2
                        : Math.min(3, Math.ceil(images.length / 2));

                    return (
                      <SimpleGrid
                        columns={gridCols}
                        spacing={1}
                        bg={sectionBg}
                        p={1}
                        borderRadius="md"
                        style={{
                          perspective: "1200px",
                          perspectiveOrigin: "center center",
                        }}
                      >
                        {images.map((image, idx) => (
                          <Box
                            key={idx}
                            position="relative"
                            width="100%"
                            height="120px"
                            overflow="visible"
                            borderRadius="sm"
                          >
                            <Image
                              src={image}
                              alt={`${site.siteName || site.name} - Image ${
                                idx + 1
                              }`}
                              objectFit="contain"
                              w="100%"
                              h="100%"
                              position="absolute"
                              top="0"
                              left="0"
                              transition="all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                              transformStyle="preserve-3d"
                              _hover={{
                                transform: "scale(1.15)",
                                zIndex: 20,
                                cursor: "pointer",
                                boxShadow:
                                  "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 15px 30px -8px rgba(0, 0, 0, 0.3)",
                                borderRadius: "lg",
                              }}
                              borderRadius="sm"
                            />
                          </Box>
                        ))}
                      </SimpleGrid>
                    );
                  })()}
                </Box>

                <CardBody p={6}>
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between" align="center">
                      <Heading size="md" color={headingColor}>
                        {site.siteName || site.name}
                      </Heading>
                      <Icon as={MapPin} w={5} h={5} color={accentColor} />
                    </HStack>

                    <Text fontSize="sm" color={textColor} lineHeight="tall">
                      {site.siteDescription || site.description}
                    </Text>

                    <Divider />

                    <VStack align="stretch" spacing={2}>
                      <Text fontSize="sm" fontWeight="600" color={headingColor}>
                        Key Features:
                      </Text>
                      {(() => {
                        // Safely process keyFeatures data
                        let features = [];

                        if (site.keyFeatures) {
                          if (Array.isArray(site.keyFeatures)) {
                            features = site.keyFeatures;
                          } else if (typeof site.keyFeatures === "string") {
                            try {
                              // Try to parse as JSON first
                              features = JSON.parse(site.keyFeatures);
                              if (!Array.isArray(features)) {
                                // If it's not an array after parsing, split by comma
                                features = site.keyFeatures
                                  .split(",")
                                  .map((f) => f.trim())
                                  .filter((f) => f);
                              }
                            } catch (error) {
                              // If JSON parsing fails, split by comma
                              features = site.keyFeatures
                                .split(",")
                                .map((f) => f.trim())
                                .filter((f) => f);
                            }
                          }
                        } else if (site.features) {
                          if (Array.isArray(site.features)) {
                            features = site.features;
                          } else if (typeof site.features === "string") {
                            features = site.features
                              .split(",")
                              .map((f) => f.trim())
                              .filter((f) => f);
                          }
                        }

                        // Ensure we have an array and filter out empty values
                        if (!Array.isArray(features)) {
                          features = [];
                        }
                        features = features.filter(
                          (feature) =>
                            feature && feature.trim && feature.trim() !== ""
                        );

                        return features.map((feature, idx) => (
                          <HStack key={idx} spacing={2}>
                            <Box
                              w={2}
                              h={2}
                              bg={accentColor}
                              borderRadius="full"
                            />
                            <Text fontSize="sm" color={textColor}>
                              {feature}
                            </Text>
                          </HStack>
                        ));
                      })()}
                    </VStack>
                  </VStack>
                </CardBody>
              </MotionCard>
            ))
          ) : (
            <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
              <Center py={12}>
                <VStack spacing={4}>
                  <Icon
                    as={MapPin}
                    w={12}
                    h={12}
                    color={textColor}
                    opacity={0.5}
                  />
                  <Text fontSize="lg" color={textColor} textAlign="center">
                    No research sites available at the moment
                  </Text>
                  <Text
                    fontSize="sm"
                    color={textColor}
                    opacity={0.7}
                    textAlign="center"
                  >
                    Please check back later for updates
                  </Text>
                </VStack>
              </Center>
            </GridItem>
          )}
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
