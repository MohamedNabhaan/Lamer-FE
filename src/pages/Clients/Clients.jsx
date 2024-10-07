import {
  Box,
  Heading,
  Container,
  SimpleGrid,
  Card,
  Text,
  CardBody,
  Image,
  CardFooter,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
export default function Clients() {
  let [clients, setClients] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/clients");

      const resData = await response.json();

      resData.map((data) => {
        const vals = data.logo
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");
        data.logo = vals;
      });

      setClients(resData);
      setIsFetching(false);
    }

    fetchClients();
  }, []);

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
          textAlign={{ base: "center", md: "left" }}
        >
          Our Clients
        </Heading>
      </Container>
      <SimpleGrid
        columns={{ base: 2, sm: 4, md: 6 }}
        spacing={8}
        padding={{ base: 4, md: 12 }}
      >
        {clients.map((client) => {
          return (
            <Card
              maxW={"sm"}
              variant={"outline"}
              align={"center"}
              border={"solid"}
              borderColor={"design.100"}
              bgColor={"brand.300"}
            >
              <CardBody paddingBottom={4}>
                <Image height={"200px"} src={client.logo[0]}></Image>
              </CardBody>
              <CardFooter
                w={"100%"}
                paddingTop={4}
                borderTop={"solid"}
                borderColor={"design.100"}
                bgColor="design.200"
              >
                <Text fontSize={"lg"} w={"100%"} textAlign={"center"}>
                  {client.clientName}
                </Text>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
