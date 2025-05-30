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

export default function EmployeeEditForm() {
  const { employee } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const redirectTo = location.state?.from || "/Admin/Team";
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    navigate(redirectTo);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData for text-only updates
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("position", e.target.position.value);
    formData.append("qualifications", e.target.qualifications.value);
    formData.append("description", e.target.description.value);
    formData.append("redirect", e.target.redirect.value);

    // Submit the form using the react-router-dom's submit function
    submit(formData, {
      method: "post",
      action: `/Admin/Team/Edit/${employee.id}`,
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
            <Textarea
              defaultValue={employee.qualifications}
              name="qualifications"
              rows={3}
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              resize="vertical"
            />
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

          <FormControl mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Display Photo
            </FormLabel>
            {employee.displayPic && employee.displayPic[0] && (
              <Box
                mb={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
              >
                <Image
                  src={employee.displayPic[0]}
                  alt={employee.name}
                  maxH="200px"
                  mx="auto"
                  objectFit="contain"
                  borderRadius="md"
                />
              </Box>
            )}
            <Text fontSize={{ base: "xs", md: "sm" }} color="orange.500" mt={1}>
              Note: Photo updates require creating a new team member entry
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
    console.log(
      "Sending request to:",
      `http://localhost:3000/employee/${params.id}`
    );

    // Create JSON data from form fields for PATCH request
    const employeeData = {
      name: data.get("name"),
      position: data.get("position"),
      qualifications: data.get("qualifications"),
      description: data.get("description"),
    };

    const response = await fetch(
      `http://localhost:3000/employee/${params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": null,
        },
        credentials: "include",
        body: JSON.stringify(employeeData),
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
      throw json({ message: "Failed to update employee" }, { status: 500 });
    }

    const responseData = await response.json();
    console.log("API response data:", responseData);

    const redirect_path = data.get("redirect") || "/Admin/Team";
    console.log("Redirecting to:", redirect_path);
    return redirect(redirect_path);
  } catch (error) {
    console.error("Exception during form submission:", error);
    throw json({ message: "Error submitting form" }, { status: 500 });
  }
}

export async function employeeLoader({ request, params }) {
  const response = await fetch("http://localhost:3000/employee/" + params.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
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
