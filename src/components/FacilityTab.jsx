import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Icon,
  Badge,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Monitor,
  Wifi,
  GraduationCap,
  Wrench,
  DollarSign,
  Package,
  Home,
  Microscope,
  BookOpen,
} from "lucide-react";

const MotionCard = motion(Card);

export default function FacilityTab(props) {
  // Color scheme - standardized to match SIRC page
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const tableBg = useColorModeValue("white", "gray.800");
  const tableHeaderBg = useColorModeValue("brand.50", "brand.900");

  const facilities = [
    {
      icon: Home,
      title: "Accommodation",
      features: ["Air-conditioned rooms", "Hot water", "Comfortable beds"],
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      features: ["24/7 connectivity", "Research access", "Video conferencing"],
    },
    {
      icon: Microscope,
      title: "Laboratory Facilities",
      features: ["Modern equipment", "Analysis tools", "Storage facilities"],
    },
    {
      icon: BookOpen,
      title: "Classroom Spaces",
      features: ["Meeting rooms", "Presentation areas", "Study spaces"],
    },
  ];

  return (
    <VStack spacing={{ base: 6, md: 8 }} align="stretch">
      {/* Facilities Overview */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
      >
        {facilities.map((facility, index) => (
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CardHeader bg={accentColor} color="white" py={{ base: 3, md: 4 }}>
              <HStack justify="center">
                <Icon
                  as={facility.icon}
                  w={{ base: 5, md: 6 }}
                  h={{ base: 5, md: 6 }}
                />
              </HStack>
            </CardHeader>

            <CardBody p={{ base: 4, md: 6 }}>
              <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
                <Heading
                  as="h3"
                  size={{ base: "sm", md: "md" }}
                  color={headingColor}
                  textAlign="center"
                  lineHeight="1.3"
                >
                  {facility.title}
                </Heading>

                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={textColor}
                  lineHeight="tall"
                  textAlign="center"
                >
                  {facility.features.join(", ")}
                </Text>
              </VStack>
            </CardBody>
          </MotionCard>
        ))}
      </SimpleGrid>

      {/* Equipment Section */}
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 2fr" }}
        gap={{ base: 6, md: 8 }}
      >
        <GridItem>
          <Card
            bg={cardBg}
            shadow="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            overflow="hidden"
          >
            <CardHeader bg={accentColor} color="white" py={{ base: 3, md: 4 }}>
              <HStack spacing={3}>
                <Icon
                  as={Wrench}
                  w={{ base: 5, md: 6 }}
                  h={{ base: 5, md: 6 }}
                />
                <Heading size={{ base: "sm", md: "md" }}>
                  Equipment Rental
                </Heading>
              </HStack>
            </CardHeader>
            <CardBody p={{ base: 4, md: 6 }}>
              <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color={textColor}
                  lineHeight="tall"
                >
                  Professional field equipment available for rent to researchers
                  and students based on availability.
                </Text>
                <Divider />
                <VStack align="stretch" spacing={3}>
                  <HStack spacing={2}>
                    <Icon as={Package} w={4} h={4} color={accentColor} />
                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                      Advance Booking Required
                    </Text>
                  </HStack>
                  <Text fontSize={{ base: "xs", md: "sm" }} color={textColor}>
                    Equipment must be requested prior to arrival to ensure
                    availability during your research period.
                  </Text>
                  <HStack spacing={2}>
                    <Icon as={DollarSign} w={4} h={4} color={accentColor} />
                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                      Daily Rental Rates
                    </Text>
                  </HStack>
                  <Text fontSize={{ base: "xs", md: "sm" }} color={textColor}>
                    Fair pricing with flexible rental periods to suit your
                    research timeline.
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card
            bg={cardBg}
            shadow="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            overflow="hidden"
          >
            <CardHeader bg={accentColor} color="white" py={{ base: 4, md: 6 }}>
              <HStack
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={2}
              >
                <HStack spacing={3} minW="0">
                  <Icon
                    as={Package}
                    w={{ base: 5, md: 6 }}
                    h={{ base: 5, md: 6 }}
                  />
                  <Heading size={{ base: "sm", md: "lg" }} minW="0">
                    Available Equipment & Pricing
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
                  USD Pricing
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody p={0}>
              {props.equipment && props.equipment.length > 0 ? (
                <Box overflowX="auto">
                  <TableContainer>
                    <Table variant="simple" size={{ base: "sm", md: "md" }}>
                      <Thead bg={useColorModeValue("gray.100", "gray.700")}>
                        <Tr>
                          <Th
                            color={headingColor}
                            fontWeight="700"
                            fontSize={{ base: "xs", md: "sm" }}
                            textTransform="uppercase"
                            letterSpacing="wider"
                            py={4}
                            borderBottom="2px solid"
                            borderColor={accentColor}
                            minW="150px"
                          >
                            <HStack spacing={2}>
                              <Icon as={Wrench} w={4} h={4} />
                              <Text>Equipment</Text>
                            </HStack>
                          </Th>
                          <Th
                            color={headingColor}
                            fontWeight="700"
                            fontSize={{ base: "xs", md: "sm" }}
                            textTransform="uppercase"
                            letterSpacing="wider"
                            py={4}
                            borderBottom="2px solid"
                            borderColor={accentColor}
                            minW="120px"
                            display={{ base: "none", md: "table-cell" }}
                          >
                            Brand & Model
                          </Th>
                          <Th
                            color={headingColor}
                            fontWeight="700"
                            fontSize={{ base: "xs", md: "sm" }}
                            textTransform="uppercase"
                            letterSpacing="wider"
                            textAlign="center"
                            py={4}
                            borderBottom="2px solid"
                            borderColor={accentColor}
                            minW="80px"
                          >
                            Qty
                          </Th>
                          <Th
                            color={headingColor}
                            fontWeight="700"
                            fontSize={{ base: "xs", md: "sm" }}
                            textTransform="uppercase"
                            letterSpacing="wider"
                            textAlign="right"
                            py={4}
                            borderBottom="2px solid"
                            borderColor={accentColor}
                            minW="100px"
                          >
                            <HStack justify="flex-end" spacing={2}>
                              <Icon as={DollarSign} w={4} h={4} />
                              <Text display={{ base: "none", sm: "block" }}>
                                Daily Rate
                              </Text>
                              <Text display={{ base: "block", sm: "none" }}>
                                Rate
                              </Text>
                            </HStack>
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {props.equipment.map((equipment, index) => (
                          <Tr
                            key={index}
                            bg={
                              index % 2 === 0
                                ? useColorModeValue("white", "gray.800")
                                : useColorModeValue("gray.50", "gray.750")
                            }
                            borderBottom="1px solid"
                            borderColor={useColorModeValue(
                              "gray.200",
                              "gray.600"
                            )}
                          >
                            <Td
                              fontWeight="600"
                              color={headingColor}
                              py={{ base: 3, md: 5 }}
                            >
                              <VStack align="start" spacing={1}>
                                <HStack spacing={3}>
                                  <Box
                                    w={3}
                                    h={3}
                                    bg={accentColor}
                                    borderRadius="full"
                                  />
                                  <Text fontSize={{ base: "xs", md: "md" }}>
                                    {equipment.equipmentName}
                                  </Text>
                                </HStack>
                                <Box
                                  display={{ base: "block", md: "none" }}
                                  pl={6}
                                >
                                  <Text
                                    fontSize="xs"
                                    fontWeight="600"
                                    color={headingColor}
                                  >
                                    {equipment.brand}
                                  </Text>
                                  <Text
                                    fontSize="xs"
                                    color={useColorModeValue(
                                      "gray.600",
                                      "gray.400"
                                    )}
                                    fontStyle="italic"
                                  >
                                    Model: {equipment.modelNo}
                                  </Text>
                                </Box>
                              </VStack>
                            </Td>
                            <Td
                              color={textColor}
                              py={{ base: 3, md: 5 }}
                              display={{ base: "none", md: "table-cell" }}
                            >
                              <VStack align="start" spacing={1}>
                                <Text
                                  fontSize="md"
                                  fontWeight="600"
                                  color={headingColor}
                                >
                                  {equipment.brand}
                                </Text>
                                <Text
                                  fontSize="sm"
                                  color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                  )}
                                  fontStyle="italic"
                                >
                                  Model: {equipment.modelNo}
                                </Text>
                              </VStack>
                            </Td>
                            <Td textAlign="center" py={{ base: 3, md: 5 }}>
                              <Badge
                                colorScheme="brand"
                                variant="solid"
                                borderRadius="lg"
                                px={{ base: 2, md: 3 }}
                                py={1}
                                fontSize={{ base: "xs", md: "md" }}
                                fontWeight="600"
                              >
                                {equipment.quantity}
                              </Badge>
                            </Td>
                            <Td textAlign="right" py={{ base: 3, md: 5 }}>
                              <VStack align="end" spacing={0}>
                                <Text
                                  fontWeight="700"
                                  color={accentColor}
                                  fontSize={{ base: "sm", md: "lg" }}
                                >
                                  ${equipment.charge}
                                </Text>
                                <Text
                                  fontSize="xs"
                                  color={useColorModeValue(
                                    "gray.500",
                                    "gray.400"
                                  )}
                                >
                                  per day
                                </Text>
                              </VStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
                <Box p={{ base: 8, md: 12 }} textAlign="center">
                  <VStack spacing={4}>
                    <Icon
                      as={Package}
                      w={{ base: 10, md: 12 }}
                      h={{ base: 10, md: 12 }}
                      color={accentColor}
                      opacity={0.6}
                    />
                    <Heading
                      size={{ base: "md", md: "lg" }}
                      color={headingColor}
                    >
                      No Available Equipment at the moment
                    </Heading>
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color={textColor}
                      maxW="400px"
                    >
                      We are currently updating our equipment inventory. Please
                      check back later or contact us for more information.
                    </Text>
                  </VStack>
                </Box>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </VStack>
  );
}
