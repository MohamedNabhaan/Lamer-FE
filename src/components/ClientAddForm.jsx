import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Container,
  Image,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  Form,
  redirect,
  useSubmit,
  json,
  useNavigate,
  useActionData,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ArchiveRestore, X, Upload } from "lucide-react";
import { API_ENDPOINTS } from "../config/api.js";

export default function ClientAddForm() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const toast = useToast();
  const actionData = useActionData();
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoError, setLogoError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Maximum file size: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  // Reset submitting state when action data changes
  useEffect(() => {
    if (actionData) {
      setIsSubmitting(false);

      // Parse field-specific errors from the action data
      if (actionData && actionData.error && actionData.details) {
        const errors = {};

        // Handle different error response formats
        if (actionData.details.message) {
          // If there's a validation message array
          if (Array.isArray(actionData.details.message)) {
            actionData.details.message.forEach((msg) => {
              // Parse messages like "clientName must be longer than or equal to 1 characters"
              const fieldMatch = msg.match(/^(\w+)\s/);
              if (fieldMatch) {
                const fieldName = fieldMatch[1];
                errors[fieldName] = msg;
              }
            });
          }
          // If there's a single validation message
          else if (typeof actionData.details.message === "string") {
            const fieldMatch = actionData.details.message.match(/^(\w+)\s/);
            if (fieldMatch) {
              const fieldName = fieldMatch[1];
              errors[fieldName] = actionData.details.message;
            }
          }
        }

        // Handle direct field error mapping
        if (actionData.details.errors) {
          Object.assign(errors, actionData.details.errors);
        }

        // Handle specific field validations
        if (actionData.details.statusCode === 400) {
          // Common field validation patterns
          Object.keys(actionData.details).forEach((key) => {
            if (key !== "statusCode" && key !== "message" && key !== "error") {
              errors[key] = actionData.details[key];
            }
          });
        }

        setFieldErrors(errors);
      } else {
        setFieldErrors({});
      }
    }
  }, [actionData]);

  // Show toast for action errors
  useEffect(() => {
    if (actionData && actionData.error) {
      // Only show general toast if no specific field errors
      if (Object.keys(fieldErrors).length === 0) {
        toast({
          title: "Error creating client",
          description: actionData.message || "An unexpected error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Validation Error",
          description: "Please check the highlighted fields below",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }, [actionData, fieldErrors, toast]);

  // Clear field errors when user starts typing
  const clearFieldError = (fieldName) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateImageFile = (file) => {
    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "Only JPEG and PNG images are allowed";
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }

    return null;
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Validate logo file is required
    if (!logoFile) {
      setLogoError("Logo image is required");
      toast({
        title: "File Required",
        description: "Please upload a logo image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    // Clear previous field errors
    setFieldErrors({});
    const formData = new FormData();

    // Get form field value
    formData.append(e.target.clientName.name, e.target.clientName.value);

    // Add the logo file
    formData.append("file", logoFile);

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate the file
      const validationError = validateImageFile(file);
      if (validationError) {
        setLogoError(validationError);
        toast({
          title: "Invalid File",
          description: validationError,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      setLogoFile(file);
      setLogoError(""); // Clear any previous errors

      // Create preview URL for image
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);

      toast({
        title: "Logo Selected",
        description: "Logo image ready for upload",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  function removeLogo() {
    setLogoFile(null);
    setLogoPreview("");
    setLogoError("");
  }

  return (
    <Container
      maxW="container.xl"
      px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 6, md: 8 }}
    >
      <Box
        w="full"
        maxW={{ base: "100%", md: "90%", lg: "80%" }}
        mx="auto"
        py={{ base: 4, md: 6 }}
        px={{ base: 4, md: 8, lg: 12 }}
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Heading
          size={{ base: "xl", md: "2xl" }}
          color="brand.400"
          mb={{ base: 4, md: 6 }}
          textAlign={{ base: "center", md: "left" }}
        >
          Add New Client
        </Heading>

        {/* General Error Message Display - only show if no specific field errors */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error creating client!</AlertTitle>
                <AlertDescription>
                  {actionData.message ||
                    "An unexpected error occurred. Please try again."}
                </AlertDescription>
              </Box>
            </Alert>
          )}

        {/* Field-specific Error Message Display with API Response */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length > 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Validation Error!</AlertTitle>
                <AlertDescription>
                  <Text mb={2}>Please check the highlighted fields below.</Text>
                  {actionData.message && (
                    <Box
                      mt={2}
                      p={3}
                      bg="red.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="red.200"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="red.700"
                        mb={1}
                      >
                        Server Response:
                      </Text>
                      <Text fontSize="sm" color="red.600">
                        {typeof actionData.message === "string"
                          ? actionData.message
                          : JSON.stringify(actionData.message, null, 2)}
                      </Text>
                    </Box>
                  )}
                  {actionData.details && actionData.details.message && (
                    <Box
                      mt={2}
                      p={3}
                      bg="red.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="red.200"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="red.700"
                        mb={1}
                      >
                        Details:
                      </Text>
                      <Text fontSize="sm" color="red.600">
                        {Array.isArray(actionData.details.message)
                          ? actionData.details.message.join(", ")
                          : typeof actionData.details.message === "string"
                          ? actionData.details.message
                          : JSON.stringify(actionData.details.message, null, 2)}
                      </Text>
                    </Box>
                  )}
                </AlertDescription>
              </Box>
            </Alert>
          )}

        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <FormControl
            isRequired
            isInvalid={!!fieldErrors.clientName}
            mb={{ base: 3, md: 4 }}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Client Name
            </FormLabel>
            <Input
              type="text"
              name="clientName"
              placeholder="e.g. Acme Corporation"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              onChange={() => clearFieldError("clientName")}
            />
            <FormErrorMessage>{fieldErrors.clientName}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            mb={{ base: 3, md: 4 }}
            isInvalid={!!logoError}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Client Logo
            </FormLabel>

            {logoPreview && (
              <Box
                mb={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
              >
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  maxH="150px"
                  mx="auto"
                  objectFit="contain"
                />
                <Flex justify="center" mt={2}>
                  <Button
                    onClick={removeLogo}
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<X size={16} />}
                  >
                    Remove Logo
                  </Button>
                </Flex>
              </Box>
            )}

            {!logoPreview && (
              <Box
                border="solid 1px"
                padding={4}
                borderRadius={8}
                borderColor={logoError ? "red.300" : "gray.300"}
                bg="gray.50"
                transition="all 0.2s"
                _hover={{
                  borderColor: logoError ? "red.400" : "brand.400",
                  bg: "brand.50",
                }}
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="logoUpload"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Flex
                  justify="center"
                  flexDirection="column"
                  alignItems="center"
                  py={3}
                  cursor="pointer"
                  onClick={() => document.getElementById("logoUpload").click()}
                >
                  <Upload size={24} />
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="medium"
                    mb={2}
                    textAlign="center"
                  >
                    Upload Client Logo
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Click to select image or drag and drop
                  </Text>
                  <Text
                    fontSize="xs"
                    color="gray.400"
                    mt={1}
                    textAlign="center"
                  >
                    JPEG, PNG only • Max 5MB
                  </Text>
                </Flex>
              </Box>
            )}

            {logoError && (
              <Text fontSize="sm" color="red.500" mt={2}>
                {logoError}
              </Text>
            )}
          </FormControl>

          <Flex
            mt={{ base: 6, md: 8 }}
            gap={4}
            flexDir={{ base: "column", sm: "row" }}
            justifyContent={{ base: "center", sm: "flex-start" }}
            width="100%"
          >
            <Button
              type="submit"
              bg="brand.400"
              color="white"
              size="lg"
              width={{ base: "100%", sm: "auto" }}
              _hover={{ bg: "brand.500" }}
              isLoading={isSubmitting}
              loadingText="Creating..."
              isDisabled={isSubmitting || !!logoError}
            >
              Create Client
            </Button>
            <Button
              onClick={() =>
                navigate("/l4m3r-secure-dashboard-panel/client-registry")
              }
              size="lg"
              width={{ base: "100%", sm: "auto" }}
              variant="outline"
              isDisabled={isSubmitting}
            >
              Cancel
            </Button>
          </Flex>
        </Form>
      </Box>
    </Container>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  try {
    console.log("Creating new client...");
    console.log(
      "Form fields:",
      [...formData.entries()].map((entry) => `${entry[0]}: ${entry[1]}`)
    );

    const response = await fetch(API_ENDPOINTS.CLIENTS_CREATE, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    console.log("Response status:", response.status);

    // Handle specific error status codes
    if (response.status === 400) {
      const errorData = await response.json();
      console.error("Validation Error:", errorData);
      return {
        error: true,
        message: "Validation failed. Please check your input.",
        details: errorData,
      };
    }

    if (response.status === 404) {
      return {
        error: true,
        message: "Client endpoint not found. Please contact support.",
      };
    }

    if (response.status === 500) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Server Error:", errorData);
      return {
        error: true,
        message: "Server error occurred. Please try again later.",
        details: errorData,
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Unexpected API error:", response.statusText, errorData);
      return {
        error: true,
        message: `Failed to create client: ${response.statusText}`,
        details: errorData,
      };
    }

    const responseData = await response.json();
    console.log("Client created successfully:", responseData);

    return redirect("/l4m3r-secure-dashboard-panel/client-registry");
  } catch (error) {
    console.error("Exception during client creation:", error);
    return {
      error: true,
      message: "Network error or unexpected issue occurred. Please try again.",
      details: error.message,
    };
  }
}
