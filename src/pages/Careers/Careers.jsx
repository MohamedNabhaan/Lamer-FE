import {
  Box,
  Heading,
  Container,
  Table,
  Link,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

export default function Careers() {
  let [vacancies, setVacancies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchVacancies() {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/vacancies");

      const resData = await response.json();

      resData.map((data) => {
        const vals = data.image
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");

        const date = new Date(data.created_at);
        data.created_at = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        data.image = vals;
      });

      setVacancies(resData);
      setIsFetching(false);
    }

    fetchVacancies();
  }, []);

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
          Careers
        </Heading>
        <Box paddingTop={8} w={"80%"}>
          <Text fontSize={"2xl"} paddingBottom={2}>
            Become part of our team.
          </Text>
          <Text fontSize={"2xl"}>
            We are looking for skilled individuals with a passion for the
            enviroment and marine life. We value honesty, integrity and taking
            pride in our work.
          </Text>
        </Box>
      </Container>
      <Stack
        direction={"column"}
        spacing={4}
        paddingInline={24}
        paddingTop={8}
        paddingBottom={12}
      >
        {vacancies.map((vacancy) => {
          return (
            <Card variant={"outline"}>
              <CardHeader borderBottom={"solid"} borderColor={"design.100"}>
                <Heading as="h2" size="2xl" fontWeight={500} paddingBottom={2}>
                  {vacancy.positionName}
                </Heading>
                <Text>Posted On : {vacancy.created_at}</Text>
              </CardHeader>
              <CardBody>
                <Text>{vacancy.desc}</Text>
              </CardBody>

              <CardFooter justifyContent={"space-between"}>
                <Stack direction="row">
                  <Box
                    bgColor="brand.400"
                    padding={1.5}
                    borderRadius={16}
                    spacing={2}
                  >
                    <Text>{vacancy.positionStatus}</Text>
                  </Box>
                  <Box
                    bgColor="brand.400"
                    padding={1.5}
                    borderRadius={16}
                    spacing={2}
                  >
                    <Text>{vacancy.experience}</Text>
                  </Box>
                </Stack>
                <Center>
                  <Link href={vacancy.image[0]} isExternal>
                    Learn More.... <ExternalLinkIcon mx="2px" />
                  </Link>
                </Center>
              </CardFooter>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
