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
  useToast,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import {
  Form,
  redirect,
  useNavigate,
  useSubmit,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { useState, useCallback } from "react";
import { SERVICE_CATEGORIES } from "../index.js";
import { Upload, X, Plus } from "lucide-react";
import { getApiUrlWithId } from "../config/api.js";
import { useDropzone } from "react-dropzone";

export default function ServiceEditForm() {
  const service = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo =
    location.state?.from || "/l4m3r-secure-dashboard-panel/service-offerings";
  const submit = useSubmit();
  const toast = useToast();

  const [bannerFiles, setBannerFiles] = useState([]);
  const [pageFiles, setPageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerErrors, setBannerErrors] = useState([]);
  const [pageErrors, setPageErrors] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(
    service.bannerPic && service.bannerPic.length > 0 ? service.bannerPic : []
  );
  const [currentPagePics, setCurrentPagePics] = useState(
    service.pagePics && service.pagePics.length > 0 ? service.pagePics : []
  );

  // Parse existing softwares and equipment from comma-separated strings
  const [softwares, setSoftwares] = useState(() => {
    if (service.softwares && service.softwares.trim()) {
      return service.softwares
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }
    return [""];
  });

  const [equipments, setEquipments] = useState(() => {
    if (service.equipment && service.equipment.trim()) {
      return service.equipment
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }
    return [""];
  });

  // Maximum file size: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

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

  const onBannerDrop = useCallback(
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
            newErrors.push("Maximum 1 banner image allowed");
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

      // Check file limit for banner (max 1)
      if (validFiles.length > 1) {
        newErrors.push("Maximum 1 banner image allowed");
        validFiles.splice(1);
      }

      // Update state
      if (newErrors.length > 0) {
        setBannerErrors(newErrors);
        toast({
          title: "Banner Image Upload Errors",
          description: newErrors[0],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        setBannerErrors([]);
      }

      if (validFiles.length > 0) {
        setBannerFiles(validFiles);
        toast({
          title: "Banner image selected",
          description: "Image will replace existing banner on save",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    [toast]
  );

  const onPageDrop = useCallback(
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
            newErrors.push("Maximum 2 page images allowed");
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

      // Check file limit for page images (max 2)
      if (pageFiles.length + validFiles.length > 2) {
        newErrors.push("Maximum 2 page images allowed");
        const allowedCount = 2 - pageFiles.length;
        validFiles.splice(allowedCount);
      }

      // Update state
      if (newErrors.length > 0) {
        setPageErrors(newErrors);
        toast({
          title: "Page Image Upload Errors",
          description: newErrors[0],
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        setPageErrors([]);
      }

      if (validFiles.length > 0) {
        setPageFiles((prevFiles) => [...prevFiles, ...validFiles]);
        toast({
          title: "Page images selected",
          description: `${validFiles.length} image(s) will replace existing images on save`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    [pageFiles.length, toast]
  );

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
    isDragActive: isBannerDragActive,
  } = useDropzone({
    onDrop: onBannerDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const {
    getRootProps: getPageRootProps,
    getInputProps: getPageInputProps,
    isDragActive: isPageDragActive,
  } = useDropzone({
    onDrop: onPageDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 2,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  function removeBannerFile() {
    setBannerFiles([]);
    setBannerErrors([]);
  }

  function removePageFile(index) {
    const newFiles = [...pageFiles];
    newFiles.splice(index, 1);
    setPageFiles(newFiles);
    setPageErrors([]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check for validation errors
    if (bannerErrors.length > 0 || pageErrors.length > 0) {
      toast({
        title: "Please fix validation errors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

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
    formData.append("redirect", e.target.redirect.value);

    // Add the banner pic if selected
    if (bannerFiles.length > 0) {
      formData.append("bannerPic", bannerFiles[0], bannerFiles[0].name);
    }

    // Add the page pics if selected
    pageFiles.forEach((file) => {
      formData.append("pagePics", file, file.name);
    });

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  }

  function handleCancel() {
    navigate(redirectTo);
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
          Edit Service
        </Heading>

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
              <FormControl isRequired mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Service Name
                </FormLabel>
                <Input
                  type="text"
                  name="serviceName"
                  defaultValue={service.serviceName}
                  placeholder="e.g. Environmental Impact Assessment"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 1 }}>
              <FormControl isRequired mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Service Category
                </FormLabel>
                <Select
                  name="serviceCategory"
                  defaultValue={service.serviceCategory}
                  placeholder="Select category"
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                >
                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl isRequired mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Introduction
                </FormLabel>
                <Textarea
                  name="intro"
                  defaultValue={service.intro}
                  placeholder="Brief introduction to the service..."
                  rows={3}
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  resize="vertical"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl isRequired mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Body Content
                </FormLabel>
                <Textarea
                  name="body"
                  defaultValue={service.body}
                  placeholder="Detailed service description..."
                  rows={6}
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  resize="vertical"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 1 }}>
              <FormControl isRequired mb={{ base: 3, md: 4 }}>
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
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 1 }}>
              <FormControl isRequired mb={{ base: 3, md: 4 }}>
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
              </FormControl>
            </GridItem>

            {/* Current Banner Display */}
            {currentBanner.length > 0 && (
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl mb={{ base: 3, md: 4 }}>
                  <FormLabel fontSize={{ base: "md", md: "lg" }}>
                    Current Banner Image
                  </FormLabel>
                  <Box
                    bg="gray.50"
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                    textAlign="center"
                  >
                    <Image
                      src={currentBanner[0]}
                      alt="Current banner"
                      maxH="200px"
                      objectFit="contain"
                      mx="auto"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="gray.200"
                    />
                  </Box>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="blue.500"
                    mt={2}
                  >
                    Current banner image • New upload will replace this image
                  </Text>
                </FormControl>
              </GridItem>
            )}

            {/* Current Page Images Display */}
            {currentPagePics.length > 0 && (
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl mb={{ base: 3, md: 4 }}>
                  <FormLabel fontSize={{ base: "md", md: "lg" }}>
                    Current Page Images
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
                    {currentPagePics.map((imageUrl, index) => (
                      <Box key={index} position="relative">
                        <Image
                          src={imageUrl}
                          alt={`Page image ${index + 1}`}
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
                    {currentPagePics.length} current image
                    {currentPagePics.length !== 1 ? "s" : ""} • New uploads will
                    replace existing images
                  </Text>
                </FormControl>
              </GridItem>
            )}

            {/* New Banner Upload */}
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                mb={{ base: 3, md: 4 }}
                isInvalid={bannerErrors.length > 0}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Upload New Banner Image (Optional)
                </FormLabel>
                <Box
                  {...getBannerRootProps()}
                  border="2px dashed"
                  borderColor={
                    bannerErrors.length > 0
                      ? "red.300"
                      : isBannerDragActive
                      ? "brand.400"
                      : "gray.300"
                  }
                  borderRadius="md"
                  p={6}
                  textAlign="center"
                  cursor="pointer"
                  bg={isBannerDragActive ? "brand.50" : "gray.50"}
                  transition="all 0.2s"
                  _hover={{ borderColor: "brand.400", bg: "brand.50" }}
                >
                  <input {...getBannerInputProps()} />
                  <Upload size={24} />
                  <Text mt={2} fontSize="md" fontWeight="500">
                    {isBannerDragActive
                      ? "Drop banner image here..."
                      : "Click to select banner image or drag and drop"}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    JPEG, PNG only • Max 1 image • Max 5MB
                  </Text>
                </Box>

                {/* Display validation errors */}
                {bannerErrors.length > 0 && (
                  <Box mt={2}>
                    {bannerErrors.map((error, index) => (
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
                {bannerErrors.length === 0 && bannerFiles.length > 0 && (
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="green.500"
                    mt={1}
                  >
                    Banner image selected
                  </Text>
                )}

                {/* Display help text when no files and no errors */}
                {bannerErrors.length === 0 && bannerFiles.length === 0 && (
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="gray.500"
                    mt={1}
                  >
                    Upload new banner image (will replace existing banner if
                    any)
                  </Text>
                )}

                {bannerFiles.length > 0 && (
                  <Box mt={4}>
                    <Box position="relative" display="inline-block">
                      <Image
                        src={URL.createObjectURL(bannerFiles[0])}
                        alt="New banner preview"
                        w="200px"
                        h="120px"
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
                        onClick={removeBannerFile}
                      >
                        <X size={12} />
                      </Button>
                      <Text
                        fontSize="xs"
                        textAlign="center"
                        mt={1}
                        isTruncated
                        maxW="200px"
                        color="gray.600"
                      >
                        {bannerFiles[0].name}
                      </Text>
                    </Box>
                  </Box>
                )}
              </FormControl>
            </GridItem>

            {/* New Page Images Upload */}
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                mb={{ base: 3, md: 4 }}
                isInvalid={pageErrors.length > 0}
              >
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Upload New Page Images (Optional - Max 2)
                </FormLabel>
                <Box
                  {...getPageRootProps()}
                  border="2px dashed"
                  borderColor={
                    pageErrors.length > 0
                      ? "red.300"
                      : isPageDragActive
                      ? "brand.400"
                      : "gray.300"
                  }
                  borderRadius="md"
                  p={6}
                  textAlign="center"
                  cursor="pointer"
                  bg={isPageDragActive ? "brand.50" : "gray.50"}
                  transition="all 0.2s"
                  _hover={{ borderColor: "brand.400", bg: "brand.50" }}
                >
                  <input {...getPageInputProps()} />
                  <Upload size={24} />
                  <Text mt={2} fontSize="md" fontWeight="500">
                    {isPageDragActive
                      ? "Drop page images here..."
                      : "Click to select page images or drag and drop"}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    JPEG, PNG only • Max 2 images • Max 5MB per image
                  </Text>
                </Box>

                {/* Display validation errors */}
                {pageErrors.length > 0 && (
                  <Box mt={2}>
                    {pageErrors.map((error, index) => (
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
                {pageErrors.length === 0 && pageFiles.length > 0 && (
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="green.500"
                    mt={1}
                  >
                    {pageFiles.length} new image
                    {pageFiles.length !== 1 ? "s" : ""} selected
                  </Text>
                )}

                {/* Display help text when no files and no errors */}
                {pageErrors.length === 0 && pageFiles.length === 0 && (
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="gray.500"
                    mt={1}
                  >
                    Upload new page images (will replace existing images if any)
                  </Text>
                )}

                {pageFiles.length > 0 && (
                  <Grid
                    templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                    gap={4}
                    mt={4}
                  >
                    {pageFiles.map((file, index) => (
                      <Box key={index} position="relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`New page preview ${index}`}
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
                          onClick={() => removePageFile(index)}
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

          <Input type="hidden" name="redirect" defaultValue={redirectTo} />

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
              isDisabled={
                isSubmitting || !!bannerErrors.length || !!pageErrors.length
              }
            >
              Save Changes
            </Button>
            <Button
              onClick={handleCancel}
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

export async function serviceLoader({ params }) {
  const response = await fetch(getApiUrlWithId("services", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load service");
  }

  const service = await response.json();

  // Extract and format image fields
  if (service.bannerPic) {
    const vals = service.bannerPic
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    service.bannerPic = vals;
  }

  if (service.pagePics) {
    const vals2 = service.pagePics
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    service.pagePics = vals2;
  }

  return service;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const redirectPath =
    formData.get("redirect") ||
    "/l4m3r-secure-dashboard-panel/service-offerings";

  try {
    console.log("Updating service...");
    console.log(
      "Form fields:",
      [...formData.entries()].map((entry) => `${entry[0]}: ${entry[1]}`)
    );

    const response = await fetch(getApiUrlWithId("services", params.id), {
      method: "PATCH",
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
        message:
          "Service not found or endpoint unavailable. Please contact support.",
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
        message: `Failed to update service: ${response.statusText}`,
        details: errorData,
      };
    }

    const responseData = await response.json();
    console.log("Service updated successfully:", responseData);

    return redirect(redirectPath);
  } catch (error) {
    console.error("Exception during service update:", error);
    return {
      error: true,
      message: "Network error or unexpected issue occurred. Please try again.",
      details: error.message,
    };
  }
}
