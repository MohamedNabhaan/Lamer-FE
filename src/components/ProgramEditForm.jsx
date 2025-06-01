import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormErrorMessage,
  Text,
  Select,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
  useActionData,
} from "react-router-dom";
import { getApiUrlWithId } from "../config/api.js";

export default function ProgramEditForm() {
  const program = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();
  const redirectTo =
    location.state?.from || "/l4m3r-secure-dashboard-panel/academic-programs";
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [durationValue, setDurationValue] = useState("");
  const [durationUnit, setDurationUnit] = useState("months");

  // Parse existing duration on component mount
  useEffect(() => {
    if (program.duration) {
      // Parse duration like "3 months" or "1 year"
      const parts = program.duration.trim().split(" ");
      if (parts.length >= 2) {
        const value = parts[0];
        const unit = parts[1].toLowerCase();

        setDurationValue(value);

        // Handle both singular and plural forms
        if (unit.startsWith("year")) {
          setDurationUnit("years");
        } else if (unit.startsWith("month")) {
          setDurationUnit("months");
        }
      }
    }
  }, [program.duration]);

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
              // Parse messages like "title must be longer than or equal to 1 characters"
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
          title: "Error updating program",
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

  const handleCancel = () => {
    navigate(redirectTo);
  };

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    // Clear previous field errors
    setFieldErrors({});

    // Create a new FormData object for submission
    const formData = new FormData();

    // Add form fields
    formData.append("title", e.target.title.value);
    formData.append("desc", e.target.desc.value);

    // Combine duration value and unit
    const combinedDuration =
      durationValue && durationValue.trim() !== ""
        ? `${durationValue} ${durationUnit}`
        : "";

    formData.append("duration", combinedDuration);
    formData.append("redirect", e.target.redirect.value);

    // Submit the form using the react-router-dom's submit function
    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
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
          Edit Program
        </Heading>

        {/* General Error Message Display - only show if no specific field errors */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error updating program!</AlertTitle>
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
            isInvalid={!!fieldErrors.title}
            mb={{ base: 3, md: 4 }}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Program Title
            </FormLabel>
            <Input
              type="text"
              defaultValue={program.title}
              name="title"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              onChange={() => clearFieldError("title")}
            />
            <FormErrorMessage>{fieldErrors.title}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!fieldErrors.desc}
            mb={{ base: 3, md: 4 }}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Description
            </FormLabel>
            <Textarea
              defaultValue={program.desc}
              name="desc"
              rows={6}
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              resize="vertical"
              onChange={() => clearFieldError("desc")}
            />
            <FormErrorMessage>{fieldErrors.desc}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!fieldErrors.duration}
            mb={{ base: 3, md: 4 }}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Duration</FormLabel>
            <HStack spacing={2}>
              <NumberInput
                value={durationValue}
                onChange={(value) => {
                  setDurationValue(value);
                  clearFieldError("duration");
                }}
                min={0}
                max={100}
                size="lg"
                flex="1"
              >
                <NumberInputField
                  placeholder="Enter duration"
                  fontSize={{ base: "md", md: "md" }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Select
                value={durationUnit}
                onChange={(e) => {
                  setDurationUnit(e.target.value);
                  clearFieldError("duration");
                }}
                size="lg"
                width="130px"
                fontSize={{ base: "md", md: "md" }}
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </Select>
            </HStack>
            <FormErrorMessage>{fieldErrors.duration}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <Input type="hidden" defaultValue={redirectTo} name="redirect" />
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
              loadingText="Saving..."
              isDisabled={isSubmitting}
            >
              Save Changes
            </Button>
            <Button
              onClick={handleCancel}
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

export async function programLoader({ params }) {
  const response = await fetch(getApiUrlWithId("programs", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load program");
  }

  const program = await response.json();
  return program;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  try {
    console.log("Updating program...");
    console.log("Form data:", formData);

    const response = await fetch(getApiUrlWithId("programs", params.id), {
      method: "PATCH",
      body: JSON.stringify({
        title: formData.title,
        desc: formData.desc,
        duration: formData.duration || undefined,
      }),
      headers: {
        "Content-Type": "application/json",
      },
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
        message:
          "Program not found or endpoint unavailable. Please contact support.",
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
        message: `Failed to update program: ${response.statusText}`,
        details: errorData,
      };
    }

    const responseData = await response.json();
    console.log("Program updated successfully:", responseData);

    const redirect_path =
      formData.redirect || "/l4m3r-secure-dashboard-panel/academic-programs";
    return redirect(redirect_path);
  } catch (error) {
    console.error("Exception during program update:", error);
    return {
      error: true,
      message: "Network error or unexpected issue occurred. Please try again.",
      details: error.message,
    };
  }
}
