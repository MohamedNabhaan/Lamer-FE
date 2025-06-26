import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Container,
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
import { ArchiveRestore, X } from "lucide-react";
import { API_ENDPOINTS } from "../config/api.js";

export default function VacancyAddForm() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const toast = useToast();
  const actionData = useActionData();
  const [pdfFile, setPdfFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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
              // Parse messages like "positionName must be longer than or equal to 1 characters"
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
          title: "Error creating vacancy",
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

  function handleSubmit(e) {
    e.preventDefault();

    // Validate PDF file is required
    if (!pdfFile) {
      setPdfError("PDF file is required");
      toast({
        title: "File Required",
        description: "Please upload a PDF file",
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

    // Get each form field value
    formData.append(e.target.positionName.name, e.target.positionName.value);
    formData.append(e.target.desc.name, e.target.desc.value);
    formData.append(
      e.target.positionStatus.name,
      e.target.positionStatus.value
    );
    formData.append(e.target.experience.name, e.target.experience.value);

    // Add the PDF file
    formData.append("file", pdfFile, pdfFile.name);

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (file.type !== "application/pdf") {
        setPdfError("Only PDF files are allowed");
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setPdfFile(file);
      setPdfError(""); // Clear any previous errors
      toast({
        title: "File Selected",
        description: "PDF file ready for upload",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  function removePdf() {
    setPdfFile(null);
    setPdfError("");
  }

  return (
    <Container
      maxW="container.xl"
      px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 6, md: 8 }}
      pt={{ base: "80px", md: "100px" }}
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
          Create a Vacancy
        </Heading>

        {/* General Error Message Display - only show if no specific field errors */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error creating vacancy!</AlertTitle>
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
            isInvalid={!!fieldErrors.positionName}
            mb={{ base: 3, md: 4 }}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Position Name
            </FormLabel>
            <Input
              type="text"
              name="positionName"
              placeholder="e.g. Senior Software Engineer"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              onChange={() => clearFieldError("positionName")}
            />
            <FormErrorMessage>{fieldErrors.positionName}</FormErrorMessage>
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
              name="desc"
              placeholder="Detailed job description..."
              rows={6}
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              resize="vertical"
              onChange={() => clearFieldError("desc")}
            />
            <FormErrorMessage>{fieldErrors.desc}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!fieldErrors.positionStatus}
            mb={{ base: 3, md: 4 }}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Position Type
            </FormLabel>
            <Select
              name="positionStatus"
              placeholder="Select status"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              onChange={() => clearFieldError("positionStatus")}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Select>
            <FormErrorMessage>{fieldErrors.positionStatus}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!fieldErrors.experience}
            mb={{ base: 3, md: 4 }}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Experience (Years)
            </FormLabel>
            <NumberInput min={0} max={20} defaultValue={2} size="lg">
              <NumberInputField
                name="experience"
                fontSize={{ base: "md", md: "md" }}
                onChange={() => clearFieldError("experience")}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{fieldErrors.experience}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!pdfError}
            mb={{ base: 3, md: 4 }}
          >
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Job Description PDF
            </FormLabel>
            <Box
              border="solid 1px"
              padding={4}
              borderRadius={8}
              borderColor={pdfError ? "red.300" : "design.100"}
            >
              <input
                type="file"
                accept=".pdf"
                id="pdfUpload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Flex
                justify="center"
                flexDirection="column"
                alignItems="center"
                py={3}
              >
                <ArchiveRestore size={24} />
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="medium"
                  mb={2}
                >
                  Upload PDF File
                </Text>
                <Button
                  as="label"
                  htmlFor="pdfUpload"
                  variant="outline"
                  cursor="pointer"
                  size="sm"
                >
                  Choose File
                </Button>
              </Flex>

              {pdfFile && (
                <Box
                  mt={3}
                  p={3}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="gray.50"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontSize="sm" isTruncated>
                      {pdfFile.name}
                    </Text>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={removePdf}
                    >
                      <X size={14} />
                    </Button>
                  </Flex>
                </Box>
              )}

              {pdfError && (
                <Text fontSize="sm" color="red.500" mt={2}>
                  {pdfError}
                </Text>
              )}
            </Box>
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
              isDisabled={isSubmitting || !!pdfError}
            >
              Create Vacancy
            </Button>
            <Button
              onClick={() =>
                navigate("/l4m3r-secure-dashboard-panel/position-listings")
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
    console.log("Creating new vacancy...");
    console.log(
      "Form fields:",
      [...formData.entries()].map((entry) => `${entry[0]}: ${entry[1]}`)
    );

    const response = await fetch(API_ENDPOINTS.VACANCIES_CREATE, {
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
        message: "Vacancy endpoint not found. Please contact support.",
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
        message: `Failed to create vacancy: ${response.statusText}`,
        details: errorData,
      };
    }

    const responseData = await response.json();
    console.log("Vacancy created successfully:", responseData);

    return redirect("/l4m3r-secure-dashboard-panel/position-listings");
  } catch (error) {
    console.error("Exception during vacancy creation:", error);
    return {
      error: true,
      message: "Network error or unexpected issue occurred. Please try again.",
      details: error.message,
    };
  }
}
