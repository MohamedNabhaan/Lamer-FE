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
} from "@chakra-ui/react";
import { Form, redirect, useSubmit, json } from "react-router-dom";
import { useState } from "react";
import { ArchiveRestore, X } from "lucide-react";

export default function ClientAddForm() {
  const submit = useSubmit();
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // Get form field value
    formData.append(e.target.clientName.name, e.target.clientName.value);

    // Add the logo file if selected
    if (logoFile) {
      formData.append("file", logoFile);
    }

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);

      // Create preview URL for image
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  }

  function removeLogo() {
    setLogoFile(null);
    setLogoPreview("");
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
          Add New Client
        </Heading>

        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Client Name
            </FormLabel>
            <Input
              type="text"
              name="clientName"
              placeholder="e.g. Acme Corporation"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Logo</FormLabel>

            {logoPreview && (
              <Box
                mb={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
              >
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  maxH="150px"
                  mx="auto"
                  objectFit="contain"
                />
                <Flex justify="center" mt={2}>
                  <Button
                    onClick={removeLogo}
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<X size={16} />}
                  >
                    Remove Logo
                  </Button>
                </Flex>
              </Box>
            )}

            {!logoPreview && (
              <Box
                border="solid 1px"
                padding={4}
                borderRadius={8}
                borderColor="design.100"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="logoUpload"
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
                    textAlign="center"
                    mt={2}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Click to select logo image
                  </Text>
                  <Button
                    mt={2}
                    onClick={() =>
                      document.getElementById("logoUpload").click()
                    }
                    bg="gray.100"
                    size={{ base: "md", md: "lg" }}
                  >
                    Browse Files
                  </Button>
                </Flex>
              </Box>
            )}

            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mt={1}>
              Upload a logo image (JPG, PNG, SVG)
            </Text>
          </FormControl>

          <Flex
            mt={{ base: 6, md: 8 }}
            gap={4}
            width="100%"
            justifyContent={{ base: "center", sm: "flex-start" }}
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
          </Flex>
        </Form>
      </Box>
    </Container>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  try {
    console.log("Creating new client...");
    console.log(
      "Form fields:",
      [...data.entries()].map((entry) => `${entry[0]}: ${entry[1]}`)
    );

    const response = await fetch("http://localhost:3000/clients/create", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": null,
      },
      credentials: "include",
      body: data,
    });

    if (response.status === 404 || response.status === 400) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return { ok: false, error: errorData };
    }

    if (!response.ok) {
      console.error("Unexpected API error:", response.statusText);
      throw json({ message: "Failed to create client" }, { status: 500 });
    }

    const responseData = await response.json();
    console.log("Client created successfully:", responseData);

    return redirect("/Admin/Clients");
  } catch (error) {
    console.error("Exception during form submission:", error);
    throw json({ message: "Error creating client" }, { status: 500 });
  }
}
