import {
  Box,
  Heading,
  Container,
  Stack,
  Text,
  SimpleGrid,
  Image,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import pfp from "../../assets/pfp.png";

export default function Team() {
  let [employees, setEmployees] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    async function fetchEmployees() {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/employee");

      const resData = await response.json();

      resData.map((data) => {
        const vals = data.displayPic
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");
        data.displayPic = vals;
      });

      setEmployees(resData);
      setIsFetching(false);
    }

    fetchEmployees();
  }, []);

  function handleClick() {
    setClicked(!clicked);
  }

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
          <Text>
            We are a highly committed team of environmental engineers, analysts,
            surveyors, environmental scientists as well as marine
            ecologists/biologists dedicated in helping you make environmentally
            sound decisions through systematic research and open communication
            with stakeholders.
          </Text>
          <Text>
            Our team members have extensive experience with significant projects
            from public and private sector development. The key members of the
            firm have been involved in national and international level coral
            reef conservation and management initiatives and have expertise and
            experience assessing and recommending management options in marine
            and coastal environmental issues .
          </Text>
        </Stack>
      </Container>
      <Box>
        {isFetching ? (
          <Stack>
            <Heading padding={12} textAlign={"center"} color={"brand.400"}>
              Loading.....
            </Heading>
          </Stack>
        ) : (
          <Container maxW={"container.lg"} padding={0}>
            <Flex
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
            >
              {employees.map((employee) => {
                return (
                  <Stack
                    flexBasis={{ base: "100%", sm: "50%", md: "33.33" }}
                    padding={8}
                  >
                    <Box
                      width={{ base: "60vh", md: "20vh" }}
                      height={{ base: "70vh", md: "30vh" }}
                      justifyContent={{ base: "center", md: "flex-start" }}
                      alignItems={{ base: "center", md: "flex-start" }}
                    >
                      <Image
                        borderRadius={10}
                        width={"100%"}
                        height={"100%"}
                        objectFit={"cover"}
                        src={employee.displayPic}
                        fallbackSrc={pfp}
                        boxShadow={"lg"}
                      ></Image>
                    </Box>
                    <Box paddingBlock={2}>
                      <Text
                        fontSize={"xl"}
                        fontWeight={"800"}
                        paddingTop={1}
                        paddingLeft={2}
                      >
                        {employee.name}
                      </Text>
                      <Text
                        fontSize={"lg"}
                        fontWeight={"500"}
                        paddingBottom={1}
                        paddingLeft={2}
                      >
                        {employee.position}
                      </Text>

                      <Text
                        fontSize={"md"}
                        color={"gray.500"}
                        fontWeight={"500"}
                        paddingTop={2}
                        paddingBottom={1}
                        paddingLeft={2}
                      >
                        {employee.qualifications}
                      </Text>
                    </Box>
                  </Stack>
                );
              })}
            </Flex>
          </Container>
        )}
      </Box>
    </Box>
  );
}
