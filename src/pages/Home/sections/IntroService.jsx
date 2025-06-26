import {
  Flex,
  Image,
  Box,
  Heading,
  Container,
  SimpleGrid,
  Text,
  useColorModeValue,
  Icon,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SERVICES } from "../../../index.js";
import { Link, useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionFlex = motion(Flex);

export default function IntroServices() {
  // Enhanced responsive values for better mobile appearance
  const cardPadding = useBreakpointValue({ base: 4, sm: 5, md: 6 });
  const iconSize = useBreakpointValue({
    base: "50px",
    sm: "60px",
    md: "70px",
    lg: "80px",
  });
  const cardSpacing = useBreakpointValue({ base: 4, sm: 5, md: 6, lg: 7 });
  const gridSpacing = useBreakpointValue({ base: 3, sm: 4, md: 6, lg: 8 });
  const sectionPadding = useBreakpointValue({
    base: 8,
    sm: 10,
    md: 16,
    lg: 24,
  });
  const minCardHeight = useBreakpointValue({
    base: "180px",
    sm: "200px",
    md: "220px",
    lg: "240px",
  });
  const maxCardWidth = useBreakpointValue({
    base: "280px",
    sm: "100%",
    md: "100%",
  });

  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.100", "gray.650");
  const hoverBorderColor = useColorModeValue("gray.300", "gray.500");
  const hoverTextColor = useColorModeValue("gray.700", "gray.200");
  const iconBg = useColorModeValue("gray.100", "gray.700");
  const iconBorderColor = useColorModeValue("gray.300", "gray.600");
  const iconHoverBg = useColorModeValue("gray.200", "gray.600");
  const iconHoverBorderColor = useColorModeValue("gray.400", "gray.500");
  const mobileBg = useColorModeValue("white", "gray.750");

  const navigate = useNavigate();

  const handleServiceClick = (servicePath) => {
    navigate("/Services", { state: { defaultExpanded: servicePath } });
  };

  return (
    <Box bg={bgColor} py={sectionPadding} position="relative" overflow="hidden">
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack
          spacing={{ base: 3, md: 4 }}
          mb={{ base: 6, md: 10, lg: 16 }}
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
            Core Services
          </MotionHeading>
          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            fontWeight={400}
            size={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
            color={textColor}
            textAlign={{ base: "center", md: "left" }}
            px={{ base: 4, md: 0 }}
            lineHeight={{ base: 1.5, md: 1.4 }}
            maxW={{ base: "90%", md: "100%" }}
          >
            Comprehensive engineering solutions tailored to your needs
          </MotionHeading>
        </VStack>

        {/* Mobile-optimized grid */}
        <Box px={{ base: 4, md: 0 }}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 4 }}
            spacing={gridSpacing}
            justifyItems={{ base: "center", sm: "stretch" }}
          >
            {SERVICES.map((service, index) => (
              <Box
                key={service.path}
                onClick={() => handleServiceClick(service.path)}
                cursor="pointer"
                maxW={maxCardWidth}
                w="100%"
              >
                <MotionFlex
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  viewport={{ once: true }}
                  direction="column"
                  align="center"
                  justify="center"
                  p={cardPadding}
                  bg={{ base: mobileBg, sm: cardBg }}
                  borderRadius={{ base: "xl", md: "2xl" }}
                  border="1px solid"
                  borderColor={borderColor}
                  minH={minCardHeight}
                  h="full"
                  role="group"
                  style={{ transition: "all 0.3s ease" }}
                  boxShadow={{ base: "md", sm: "sm", md: "md" }}
                  _hover={{
                    bg: hoverBg,
                    transform: {
                      base: "translateY(-1px)",
                      sm: "translateY(-2px)",
                      md: "translateY(-4px)",
                    },
                    boxShadow: { base: "lg", sm: "md", md: "xl" },
                    borderColor: hoverBorderColor,
                  }}
                >
                  {/* Compact icon container for mobile */}
                  <Box
                    mb={cardSpacing}
                    p={{ base: 2, sm: 3, md: 4 }}
                    borderRadius="full"
                    bg={iconBg}
                    border="2px solid"
                    borderColor={iconBorderColor}
                    w={iconSize}
                    h={iconSize}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ transition: "all 0.3s ease" }}
                    _groupHover={{
                      transform: {
                        base: "scale(1.03)",
                        sm: "scale(1.05)",
                        md: "scale(1.1)",
                      },
                      boxShadow: { base: "sm", sm: "md", md: "lg" },
                      borderColor: iconHoverBorderColor,
                      bg: iconHoverBg,
                    }}
                  >
                    <Image
                      src={service.img}
                      alt={`${service.label} Service`}
                      objectFit="cover"
                      w="65%"
                      h="65%"
                      borderRadius="full"
                      transition="transform 0.3s ease"
                      fallbackSrc="https://via.placeholder.com/50x50?text=Service"
                      _groupHover={{
                        transform: {
                          base: "scale(1.01)",
                          sm: "scale(1.02)",
                          md: "scale(1.05)",
                        },
                      }}
                    />
                  </Box>

                  {/* Full service name visibility */}
                  <VStack
                    spacing={{ base: 2, sm: 3, md: 4 }}
                    flex={1}
                    textAlign="center"
                    w="100%"
                  >
                    <Text
                      fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
                      fontWeight="600"
                      color={headingColor}
                      textAlign="center"
                      style={{ transition: "all 0.3s ease" }}
                      lineHeight={{ base: 1.4, md: 1.3 }}
                      px={{ base: 1, md: 2 }}
                      whiteSpace="normal"
                      wordBreak="break-word"
                      _groupHover={{
                        transform: {
                          base: "translateY(-0.5px)",
                          sm: "translateY(-1px)",
                          md: "translateY(-2px)",
                        },
                        color: hoverTextColor,
                      }}
                    >
                      {service.label}
                    </Text>
                  </VStack>
                </MotionFlex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>

      {/* Background decoration */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w={{ base: "25%", sm: "30%", md: "50%" }}
        h="100%"
        bgGradient={`linear(to-r, ${bgColor}, transparent)`}
        opacity={0.8}
        zIndex={0}
      />
    </Box>
  );
}
