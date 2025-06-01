import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  Container,
  Grid,
  GridItem,
  Image,
  useToast,
  Text,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
  json,
  useActionData,
} from "react-router-dom";
import { SERVICE_CATEGORIES } from "..";
import { getApiUrl, getApiUrlWithId } from "../config/api.js";
import { useDropzone } from "react-dropzone";
import { X, Upload, ExternalLink as ExternalLinkIcon } from "lucide-react";

export default function EditForm() {
  const { project } = useLoaderData();
  const location = useLocation();
  const redirectTo = location.state?.from;
  const navigate = useNavigate();
  const submit = useSubmit();
  const toast = useToast();
  const actionData = useActionData();

  const [selectedCategory, setSelectedCategory] = useState(
    project.projectCategory
  );
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedService, setSelectedService] = useState(
    project.projectService
  );
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageErrors, setImageErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [currentImages, setCurrentImages] = useState(
    project.images && project.images.length > 0 ? project.images : []
  );

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
          title: "Error updating project",
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

      // Check total file limit for new uploads only (since backend overwrites)
      if (files.length + validFiles.length > 5) {
        newErrors.push("Maximum 5 images allowed");
        const allowedCount = 5 - files.length;
        validFiles.splice(allowedCount);
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

  useEffect(() => {
    // Fetch services for the initial category
    if (project.projectCategory) {
      fetch(
        getApiUrl("services", { serviceCategory: project.projectCategory }),
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setAvailableServices(data);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setAvailableServices([]);
        });
    }
  }, [project.projectCategory]);

  // Function to handle category change
  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedService(""); // Reset selected service when category changes
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

  // Function to handle service change
  function handleServiceChange(e) {
    setSelectedService(e.target.value);
    clearFieldError("projectService");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    // Clear previous field errors
    setFieldErrors({});

    // Create a new FormData object for submission
    const formData = new FormData();

    // Add form fields
    formData.append("projectCode", e.target.projectCode.value);
    formData.append("title", e.target.title.value);
    formData.append("clientName", e.target.clientName.value);
    formData.append("projectDate", e.target.projectDate.value);
    formData.append("projectCategory", e.target.projectCategory.value);
    formData.append("projectService", e.target.projectService.value);
    formData.append("projectStatus", e.target.projectStatus.value);
    formData.append("projectDescription", e.target.projectDescription.value);
    formData.append("redirect", e.target.redirect.value);

    // Add new images if any
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }

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
          Edit Project
        </Heading>

        {/* General Error Message Display - only show if no specific field errors */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error updating project!</AlertTitle>
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
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={{ base: 4, md: 6 }}
          >
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
                  defaultValue={project.projectCode}
                  name="projectCode"
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
                  defaultValue={project.title}
                  name="title"
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
                  defaultValue={project.clientName}
                  name="clientName"
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
                <FormLabel fontSize={{ base: "md", md: "lg" }}>Date</FormLabel>
                <Input
                  type="date"
                  defaultValue={project.projectDate}
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
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                >
                  <option value="">Select a category</option>
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
                  value={selectedService}
                  onChange={handleServiceChange}
                  isDisabled={!selectedCategory}
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                >
                  <option value="">Select a service</option>
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
                  Status
                </FormLabel>
                <Select
                  defaultValue={project.projectStatus}
                  name="projectStatus"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("projectStatus")}
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
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
                  Description
                </FormLabel>
                <Textarea
                  defaultValue={project.projectDescription}
                  name="projectDescription"
                  rows={6}
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

            {/* Current Images Display */}
            {currentImages.length > 0 && (
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl mb={{ base: 3, md: 4 }}>
                  <FormLabel fontSize={{ base: "md", md: "lg" }}>
                    Current Project Images
                  </FormLabel>
                  <Grid
                    templateColumns="repeat(auto-fill, minmax(120px, 1fr))"
                    gap={4}
                    bg="gray.50"
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    {currentImages.map((imageUrl, index) => (
                      <Box key={index} position="relative">
                        <Image
                          src={imageUrl}
                          alt={`Project image ${index + 1}`}
                          w="120px"
                          h="120px"
                          objectFit="cover"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                        />
                        <Text
                          fontSize="xs"
                          textAlign="center"
                          mt={1}
                          color="gray.600"
                        >
                          Image {index + 1}
                        </Text>
                      </Box>
                    ))}
                  </Grid>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="blue.500"
                    mt={2}
                  >
                    {currentImages.length} current image
                    {currentImages.length !== 1 ? "s" : ""} • New uploads will
                    replace existing images
                  </Text>
                </FormControl>
              </GridItem>
            )}

            {/* New Images Upload */}
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                mb={{ base: 3, md: 4 }}
                isInvalid={imageErrors.length > 0}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Upload New Project Images (Optional - Max 5)
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
                    {files.length} new image{files.length !== 1 ? "s" : ""}{" "}
                    selected
                  </Text>
                )}

                {/* Display help text when no files and no errors */}
                {imageErrors.length === 0 && files.length === 0 && (
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="gray.500"
                    mt={1}
                  >
                    Upload new project images (will replace existing images if
                    any)
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
                          alt={`New preview ${index}`}
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
              onClick={() =>
                navigate(
                  redirectTo ||
                    "/l4m3r-secure-dashboard-panel/content-management"
                )
              }
              size="lg"
              width={{ base: "100%", sm: "auto" }}
              variant="outline"
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
  const data = await request.formData();

  console.log("Form submission received with params:", params);
  console.log(
    "Form fields:",
    [...data.entries()].map((entry) => `${entry[0]}: ${entry[1]}`)
  );

  try {
    console.log("Sending request to:", getApiUrlWithId("projects", params.id));

    // Check if new files were provided
    const hasNewFiles = data
      .getAll("files")
      .some((file) => file instanceof File && file.size > 0);

    if (hasNewFiles) {
      // For multipart form data with file upload
      const formData = new FormData();
      formData.append("projectCode", data.get("projectCode"));
      formData.append("title", data.get("title"));
      formData.append("clientName", data.get("clientName"));
      formData.append("projectDate", data.get("projectDate"));
      formData.append("projectCategory", data.get("projectCategory"));
      formData.append("projectService", data.get("projectService"));
      formData.append("projectStatus", data.get("projectStatus"));
      formData.append("projectDescription", data.get("projectDescription"));

      // Add new image files
      const newFiles = data.getAll("files");
      newFiles.forEach((file) => {
        if (file instanceof File && file.size > 0) {
          formData.append("files", file);
        }
      });

      const response = await fetch(getApiUrlWithId("projects", params.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (response.status === 404 || response.status === 400) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return { ok: false, error: errorData };
      }

      if (!response.ok) {
        console.error("Unexpected API error:", response.statusText);
        throw json({ message: "Failed to update project" }, { status: 500 });
      }

      const responseData = await response.json();
      console.log("API response data:", responseData);
    } else {
      // For regular json data without file upload
      const jsonData = {
        projectCode: data.get("projectCode"),
        title: data.get("title"),
        clientName: data.get("clientName"),
        projectDate: data.get("projectDate"),
        projectCategory: data.get("projectCategory"),
        projectService: data.get("projectService"),
        projectStatus: data.get("projectStatus"),
        projectDescription: data.get("projectDescription"),
      };

      const response = await fetch(getApiUrlWithId("projects", params.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(jsonData),
      });

      console.log("Response status:", response.status);

      if (response.status === 404 || response.status === 400) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return { ok: false, error: errorData };
      }

      if (!response.ok) {
        console.error("Unexpected API error:", response.statusText);
        throw json({ message: "Failed to update project" }, { status: 500 });
      }

      const responseData = await response.json();
      console.log("API response data:", responseData);
    }

    const redirect_path =
      data.get("redirect") ||
      "/l4m3r-secure-dashboard-panel/content-management";
    console.log("Redirecting to:", redirect_path);
    return redirect(redirect_path);
  } catch (error) {
    console.error("Exception during form submission:", error);
    throw json({ message: "Error submitting form" }, { status: 500 });
  }
}
