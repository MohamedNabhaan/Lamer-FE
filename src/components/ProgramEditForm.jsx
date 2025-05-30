import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";

export default function ProgramEditForm() {
  const program = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const redirectTo = location.state?.from || "/Admin/Programs";
  const toast = useToast();

  const handleCancel = () => {
    navigate(redirectTo);
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Create a new FormData object for submission
    const formData = new FormData();

    // Add form fields
    formData.append("title", e.target.title.value);
    formData.append("desc", e.target.desc.value);
    formData.append("duration", e.target.duration.value || "");
    formData.append("redirect", e.target.redirect.value);

    // Submit the form using the react-router-dom's submit function
    submit(formData, {
      method: "post",
      action: `/Admin/Programs/Edit/${program.id}`,
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
          Edit Program
        </Heading>

        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Program Title
            </FormLabel>
            <Input
              type="text"
              defaultValue={program.title}
              name="title"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl isRequired mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Description
            </FormLabel>
            <Textarea
              defaultValue={program.desc}
              name="desc"
              rows={6}
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              resize="vertical"
            />
          </FormControl>

          <FormControl mb={{ base: 3, md: 4 }}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Duration</FormLabel>
            <Input
              type="text"
              defaultValue={program.duration}
              name="duration"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
              placeholder="e.g. 3 months, 1 year, etc."
            />
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

export async function programLoader({ params }) {
  const response = await fetch(`http://localhost:3000/programs/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load program");
  }

  const program = await response.json();
  return program;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  try {
    const response = await fetch(
      `http://localhost:3000/programs/${params.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: formData.title,
          desc: formData.desc,
          duration: formData.duration || undefined,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": null,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update program");
    }

    const redirect_path = formData.redirect || "/Admin/Programs";
    return redirect(redirect_path);
  } catch (error) {
    console.error("Error updating program:", error);
    return { error: error.message };
  }
}
