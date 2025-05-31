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
  VStack,
  HStack,
  IconButton,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { getApiUrlWithId } from "../config/api.js";
import { Plus, X } from "lucide-react";

export default function ResearchEditForm() {
  const research = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const redirectTo =
    location.state?.from ||
    "/l4m3r-secure-dashboard-panel/research-publications";
  const toast = useToast();
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState([""]);
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

  // Parse existing authors on component mount
  useEffect(() => {
    if (research.authors) {
      // Split existing authors by comma and trim whitespace
      const authorList = research.authors
        .split(",")
        .map((author) => author.trim())
        .filter((author) => author !== "");

      if (authorList.length > 0) {
        setAuthors(authorList);
      }
    }

    // Set existing year or default to current year
    if (research.year) {
      setYear(parseInt(research.year, 10) || new Date().getFullYear());
    }
  }, [research.authors, research.year]);

  // Author management functions
  const addAuthor = () => {
    setAuthors([...authors, ""]);
  };

  const removeAuthor = (index) => {
    if (authors.length > 1) {
      const newAuthors = authors.filter((_, i) => i !== index);
      setAuthors(newAuthors);
    }
  };

  const updateAuthor = (index, value) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
    setErrors((prev) => ({ ...prev, authors: "" }));
  };

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

    // Validate authors - check if at least one non-empty author exists
    const nonEmptyAuthors = authors.filter((author) => author.trim() !== "");
    if (nonEmptyAuthors.length === 0) {
      newErrors.authors = "At least one author is required";
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

    // Combine all non-empty authors into a comma-separated string
    const authorsString = authors
      .filter((author) => author.trim() !== "")
      .join(", ");

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("link", e.target.link.value);
    formData.append("authors", authorsString);
    formData.append("year", year.toString()); // Convert year to string
    formData.append("redirect", redirectTo);

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

    submit(formData, { method: "post" });
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
          Edit Research
        </Heading>

        <Form method="post" onSubmit={handleSubmit}>
          <FormControl isRequired mb={4} isInvalid={errors.title}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Title</FormLabel>
            <Input
              name="title"
              defaultValue={research.title}
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
              defaultValue={research.link}
              placeholder="https://example.com/research-paper"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
            {errors.link && <FormErrorMessage>{errors.link}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired mb={4} isInvalid={errors.authors}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Authors</FormLabel>
            <VStack spacing={2} align="stretch">
              {authors.map((author, index) => (
                <HStack key={index} spacing={2}>
                  <Input
                    placeholder={`Author ${index + 1} name`}
                    size="lg"
                    fontSize={{ base: "md", md: "md" }}
                    value={author}
                    onChange={(e) => updateAuthor(index, e.target.value)}
                    flex="1"
                  />
                  {authors.length > 1 && (
                    <IconButton
                      icon={<X />}
                      aria-label={`Remove author ${index + 1}`}
                      onClick={() => removeAuthor(index)}
                      size="lg"
                      colorScheme="red"
                      variant="outline"
                    />
                  )}
                </HStack>
              ))}
              <Button
                leftIcon={<Plus />}
                onClick={addAuthor}
                variant="outline"
                colorScheme="brand"
                size="sm"
                alignSelf="flex-start"
              >
                Add Author
              </Button>
            </VStack>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Add multiple authors. They will be saved as comma-separated
              values.
            </Text>
            {errors.authors && (
              <FormErrorMessage>{errors.authors}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Year</FormLabel>
            <NumberInput
              value={year}
              onChange={(value) => setYear(value)}
              min={1900}
              max={2100}
              size="lg"
            >
              <NumberInputField
                fontSize={{ base: "md", md: "md" }}
                placeholder="e.g. 2023"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

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

export async function researchItemLoader({ params }) {
  const response = await fetch(getApiUrlWithId("research", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load research");
  }

  const research = await response.json();
  return research;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);
  const redirectPath =
    formObject.redirect ||
    "/l4m3r-secure-dashboard-panel/research-publications";

  try {
    const response = await fetch(getApiUrlWithId("research", params.id), {
      method: "PATCH",
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
      throw new Error("Failed to update research");
    }

    return redirect(redirectPath);
  } catch (error) {
    console.error("Error updating research:", error);
    return { error: error.message };
  }
}
