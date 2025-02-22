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
        bgColor={"design.500"}
        marginTop={24}
        minH={{ base: "90rem", md: "40rem" }}
        marginBottom={10}
        paddingTop={4}
        paddingBottom={12}
      >
        
        <Heading
          as="h2"
          size={{base:"xl",md:"3xl"}}
          fontWeight={600}
          paddingLeft={{ base: 8, md: 20 }}
          paddingTop={4}
          paddingBottom={4}
          color={"brand.400"}
        >
          
          The Faces of LaMEr Group.
        </Heading>
        <Heading
          as={"h3"}
          paddingLeft={{ base: 8, md: 24 }}
          fontWeight={400}
          size={{base:"md",md:"lg"}}
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
                <Box w={{base:"14rem",md:"20rem"}} h={"full"} spacing={4} position={"relative"}>
                  <Image
                    borderRadius={"1rem"}
                    w={{base:"14rem",md:"18rem",lg:"20rem"}}
                    h={{base:"18rem",md:"20rem",lg:"24rem"}}
                    objectFit={"cover"}
                    src={founder.picture}
                    position={"relative"}
                  ></Image>

                  <Box
                    w={{base:"12rem",md:"12rem",lg:"16rem"}}
                    minH={{base:"7rem",lg:"8rem"}}
                    bgColor={"white"}
                    
                    paddingBlock={2}
                    boxShadow={"0px 8px 24px grey"}
                    borderRadius={"1rem"}
                    position={"absolute"}
                    bottom={-16}
                    marginInline={"auto"}
                    left={0}
                    right={0}
                  >
                    <Text textAlign={"center"} fontWeight={600} fontSize={{base:"md",md:"md",lg:"xl"}}>
                      {founder.name}
                    </Text>
                    <Text
                      textAlign={"center"}
                      color={"brand.400"}
                      fontWeight={500}
                      paddingBottom={2}
                      fontSize={{base:"smaller",md:"smaller",lg:"md"}}
                    >
                      {founder.title}
                    </Text>
                    <Text textAlign={"center"} color={"grey"} fontSize={{base:"x-small",md:"x-small",lg:"sm"}}>
                      {founder.experience} Years of Experience
                    </Text>
                    {founder.credentials.map((credential) => {
                      return (
                        <Text
                          textAlign={"center"}
                          color={"grey"}
                          fontSize={{base:"xx-small",md:"xx-small",lg:"x-small"}}
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
