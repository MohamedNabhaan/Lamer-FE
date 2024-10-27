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
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Carousel from "./ProjectImageCarousel";
import ProjectImageCarousel from "./ProjectImageCarousel";
import ProjectSlider from "./ProjectSlider";

export default function ProjectModal(props) {
  const { project } = useLoaderData();
  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
    setOpened(false);
  };

  return (
    <>
      <Modal
        size={{ base: "xl", md: "5xl" }}
        isOpen={opened}
        onClose={handleClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent top={"5%"}>
          <ModalCloseButton />
          <ModalHeader>
            <Heading>{project.title}</Heading>
          </ModalHeader>
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              <Box paddingRight={2}>
                <Box>
                  <Text fontWeight={"600"} paddingBottom={2}>
                    Client Name :
                  </Text>
                  <Text> {project.clientName}</Text>
                </Box>
                <SimpleGrid columns={2} spacing={2} paddingTop={2}>
                  <Box>
                    <Text fontWeight={"600"} paddingBottom={1}>
                      Received Date :
                    </Text>
                    <Text>{project.projectDate}</Text>
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
                    <Text>{project.projectCategory}</Text>
                  </Box>
                </SimpleGrid>
                <Text paddingTop={4} paddingBottom={1} fontWeight={"600"}>
                  Description :
                </Text>
                <Text paddingBottom={8}>{project.projectDescription}</Text>
              </Box>
              <ProjectSlider images={project.images}></ProjectSlider>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
