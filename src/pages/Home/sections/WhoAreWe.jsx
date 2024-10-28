import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Flex,
  Text,
  Stack,
} from "@chakra-ui/react";
import { FOUNDERS } from "../../..";

export default function WhoAreWe() {
  return (
    <>
      <Box
        minH={{ base: "115rem", md: "40rem" }}
        marginBottom={12}
        paddingTop={4}
      >
        {/* <Heading
          as="h1"
          size={"4xl"}
          textAlign={"center"}
          paddingInline={16}
          paddingTop={8}
          paddingBottom={4}
        >
          Who Are We?
        </Heading> */}
        <Heading
          as="h2"
          size={"3xl"}
          fontWeight={600}
          paddingLeft={{ base: 8, md: 20 }}
          paddingTop={4}
          paddingBottom={4}
          color={"brand.400"}
        >
          {" "}
          The Faces of LAMER Group.
        </Heading>
        <Heading
          as={"h3"}
          paddingLeft={{ base: 8, md: 24 }}
          fontWeight={400}
          size={"lg"}
          color={"blackAlpha.600"}
          paddingBottom={6}
        >
          The people who will provide you with most optimal solution.
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 12, md: 8 }}
          paddingInline={12}
          paddingTop={8}
        >
          {FOUNDERS.map((founder) => {
            return (
              <Flex
                justifyContent={"center"}
                position={"relative"}
                marginBottom={16}
              >
                <Box w={"20rem"} h={"full"} spacing={4} position={"relative"}>
                  <Image
                    borderRadius={"1rem"}
                    w={"20rem"}
                    h={"24rem"}
                    objectFit={"cover"}
                    src={founder.picture}
                    position={"relative"}
                  ></Image>

                  <Box
                    w={"16rem"}
                    bgColor={"white"}
                    paddingInline={1}
                    paddingBlock={2}
                    boxShadow={"0px 8px 24px grey"}
                    borderRadius={"1rem"}
                    position={"absolute"}
                    bottom={-16}
                    marginInline={"auto"}
                    left={0}
                    right={0}
                  >
                    <Text textAlign={"center"} fontWeight={600} fontSize={"xl"}>
                      {founder.name}
                    </Text>
                    <Text
                      textAlign={"center"}
                      color={"brand.400"}
                      fontWeight={500}
                      paddingBottom={2}
                    >
                      {founder.title}
                    </Text>
                    <Text textAlign={"center"} color={"grey"} fontSize={"sm"}>
                      {founder.experience} Years of Experience
                    </Text>
                    {founder.credentials.map((credential) => {
                      return (
                        <Text
                          textAlign={"center"}
                          color={"grey"}
                          fontSize={"xs"}
                          paddingInline={2}
                        >
                          {credential}
                        </Text>
                      );
                    })}
                  </Box>
                </Box>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
}
