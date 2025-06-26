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
  Textarea,
  useToast,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  json,
  useSubmit,
} from "react-router-dom";
import { useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import { getApiUrlWithId } from "../config/api.js";

export default function EmployeeEditForm() {
  const { employee } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const redirectTo =
    location.state?.from ||
    "/l4m3r-secure-dashboard-panel/personnel-management";
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [currentImage, setCurrentImage] = useState(
    employee.displayPic && employee.displayPic[0]
      ? employee.displayPic[0]
      : null
  );

  // Parse existing qualifications from comma-separated string
  const [qualifications, setQualifications] = useState(() => {
    if (employee.qualifications && employee.qualifications.trim()) {
      return employee.qualifications
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }
    return [""];
  });

  // Maximum file size: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  // Qualification management functions
  const addQualification = () => {
    setQualifications([...qualifications, ""]);
  };

  const removeQualification = (index) => {
    if (qualifications.length > 1) {
      const newQualifications = qualifications.filter((_, i) => i !== index);
      setQualifications(newQualifications);
    }
  };

  const updateQualification = (index, value) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = value;
    setQualifications(newQualifications);
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

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate the file
      const validationError = validateImageFile(file);
      if (validationError) {
        setImageError(validationError);
        toast({
          title: "Invalid File",
          description: validationError,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      setImageFile(file);
      setImageError(""); // Clear any previous errors
      setCurrentImage(null); // Hide current image when new one is selected

      // Create preview URL for image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");
    setImageError("");
    // Show the original image again if available
    setCurrentImage(
      employee.displayPic && employee.displayPic[0]
        ? employee.displayPic[0]
        : null
    );
  }

  const handleCancel = () => {
    navigate(redirectTo);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    // Combine all non-empty qualifications into a comma-separated string
    const qualificationsString = qualifications
      .filter((qualification) => qualification.trim() !== "")
      .join(", ");

    // Create FormData for submission
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("position", e.target.position.value);
    formData.append("qualifications", qualificationsString);
    formData.append("description", e.target.description.value);
    formData.append("redirect", e.target.redirect.value);

    // Add the image file if selected
    if (imageFile) {
      formData.append("file", imageFile, imageFile.name);
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
          Edit Team Member
        </Heading>

        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Name</FormLabel>
            <Input
              type="text"
              defaultValue={employee.name}
              name="name"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Position</FormLabel>
            <Input
              type="text"
              defaultValue={employee.position}
              name="position"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Qualifications
            </FormLabel>
            <VStack spacing={2} align="stretch">
              {qualifications.map((qualification, index) => (
                <HStack key={index} spacing={2}>
                  <Input
                    placeholder={`Qualification ${
                      index + 1
                    } (e.g. PhD in Engineering)`}
                    size="lg"
                    fontSize={{ base: "md", md: "md" }}
                    value={qualification}
                    onChange={(e) => updateQualification(index, e.target.value)}
                    flex="1"
                  />
                  {qualifications.length > 1 && (
                    <IconButton
                      icon={<X />}
                      aria-label={`Remove qualification ${index + 1}`}
                      onClick={() => removeQualification(index)}
                      size="lg"
                      colorScheme="red"
                      variant="outline"
                    />
                  )}
                </HStack>
              ))}
              <Button
                leftIcon={<Plus />}
                onClick={addQualification}
                variant="outline"
                colorScheme="brand"
                size="sm"
                alignSelf="flex-start"
              >
                Add Qualification
              </Button>
            </VStack>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Add multiple qualifications, degrees, certifications, etc. They
              will be saved as comma-separated values.
            </Text>
          </FormControl>

          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Description
            </FormLabel>
            <Textarea
              defaultValue={employee.description}
              name="description"
              rows={5}
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              resize="vertical"
            />
          </FormControl>

          <FormControl mb={{ base: 3, md: 4 }} isInvalid={!!imageError}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Display Photo (Optional)
            </FormLabel>

            {/* Current Image Display */}
            {currentImage && (
              <Box
                mb={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
                bg="gray.50"
              >
                <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                  Current Photo:
                </Text>
                <Image
                  src={currentImage}
                  alt={employee.name}
                  maxH="200px"
                  mx="auto"
                  objectFit="contain"
                  borderRadius="md"
                />
              </Box>
            )}

            {/* New Image Preview */}
            {imagePreview && (
              <Box
                mb={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="green.200"
                bg="green.50"
              >
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  mb={2}
                  color="green.700"
                >
                  New Photo Preview:
                </Text>
                <Image
                  src={imagePreview}
                  alt="New photo preview"
                  maxH="200px"
                  mx="auto"
                  objectFit="contain"
                  borderRadius="md"
                />
                <Flex justify="center" mt={2}>
                  <Button
                    onClick={removeImage}
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<X size={16} />}
                  >
                    Remove New Photo
                  </Button>
                </Flex>
              </Box>
            )}

            {/* Upload Interface */}
            {!imagePreview && (
              <Box
                border="2px dashed"
                borderColor={imageError ? "red.300" : "gray.300"}
                borderRadius="md"
                p={6}
                textAlign="center"
                bg="gray.50"
                transition="all 0.2s"
                _hover={{
                  borderColor: imageError ? "red.400" : "brand.400",
                  bg: "brand.50",
                }}
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="imageUpload"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Upload size={24} />
                <Text
                  textAlign="center"
                  mt={2}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="500"
                >
                  Click to select new photo
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  JPEG, PNG only • Max 5MB
                </Text>
                <Button
                  mt={2}
                  onClick={() => document.getElementById("imageUpload").click()}
                  bg="gray.100"
                  size={{ base: "md", md: "lg" }}
                >
                  Browse Files
                </Button>
              </Box>
            )}

            {/* Display validation errors */}
            {imageError && (
              <Text fontSize={{ base: "xs", md: "sm" }} color="red.500" mt={1}>
                {imageError}
              </Text>
            )}

            {/* Display success message when file is selected and valid */}
            {!imageError && imageFile && (
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="green.500"
                mt={1}
              >
                New photo selected successfully
              </Text>
            )}

            {/* Display help text */}
            {!imageError && !imageFile && (
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mt={1}>
                {currentImage
                  ? "Upload a new photo to replace the current one (optional)"
                  : "Upload a photo for the team member (optional)"}
              </Text>
            )}
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
              loadingText="Saving"
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

export async function action({ request, params }) {
  const data = await request.formData();

  console.log("Form submission received with params:", params);
  console.log(
    "Form fields:",
    [...data.entries()].map((entry) => `${entry[0]}: ${entry[1]}`)
  );

  try {
    console.log("Sending request to:", getApiUrlWithId("employee", params.id));

    // Check if a new file was provided
    const hasNewFile =
      data.get("file") instanceof File && data.get("file").size > 0;

    if (hasNewFile) {
      // For multipart form data with file upload
      const formData = new FormData();
      formData.append("name", data.get("name"));
      formData.append("position", data.get("position"));
      formData.append("qualifications", data.get("qualifications"));
      formData.append("description", data.get("description"));
      formData.append("file", data.get("file"));

      const response = await fetch(getApiUrlWithId("employee", params.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (response.status === 404 || response.status === 400) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return { ok: false, error: errorData };
      }

      if (!response.ok) {
        console.error("Unexpected API error:", response.statusText);
        throw json({ message: "Failed to update employee" }, { status: 500 });
      }

      const responseData = await response.json();
      console.log("API response data:", responseData);
    } else {
      // For regular json data without file upload
      const employeeData = {
        name: data.get("name"),
        position: data.get("position"),
        qualifications: data.get("qualifications"),
        description: data.get("description"),
      };

      const response = await fetch(getApiUrlWithId("employee", params.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(employeeData),
      });

      console.log("Response status:", response.status);

      if (response.status === 404 || response.status === 400) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return { ok: false, error: errorData };
      }

      if (!response.ok) {
        console.error("Unexpected API error:", response.statusText);
        throw json({ message: "Failed to update employee" }, { status: 500 });
      }

      const responseData = await response.json();
      console.log("API response data:", responseData);
    }

    const redirect_path =
      data.get("redirect") ||
      "/l4m3r-secure-dashboard-panel/personnel-management";
    console.log("Redirecting to:", redirect_path);
    return redirect(redirect_path);
  } catch (error) {
    console.error("Exception during form submission:", error);
    throw json({ message: "Error submitting form" }, { status: 500 });
  }
}

export async function employeeLoader({ request, params }) {
  const response = await fetch(getApiUrlWithId("employee", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch employee details" },
      { status: 500 }
    );
  }

  const employee = await response.json();

  // Format displayPic data
  if (typeof employee.displayPic === "string") {
    try {
      employee.displayPic = employee.displayPic
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",");
    } catch (error) {
      employee.displayPic = [];
    }
  }

  return { employee };
}
