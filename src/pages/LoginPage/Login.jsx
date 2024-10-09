import {
  Box,
  Heading,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm";
import { json, redirect } from "react-router-dom";

export default function LoginPage() {
  return (
    <Box height={"100vh"} bgColor={"design.200"}>
      <Container
        maxW={"container.xl"}
        borderBottom={"solid"}
        paddingBlock={20}
        borderColor={"design.200"}
      >
        <Heading textAlign={"center"} color={"brand.400"}>
          LoginPage
        </Heading>
      </Container>

      <AuthForm />
    </Box>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(JSON.stringify(authData));
  const response = await fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
    body: JSON.stringify(authData),
  });

  if (response.status === 404 || response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Authentication issue" }, { status: 500 });
  }

  const resData = await response.json();
  const session = response.session;
  console.log("session", session);
  console.log(document.cookies);
  for (let entry of response.headers.entries()) {
    console.log("header", entry);
  }
  //console.log(document.cookie);
  //console.log(response.session);
  //   resData.headers.forEach(console.log);

  return redirect("/AdminDash/Projects");
}
