import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useToast,
  Container,
  Image,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  json,
  useSubmit,
} from "react-router-dom";
import { ArchiveRestore, X } from "lucide-react";
import { getApiUrlWithId } from "../config/api.js";

export default function ClientEditForm() {
  const { client } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const redirectTo =
    location.state?.from || "/l4m3r-secure-dashboard-panel/client-registry";
  const toast = useToast();
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(
    client.logo && client.logo[0] ? client.logo[0] : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    navigate(redirectTo);
  };

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

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData for text-only updates (API doesn't handle file uploads in PATCH)
    const formData = new FormData();
    formData.append("clientName", e.target.clientName.value);
    formData.append("redirect", e.target.redirect.value);

    // Submit the form using the react-router-dom's submit function
    submit(formData, {
      method: "post",
      action: getApiUrlWithId("clients", client.id),
      encType: "multipart/form-data",
    });
  }

  // This would be a separate API call if needed for logo uploads
  async function handleLogoUpload() {
    if (!logoFile) return;

    setIsSubmitting(true);
    // This part would need to be implemented if the API supports a separate
    // endpoint for logo uploads. Currently the backend doesn't support this.
    toast({
      title: "Logo updates not supported",
      description:
        "The API currently doesn't support logo updates via PATCH endpoint",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    setIsSubmitting(false);
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
          Edit Client
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
              defaultValue={client.clientName}
              name="clientName"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Logo</FormLabel>
            <Text fontSize={{ base: "xs", md: "sm" }} color="orange.500" mb={2}>
              Note: Logo updates are not supported with the current API
            </Text>

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
              </Box>
            )}

            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mt={1}>
              To update the logo, please create a new client entry
            </Text>
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
    console.log("Sending request to:", getApiUrlWithId("clients", params.id));

    // The update DTO doesn't include logo field, so we only send text data
    const clientData = {
      clientName: data.get("clientName"),
    };

    const response = await fetch(getApiUrlWithId("clients", params.id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(clientData),
    });

    console.log("Response status:", response.status);

    if (response.status === 404 || response.status === 400) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return { ok: false, error: errorData };
    }

    if (!response.ok) {
      console.error("Unexpected API error:", response.statusText);
      throw json({ message: "Failed to update client" }, { status: 500 });
    }

    const responseData = await response.json();
    console.log("API response data:", responseData);

    const redirect_path =
      data.get("redirect") || "/l4m3r-secure-dashboard-panel/client-registry";
    console.log("Redirecting to:", redirect_path);
    return redirect(redirect_path);
  } catch (error) {
    console.error("Exception during form submission:", error);
    throw json({ message: "Error submitting form" }, { status: 500 });
  }
}

export async function clientLoader({ request, params }) {
  const response = await fetch(getApiUrlWithId("clients", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch client details" }, { status: 500 });
  }

  const client = await response.json();

  // Format logo data
  if (typeof client.logo === "string") {
    try {
      client.logo = client.logo
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",");
    } catch (error) {
      client.logo = [];
    }
  }

  return { client };
}
