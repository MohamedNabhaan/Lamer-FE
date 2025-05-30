import {
  Box,
  Center,
  Image,
  Text,
  Heading,
  Flex,
  Button,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import bg from "../../../assets/introduction/Intro4.png";
import { useLoaderData, Link } from "react-router-dom";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

export default function Introduction() {
  const bgOverlayColor = useColorModeValue(
    "rgba(255,255,255,0.95)",
    "rgba(26,32,44,0.95)"
  );

  return (
    <Box
      position="relative"
      h={{ base: "85vh", md: "85vh" }}
      overflow="visible"
    >
      {/* Background Image with Overlay */}
      <Box position="absolute" inset={0}>
        <Image
          w="100%"
          h="100%"
          objectFit="cover"
          src={bg}
          alt="Hero background"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, rgba(0,0,0,0.7), rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3))"
        />
      </Box>

      {/* Content */}
      <Container maxW="container.xl" h="100%" position="relative">
        <Flex
          position="relative"
          flexDir="column"
          justify="center"
          alignItems={{ base: "center", md: "flex-start" }}
          h="100%"
          gap={6}
          px={{ base: 4, md: 8 }}
        >
          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            size={{ base: "xl", md: "2xl", lg: "3xl" }}
            color="white"
            textAlign={{ base: "center", md: "left" }}
            maxW="800px"
            lineHeight="1.2"
          >
            Creating Solutions for a
            <Box as="span" color="brand.400">
              {" "}
              Sustainable{" "}
            </Box>
            Future
          </MotionHeading>

          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            size={{ base: "md", md: "lg", lg: "xl" }}
            color="gray.200"
            fontWeight={400}
            textAlign={{ base: "center", md: "left" }}
            maxW="700px"
          >
            25 Years of Continued Excellence in Engineering Innovation
          </MotionHeading>

          <Link to="/Projects">
          <MotionButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            size={{ base: "lg", md: "lg" }}
            px={8}
            variant="outline"
            color="white"
            borderColor="white"
            _hover={{
              transform: "translateY(-2px)",
              bg: "whiteAlpha.200",
              boxShadow: "xl",
            }}
            rightIcon={<ArrowRight />}
            w={{ base: "100%", sm: "auto" }}
          >
            Explore Our Projects
          </MotionButton>
          </Link>
        </Flex>

        {/* Scroll Indicator */}
        <MotionBox
          position="absolute"
          bottom="12vh"
          left="50%"
          transform="translateX(-50%)"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: [0.3, 1, 0.3],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          color="white"
        >
          <Box w="1px" h="40px" bg="white" opacity={0.5} mb={2} />
        </MotionBox>
      </Container>

      {/* Curved transition to next section */}
      <Box
        position="absolute"
        bottom="-2px"
        left={0}
        right={0}
        height="8vh"
        bgGradient={`linear(to-b, transparent 0%, ${bgOverlayColor} 50%)`}
        style={{
          clipPath: "ellipse(100% 60% at 50% 100%)",
        }}
        zIndex={1}
      />
    </Box>
  );
}
