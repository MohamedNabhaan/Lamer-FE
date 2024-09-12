import { Box, Heading, Container, Stack, Text } from "@chakra-ui/react";

export default function AboutUs() {
  return (
    <Box>
      <Container
        maxW={"container.xl"}
        paddingTop={12}
        paddingLeft={20}
        paddingBottom={12}
        borderBottom={"solid"}
        borderColor={"design.200"}
        justifyContent={"center"}
      >
        <Heading
          as="h1"
          size={"3xl"}
          fontWeight={500}
          color={"brand.400"}
          display={"block"}
        >
          About Us
        </Heading>
      </Container>
      <Box paddingInline={16} paddingTop={8} height={"60vh"}>
        <Heading as="h2" size={"lg"}>
          Company History
        </Heading>
      </Box>
    </Box>
  );
}
