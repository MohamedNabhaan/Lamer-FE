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
  Container,
  Grid,
  GridItem,
  Image,
  Stack,
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
import { SERVICE_CATEGORIES } from "..";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import { getApiUrl, API_ENDPOINTS } from "../config/api.js";

export default function AddForm() {
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageErrors, setImageErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const submit = useSubmit();
  const navigate = useNavigate();
  const toast = useToast();
  const actionData = useActionData();

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
          title: "Error creating project",
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
    const errors = [];

    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      errors.push(`${file.name}: Only JPEG and PNG images are allowed`);
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`${file.name}: File size must be less than 5MB`);
    }

    return errors;
  };

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      let newErrors = [];

      // Handle rejected files
      rejectedFiles.forEach(({ file, errors: dropzoneErrors }) => {
        dropzoneErrors.forEach((error) => {
          if (error.code === "file-too-large") {
            newErrors.push(`${file.name}: File size must be less than 5MB`);
          } else if (error.code === "file-invalid-type") {
            newErrors.push(
              `${file.name}: Only JPEG and PNG images are allowed`
            );
          } else if (error.code === "too-many-files") {
            newErrors.push("Maximum 5 images allowed");
          }
        });
      });

      // Validate accepted files
      const validFiles = [];
      acceptedFiles.forEach((file) => {
        const fileErrors = validateImageFile(file);
        if (fileErrors.length > 0) {
          newErrors = [...newErrors, ...fileErrors];
        } else {
          validFiles.push(file);
        }
      });

      // Check total file limit including existing files
      const totalFiles = files.length + validFiles.length;
      if (totalFiles > 5) {
        const allowedNew = 5 - files.length;
        newErrors.push(
          `Can only add ${allowedNew} more image${
            allowedNew !== 1 ? "s" : ""
          }. Maximum 5 images total.`
        );
        validFiles.splice(allowedNew);
      }

      // Update state
      if (newErrors.length > 0) {
        setImageErrors(newErrors);
        toast({
          title: "Image Upload Errors",
          description: newErrors[0],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        setImageErrors([]);
      }

      if (validFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        toast({
          title: "Images selected",
          description: `${validFiles.length} image${
            validFiles.length !== 1 ? "s" : ""
          } added successfully`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    [files.length, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 5,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  function removeFile(index) {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    // Clear image errors when files are removed
    setImageErrors([]);
  }

  // Function to handle category change
  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    clearFieldError("projectCategory");

    // Fetch services for the selected category
    fetch(getApiUrl("services", { serviceCategory: category }), {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setAvailableServices(data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setAvailableServices([]);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    // Clear previous field errors
    setFieldErrors({});

    const formData = new FormData();

    // Add form field values
    formData.append("projectCode", e.target.projectCode.value);
    formData.append("title", e.target.title.value);
    formData.append("clientName", e.target.clientName.value);
    formData.append("projectDate", e.target.projectDate.value);
    formData.append("projectCategory", e.target.projectCategory.value);
    formData.append("projectService", e.target.projectService.value);
    formData.append("projectStatus", e.target.projectStatus.value);
    formData.append("projectDescription", e.target.projectDescription.value);

    // Add images
    if (files.length !== 0) {
      files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }

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
          Create a Project
        </Heading>

        {/* General Error Message Display - only show if no specific field errors */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error creating project!</AlertTitle>
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
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.projectCode}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Project Code
                </FormLabel>
                <Input
                  type="text"
                  name="projectCode"
                  placeholder="e.g. PROJ001"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("projectCode")}
                />
                <FormErrorMessage>{fieldErrors.projectCode}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.title}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  placeholder="Project title"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("title")}
                />
                <FormErrorMessage>{fieldErrors.title}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
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
                  placeholder="Client name"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("clientName")}
                />
                <FormErrorMessage>{fieldErrors.clientName}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.projectDate}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Project Date
                </FormLabel>
                <Input
                  type="date"
                  name="projectDate"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("projectDate")}
                />
                <FormErrorMessage>{fieldErrors.projectDate}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.projectCategory}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Category
                </FormLabel>
                <Select
                  name="projectCategory"
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                  placeholder="Select a category"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                >
                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {fieldErrors.projectCategory}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.projectService}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Service
                </FormLabel>
                <Select
                  name="projectService"
                  isDisabled={!selectedCategory}
                  placeholder="Select a service"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("projectService")}
                >
                  {availableServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.serviceName}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {fieldErrors.projectService}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.projectStatus}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Project Status
                </FormLabel>
                <Select
                  name="projectStatus"
                  placeholder="Select status"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("projectStatus")}
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </Select>
                <FormErrorMessage>{fieldErrors.projectStatus}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.projectDescription}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Project Description
                </FormLabel>
                <Textarea
                  name="projectDescription"
                  placeholder="Describe the project..."
                  rows={4}
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  resize="vertical"
                  onChange={() => clearFieldError("projectDescription")}
                />
                <FormErrorMessage>
                  {fieldErrors.projectDescription}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            {/* Project Images Upload */}
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                mb={{ base: 3, md: 4 }}
                isInvalid={imageErrors.length > 0}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Project Images (Optional - Max 5)
                </FormLabel>
                <Box
                  {...getRootProps()}
                  border="2px dashed"
                  borderColor={
                    imageErrors.length > 0
                      ? "red.300"
                      : isDragActive
                      ? "brand.400"
                      : "gray.300"
                  }
                  borderRadius="md"
                  p={6}
                  textAlign="center"
                  cursor="pointer"
                  bg={isDragActive ? "brand.50" : "gray.50"}
                  transition="all 0.2s"
                  _hover={{ borderColor: "brand.400", bg: "brand.50" }}
                >
                  <input {...getInputProps()} />
                  <Upload size={24} />
                  <Text mt={2} fontSize="md" fontWeight="500">
                    {isDragActive
                      ? "Drop images here..."
                      : "Click to select images or drag and drop"}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    JPEG, PNG only • Max 5 images • Max 5MB per image
                  </Text>
                </Box>

                {/* Display validation errors */}
                {imageErrors.length > 0 && (
                  <Box mt={2}>
                    {imageErrors.map((error, index) => (
                      <Text
                        key={index}
                        fontSize={{ base: "xs", md: "sm" }}
                        color="red.500"
                      >
                        {error}
                      </Text>
                    ))}
                  </Box>
                )}

                {/* Display success message when no errors and files selected */}
                {imageErrors.length === 0 && files.length > 0 && (
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="green.500"
                    mt={1}
                  >
                    {files.length} image{files.length !== 1 ? "s" : ""} selected
                  </Text>
                )}

                {/* Display help text when no files and no errors */}
                {imageErrors.length === 0 && files.length === 0 && (
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="gray.500"
                    mt={1}
                  >
                    Upload project images to showcase your work (optional)
                  </Text>
                )}

                {files.length > 0 && (
                  <Grid
                    templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                    gap={4}
                    mt={4}
                  >
                    {files.map((file, index) => (
                      <Box key={index} position="relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          w="100px"
                          h="100px"
                          objectFit="cover"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                        />
                        <Button
                          position="absolute"
                          top={-2}
                          right={-2}
                          size="xs"
                          colorScheme="red"
                          borderRadius="full"
                          onClick={() => removeFile(index)}
                        >
                          <X size={12} />
                        </Button>
                        <Text
                          fontSize="xs"
                          textAlign="center"
                          mt={1}
                          isTruncated
                          maxW="100px"
                          color="gray.600"
                        >
                          {file.name}
                        </Text>
                      </Box>
                    ))}
                  </Grid>
                )}
              </FormControl>
            </GridItem>
          </Grid>

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
              Create Project
            </Button>
            <Button
              onClick={() =>
                navigate("/l4m3r-secure-dashboard-panel/content-management")
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

export async function action({ request, params }) {
  const formData = await request.formData();

  try {
    console.log("Creating new project...");
    console.log(
      "Form fields:",
      [...formData.entries()].map((entry) => `${entry[0]}: ${entry[1]}`)
    );

    const response = await fetch(API_ENDPOINTS.PROJECTS_CREATE, {
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
        message: "Project endpoint not found. Please contact support.",
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
        message: `Failed to create project: ${response.statusText}`,
        details: errorData,
      };
    }

    const responseData = await response.json();
    console.log("Project created successfully:", responseData);

    return redirect("/l4m3r-secure-dashboard-panel/content-management");
  } catch (error) {
    console.error("Exception during project creation:", error);
    return {
      error: true,
      message: "Network error or unexpected issue occurred. Please try again.",
      details: error.message,
    };
  }
}
