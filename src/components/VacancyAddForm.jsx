import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Container,
} from "@chakra-ui/react";
import { Form, redirect, useSubmit, json } from "react-router-dom";
import { useState } from "react";
import { ArchiveRestore, X } from "lucide-react";

export default function VacancyAddForm() {
  const submit = useSubmit();
  const [pdfFile, setPdfFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // Get each form field value
    formData.append(e.target.positionName.name, e.target.positionName.value);
    formData.append(e.target.desc.name, e.target.desc.value);
    formData.append(
      e.target.positionStatus.name,
      e.target.positionStatus.value
    );
    formData.append(e.target.experience.name, e.target.experience.value);

    // Add the PDF file if selected
    if (pdfFile) {
      formData.append("file", pdfFile, pdfFile.name);
    }

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  }

  function removePdf() {
    setPdfFile(null);
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
          Create a Vacancy
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
              name="positionName"
              placeholder="e.g. Senior Software Engineer"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Description
            </FormLabel>
            <Textarea
              name="desc"
              placeholder="Detailed job description..."
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
              name="positionStatus"
              placeholder="Select status"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Select>
          </FormControl>

          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Experience (Years)
            </FormLabel>
            <NumberInput min={0} max={20} defaultValue={2} size="lg">
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
                    ? "File selected"
                    : "Click to select PDF or drag and drop"}
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
              Upload a PDF file with detailed job description (optional)
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
  const vacancy = Object.fromEntries(data);

  // Create a form data object for the file upload
  const formData = new FormData();

  // Add all vacancy fields to the form data
  Object.keys(vacancy).forEach((key) => {
    if (key !== "file") {
      formData.append(key, vacancy[key]);
    }
  });

  // Add the PDF file if it exists
  if (data.get("file")) {
    formData.append("file", data.get("file"));
  }

  const response = await fetch("http://localhost:3000/vacancies/create", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
    body: formData,
  });

  if (response.status === 404 || response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Failed to create vacancy" }, { status: 500 });
  }

  return redirect("/Admin/Careers");
}
