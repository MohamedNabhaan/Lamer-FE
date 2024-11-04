import { Box, Heading } from "@chakra-ui/react";

export default function SIRC() {
  return (
    <>
      <Box minH={"28rem"}>
        <Heading
          borderLeft={"solid 20px"}
          paddingLeft={2}
          as="h1"
          size={"3xl"}
          fontWeight={500}
          color={"brand.400"}
          display={"block"}
        >
          Services
        </Heading>
      </Box>
    </>
  );
}
