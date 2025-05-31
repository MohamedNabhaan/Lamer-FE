import {
  Box,
  Heading,
  Image,
  Flex,
  Text,
  Container,
  VStack,
  useColorModeValue,
  Grid,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FOUNDERS } from "../../..";
import { Award, GraduationCap } from "lucide-react";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function WhoAreWe() {
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const badgeBg = useColorModeValue("brand.50", "brand.900");

  return (
    <Box
      bg={bgColor}
      py={{ base: 12, md: 16 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        {/* Header Section */}
        <VStack
          spacing={4}
          mb={12}
          align={{ base: "center", md: "flex-start" }}
        >
          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            size={{ base: "2xl", md: "3xl" }}
            color={headingColor}
            textAlign={{ base: "center", md: "left" }}
          >
            Leadership Team
          </MotionHeading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color={textColor}
            maxW="800px"
            textAlign={{ base: "center", md: "left" }}
          >
            With decades of combined experience, our leadership team brings deep
            expertise in engineering and a commitment to delivering excellence
            in every project.
          </Text>
        </VStack>

        {/* Team Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {FOUNDERS.map((founder, index) => (
            <MotionBox
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              height="full"
            >
              <Box
                bg={cardBg}
                borderRadius="xl"
                overflow="hidden"
                boxShadow="md"
                border="1px solid"
                borderColor={borderColor}
                height="full"
                display="flex"
                flexDirection="column"
              >
                {/* Image Container with Overlay */}
                <Box position="relative" h="300px" flexShrink={0}>
                  <Image
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    src={founder.picture}
                    alt={founder.name}
                    fallbackSrc="https://via.placeholder.com/600x400?text=About+Us"
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                    pt={20}
                    pb={6}
                    px={6}
                  >
                    <Heading
                      as="h3"
                      size="lg"
                      color="white"
                      mb={2}
                      textShadow="0 2px 4px rgba(0,0,0,0.3)"
                    >
                      {founder.name}
                    </Heading>
                    <Text
                      fontSize="md"
                      color="gray.100"
                      fontWeight="500"
                      textShadow="0 1px 2px rgba(0,0,0,0.3)"
                    >
                      {founder.title}
                    </Text>
                  </Box>
                </Box>

                {/* Content Section */}
                <Box p={6} flex="1" display="flex" flexDirection="column">
                  {/* Experience */}
                  <HStack spacing={3} mb={4} align="center">
                    <Box color={headingColor} flexShrink={0}>
                      <Award size={16} />
                    </Box>
                    <Text fontSize="sm" color={textColor}>
                      {founder.experience} Years Experience
                    </Text>
                  </HStack>

                  {/* Credentials */}
                  <VStack align="start" spacing={3} flex="1">
                    {founder.credentials.map((credential, idx) => (
                      <HStack key={idx} spacing={3} align="flex-start" w="full">
                        <Box color={headingColor} mt={1} flexShrink={0}>
                          <GraduationCap size={16} />
                        </Box>
                        <Text fontSize="sm" color={textColor} lineHeight="1.5">
                          {credential}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </Box>
            </MotionBox>
          ))}
        </Grid>
      </Container>

      {/* Background decoration */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w="50%"
        h="100%"
        bgGradient={`linear(to-l, ${bgColor}, transparent)`}
        opacity={0.8}
        zIndex={0}
      />
    </Box>
  );
}
