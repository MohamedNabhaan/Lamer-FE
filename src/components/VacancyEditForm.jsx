import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Container,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  json,
  useSubmit,
} from "react-router-dom";
import {
  ArchiveRestore,
  X,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";

export default function VacancyEditForm() {
  const { vacancy } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const redirectTo = location.state?.from || "/Admin/Careers";
  const toast = useToast();
  const [pdfFile, setPdfFile] = useState(null);
  const [currentPdfUrl, setCurrentPdfUrl] = useState(
    vacancy.image && vacancy.image.length > 0 ? vacancy.image[0] : null
  );

  const handleCancel = () => {
    navigate(redirectTo);
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Create a new FormData object for submission
    const formData = new FormData();

    // Add form fields
    formData.append("positionName", e.target.positionName.value);
    formData.append("desc", e.target.desc.value);
    formData.append("positionStatus", e.target.positionStatus.value);
    formData.append("experience", e.target.experience.value);
    formData.append("redirect", e.target.redirect.value);

    // Add the PDF file if selected
    if (pdfFile) {
      formData.append("file", pdfFile, pdfFile.name);
    }

    // Submit the form using the react-router-dom's submit function
    submit(formData, {
      method: "post",
      action: `/Admin/Careers/Edit/${vacancy.id}`,
      encType: "multipart/form-data",
    });
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
      // When a new file is selected, hide the current PDF link
      setCurrentPdfUrl(null);
    }
  }

  function removePdf() {
    setPdfFile(null);
    // Show the original PDF link again if available
    setCurrentPdfUrl(
      vacancy.image && vacancy.image.length > 0 ? vacancy.image[0] : null
    );
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
          Edit Vacancy
        </Heading>

        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Position Name
            </FormLabel>
            <Input
              type="text"
              defaultValue={vacancy.positionName}
              name="positionName"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Description
            </FormLabel>
            <Textarea
              defaultValue={vacancy.desc}
              name="desc"
              rows={6}
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              resize="vertical"
            />
          </FormControl>

          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Position Status
            </FormLabel>
            <Select
              defaultValue={vacancy.positionStatus}
              name="positionStatus"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            >
              <option value={"Full-time"}>Full-time</option>
              <option value={"Part-time"}>Part-time</option>
              <option value={"Contract"}>Contract</option>
              <option value={"Internship"}>Internship</option>
            </Select>
          </FormControl>

          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Experience (Years)
            </FormLabel>
            <NumberInput
              defaultValue={vacancy.experience}
              min={0}
              max={20}
              size="lg"
            >
              <NumberInputField
                name="experience"
                fontSize={{ base: "md", md: "md" }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Job Description PDF
            </FormLabel>

            {currentPdfUrl && (
              <Flex
                alignItems="center"
                mb={4}
                bg="gray.50"
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              >
                <Text mr={2} fontWeight="medium">
                  Current PDF:
                </Text>
                <Link
                  href={currentPdfUrl}
                  isExternal
                  color="blue.500"
                  display="inline-flex"
                  alignItems="center"
                >
                  View PDF{" "}
                  <ExternalLinkIcon size={16} style={{ marginLeft: "4px" }} />
                </Link>
              </Flex>
            )}

            <Box
              border="solid 1px"
              padding={4}
              borderRadius={8}
              borderColor="design.100"
            >
              <input
                type="file"
                accept=".pdf"
                id="pdfUpload"
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
                  {pdfFile
                    ? "New file selected"
                    : "Click to select a new PDF or drag and drop"}
                </Text>
                <Button
                  mt={2}
                  onClick={() => document.getElementById("pdfUpload").click()}
                  bg="gray.100"
                  size={{ base: "md", md: "lg" }}
                >
                  Browse Files
                </Button>
              </Flex>
            </Box>

            {pdfFile && (
              <Flex
                mt={2}
                bg="gray.100"
                p={2}
                borderRadius={4}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  isTruncated
                  maxW="80%"
                >
                  {pdfFile.name}
                </Text>
                <Button size="sm" onClick={removePdf} variant="ghost">
                  <X size={16} />
                </Button>
              </Flex>
            )}

            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mt={1}>
              Upload a new PDF file to replace the current one (optional)
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
    console.log(
      "Sending request to:",
      `http://localhost:3000/vacancies/${params.id}`
    );

    // Check if a new file was provided
    const hasNewFile =
      data.get("file") instanceof File && data.get("file").size > 0;

    // Create a form data object if we have a file to upload
    if (hasNewFile) {
      // For multipart form data with file upload
      const formData = new FormData();
      formData.append("positionName", data.get("positionName"));
      formData.append("desc", data.get("desc"));
      formData.append("positionStatus", data.get("positionStatus"));
      formData.append("experience", data.get("experience"));
      formData.append("file", data.get("file"));

      const response = await fetch(
        `http://localhost:3000/vacancies/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": null,
          },
          credentials: "include",
          body: formData,
        }
      );

      console.log("Response status:", response.status);

      if (response.status === 404 || response.status === 400) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return { ok: false, error: errorData };
      }

      if (!response.ok) {
        console.error("Unexpected API error:", response.statusText);
        throw json({ message: "Failed to update vacancy" }, { status: 500 });
      }

      const responseData = await response.json();
      console.log("API response data:", responseData);
    } else {
      // For regular json data without file upload
      const jsonData = {
        positionName: data.get("positionName"),
        desc: data.get("desc"),
        positionStatus: data.get("positionStatus"),
        experience: data.get("experience"),
      };

      const response = await fetch(
        `http://localhost:3000/vacancies/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": null,
          },
          credentials: "include",
          body: JSON.stringify(jsonData),
        }
      );

      console.log("Response status:", response.status);

      if (response.status === 404 || response.status === 400) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return { ok: false, error: errorData };
      }

      if (!response.ok) {
        console.error("Unexpected API error:", response.statusText);
        throw json({ message: "Failed to update vacancy" }, { status: 500 });
      }

      const responseData = await response.json();
      console.log("API response data:", responseData);
    }

    const redirect_path = data.get("redirect") || "/Admin/Careers";
    console.log("Redirecting to:", redirect_path);
    return redirect(redirect_path);
  } catch (error) {
    console.error("Exception during form submission:", error);
    throw json({ message: "Error submitting form" }, { status: 500 });
  }
}

export async function vacancyLoader({ request, params }) {
  const response = await fetch("http://localhost:3000/vacancies/" + params.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch vacancy details" }, { status: 500 });
  }

  const vacancy = await response.json();

  // Parse image field if it exists
  if (vacancy.image) {
    try {
      // Try to parse if it's a string
      if (typeof vacancy.image === "string") {
        const vals = vacancy.image
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");
        vacancy.image = vals;
      }
    } catch (error) {
      console.error("Error parsing vacancy image:", error);
    }
  }

  return { vacancy };
}
