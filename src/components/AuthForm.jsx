import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

export default function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isLoginIn = navigation.state === "submitting";

  return (
    <Form method="post">
      <Stack
        border={"solid"}
        borderColor={"design.100"}
        mx={"auto"}
        w={"25%"}
        direction={"column"}
        justifyContent={"center"}
        padding={12}
        borderRadius={20}
      >
        {data && data.errors && (
          <Box>
            {Object.values(data.errors).map((err) => (
              <Text>{err}</Text>
            ))}
          </Box>
        )}
        {data && data.message && <Text>{data.message}</Text>}
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Email..."
            required
            name="email"
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter Password..."
            required
            name="password"
          ></Input>
        </FormControl>
        <Center paddingTop={4}>
          <Button w={"50%"} type="submit" disabled={isLoginIn}>
            {isLoginIn ? "Login in..." : "Login"}
          </Button>
        </Center>
      </Stack>
    </Form>
  );
}
