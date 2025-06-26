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
  Textarea,
  SimpleGrid,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import {
  Form,
  redirect,
  useNavigate,
  useSubmit,
  useActionData,
} from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";
import { ArrowLeft, Upload, X, ImageIcon, Plus } from "lucide-react";

export default function SiteAddForm() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const toast = useToast();
  const actionData = useActionData();
  const [errors, setErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keyFeatures, setKeyFeatures] = useState([""]); // Start with one empty key feature field
  const [sitePictures, setSitePictures] = useState({
    sitePicture1: null,
    sitePicture2: null,
    sitePicture3: null,
  });
  const [previewImages, setPreviewImages] = useState({
    sitePicture1: null,
    sitePicture2: null,
    sitePicture3: null,
  });
  const [imageErrors, setImageErrors] = useState({});

  const fileInputRefs = {
    sitePicture1: useRef(null),
    sitePicture2: useRef(null),
    sitePicture3: useRef(null),
  };

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
              // Parse messages like "siteName must be longer than or equal to 1 characters"
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
          title: "Error creating site",
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

  // Key features management functions
  const addKeyFeature = () => {
    setKeyFeatures([...keyFeatures, ""]);
  };

  const removeKeyFeature = (index) => {
    if (keyFeatures.length > 1) {
      const newKeyFeatures = keyFeatures.filter((_, i) => i !== index);
      setKeyFeatures(newKeyFeatures);
    }
  };

  const updateKeyFeature = (index, value) => {
    const newKeyFeatures = [...keyFeatures];
    newKeyFeatures[index] = value;
    setKeyFeatures(newKeyFeatures);
    clearFieldError("keyFeatures");
  };

  // Validate image file
  const validateImageFile = (file) => {
    if (!file) return null;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "Please select a JPEG or PNG image";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Image size must be less than 5MB";
    }

    return null;
  };

  // Handle picture file changes
  const handlePictureChange = (pictureField, event) => {
    const file = event.target.files[0];

    if (!file) {
      // User cancelled file selection
      return;
    }

    const error = validateImageFile(file);
    if (error) {
      setImageErrors((prev) => ({
        ...prev,
        [pictureField]: error,
      }));
      toast({
        title: "Invalid image",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Clear any previous errors for this field
    setImageErrors((prev) => ({
      ...prev,
      [pictureField]: null,
    }));

    // Set the file
    setSitePictures((prev) => ({
      ...prev,
      [pictureField]: file,
    }));

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreviewImages((prev) => ({
      ...prev,
      [pictureField]: previewUrl,
    }));

    clearFieldError(pictureField);

    toast({
      title: "Image selected",
      description: `${file.name} ready for upload`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Clear picture
  const clearPicture = (pictureField) => {
    const picturesToClear = [];

    // Determine which pictures to clear based on the field
    if (pictureField === "sitePicture1") {
      // If Picture 1 is removed, also clear Pictures 2 and 3
      picturesToClear.push("sitePicture1");
      if (sitePictures.sitePicture2) picturesToClear.push("sitePicture2");
      if (sitePictures.sitePicture3) picturesToClear.push("sitePicture3");
    } else if (pictureField === "sitePicture2") {
      // If Picture 2 is removed, also clear Picture 3
      picturesToClear.push("sitePicture2");
      if (sitePictures.sitePicture3) picturesToClear.push("sitePicture3");
    } else {
      // Just clear Picture 3
      picturesToClear.push("sitePicture3");
    }

    // Clear all specified pictures
    picturesToClear.forEach((field) => {
      // Revoke preview URL to free memory
      if (previewImages[field]) {
        URL.revokeObjectURL(previewImages[field]);
      }

      // Clear file input
      if (fileInputRefs[field].current) {
        fileInputRefs[field].current.value = "";
      }
    });

    // Update state for all pictures to clear
    setSitePictures((prev) => {
      const newState = { ...prev };
      picturesToClear.forEach((field) => {
        newState[field] = null;
      });
      return newState;
    });

    setPreviewImages((prev) => {
      const newState = { ...prev };
      picturesToClear.forEach((field) => {
        newState[field] = null;
      });
      return newState;
    });

    setImageErrors((prev) => {
      const newState = { ...prev };
      picturesToClear.forEach((field) => {
        newState[field] = null;
      });
      return newState;
    });
  };

  function validateForm(formData) {
    const newErrors = {};

    if (!formData.get("siteName")) {
      newErrors.siteName = "Site name is required";
    }

    if (!formData.get("siteDescription")) {
      newErrors.siteDescription = "Site description is required";
    }

    if (!formData.get("keyFeatures")) {
      newErrors.keyFeatures = "Key features are required";
    }

    // Check for image validation errors
    Object.keys(imageErrors).forEach((key) => {
      if (imageErrors[key]) {
        newErrors[key] = imageErrors[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Combine all non-empty key features into comma-separated string
    const keyFeaturesString = keyFeatures
      .filter((feature) => feature.trim() !== "")
      .join(", ");

    // Create form data manually
    const formData = new FormData();
    formData.append("siteName", e.target.siteName.value);
    formData.append("siteDescription", e.target.siteDescription.value);
    formData.append("keyFeatures", keyFeaturesString);

    // Add picture files if they exist
    Object.keys(sitePictures).forEach((key) => {
      if (sitePictures[key]) {
        formData.append(key, sitePictures[key]);
      }
    });

    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  }

  return (
    <Container maxW="container.md" py={8} pt={{ base: "80px", md: "100px" }}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Flex align="center" gap={4}>
          <IconButton
            icon={<ArrowLeft />}
            onClick={() => navigate("/l4m3r-secure-dashboard-panel/sirc-sites")}
            variant="ghost"
            aria-label="Go back"
          />
          <Box>
            <Heading size="lg" color="brand.400">
              Add New SIRC Site
            </Heading>
            <Text color="gray.600" mt={1}>
              Create a new research site or field location
            </Text>
          </Box>
        </Flex>

        {/* Error Alert */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>
                  {actionData.message ||
                    "Failed to create site. Please try again."}
                </AlertDescription>
              </Box>
            </Alert>
          )}

        {/* Form */}
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="sm"
          border="1px"
          borderColor="gray.200"
        >
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <VStack spacing={6} align="stretch">
              {/* Site Name */}
              <FormControl
                isInvalid={!!errors.siteName || !!fieldErrors.siteName}
                isRequired
              >
                <FormLabel fontWeight="600" color="gray.700">
                  Site Name
                </FormLabel>
                <Input
                  name="siteName"
                  placeholder="Enter site name"
                  size="lg"
                  onChange={() => {
                    clearFieldError("siteName");
                    setErrors((prev) => ({ ...prev, siteName: "" }));
                  }}
                  borderColor="gray.300"
                  _hover={{ borderColor: "brand.400" }}
                  _focus={{ borderColor: "brand.400", boxShadow: "outline" }}
                />
                <FormErrorMessage>
                  {errors.siteName || fieldErrors.siteName}
                </FormErrorMessage>
              </FormControl>

              {/* Site Description */}
              <FormControl
                isInvalid={
                  !!errors.siteDescription || !!fieldErrors.siteDescription
                }
                isRequired
              >
                <FormLabel fontWeight="600" color="gray.700">
                  Site Description
                </FormLabel>
                <Textarea
                  name="siteDescription"
                  placeholder="Enter detailed description of the site"
                  size="lg"
                  rows={4}
                  onChange={() => {
                    clearFieldError("siteDescription");
                    setErrors((prev) => ({ ...prev, siteDescription: "" }));
                  }}
                  borderColor="gray.300"
                  _hover={{ borderColor: "brand.400" }}
                  _focus={{ borderColor: "brand.400", boxShadow: "outline" }}
                />
                <FormErrorMessage>
                  {errors.siteDescription || fieldErrors.siteDescription}
                </FormErrorMessage>
              </FormControl>

              {/* Key Features */}
              <FormControl
                isInvalid={!!errors.keyFeatures || !!fieldErrors.keyFeatures}
                isRequired
              >
                <FormLabel fontWeight="600" color="gray.700">
                  Key Features
                </FormLabel>
                <VStack spacing={2} align="stretch">
                  {keyFeatures.map((feature, index) => (
                    <HStack key={index} spacing={2}>
                      <Input
                        placeholder={`Key feature ${index + 1}`}
                        size="lg"
                        value={feature}
                        onChange={(e) =>
                          updateKeyFeature(index, e.target.value)
                        }
                        flex="1"
                        borderColor="gray.300"
                        _hover={{ borderColor: "brand.400" }}
                        _focus={{
                          borderColor: "brand.400",
                          boxShadow: "outline",
                        }}
                      />
                      {keyFeatures.length > 1 && (
                        <IconButton
                          icon={<X />}
                          aria-label={`Remove key feature ${index + 1}`}
                          onClick={() => removeKeyFeature(index)}
                          size="lg"
                          colorScheme="red"
                          variant="outline"
                        />
                      )}
                    </HStack>
                  ))}
                  <Button
                    leftIcon={<Plus />}
                    onClick={addKeyFeature}
                    variant="outline"
                    colorScheme="brand"
                    size="sm"
                    alignSelf="flex-start"
                  >
                    Add Key Feature
                  </Button>
                </VStack>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Add multiple key features. They will be saved as
                  comma-separated values.
                </Text>
                <FormErrorMessage>
                  {errors.keyFeatures || fieldErrors.keyFeatures}
                </FormErrorMessage>
              </FormControl>

              {/* Site Pictures */}
              <Box>
                <Text fontWeight="600" color="gray.700" mb={4}>
                  Site Pictures (Optional)
                </Text>
                <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
                  {/* Picture 1 - Always shown */}
                  <FormControl
                    isInvalid={
                      !!errors.sitePicture1 ||
                      !!fieldErrors.sitePicture1 ||
                      !!imageErrors.sitePicture1
                    }
                  >
                    <FormLabel fontSize="sm" color="gray.600">
                      Picture 1
                    </FormLabel>

                    {/* File Input (Hidden) */}
                    <Input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      ref={fileInputRefs.sitePicture1}
                      onChange={(e) => handlePictureChange("sitePicture1", e)}
                      display="none"
                    />

                    {/* Upload Area or Preview */}
                    {!previewImages.sitePicture1 ? (
                      <Box
                        border="1px dashed"
                        borderColor={
                          errors.sitePicture1 ||
                          fieldErrors.sitePicture1 ||
                          imageErrors.sitePicture1
                            ? "red.300"
                            : "gray.300"
                        }
                        borderRadius="md"
                        p={4}
                        textAlign="center"
                        cursor="pointer"
                        bg="gray.50"
                        _hover={{
                          borderColor:
                            errors.sitePicture1 ||
                            fieldErrors.sitePicture1 ||
                            imageErrors.sitePicture1
                              ? "red.400"
                              : "brand.400",
                          bg: "brand.50",
                        }}
                        onClick={() =>
                          fileInputRefs.sitePicture1.current?.click()
                        }
                        h="150px"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ImageIcon size={24} />
                        <Text mt={2} fontSize="sm" fontWeight="500">
                          Click to upload image 1
                        </Text>
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          JPEG, PNG only • Max 5MB
                        </Text>
                      </Box>
                    ) : (
                      <Box position="relative">
                        <Image
                          src={previewImages.sitePicture1}
                          alt="Site picture 1 preview"
                          maxH="200px"
                          w="100%"
                          objectFit="cover"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                        />
                        <IconButton
                          icon={<X size={16} />}
                          position="absolute"
                          top={2}
                          right={2}
                          size="sm"
                          colorScheme="red"
                          onClick={() => clearPicture("sitePicture1")}
                          aria-label="Remove picture 1"
                        />
                        <Text fontSize="xs" color="gray.600" mt={1}>
                          {sitePictures.sitePicture1?.name}
                        </Text>
                      </Box>
                    )}

                    <FormErrorMessage>
                      {errors.sitePicture1 ||
                        fieldErrors.sitePicture1 ||
                        imageErrors.sitePicture1}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Picture 2 - Only shown if Picture 1 has a file */}
                  {sitePictures.sitePicture1 && (
                    <FormControl
                      isInvalid={
                        !!errors.sitePicture2 ||
                        !!fieldErrors.sitePicture2 ||
                        !!imageErrors.sitePicture2
                      }
                    >
                      <FormLabel fontSize="sm" color="gray.600">
                        Picture 2
                      </FormLabel>

                      {/* File Input (Hidden) */}
                      <Input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        ref={fileInputRefs.sitePicture2}
                        onChange={(e) => handlePictureChange("sitePicture2", e)}
                        display="none"
                      />

                      {/* Upload Area or Preview */}
                      {!previewImages.sitePicture2 ? (
                        <Box
                          border="1px dashed"
                          borderColor={
                            errors.sitePicture2 ||
                            fieldErrors.sitePicture2 ||
                            imageErrors.sitePicture2
                              ? "red.300"
                              : "gray.300"
                          }
                          borderRadius="md"
                          p={4}
                          textAlign="center"
                          cursor="pointer"
                          bg="gray.50"
                          _hover={{
                            borderColor:
                              errors.sitePicture2 ||
                              fieldErrors.sitePicture2 ||
                              imageErrors.sitePicture2
                                ? "red.400"
                                : "brand.400",
                            bg: "brand.50",
                          }}
                          onClick={() =>
                            fileInputRefs.sitePicture2.current?.click()
                          }
                          h="150px"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <ImageIcon size={24} />
                          <Text mt={2} fontSize="sm" fontWeight="500">
                            Click to upload image 2
                          </Text>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            JPEG, PNG only • Max 5MB
                          </Text>
                        </Box>
                      ) : (
                        <Box position="relative">
                          <Image
                            src={previewImages.sitePicture2}
                            alt="Site picture 2 preview"
                            maxH="200px"
                            w="100%"
                            objectFit="cover"
                            borderRadius="md"
                            border="1px solid"
                            borderColor="gray.200"
                          />
                          <IconButton
                            icon={<X size={16} />}
                            position="absolute"
                            top={2}
                            right={2}
                            size="sm"
                            colorScheme="red"
                            onClick={() => clearPicture("sitePicture2")}
                            aria-label="Remove picture 2"
                          />
                          <Text fontSize="xs" color="gray.600" mt={1}>
                            {sitePictures.sitePicture2?.name}
                          </Text>
                        </Box>
                      )}

                      <FormErrorMessage>
                        {errors.sitePicture2 ||
                          fieldErrors.sitePicture2 ||
                          imageErrors.sitePicture2}
                      </FormErrorMessage>
                    </FormControl>
                  )}

                  {/* Picture 3 - Only shown if Picture 2 has a file */}
                  {sitePictures.sitePicture1 && sitePictures.sitePicture2 && (
                    <FormControl
                      isInvalid={
                        !!errors.sitePicture3 ||
                        !!fieldErrors.sitePicture3 ||
                        !!imageErrors.sitePicture3
                      }
                    >
                      <FormLabel fontSize="sm" color="gray.600">
                        Picture 3
                      </FormLabel>

                      {/* File Input (Hidden) */}
                      <Input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        ref={fileInputRefs.sitePicture3}
                        onChange={(e) => handlePictureChange("sitePicture3", e)}
                        display="none"
                      />

                      {/* Upload Area or Preview */}
                      {!previewImages.sitePicture3 ? (
                        <Box
                          border="1px dashed"
                          borderColor={
                            errors.sitePicture3 ||
                            fieldErrors.sitePicture3 ||
                            imageErrors.sitePicture3
                              ? "red.300"
                              : "gray.300"
                          }
                          borderRadius="md"
                          p={4}
                          textAlign="center"
                          cursor="pointer"
                          bg="gray.50"
                          _hover={{
                            borderColor:
                              errors.sitePicture3 ||
                              fieldErrors.sitePicture3 ||
                              imageErrors.sitePicture3
                                ? "red.400"
                                : "brand.400",
                            bg: "brand.50",
                          }}
                          onClick={() =>
                            fileInputRefs.sitePicture3.current?.click()
                          }
                          h="150px"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <ImageIcon size={24} />
                          <Text mt={2} fontSize="sm" fontWeight="500">
                            Click to upload image 3
                          </Text>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            JPEG, PNG only • Max 5MB
                          </Text>
                        </Box>
                      ) : (
                        <Box position="relative">
                          <Image
                            src={previewImages.sitePicture3}
                            alt="Site picture 3 preview"
                            maxH="200px"
                            w="100%"
                            objectFit="cover"
                            borderRadius="md"
                            border="1px solid"
                            borderColor="gray.200"
                          />
                          <IconButton
                            icon={<X size={16} />}
                            position="absolute"
                            top={2}
                            right={2}
                            size="sm"
                            colorScheme="red"
                            onClick={() => clearPicture("sitePicture3")}
                            aria-label="Remove picture 3"
                          />
                          <Text fontSize="xs" color="gray.600" mt={1}>
                            {sitePictures.sitePicture3?.name}
                          </Text>
                        </Box>
                      )}

                      <FormErrorMessage>
                        {errors.sitePicture3 ||
                          fieldErrors.sitePicture3 ||
                          imageErrors.sitePicture3}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </SimpleGrid>
              </Box>

              {/* Submit Buttons */}
              <HStack spacing={4} pt={4}>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    navigate("/l4m3r-secure-dashboard-panel/sirc-sites")
                  }
                  flex={1}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg="brand.400"
                  color="white"
                  size="lg"
                  _hover={{ bg: "brand.500" }}
                  _active={{ bg: "brand.600" }}
                  isLoading={isSubmitting}
                  loadingText="Creating Site..."
                  flex={1}
                >
                  Create Site
                </Button>
              </HStack>
            </VStack>
          </Form>
        </Box>
      </VStack>
    </Container>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  try {
    // Double-check the site count before creating (server-side safeguard)
    const checkResponse = await fetch(API_ENDPOINTS.SITES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (checkResponse.ok) {
      const existingSites = await checkResponse.json();
      if (existingSites.length >= 3) {
        return {
          error: true,
          message: "Cannot create site: Maximum of 3 sites allowed",
          details: { message: "Site limit exceeded" },
        };
      }
    }

    // FormData will be sent as multipart/form-data
    // The backend will handle file uploads and convert them to URLs
    const response = await fetch(API_ENDPOINTS.SITES_CREATE, {
      method: "POST",
      credentials: "include",
      body: formData, // Send FormData directly for file uploads
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: true,
        message: errorData.message || "Failed to create site",
        details: errorData,
      };
    }

    const result = await response.json();
    return redirect("/l4m3r-secure-dashboard-panel/sirc-sites");
  } catch (error) {
    console.error("Error creating site:", error);
    return {
      error: true,
      message: "Network error occurred while creating site",
      details: { message: error.message },
    };
  }
}

export async function loader({ request }) {
  // Check if there are already 3 sites
  const response = await fetch(API_ENDPOINTS.SITES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sites");
  }

  const sites = await response.json();

  // If there are already 3 sites, redirect to the sites list
  if (sites.length >= 3) {
    return redirect("/l4m3r-secure-dashboard-panel/sirc-sites");
  }

  // Return null if the creation is allowed
  return null;
}
