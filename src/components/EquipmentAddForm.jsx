import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  Container,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  Form,
  redirect,
  useNavigate,
  useSubmit,
  useActionData,
} from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";

export default function EquipmentAddForm() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const toast = useToast();
  const actionData = useActionData();
  const [errors, setErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
              // Parse messages like "equipmentName must be longer than or equal to 1 characters"
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
          title: "Error creating equipment",
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

  function validateForm(formData) {
    const newErrors = {};

    if (!formData.equipmentName) {
      newErrors.equipmentName = "Equipment name is required";
    }

    if (!formData.quantity || isNaN(parseInt(formData.quantity))) {
      newErrors.quantity = "Quantity is required and must be a number";
    } else if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (formData.charge && isNaN(parseFloat(formData.charge))) {
      newErrors.charge = "Charge must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData);

    if (!validateForm(formObject)) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    // Clear previous field errors
    setFieldErrors({});

    submit(formData, { method: "post" });
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
          Add Equipment
        </Heading>

        {/* General Error Message Display - only show if no specific field errors */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error creating equipment!</AlertTitle>
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

        <Form method="post" onSubmit={handleSubmit}>
          <FormControl
            isRequired
            mb={4}
            isInvalid={!!errors.equipmentName || !!fieldErrors.equipmentName}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Equipment Name
            </FormLabel>
            <Input
              name="equipmentName"
              placeholder="e.g. Drone"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              onChange={() => {
                clearFieldError("equipmentName");
                setErrors((prev) => ({ ...prev, equipmentName: "" }));
              }}
            />
            <FormErrorMessage>
              {errors.equipmentName || fieldErrors.equipmentName}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!fieldErrors.brand}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Brand</FormLabel>
            <Input
              name="brand"
              placeholder="e.g. DJI"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              onChange={() => clearFieldError("brand")}
            />
            <FormErrorMessage>{fieldErrors.brand}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!fieldErrors.modelNo}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Model Number
            </FormLabel>
            <Input
              name="modelNo"
              placeholder="e.g. Phantom 4 Pro"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              onChange={() => clearFieldError("modelNo")}
            />
            <FormErrorMessage>{fieldErrors.modelNo}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            mb={4}
            isInvalid={!!errors.quantity || !!fieldErrors.quantity}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Quantity</FormLabel>
            <NumberInput min={1} defaultValue={1} size="lg">
              <NumberInputField
                name="quantity"
                placeholder="Enter quantity"
                fontSize={{ base: "md", md: "md" }}
                onChange={() => {
                  clearFieldError("quantity");
                  setErrors((prev) => ({ ...prev, quantity: "" }));
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>
              {errors.quantity || fieldErrors.quantity}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            mb={4}
            isInvalid={!!errors.charge || !!fieldErrors.charge}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Charge (USD)
            </FormLabel>
            <NumberInput min={0} precision={2} size="lg">
              <NumberInputField
                name="charge"
                placeholder="Enter charge amount"
                fontSize={{ base: "md", md: "md" }}
                onChange={() => {
                  clearFieldError("charge");
                  setErrors((prev) => ({ ...prev, charge: "" }));
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>
              {errors.charge || fieldErrors.charge}
            </FormErrorMessage>
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
              isDisabled={isSubmitting}
            >
              Create Equipment
            </Button>
            <Button
              onClick={() =>
                navigate("/l4m3r-secure-dashboard-panel/laboratory-assets")
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
  const formObject = Object.fromEntries(formData);

  try {
    console.log("Creating new equipment...");
    console.log("Form data:", formObject);

    const response = await fetch(API_ENDPOINTS.EQUIPMENT_CREATE, {
      method: "POST",
      body: JSON.stringify({
        equipmentName: formObject.equipmentName,
        brand: formObject.brand || undefined,
        modelNo: formObject.modelNo || undefined,
        quantity: formObject.quantity
          ? parseInt(formObject.quantity, 10)
          : undefined,
        charge: formObject.charge ? parseFloat(formObject.charge) : undefined,
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
        message: "Equipment endpoint not found. Please contact support.",
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
        message: `Failed to create equipment: ${response.statusText}`,
        details: errorData,
      };
    }

    const responseData = await response.json();
    console.log("Equipment created successfully:", responseData);

    return redirect("/l4m3r-secure-dashboard-panel/laboratory-assets");
  } catch (error) {
    console.error("Exception during equipment creation:", error);
    return {
      error: true,
      message: "Network error or unexpected issue occurred. Please try again.",
      details: error.message,
    };
  }
}
