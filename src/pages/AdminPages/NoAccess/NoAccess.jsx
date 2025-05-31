import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Card,
  CardBody,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function NoAccess() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      pt={{ base: 20, md: 24 }}
      pb={8}
      px={{ base: 4, md: 8 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        bg={cardBg}
        shadow="xl"
        borderRadius="2xl"
        overflow="hidden"
        maxW="md"
        w="full"
      >
        <CardBody p={12} textAlign="center">
          <VStack spacing={6}>
            {/* Icon */}
            <Flex
              align="center"
              justify="center"
              w={20}
              h={20}
              bg="red.100"
              borderRadius="full"
              mb={2}
            >
              <Icon as={ShieldX} w={10} h={10} color="red.500" />
            </Flex>

            {/* Title */}
            <Heading
              size="lg"
              color={useColorModeValue("gray.800", "white")}
              fontWeight="700"
            >
              Access Denied
            </Heading>

            {/* Description */}
            <VStack spacing={3}>
              <Text color={textColor} fontSize="md" lineHeight="tall">
                You don't have the required permissions to access this page.
              </Text>
              <Text color={textColor} fontSize="sm">
                Only administrators can view and manage user approval requests.
              </Text>
            </VStack>

            {/* Actions */}
            <VStack spacing={3} w="full" pt={4}>
              <Button
                as={RouterLink}
                to="/l4m3r-secure-dashboard-panel/content-management"
                size="lg"
                bgGradient="linear(to-r, brand.400, brand.600)"
                color="white"
                borderRadius="xl"
                fontWeight="600"
                leftIcon={<Icon as={Home} w={5} h={5} />}
                _hover={{
                  bgGradient: "linear(to-r, brand.500, brand.700)",
                  transform: "translateY(-2px)",
                  shadow: "xl",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.2s"
                w="full"
              >
                Go to Projects
              </Button>

              <Button
                as={RouterLink}
                to="/l4m3r-secure-dashboard-panel/content-management"
                variant="ghost"
                size="md"
                leftIcon={<Icon as={ArrowLeft} w={4} h={4} />}
                color={textColor}
                fontWeight="500"
                _hover={{
                  color: useColorModeValue("gray.800", "white"),
                  bg: useColorModeValue("gray.100", "gray.700"),
                }}
              >
                Go Back
              </Button>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
