import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Container,
  Flex,
  useColorModeValue,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TECHNOLOGY } from "../../..";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function IntroTechnology() {
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
            Advanced Engineering Tools
          </MotionHeading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color={textColor}
            maxW="800px"
            textAlign={{ base: "center", md: "left" }}
          >
            Our engineering excellence is powered by industry-leading software
            and tools, ensuring precision and innovation in every project.
          </Text>
        </VStack>

        {/* Technology Grid */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {TECHNOLOGY.map((tech, index) => (
            <MotionBox
              key={tech.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Grid
                templateColumns={{ base: "1fr", sm: "120px 1fr" }}
                gap={6}
                bg={cardBg}
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                alignItems="center"
                height="full"
              >
                <GridItem>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="sm"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Image
                      src={tech.image}
                      alt={tech.title}
                      h={{ base: "60px", md: "80px" }}
                      w={{ base: "60px", md: "80px" }}
                      objectFit="cover"
                      borderRadius="full"
                      fallbackSrc="https://via.placeholder.com/80x80?text=Tech"
                    />
                  </Box>
                </GridItem>

                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Heading
                      as="h3"
                      size="md"
                      color={headingColor}
                      fontWeight="600"
                    >
                      {tech.label}
                    </Heading>
                    <Text fontSize="sm" color={textColor} lineHeight="tall">
                      {tech.use}
                    </Text>
                  </VStack>
                </GridItem>
              </Grid>
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
