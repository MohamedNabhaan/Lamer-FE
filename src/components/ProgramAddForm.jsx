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
} from "@chakra-ui/react";
import { Form, redirect, useSubmit } from "react-router-dom";
import { useState } from "react";

export default function ProgramAddForm() {
  const submit = useSubmit();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // Get each form field value
    formData.append(e.target.title.name, e.target.title.value);
    formData.append(e.target.desc.name, e.target.desc.value);
    if (e.target.duration.value) {
      formData.append(e.target.duration.name, e.target.duration.value);
    }

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
          Create a Program
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
              name="title"
              placeholder="e.g. Environmental Conservation Program"
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
              placeholder="Detailed program description..."
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
              name="duration"
              placeholder="e.g. 3 months, 1 year, etc."
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mt={1}>
              Enter the expected duration of the program (optional)
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
  const formData = Object.fromEntries(data);

  try {
    const response = await fetch("http://localhost:3000/programs/create", {
      method: "POST",
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
    });

    if (!response.ok) {
      throw new Error("Failed to create program");
    }

    return redirect("/Admin/Programs");
  } catch (error) {
    console.error("Error creating program:", error);
    return { error: error.message };
  }
}
