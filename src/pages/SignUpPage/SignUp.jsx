import { useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  Link,
} from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api.js";
import { Box, Flex, Container, useColorModeValue } from "@chakra-ui/react";
import SignUpForm from "../../components/SignUpForm";
import { json } from "react-router-dom";

export default function SignUpPage() {
  const bgGradient = useColorModeValue(
    "linear(to-br, brand.50, blue.50, purple.50)",
    "linear(to-br, gray.900, brand.900, blue.900)"
  );

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="-50px"
        right="-50px"
        w="200px"
        h="200px"
        bg={useColorModeValue("brand.100", "brand.800")}
        borderRadius="full"
        opacity={0.3}
        filter="blur(40px)"
      />
      <Box
        position="absolute"
        bottom="-100px"
        left="-100px"
        w="300px"
        h="300px"
        bg={useColorModeValue("blue.100", "blue.800")}
        borderRadius="full"
        opacity={0.2}
        filter="blur(60px)"
      />
      <Box
        position="absolute"
        top="50%"
        left="10%"
        w="150px"
        h="150px"
        bg={useColorModeValue("purple.100", "purple.800")}
        borderRadius="full"
        opacity={0.1}
        filter="blur(30px)"
      />

      {/* Main content */}
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        position="relative"
        zIndex={1}
      >
        <Container maxW="lg" py={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }}>
          <SignUpForm />
        </Container>
      </Flex>
    </Box>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  };

  // Basic validation
  if (authData.password !== authData.confirmPassword) {
    return json({ message: "Passwords do not match" }, { status: 400 });
  }

  if (authData.password.length < 6) {
    return json(
      { message: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_ENDPOINTS.SIGN_IN.replace(
        "/auth/signin",
        "/unapproved-users/signup"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": null,
        },
        credentials: "include",
        body: JSON.stringify({
          username: authData.username,
          email: authData.email,
          password: authData.password,
        }),
      }
    );

    if (response.status === 400) {
      const errorData = await response.json();
      return json(
        { message: errorData.message || "Registration failed" },
        { status: 400 }
      );
    }

    if (response.status === 409) {
      return json({ message: "User already exists" }, { status: 409 });
    }

    if (!response.ok) {
      throw json({ message: "Registration failed" }, { status: 500 });
    }

    // Successful registration - redirect to login
    return redirect("/l4m3r-management-portal-auth?created=true");
  } catch (error) {
    console.error("Registration error:", error);
    return json(
      { message: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
