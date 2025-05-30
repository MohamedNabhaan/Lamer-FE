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
import { Form, redirect, useNavigate, useSubmit } from "react-router-dom";
import { useState, useRef } from "react";
import { SERVICE_CATEGORIES } from "../index.js";
import { Upload, X, ImageIcon } from "lucide-react";

export default function ServiceAddForm() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const toast = useToast();
  const [bannerPic, setBannerPic] = useState(null);
  const [pagePics, setPagePics] = useState([]);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewPagePics, setPreviewPagePics] = useState([]);
  const bannerInputRef = useRef(null);
  const pagePicsInputRef = useRef(null);

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
    URL.revokeObjectURL(newPreviews[index]);
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
              Create
            </Button>
            <Button
              onClick={() => navigate("/Admin/Services")}
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

export async function action({ request }) {
  const formData = await request.formData();

  try {
    const response = await fetch("http://localhost:3000/services/create", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to create service");
    }

    return redirect("/Admin/Services");
  } catch (error) {
    console.error("Error creating service:", error);
    return { error: error.message };
  }
}
