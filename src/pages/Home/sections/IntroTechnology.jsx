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
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TECHNOLOGY } from "../../..";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function IntroTechnology() {
  // Responsive values for better mobile experience
  const sectionPadding = useBreakpointValue({
    base: 8,
    sm: 10,
    md: 16,
    lg: 20,
  });
  const headerSpacing = useBreakpointValue({ base: 3, md: 4 });
  const headerMargin = useBreakpointValue({ base: 6, sm: 8, md: 10, lg: 12 });
  const gridGap = useBreakpointValue({ base: 4, sm: 5, md: 6, lg: 8 });
  const cardPadding = useBreakpointValue({ base: 4, sm: 5, md: 6 });
  const iconSize = useBreakpointValue({
    base: "90px",
    sm: "100px",
    md: "120px",
    lg: "140px",
  });
  const iconPadding = useBreakpointValue({ base: 4, sm: 5, md: 6 });
  const cardSpacing = useBreakpointValue({ base: 4, sm: 5, md: 6 });

  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconContainerBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.650");
  const hoverBorderColor = useColorModeValue("gray.300", "gray.500");

  return (
    <Box bg={bgColor} py={sectionPadding} position="relative" overflow="hidden">
      <Container maxW="container.xl" position="relative" zIndex={1}>
        {/* Enhanced Header Section */}
        <VStack
          spacing={headerSpacing}
          mb={headerMargin}
          align={{ base: "center", md: "flex-start" }}
        >
          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            size={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
            color={headingColor}
            textAlign={{ base: "center", md: "left" }}
            px={{ base: 4, md: 0 }}
            fontWeight={{ base: "bold", md: "semibold" }}
          >
            Advanced Engineering Tools
          </MotionHeading>
          <Text
            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
            color={textColor}
            maxW={{ base: "95%", sm: "90%", md: "800px" }}
            textAlign={{ base: "center", md: "left" }}
            px={{ base: 4, md: 0 }}
            lineHeight={{ base: 1.6, md: 1.5 }}
          >
            Our engineering excellence is powered by industry-leading software
            and tools, ensuring precision and innovation in every project.
          </Text>
        </VStack>

        {/* Responsive Technology Grid */}
        <Box px={{ base: 4, md: 0 }}>
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
            gap={gridGap}
          >
          {TECHNOLOGY.map((tech, index) => (
            <MotionBox
              key={tech.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Grid
                  templateColumns={{
                    base: "1fr",
                    sm: `${iconSize} 1fr`,
                    md: "140px 1fr",
                    lg: "160px 1fr",
                  }}
                  gap={cardSpacing}
                bg={cardBg}
                  p={cardPadding}
                  borderRadius={{ base: "lg", md: "xl" }}
                border="1px solid"
                borderColor={borderColor}
                  alignItems={{ base: "center", sm: "center" }}
                height="full"
                  minH={{ base: "auto", sm: "140px", md: "160px", lg: "180px" }}
                >
                  {/* Technology Icon */}
                  <GridItem
                    justifySelf={{ base: "center", sm: "start" }}
                    mb={{ base: 3, sm: 0 }}
                  >
                  <Box
                      bg={iconContainerBg}
                      p={iconPadding}
                      borderRadius={{ base: "lg", md: "xl" }}
                    boxShadow="sm"
                    border="1px solid"
                    borderColor={borderColor}
                      w={iconSize}
                      h={iconSize}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                  >
                    <Image
                      src={tech.image}
                        alt={tech.label}
                        w="90%"
                        h="90%"
                        objectFit="contain"
                        borderRadius="md"
                      fallbackSrc="https://via.placeholder.com/80x80?text=Tech"
                    />
                  </Box>
                </GridItem>

                  {/* Technology Content */}
                <GridItem>
                    <VStack
                      align={{ base: "center", sm: "start" }}
                      spacing={{ base: 2, md: 3 }}
                      textAlign={{ base: "center", sm: "left" }}
                    >
                    <Heading
                      as="h3"
                        size={{ base: "sm", sm: "md", md: "lg" }}
                      color={headingColor}
                      fontWeight="600"
                        lineHeight={{ base: 1.3, md: 1.2 }}
                    >
                      {tech.label}
                    </Heading>
                      <Text
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                        color={textColor}
                        lineHeight={{ base: 1.5, md: 1.6 }}
                        noOfLines={{ base: 3, md: 4 }}
                      >
                      {tech.use}
                    </Text>
                  </VStack>
                </GridItem>
              </Grid>
            </MotionBox>
          ))}
        </Grid>
        </Box>
      </Container>

      {/* Enhanced Background decoration */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w={{ base: "30%", md: "50%" }}
        h="100%"
        bgGradient={`linear(to-l, ${bgColor}, transparent)`}
        opacity={0.8}
        zIndex={0}
      />
    </Box>
  );
}
