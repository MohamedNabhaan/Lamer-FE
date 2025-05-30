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
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, redirect, useNavigate, useSubmit } from "react-router-dom";

export default function ResearchAddForm() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const toast = useToast();
  const [errors, setErrors] = useState({});

  function validateForm(formData) {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    if (!formData.link) {
      newErrors.link = "Link is required";
    } else if (!isValidUrl(formData.link)) {
      newErrors.link = "Please enter a valid URL";
    }

    if (!formData.authors) {
      newErrors.authors = "Authors are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData);

    if (!validateForm(formObject)) {
      toast({
        title: "Error",
        description: "Please check the form for errors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    submit(formData, {
      method: "post",
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
          Add Research
        </Heading>

        <Form method="post" onSubmit={handleSubmit}>
          <FormControl isRequired mb={4} isInvalid={errors.title}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Title</FormLabel>
            <Input
              name="title"
              placeholder="Research paper title"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
            {errors.title && (
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired mb={4} isInvalid={errors.link}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Link</FormLabel>
            <Input
              name="link"
              placeholder="https://example.com/research-paper"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
            {errors.link && <FormErrorMessage>{errors.link}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired mb={4} isInvalid={errors.authors}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Authors</FormLabel>
            <Input
              name="authors"
              placeholder="e.g. John Doe, Jane Smith"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
            {errors.authors && (
              <FormErrorMessage>{errors.authors}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Year</FormLabel>
            <Input
              name="year"
              placeholder="e.g. 2023"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              type="number"
              min="1900"
              max="2100"
            />
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
              Create
            </Button>
            <Button
              onClick={() => navigate("/Admin/Research")}
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
  const formObject = Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:3000/research/create", {
      method: "POST",
      body: JSON.stringify({
        title: formObject.title,
        link: formObject.link,
        authors: formObject.authors,
        year: formObject.year || undefined,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": null,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to create research entry");
    }

    return redirect("/Admin/Research");
  } catch (error) {
    console.error("Error creating research entry:", error);
    return { error: error.message };
  }
}
