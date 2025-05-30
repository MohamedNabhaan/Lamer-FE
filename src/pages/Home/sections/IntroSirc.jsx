import {
  Box,
  Button,
  Heading,
  Image,
  Container,
  Text,
  VStack,
  Flex,
  Icon,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import SIRC from "../../../assets/SIRC/SIRC2.png";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionFlex = motion(Flex);

export default function IntroSirc() {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      bg={bgColor}
      py={{ base: 12, md: 16 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Box
          bg={cardBg}
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="xl"
          border="1px solid"
          borderColor={borderColor}
        >
          <Flex direction={{ base: "column", lg: "row" }}>
            {/* Content Section */}
            <Box
              w={{ base: "100%", lg: "55%" }}
              p={{ base: 6, md: 10 }}
              order={{ base: 2, lg: 1 }}
            >
              <VStack align={{ base: "center", lg: "flex-start" }} spacing={8}>
                <MotionHeading
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  color={headingColor}
                  size={{ base: "xl", md: "2xl" }}
                  textAlign={{ base: "center", lg: "left" }}
                  lineHeight="1.2"
                >
                  Research & Innovation Center
                </MotionHeading>

                <VStack
                  spacing={6}
                  align={{ base: "center", lg: "flex-start" }}
                  fontSize={{ base: "md", md: "lg" }}
                  color={textColor}
                >
                  <Text textAlign={{ base: "center", lg: "left" }}>
                    Located in the heart of Huvadhoo Atoll, our Small Island
                    Research Center (SIRC) is a hub for groundbreaking research
                    in marine sciences, island morphology, and climate change
                    studies, collaborating with leading institutions worldwide.
                  </Text>

                  <Box
                    bg={bgColor}
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                    w="100%"
                  >
                    <Text fontWeight="600" mb={4} color={headingColor}>
                      Research Programs
                    </Text>
                    <VStack align="stretch" spacing={3}>
                      <HStack spacing={4}>
                        <Box
                          w={2}
                          h={2}
                          borderRadius="full"
                          bg={headingColor}
                        />
                        <Text>Summer Coral Reef Ecology Course</Text>
                      </HStack>
                      <HStack spacing={4}>
                        <Box
                          w={2}
                          h={2}
                          borderRadius="full"
                          bg={headingColor}
                        />
                        <Text>Coral Reef System Course</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  <Link to="/SIRC" style={{ width: "100%" }}>
                    <Button
                      rightIcon={<ArrowUpRight />}
                      bg={headingColor}
                      color="white"
                      size="lg"
                      width={{ base: "100%", sm: "auto" }}
                      fontWeight="600"
                      _hover={{
                        bg: useColorModeValue("brand.500", "brand.400"),
                      }}
                    >
                      Explore Research Center
                    </Button>
                  </Link>
                </VStack>
              </VStack>
            </Box>

            {/* Image Section */}
            <Box
              w={{ base: "100%", lg: "45%" }}
              h={{ base: "300px", lg: "auto" }}
              position="relative"
              order={{ base: 1, lg: 2 }}
            >
              <Image
                w="100%"
                h="100%"
                objectFit="cover"
                src={SIRC}
                alt="Small Island Research Center"
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="rgba(0, 0, 0, 0.6)"
                backdropFilter="blur(8px)"
                p={4}
                color="white"
              >
                <HStack spacing={2} fontSize="sm">
                  <Icon as={MapPin} w={4} h={4} />
                  <Text>Faresmaathoda, Huvadhoo Atoll, Maldives</Text>
                </HStack>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Container>

      {/* Background decoration */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="50%"
        h="100%"
        bgGradient={`linear(to-r, ${bgColor}, transparent)`}
        opacity={0.8}
        zIndex={0}
      />
    </Box>
  );
}
