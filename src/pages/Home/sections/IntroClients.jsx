import {
  Flex,
  Box,
  Image,
  Container,
  Heading,
  Text,
  keyframes,
  useColorModeValue,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CLIENTS } from "../../../index.js";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Responsive scroll animation
const createScrollAnimation = (cardWidth, clientsLength) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-${cardWidth}px * ${clientsLength}));
  }
`;

export default function IntroClients() {
  // Responsive values
  const cardWidth = useBreakpointValue({
    base: 150,
    sm: 180,
    md: 200,
    lg: 220,
  });
  const cardHeight = useBreakpointValue({ base: 50, sm: 60, md: 70, lg: 80 });
  const cardGap = useBreakpointValue({ base: 6, sm: 8, md: 10, lg: 12 });
  const containerPadding = useBreakpointValue({ base: 8, md: 12 });

  // Create responsive scroll animation
  const scroll = createScrollAnimation(cardWidth + cardGap * 4, CLIENTS.length);
  const scrollAnimation = `${scroll} infinite 25s linear`;

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");

  return (
    <Box
      bg={bgColor}
      py={{ base: 12, md: 16 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack
          spacing={4}
          mb={{ base: 8, md: 12 }}
          align={{ base: "center", md: "flex-start" }}
        >
          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            size={{ base: "xl", sm: "2xl", md: "3xl" }}
            color={headingColor}
            textAlign={{ base: "center", md: "left" }}
            px={{ base: 4, md: 0 }}
          >
            Our Success Stories
          </MotionHeading>
          <Text
            fontSize={{ base: "md", sm: "lg", md: "xl" }}
            color={textColor}
            maxW="800px"
            textAlign={{ base: "center", md: "left" }}
            px={{ base: 4, md: 0 }}
            lineHeight={{ base: "1.6", md: "1.5" }}
          >
            Proud to have collaborated with industry leaders who trust our
            expertise
          </Text>
        </VStack>

        <Box
          position="relative"
          w="100%"
          overflow="hidden"
          borderRadius={{ base: "lg", md: "xl" }}
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgGradient: useColorModeValue(
              "linear(to-r, white, transparent 15%, transparent 85%, white)",
              "linear(to-r, gray.800, transparent 15%, transparent 85%, gray.800)"
            ),
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <Flex
            w="fit-content"
            gap={cardGap}
            py={containerPadding}
            px={{ base: 2, md: 4 }}
            animation={scrollAnimation}
            alignItems="center"
            sx={{
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((image, index) => (
              <Box
                key={index}
                position="relative"
                minW={`${cardWidth}px`}
                w={`${cardWidth}px`}
                h={`${cardHeight}px`}
                filter="grayscale(100%)"
                transition="all 0.4s ease"
                borderRadius={{ base: "md", md: "lg" }}
                overflow="hidden"
                bg={useColorModeValue("gray.50", "gray.700")}
                border="1px solid"
                borderColor={useColorModeValue("gray.100", "gray.600")}
                boxShadow={{ base: "sm", md: "md" }}
                _hover={{
                  filter: "grayscale(0%)",
                  transform: { base: "scale(1.02)", md: "scale(1.05)" },
                  boxShadow: { base: "md", md: "lg" },
                  borderColor: useColorModeValue("brand.200", "brand.600"),
                }}
              >
                <Image
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  src={image}
                  opacity={0.8}
                  transition="opacity 0.4s"
                  fallbackSrc="https://via.placeholder.com/200x80?text=Client"
                  p={{ base: 2, md: 3 }}
                  _hover={{
                    opacity: 1,
                  }}
                />
              </Box>
            ))}
          </Flex>
        </Box>
      </Container>

      {/* Background decoration */}
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
