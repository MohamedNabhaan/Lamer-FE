import {
  Card,
  Image,
  CardBody,
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import fallback from "../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
export function ProjectCard({
  project,
  projId,
  projIndex,
  images,
  title,
  clientName,
  projectDate,
  projectCategory,
  delProject,
  editProject,
}) {
  const location = useLocation();

  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow={"hidden"}
      variant={"outline"}
      align={"center"}
    >
      <Image
        w={"250px"}
        h={"250px"}
        src={images[0]}
        fallbackSrc={fallback}
      ></Image>
      <CardBody
        borderLeft={"solid"}
        borderColor={"design.100"}
        padding={0}
        paddingBottom={6}
      >
        <Box>
          {location.pathname.toLowerCase() === "/admin/projects" ? (
            <Box position={"absolute"} top={0} right={0} zIndex={1}>
              <NavLink to={`${projId}`}>
                <Button
                  variant={"ghost"}
                  rounded={false}
                  zIndex={1}
                  onClick={() => editProject(project)}
                >
                  <EditIcon></EditIcon>
                </Button>
              </NavLink>

              <Button
                variant={"ghost"}
                rounded={false}
                onClick={() => delProject(projId, projIndex)}
                zIndex={9999999}
              >
                <DeleteIcon></DeleteIcon>
              </Button>
            </Box>
          ) : (
            ""
          )}
          <Heading
            w="100%"
            as={"h2"}
            size={"2xl"}
            paddingBottom={4}
            paddingLeft={8}
            borderBottom={"solid 2px"}
            borderColor="design.100"
          >
            {title}
          </Heading>

          <Box paddingLeft={8} paddingTop={4}>
            <Text fontSize={"xl"}>Client : {clientName}</Text>
            <Text fontSize={"xl"}>Date : {projectDate}</Text>
            <Text fontSize={"xl"}>Project Category : {projectCategory}</Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}
