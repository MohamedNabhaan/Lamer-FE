import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");

  return (
    <Box minH="100vh" bg={bgColor} display="flex" alignItems="center">
      <Container maxW="container.md" textAlign="center">
        <VStack spacing={8}>
          {/* Large 404 Text */}
          <Box>
            <Text
              fontSize={{ base: "6xl", md: "8xl", lg: "9xl" }}
              fontWeight="bold"
              color={accentColor}
              lineHeight="1"
              textShadow="2px 2px 4px rgba(0,0,0,0.1)"
            >
              404
            </Text>
          </Box>

          {/* Error Message */}
          <VStack spacing={4}>
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              color={accentColor}
              fontWeight={600}
            >
              Page Not Found
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="500px"
              lineHeight="tall"
            >
              Sorry, the page you are looking for doesn't exist or has been
              moved. Please check the URL or navigate back to our homepage.
            </Text>
          </VStack>

          {/* Action Buttons */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={4}
            justify="center"
            align="center"
            w="100%"
          >
            <Button
              leftIcon={<Icon as={Home} />}
              onClick={() => navigate("/")}
              bg={accentColor}
              color="white"
              size="lg"
              px={8}
              py={6}
              fontSize="md"
              fontWeight={600}
              borderRadius="full"
              _hover={{
                bg: `${accentColor}.600`,
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
              w={{ base: "full", sm: "auto" }}
            >
              Go to Homepage
            </Button>

            <Button
              leftIcon={<Icon as={ArrowLeft} />}
              onClick={() => navigate(-1)}
              variant="outline"
              borderColor={accentColor}
              color={accentColor}
              size="lg"
              px={8}
              py={6}
              fontSize="md"
              fontWeight={600}
              borderRadius="full"
              _hover={{
                bg: accentColor,
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
              w={{ base: "full", sm: "auto" }}
            >
              Go Back
            </Button>
          </Flex>

          {/* Additional Help Text */}
          <Box mt={8}>
            <Text fontSize="sm" color={textColor} opacity={0.8}>
              If you believe this is an error, please contact our support team.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
