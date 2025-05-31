import { useLoaderData, useLocation } from "react-router-dom";
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
} from "@chakra-ui/react";
import {
  Monitor,
  Wrench,
  Package2,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function ServicePage() {
  const service = useLoaderData();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  // Color scheme
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const highlightColor = useColorModeValue("brand.50", "brand.900");

  const openImageModal = (img) => {
    setSelectedImage(img);
    onOpen();
  };

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
                  {/* Software Tools Card */}
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
                      {(service.softwares || "Not specified")
                        .split(",")
                        .map((software, index) => (
                          <ListItem
                            key={index}
                            display="flex"
                            alignItems="center"
                          >
                            <ListIcon as={CheckCircle2} color={headingColor} />
                            <Text color={textColor}>{software.trim()}</Text>
                          </ListItem>
                        ))}
                    </List>
                  </Box>

                  {/* Equipment Card */}
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
                      {(service.equipment || "Not specified")
                        .split(",")
                        .map((equipment, index) => (
                          <ListItem
                            key={index}
                            display="flex"
                            alignItems="center"
                          >
                            <ListIcon as={CheckCircle2} color={headingColor} />
                            <Text color={textColor}>{equipment.trim()}</Text>
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>

          {/* Gallery Section */}
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
              Project Gallery
            </Heading>
            {service.pagePics &&
            service.pagePics.length > 0 &&
            service.pagePics[0] !== "" ? (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
                {service.pagePics.map((img, index) => (
                  <MotionBox
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box
                      position="relative"
                      borderRadius="xl"
                      overflow="hidden"
                      shadow="lg"
                      cursor="pointer"
                      onClick={() => openImageModal(img)}
                    >
                      <Image
                        src={img}
                        alt={`${service.serviceName} image ${index + 1}`}
                        w="100%"
                        h={{ base: "250px", md: "300px" }}
                        objectFit="cover"
                        fallbackSrc="https://via.placeholder.com/300x250?text=Gallery+Image"
                      />
                      <Flex
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="rgba(0, 0, 0, 0.3)"
                        opacity={0}
                        transition="opacity 0.3s"
                        _hover={{ opacity: 1 }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={Maximize2} color="white" w={8} h={8} />
                      </Flex>
                    </Box>
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
                  No images available for this service
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
