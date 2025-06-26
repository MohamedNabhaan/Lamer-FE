import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Container,
  Text,
  Select,
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
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import {
  Form,
  redirect,
  useNavigate,
  useSubmit,
  useActionData,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { SERVICE_CATEGORIES } from "../index.js";
import { Upload, X, ImageIcon, Plus } from "lucide-react";
import { API_ENDPOINTS } from "../config/api.js";

export default function ServiceAddForm() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const toast = useToast();
  const actionData = useActionData();
  const [bannerPic, setBannerPic] = useState(null);
  const [pagePics, setPagePics] = useState([]);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewPagePics, setPreviewPagePics] = useState([]);
  const [bannerError, setBannerError] = useState("");
  const [pagePicsError, setPagePicsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [softwares, setSoftwares] = useState([""]); // Start with one empty software field
  const [equipments, setEquipments] = useState([""]); // Start with one empty equipment field
  const bannerInputRef = useRef(null);
  const pagePicsInputRef = useRef(null);

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
              // Parse messages like "serviceName must be longer than or equal to 1 characters"
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
          title: "Error creating service",
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

  // Software management functions
  const addSoftware = () => {
    setSoftwares([...softwares, ""]);
  };

  const removeSoftware = (index) => {
    if (softwares.length > 1) {
      const newSoftwares = softwares.filter((_, i) => i !== index);
      setSoftwares(newSoftwares);
    }
  };

  const updateSoftware = (index, value) => {
    const newSoftwares = [...softwares];
    newSoftwares[index] = value;
    setSoftwares(newSoftwares);
    clearFieldError("softwares");
  };

  // Equipment management functions
  const addEquipment = () => {
    setEquipments([...equipments, ""]);
  };

  const removeEquipment = (index) => {
    if (equipments.length > 1) {
      const newEquipments = equipments.filter((_, i) => i !== index);
      setEquipments(newEquipments);
    }
  };

  const updateEquipment = (index, value) => {
    const newEquipments = [...equipments];
    newEquipments[index] = value;
    setEquipments(newEquipments);
    clearFieldError("equipment");
  };

  function validateImageFile(file) {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return "Only JPEG and PNG images are allowed";
    }

    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return null;
  }

  function handleBannerChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const error = validateImageFile(file);

      if (error) {
        setBannerError(error);
        toast({
          title: "Invalid banner image",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setBannerError("");
      setBannerPic(file);
      setPreviewBanner(URL.createObjectURL(file));

      toast({
        title: "Banner image selected",
        description: "Image is ready for upload",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  function handlePagePicsChange(e) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Check quantity limit
      if (filesArray.length > 2) {
        setPagePicsError("Maximum 2 page images allowed");
        toast({
          title: "Too many files",
          description: "Maximum 2 page images allowed",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validate each file
      for (let file of filesArray) {
        const error = validateImageFile(file);
        if (error) {
          setPagePicsError(error);
          toast({
            title: "Invalid page image",
            description: error,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      }

      setPagePicsError("");
      setPagePics(filesArray);

      const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewPagePics(previewsArray);

      toast({
        title: "Page images selected",
        description: `${filesArray.length} image(s) ready for upload`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  function removeBannerPic() {
    setBannerPic(null);
    setPreviewBanner(null);
    setBannerError("");
    if (bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
  }

  function removePagePic(index) {
    const newPagePics = [...pagePics];
    newPagePics.splice(index, 1);
    setPagePics(newPagePics);

    const newPreviews = [...previewPagePics];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewPagePics(newPreviews);
    setPagePicsError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check for validation errors
    if (bannerError || pagePicsError) {
      toast({
        title: "Please fix validation errors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    // Clear previous field errors
    setFieldErrors({});

    // Combine all non-empty softwares and equipments into comma-separated strings
    const softwaresString = softwares
      .filter((software) => software.trim() !== "")
      .join(", ");
    const equipmentsString = equipments
      .filter((equipment) => equipment.trim() !== "")
      .join(", ");

    const formData = new FormData();

    // Add all text fields
    formData.append("serviceName", e.target.serviceName.value);
    formData.append("serviceCategory", e.target.serviceCategory.value);
    formData.append("intro", e.target.intro.value);
    formData.append("body", e.target.body.value);
    formData.append("softwares", softwaresString);
    formData.append("equipment", equipmentsString);

    // Add the banner pic if selected
    if (bannerPic) {
      formData.append("bannerPic", bannerPic);
    }

    // Add the page pics if selected
    pagePics.forEach((file) => {
      formData.append("pagePics", file);
    });

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
          Create a Service
        </Heading>

        {/* General Error Message Display - only show if no specific field errors */}
        {actionData &&
          actionData.error &&
          Object.keys(fieldErrors).length === 0 && (
            <Alert status="error" mb={6} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Error creating service!</AlertTitle>
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
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.serviceName}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Service Name
                </FormLabel>
                <Input
                  type="text"
                  name="serviceName"
                  placeholder="e.g. Environmental Impact Assessment"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("serviceName")}
                />
                <FormErrorMessage>{fieldErrors.serviceName}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 1 }}>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.serviceCategory}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Service Category
                </FormLabel>
                <Select
                  name="serviceCategory"
                  placeholder="Select category"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  onChange={() => clearFieldError("serviceCategory")}
                >
                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {fieldErrors.serviceCategory}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.intro}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Introduction
                </FormLabel>
                <Textarea
                  name="intro"
                  placeholder="Brief introduction to the service..."
                  rows={3}
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  resize="vertical"
                  onChange={() => clearFieldError("intro")}
                />
                <FormErrorMessage>{fieldErrors.intro}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.body}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Body Content
                </FormLabel>
                <Textarea
                  name="body"
                  placeholder="Detailed service description..."
                  rows={6}
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  resize="vertical"
                  onChange={() => clearFieldError("body")}
                />
                <FormErrorMessage>{fieldErrors.body}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 1 }}>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.softwares}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Softwares
                </FormLabel>
                <VStack spacing={2} align="stretch">
                  {softwares.map((software, index) => (
                    <HStack key={index} spacing={2}>
                      <Input
                        placeholder={`Software ${index + 1} name`}
                        size="lg"
                        fontSize={{ base: "md", md: "md" }}
                        value={software}
                        onChange={(e) => updateSoftware(index, e.target.value)}
                        flex="1"
                      />
                      {softwares.length > 1 && (
                        <IconButton
                          icon={<X />}
                          aria-label={`Remove software ${index + 1}`}
                          onClick={() => removeSoftware(index)}
                          size="lg"
                          colorScheme="red"
                          variant="outline"
                        />
                      )}
                    </HStack>
                  ))}
                  <Button
                    leftIcon={<Plus />}
                    onClick={addSoftware}
                    variant="outline"
                    colorScheme="brand"
                    size="sm"
                    alignSelf="flex-start"
                  >
                    Add Software
                  </Button>
                </VStack>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Add multiple software tools. They will be saved as
                  comma-separated values.
                </Text>
                <FormErrorMessage>{fieldErrors.softwares}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 1 }}>
              <FormControl
                isRequired
                isInvalid={!!fieldErrors.equipment}
                mb={{ base: 3, md: 4 }}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Equipment
                </FormLabel>
                <VStack spacing={2} align="stretch">
                  {equipments.map((equipment, index) => (
                    <HStack key={index} spacing={2}>
                      <Input
                        placeholder={`Equipment ${index + 1} name`}
                        size="lg"
                        fontSize={{ base: "md", md: "md" }}
                        value={equipment}
                        onChange={(e) => updateEquipment(index, e.target.value)}
                        flex="1"
                      />
                      {equipments.length > 1 && (
                        <IconButton
                          icon={<X />}
                          aria-label={`Remove equipment ${index + 1}`}
                          onClick={() => removeEquipment(index)}
                          size="lg"
                          colorScheme="red"
                          variant="outline"
                        />
                      )}
                    </HStack>
                  ))}
                  <Button
                    leftIcon={<Plus />}
                    onClick={addEquipment}
                    variant="outline"
                    colorScheme="brand"
                    size="sm"
                    alignSelf="flex-start"
                  >
                    Add Equipment
                  </Button>
                </VStack>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Add multiple equipment items. They will be saved as
                  comma-separated values.
                </Text>
                <FormErrorMessage>{fieldErrors.equipment}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl isInvalid={!!bannerError} mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Banner Image (Optional)
                </FormLabel>
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  id="bannerPic"
                  name="bannerPic"
                  ref={bannerInputRef}
                  onChange={handleBannerChange}
                  display="none"
                />
                <Flex
                  border="1px dashed"
                  borderColor={bannerError ? "red.300" : "gray.300"}
                  borderRadius="md"
                  p={4}
                  direction="column"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  h="150px"
                  onClick={() => bannerInputRef.current.click()}
                  position="relative"
                  bg={previewBanner ? "transparent" : "gray.50"}
                  _hover={{ borderColor: bannerError ? "red.400" : "gray.400" }}
                >
                  {previewBanner ? (
                    <>
                      <Image
                        src={previewBanner}
                        alt="Banner preview"
                        maxH="140px"
                        objectFit="contain"
                      />
                    </>
                  ) : (
                    <>
                      <ImageIcon size={24} />
                      <Text mt={2} fontSize="sm" textAlign="center">
                        Click to upload banner image
                      </Text>
                    </>
                  )}
                </Flex>

                {bannerError && (
                  <Text fontSize="sm" color="red.500" mt={1}>
                    {bannerError}
                  </Text>
                )}

                {!bannerError && (
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Upload JPEG or PNG image (max 5MB)
                  </Text>
                )}
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl isInvalid={!!pagePicsError} mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Page Images (Optional - max 2)
                </FormLabel>
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  id="pagePics"
                  name="pagePics"
                  multiple
                  ref={pagePicsInputRef}
                  onChange={handlePagePicsChange}
                  display="none"
                />
                <Flex
                  border="1px dashed"
                  borderColor={pagePicsError ? "red.300" : "gray.300"}
                  borderRadius="md"
                  p={4}
                  direction="column"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  minH="150px"
                  onClick={() => pagePicsInputRef.current.click()}
                  bg="gray.50"
                  _hover={{
                    borderColor: pagePicsError ? "red.400" : "gray.400",
                  }}
                >
                  <Upload size={24} />
                  <Text mt={2} fontSize="sm" textAlign="center">
                    Click to upload page images (max 2)
                  </Text>
                </Flex>

                {previewPagePics.length > 0 && (
                  <Stack mt={3} spacing={2}>
                    {previewPagePics.map((preview, index) => (
                      <Flex
                        key={index}
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={2}
                        align="center"
                        justify="space-between"
                      >
                        <Flex align="center">
                          <Image
                            src={preview}
                            alt={`Page image ${index + 1}`}
                            boxSize="50px"
                            objectFit="cover"
                            mr={3}
                            borderRadius="md"
                          />
                          <Text fontSize="sm" noOfLines={1}>
                            {pagePics[index]?.name || `Image ${index + 1}`}
                          </Text>
                        </Flex>
                        <Button
                          size="sm"
                          colorScheme="red"
                          borderRadius="full"
                          onClick={() => removePagePic(index)}
                        >
                          <X size={14} />
                        </Button>
                      </Flex>
                    ))}
                  </Stack>
                )}

                {pagePicsError && (
                  <Text fontSize="sm" color="red.500" mt={1}>
                    {pagePicsError}
                  </Text>
                )}

                {!pagePicsError && (
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Upload JPEG or PNG images (max 5MB each, 2 images max)
                  </Text>
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
              isDisabled={isSubmitting || !!bannerError || !!pagePicsError}
            >
              Create
            </Button>
            <Button
              onClick={() =>
                navigate("/l4m3r-secure-dashboard-panel/service-offerings")
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
    console.log("Creating new service...");
    console.log(
      "Form fields:",
      [...formData.entries()].map((entry) => `${entry[0]}: ${entry[1]}`)
    );

    const response = await fetch(API_ENDPOINTS.SERVICES_CREATE, {
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
        message: "Service endpoint not found. Please contact support.",
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
        message: `Failed to create service: ${response.statusText}`,
        details: errorData,
      };
    }

    const responseData = await response.json();
    console.log("Service created successfully:", responseData);

    return redirect("/l4m3r-secure-dashboard-panel/service-offerings");
  } catch (error) {
    console.error("Exception during service creation:", error);
    return {
      error: true,
      message: "Network error or unexpected issue occurred. Please try again.",
      details: error.message,
    };
  }
}
