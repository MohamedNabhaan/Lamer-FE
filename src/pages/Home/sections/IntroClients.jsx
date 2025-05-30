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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CLIENTS } from "../../../index.js";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * ${CLIENTS.length}));
  }
`;

export default function IntroClients() {
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
            Our Success Stories
          </MotionHeading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color={textColor}
            maxW="800px"
            textAlign={{ base: "center", md: "left" }}
          >
            Proud to have collaborated with industry leaders who trust our
            expertise
          </Text>
        </VStack>

        <Box
          position="relative"
          w="100%"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgGradient: useColorModeValue(
              "linear(to-r, white, transparent 10%, transparent 90%, white)",
              "linear(to-r, gray.800, transparent 10%, transparent 90%, gray.800)"
            ),
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <Flex
            w="fit-content"
            gap={12}
            py={12}
            px={4}
            animation={scrollAnimation}
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
                minW="200px"
                h={{ base: "60px", md: "80px" }}
                filter="grayscale(100%)"
                transition="all 0.4s ease"
                _hover={{
                  filter: "grayscale(0%)",
                  transform: "scale(1.05)",
                }}
              >
                <Image
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  src={image}
                  opacity={0.7}
                  transition="opacity 0.4s"
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
        w="50%"
        h="100%"
        bgGradient={`linear(to-l, ${bgColor}, transparent)`}
        opacity={0.8}
        zIndex={0}
      />
    </Box>
  );
}
