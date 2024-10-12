import { Box, Heading, Container, Stack, Text } from "@chakra-ui/react";

export default function Team() {
  return (
    <Box minH={"72vh"}>
      <Container
        maxW={"container.xl"}
        paddingTop={12}
        paddingLeft={20}
        paddingBottom={16}
        borderBottom={"solid"}
        borderColor={"design.100"}
        justifyContent={"center"}
      >
        <Stack direction={"column"} spacing={10}>
          <Heading
            borderLeft={"solid 20px"}
            paddingLeft={2}
            as="h1"
            size={"3xl"}
            fontWeight={500}
            color={"brand.400"}
            display={"block"}
          >
            Our Team
          </Heading>
        </Stack>
      </Container>
      <Text>LOl</Text>
    </Box>
  );
}
