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
} from "@chakra-ui/react";
import {
  Form,
  redirect,
  useNavigate,
  useSubmit,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { SERVICE_CATEGORIES } from "../index.js";
import { Upload, X, ImageIcon } from "lucide-react";

export default function ServiceEditForm() {
  const service = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/Admin/Services";
  const submit = useSubmit();
  const toast = useToast();

  const [bannerPic, setBannerPic] = useState(null);
  const [pagePics, setPagePics] = useState([]);
  const [previewBanner, setPreviewBanner] = useState(service.bannerPic || null);
  const [previewPagePics, setPreviewPagePics] = useState([]);
  const bannerInputRef = useRef(null);
  const pagePicsInputRef = useRef(null);

  useEffect(() => {
    // Handle existing pagePics if they exist
    if (service.pagePics) {
      try {
        // Check if pagePics is a string that needs to be parsed
        const pagePicsArray =
          typeof service.pagePics === "string"
            ? JSON.parse(service.pagePics)
            : Array.isArray(service.pagePics)
            ? service.pagePics
            : [];

        setPreviewPagePics(Array.isArray(pagePicsArray) ? pagePicsArray : []);
      } catch (error) {
        console.error("Error parsing pagePics:", error);
        setPreviewPagePics([]);
      }
    }
  }, [service]);

  function handleBannerChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerPic(file);
      setPreviewBanner(URL.createObjectURL(file));
    }
  }

  function handlePagePicsChange(e) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 2); // Limit to 2 files
      setPagePics(filesArray);

      const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewPagePics(previewsArray);

      if (filesArray.length > 2) {
        toast({
          title: "Maximum 2 page pictures allowed",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  function removeBannerPic() {
    setBannerPic(null);
    setPreviewBanner(null);
    if (bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
  }

  function removePagePic(index) {
    const newPagePics = [...pagePics];
    newPagePics.splice(index, 1);
    setPagePics(newPagePics);

    const newPreviews = [...previewPagePics];
    if (
      typeof newPreviews[index] === "string" &&
      newPreviews[index].startsWith("blob:")
    ) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    newPreviews.splice(index, 1);
    setPreviewPagePics(newPreviews);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // Add all text fields
    formData.append("serviceName", e.target.serviceName.value);
    formData.append("serviceCategory", e.target.serviceCategory.value);
    formData.append("intro", e.target.intro.value);
    formData.append("body", e.target.body.value);
    formData.append("softwares", e.target.softwares.value);
    formData.append("equipment", e.target.equipment.value);
    formData.append("redirect", e.target.redirect.value);

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
      action: `/Admin/Services/Edit/${service.id}`,
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

            <GridItem colSpan={{ base: 1, md: 1 }}>
              <FormControl mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Banner Image
                </FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  id="bannerPic"
                  name="bannerPic"
                  ref={bannerInputRef}
                  onChange={handleBannerChange}
                  display="none"
                />
                <Flex
                  border="1px dashed"
                  borderColor="gray.300"
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
                >
                  {previewBanner ? (
                    <>
                      <Image
                        src={previewBanner}
                        alt="Banner preview"
                        maxH="140px"
                        objectFit="contain"
                      />
                      <Button
                        position="absolute"
                        top={1}
                        right={1}
                        size="xs"
                        colorScheme="red"
                        borderRadius="full"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBannerPic();
                        }}
                      >
                        <X size={14} />
                      </Button>
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
                <Textarea
                  name="softwares"
                  defaultValue={service.softwares}
                  placeholder="Software used in this service..."
                  rows={3}
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  resize="vertical"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 1 }}>
              <FormControl isRequired mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Equipment
                </FormLabel>
                <Textarea
                  name="equipment"
                  defaultValue={service.equipment}
                  placeholder="Equipment used in this service..."
                  rows={3}
                  size="lg"
                  fontSize={{ base: "md", md: "md" }}
                  resize="vertical"
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl mb={{ base: 3, md: 4 }}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>
                  Page Images (max 2)
                </FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  id="pagePics"
                  name="pagePics"
                  multiple
                  ref={pagePicsInputRef}
                  onChange={handlePagePicsChange}
                  display="none"
                />
                <Flex
                  border="1px dashed"
                  borderColor="gray.300"
                  borderRadius="md"
                  p={4}
                  direction="column"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  minH="150px"
                  onClick={() => pagePicsInputRef.current.click()}
                  bg="gray.50"
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
  const response = await fetch(`http://localhost:3000/services/${params.id}`, {
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
  const redirectPath = formData.get("redirect") || "/Admin/Services";

  try {
    // For PATCH requests with files, we need to send the formData directly
    const response = await fetch(
      `http://localhost:3000/services/${params.id}`,
      {
        method: "PATCH",
        body: formData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update service");
    }

    return redirect(redirectPath);
  } catch (error) {
    console.error("Error updating service:", error);
    return { error: error.message };
  }
}
