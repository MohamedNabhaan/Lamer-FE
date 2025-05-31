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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SERVICES } from "../../../index.js";
import { Link, useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionFlex = motion(Flex);

export default function IntroServices() {
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("white", "gray.600");
  const navigate = useNavigate();

  const handleServiceClick = (servicePath) => {
    navigate("/Services", { state: { defaultExpanded: servicePath } });
  };

  return (
    <Box
      bg={bgColor}
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack
          spacing={4}
          mb={16}
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
            Core Services
          </MotionHeading>
          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            fontWeight={400}
            size={{ base: "md", md: "lg" }}
            color={textColor}
            textAlign={{ base: "center", md: "left" }}
          >
            Comprehensive engineering solutions tailored to your needs
          </MotionHeading>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={{ base: 6, md: 8 }}
        >
          {SERVICES.map((service, index) => (
            <Box
              key={service.path}
              onClick={() => handleServiceClick(service.path)}
              cursor="pointer"
            >
              <MotionFlex
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
                direction="column"
                align="center"
                justify="center"
                p={6}
                bg={cardBg}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                h="full"
                role="group"
                style={{ transition: "all 0.3s ease" }}
                _hover={{
                  bg: hoverBg,
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                }}
              >
                <Box
                  mb={6}
                  p={4}
                  borderRadius="full"
                  bg={bgColor}
                  border="1px solid"
                  borderColor={borderColor}
                  style={{ transition: "all 0.3s ease" }}
                  _groupHover={{
                    transform: "scale(1.1)",
                    boxShadow: "lg",
                  }}
                >
                  <Image
                    src={service.img}
                    alt="Service"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transition="transform 0.3s ease"
                    fallbackSrc="https://via.placeholder.com/400x300?text=Service"
                    _groupHover={{
                      transform: "scale(1.05)",
                    }}
                  />
                </Box>

                <VStack spacing={3} flex={1}>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="600"
                    color={headingColor}
                    textAlign="center"
                    style={{ transition: "all 0.3s ease" }}
                    _groupHover={{ transform: "translateY(-2px)" }}
                  >
                    {service.label}
                  </Text>
                </VStack>
              </MotionFlex>
            </Box>
          ))}
        </SimpleGrid>
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
