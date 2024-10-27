import { Box, Heading, Container, Text } from "@chakra-ui/react";

export default function ContactUs() {
  return (
    <Box minH={"72vh"}>
      <Container
        maxW={"container.xl"}
        paddingTop={12}
        paddingLeft={20}
        paddingBottom={12}
        borderBottom={"solid"}
        borderColor={"design.100"}
        justifyContent={"center"}
      >
        <Heading
          borderLeft={"solid 20px"}
          as="h1"
          size={"3xl"}
          fontWeight={500}
          color={"brand.400"}
          display={"block"}
          paddingLeft={2}
          textAlign={{ base: "center", md: "left" }}
        >
          Contact Us
        </Heading>
        <Box paddingTop={8} w={"80%"}>
          <Text fontSize={"2xl"} paddingBottom={2}>
            Let us know how we can help you. Here are a few ways to reach our
            team.
          </Text>
        </Box>
      </Container>
      <Box>
        <Text>
          wedwedjweiodjiwedjioweid jweo dj
          djwediwjdoiwjdiowejdoiwejdoiwejdiowejd wdwodjweiodjwoidjowjdoiwej
          wjdoweidjwejdiwejdiwoedj wedjwedjweidj dw12e12e12e12e12e 12
        </Text>
        <Text>
          wedwedjweiodjiwedjioweid jweo dj
          djwediwjdoiwjdiowejdoiwejdoiwejdiowejd wdwodjweiodjwoidjowjdoiwej
          wjdoweidjwejdiwejdiwoedj wedjwedjweidj dw12e12e12e12e12e 12
        </Text>
      </Box>
    </Box>
  );
}
