import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Center,
  Text,
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  Link,
  Flex,
  VStack,
  Image,
  Heading,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
  Link as RouterLink,
} from "react-router-dom";
import logo from "../assets/logo.png";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export default function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";
  const justCreated = searchParams.get("created") === "true";

  const isLoginIn = navigation.state === "submitting";

  // Color scheme
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const inputFocusBg = useColorModeValue("white", "gray.600");

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Form method="post">
        <Box
          bg={cardBg}
          p={{ base: 8, md: 12 }}
          borderRadius="3xl"
          shadow="2xl"
          border="1px solid"
          borderColor={cardBorder}
          w="100%"
          maxW={{ base: "full", sm: "md" }}
          mx="auto"
          backdropFilter="blur(10px)"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative gradient overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            h="4px"
            bgGradient="linear(to-r, brand.400, blue.400, purple.400)"
            borderTopRadius="3xl"
          />

          <MotionVStack
            spacing={8}
            align="stretch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo and Header */}
            <VStack spacing={4} textAlign="center">
              <MotionBox
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              >
                <Image
                  src={logo}
                  alt="Logo"
                  maxW={{ base: "120px", md: "140px" }}
                  h="auto"
                  objectFit="contain"
                  mx="auto"
                />
              </MotionBox>

              <VStack spacing={2}>
                <Heading
                  size={{ base: "lg", md: "xl" }}
                  color={useColorModeValue("gray.800", "white")}
                  fontWeight="700"
                >
                  Welcome Back
                </Heading>
                <Text
                  color={textColor}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="500"
                >
                  Sign in to your admin dashboard
                </Text>
              </VStack>
            </VStack>

            {/* Success Messages */}
            {(justRegistered || justCreated) && (
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  status="success"
                  borderRadius="xl"
                  bg={useColorModeValue("green.50", "green.900")}
                  border="1px solid"
                  borderColor={useColorModeValue("green.200", "green.700")}
                >
                  <AlertIcon />
                  <AlertDescription fontSize="sm">
                    {justCreated
                      ? "User has been created. You will have access to the system after you have been approved."
                      : "Account created successfully! Please sign in with your new credentials."}
                  </AlertDescription>
                </Alert>
              </MotionBox>
            )}

            {/* Error Messages */}
            {data && (data.errors || data.message) && (
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  status="error"
                  borderRadius="xl"
                  bg={useColorModeValue("red.50", "red.900")}
                  border="1px solid"
                  borderColor={useColorModeValue("red.200", "red.700")}
                >
                  <AlertIcon />
                  <AlertDescription fontSize="sm">
                    {data.message ||
                      (data.errors &&
                        Object.values(data.errors).map((err, index) => (
                          <Text key={index}>{err}</Text>
                        )))}
                  </AlertDescription>
                </Alert>
              </MotionBox>
            )}

            {/* Form Fields */}
            <VStack spacing={5}>
              <FormControl>
                <InputGroup size="lg">
                  <InputLeftElement>
                    <Icon as={Mail} color={textColor} w={5} h={5} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    required
                    bg={inputBg}
                    border="2px solid transparent"
                    borderRadius="xl"
                    fontSize={{ base: "md", md: "lg" }}
                    h="56px"
                    _hover={{
                      bg: inputFocusBg,
                      borderColor: useColorModeValue("brand.200", "brand.600"),
                    }}
                    _focus={{
                      bg: inputFocusBg,
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                    }}
                    transition="all 0.2s"
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup size="lg">
                  <InputLeftElement>
                    <Icon as={Lock} color={textColor} w={5} h={5} />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    required
                    bg={inputBg}
                    border="2px solid transparent"
                    borderRadius="xl"
                    fontSize={{ base: "md", md: "lg" }}
                    h="56px"
                    _hover={{
                      bg: inputFocusBg,
                      borderColor: useColorModeValue("brand.200", "brand.600"),
                    }}
                    _focus={{
                      bg: inputFocusBg,
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                    }}
                    transition="all 0.2s"
                  />
                </InputGroup>
              </FormControl>
            </VStack>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoginIn}
              loadingText="Signing in..."
              size="lg"
              h="56px"
              bgGradient="linear(to-r, brand.400, brand.600)"
              color="white"
              borderRadius="xl"
              fontWeight="600"
              fontSize={{ base: "md", md: "lg" }}
              _hover={{
                bgGradient: "linear(to-r, brand.500, brand.700)",
                transform: "translateY(-2px)",
                shadow: "xl",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
              isDisabled={isLoginIn}
            >
              {isLoginIn ? "Signing in..." : "Sign In"}
            </Button>

            {/* Footer */}
            <Box pt={4}>
              <Flex align="center" justify="center">
                <Box h="1px" bg={cardBorder} flex="1" />
                <Text px={4} fontSize="sm" color={textColor} fontWeight="500">
                  Don't have an account?
                </Text>
                <Box h="1px" bg={cardBorder} flex="1" />
              </Flex>
              <Text textAlign="center" mt={3}>
                <Link
                  as={RouterLink}
                  to="/l4m3r-management-portal-signup"
                  color="brand.400"
                  fontWeight="600"
                  _hover={{ color: "brand.600" }}
                >
                  Sign up here
                </Link>
              </Text>
            </Box>
          </MotionVStack>
        </Box>
      </Form>
    </MotionBox>
  );
}
