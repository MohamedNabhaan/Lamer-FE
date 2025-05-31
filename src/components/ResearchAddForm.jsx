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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  VStack,
  HStack,
  IconButton,
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
  useNavigate,
  useSubmit,
  useActionData,
} from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";
import { Plus, X } from "lucide-react";

export default function ResearchAddForm() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const toast = useToast();
  const actionData = useActionData();
  const [errors, setErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authors, setAuthors] = useState([""]); // Start with one empty author field
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

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
          title: "Error creating research",
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

  // Author management functions
  const addAuthor = () => {
    setAuthors([...authors, ""]);
  };

  const removeAuthor = (index) => {
    if (authors.length > 1) {
      const newAuthors = authors.filter((_, i) => i !== index);
      setAuthors(newAuthors);
    }
  };

  const updateAuthor = (index, value) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
    clearFieldError("authors");
    setErrors((prev) => ({ ...prev, authors: "" }));
  };

  function validateForm(formData) {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    if (!formData.link) {
      newErrors.link = "Link is required";
    } else if (!isValidUrl(formData.link)) {
      newErrors.link = "Please enter a valid URL";
    }

    // Validate authors - check if at least one non-empty author exists
    const nonEmptyAuthors = authors.filter((author) => author.trim() !== "");
    if (nonEmptyAuthors.length === 0) {
      newErrors.authors = "At least one author is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Combine all non-empty authors into a comma-separated string
    const authorsString = authors
      .filter((author) => author.trim() !== "")
      .join(", ");

    // Create form data manually to include the combined authors string
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("link", e.target.link.value);
    formData.append("authors", authorsString);
    formData.append("year", year.toString()); // Convert year to string

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
          Create Research Item
        </Heading>

        {/* General Error Message Display - only show if no specific field errors */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error creating research item!</AlertTitle>
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

        <Form method="post" onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl
            isRequired
            mb={4}
            isInvalid={!!errors.title || !!fieldErrors.title}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Title</FormLabel>
            <Input
              name="title"
              placeholder="Research paper title"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              onChange={() => {
                clearFieldError("title");
                setErrors((prev) => ({ ...prev, title: "" }));
              }}
            />
            <FormErrorMessage>
              {errors.title || fieldErrors.title}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            mb={4}
            isInvalid={!!errors.link || !!fieldErrors.link}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Link</FormLabel>
            <Input
              name="link"
              placeholder="https://example.com/research-paper"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              type="url"
              onChange={() => {
                clearFieldError("link");
                setErrors((prev) => ({ ...prev, link: "" }));
              }}
            />
            <FormErrorMessage>
              {errors.link || fieldErrors.link}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            mb={4}
            isInvalid={!!errors.authors || !!fieldErrors.authors}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Authors</FormLabel>
            <VStack spacing={2} align="stretch">
              {authors.map((author, index) => (
                <HStack key={index} spacing={2}>
                  <Input
                    placeholder={`Author ${index + 1} name`}
                    size="lg"
                    fontSize={{ base: "md", md: "md" }}
                    value={author}
                    onChange={(e) => updateAuthor(index, e.target.value)}
                    flex="1"
                  />
                  {authors.length > 1 && (
                    <IconButton
                      icon={<X />}
                      aria-label={`Remove author ${index + 1}`}
                      onClick={() => removeAuthor(index)}
                      size="lg"
                      colorScheme="red"
                      variant="outline"
                    />
                  )}
                </HStack>
              ))}
              <Button
                leftIcon={<Plus />}
                onClick={addAuthor}
                variant="outline"
                colorScheme="brand"
                size="sm"
                alignSelf="flex-start"
              >
                Add Author
              </Button>
            </VStack>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Add multiple authors. They will be saved as comma-separated
              values.
            </Text>
            <FormErrorMessage>
              {errors.authors || fieldErrors.authors}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!fieldErrors.year}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Year</FormLabel>
            <NumberInput
              value={year}
              onChange={(value) => {
                setYear(value);
                clearFieldError("year");
              }}
              min={1900}
              max={2100}
              size="lg"
            >
              <NumberInputField
                fontSize={{ base: "md", md: "md" }}
                placeholder="e.g. 2023"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{fieldErrors.year}</FormErrorMessage>
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
              Create Research Item
            </Button>
            <Button
              onClick={() =>
                navigate("/l4m3r-secure-dashboard-panel/research-publications")
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
    console.log("Creating new research item...");
    console.log("Form data:", formObject);

    const response = await fetch(API_ENDPOINTS.RESEARCH_CREATE, {
      method: "POST",
      body: JSON.stringify({
        title: formObject.title,
        link: formObject.link,
        authors: formObject.authors,
        year: formObject.year || undefined, // Send as string
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": null,
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
        message: "Research endpoint not found. Please contact support.",
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
        message: `Failed to create research item: ${response.statusText}`,
        details: errorData,
      };
    }

    const responseData = await response.json();
    console.log("Research item created successfully:", responseData);

    return redirect("/l4m3r-secure-dashboard-panel/research-publications");
  } catch (error) {
    console.error("Exception during research creation:", error);
    return {
      error: true,
      message: "Network error or unexpected issue occurred. Please try again.",
      details: error.message,
    };
  }
}
