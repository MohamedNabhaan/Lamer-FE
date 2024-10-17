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
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { PROJ_CATEGORIES } from "..";

export default function EditForm({ selected, open, close }) {
  const { project } = useLoaderData();

  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();
  //   useEffect(() => {
  //     async function fetchProject() {
  //       setFetching(true);
  //       const response = await fetch("http://localhost:3000/projects/" + `${id}`);

  //       const resData = await response.json();

  //       const date = new Date(resData.projectDate);

  //       resData.projectDate = `${date.getDate()}/${
  //         date.getMonth() + 1
  //       }/${date.getFullYear()}`;
  //       resData.images = resData.images
  //         .replace("[", "")
  //         .replace("]", "")
  //         .replace(/["]/g, "")
  //         .split(",");

  //       setProject(resData);
  //       setFetching(false);
  //     }
  //     fetchProject();
  //   }, []);

  const handleClose = () => {
    setOpened(false);
    navigate("..");
  };

  selected;
  open;
  return (
    <>
      <Form method="post">
        <Modal
          size={{ base: "xl", md: "5xl" }}
          isOpen={opened}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent top={"5%"}>
            <ModalHeader>
              <Heading>Edit Project</Heading>
            </ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  defaultValue={project.title}
                  name="title"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Client Name</FormLabel>
                <Input
                  type="text"
                  defaultValue={project.clientName}
                  name="clientName"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  type="text"
                  defaultValue={project.projectDate}
                  name="projectDate"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  defaultValue={project.projectCategories}
                  name="projectCategory"
                >
                  {PROJ_CATEGORIES.map((category) => {
                    return (
                      <option value={category.value}>{category.label}</option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select defaultValue={project.projectStatus}>
                  <option value={"Ongoing"}>Ongoing</option>
                  <option value={"Completed"}>Completed</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea defaultValue={project.projectDescription}></Textarea>
              </FormControl>
              <Flex padding={4} justifyContent={"end"} gap={1}>
                <Button type="submit">Submit</Button>
                <Button onClick={() => handleClose()}>Cancel</Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Form>
    </>
  );
}
