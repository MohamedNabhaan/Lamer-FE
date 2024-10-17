import {
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Carousel from "./ProjectImageCarousel";
import ProjectImageCarousel from "./ProjectImageCarousel";

export default function ProjectModal(props) {
  const [opened, setOpened] = useState(false);
  const [edited, setEdited] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [project, setProject] = useState();
  const [fetching, setFetching] = useState();

  useEffect(() => {
    async function fetchProject() {
      setFetching(true);
      const response = await fetch("http://localhost:3000/projects/" + `${id}`);

      const resData = await response.json();

      const date = new Date(resData.projectDate);

      resData.projectDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      resData.images = resData.images
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",");

      setProject(resData);
      setFetching(false);
    }
    fetchProject();
  }, []);

  const handleClose = () => {
    navigate("..");
    setOpened(false);
    setEdited(!edited);
  };

  return (
    <>
      <Modal
        size={{ base: "xl", md: "5xl" }}
        isOpen={true}
        onClose={handleClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent top={"5%"}>
          <ModalCloseButton />
          <ModalHeader>
            <Heading>{project ? project.title : ""}</Heading>
          </ModalHeader>
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              <Box paddingRight={2}>
                <Box>
                  <Text fontWeight={"600"} paddingBottom={2}>
                    Client Name :
                  </Text>
                  <Text> {project ? project.clientName : ""}</Text>
                </Box>
                <SimpleGrid columns={2} spacing={2} paddingTop={2}>
                  <Box>
                    <Text fontWeight={"600"} paddingBottom={1}>
                      Received Date :
                    </Text>
                    <Text>{project ? project.projectDate : ""}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight={"600"} paddingBottom={1}>
                      Status :{" "}
                    </Text>
                    <Text>Place Holder </Text>
                  </Box>
                  <Box>
                    <Text fontWeight={"600"} paddingBottom={1}>
                      Service :
                    </Text>
                    <Text>{project ? project.projectCategory : ""}</Text>
                  </Box>
                </SimpleGrid>
                <Text paddingTop={4} paddingBottom={1} fontWeight={"600"}>
                  Description :
                </Text>
                <Text paddingBottom={8}>
                  {project ? project.projectDescription : ""}{" "}
                  wqdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                </Text>
              </Box>

              {project ? (
                <ProjectImageCarousel
                  images={project.images}
                ></ProjectImageCarousel>
              ) : (
                <Box></Box>
              )}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
