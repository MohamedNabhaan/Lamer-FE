import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { Form } from "react-router-dom";

export default function ContactUsForm() {
  return (
    <>
      <Form>
        <Stack>
          <FormControl>
            <FormLabel>Your Name</FormLabel>
            <Input type="Text" placeholder="Name" required name="name"></Input>
          </FormControl>
        </Stack>
      </Form>
    </>
  );
}
