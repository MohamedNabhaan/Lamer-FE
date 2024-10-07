import {
  Image,
  Box,
  Heading,
  Container,
  Stack,
  Card,
  CardBody,
  Text,
  CardHeader,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import fallback from "../../assets/logo.png";

export default function Projects() {
  const [isFetching, setIsFetching] = useState(false);
  let [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/projects");

      const resData = await response.json();

      resData.map((data) => {
        const vals = data.images
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");
        const date = new Date(data.projectDate);

        data.projectDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        data.images = vals;
      });
      setProjects(resData);
      setIsFetching(false);
    }

    fetchProjects();
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
          Projects
        </Heading>
      </Container>
      <Box paddingInline={16} paddingBlock={8}>
        <Stack direction={"column"}>
          {projects.map((project) => {
            console.log(project);
            return (
              <Card
                direction={{ base: "column", md: "row" }}
                overflow={"hidden"}
                variant={"outline"}
              >
                <Image
                  maxW={"200px"}
                  src={project.images[0]}
                  fallbackSrc={fallback}
                ></Image>
                <CardBody
                  borderLeft={"solid"}
                  borderColor={"design.200"}
                  padding={0}
                >
                  <Box>
                    <Heading
                      w="100%"
                      as={"h2"}
                      size={"2xl"}
                      paddingBlock={4}
                      paddingLeft={8}
                      borderBottom={"solid 2px"}
                      borderColor="design.200"
                    >
                      {project.title}
                    </Heading>
                    <Box paddingLeft={8} paddingTop={4}>
                      <Text fontSize={"xl"}>Client : {project.clientName}</Text>
                      <Text fontSize={"xl"}>Date : {project.projectDate}</Text>
                      <Text fontSize={"xl"}>
                        Project Category : {project.projectCategory}
                      </Text>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
