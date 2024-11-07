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
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { PROJ_CATEGORIES } from "..";

export default function EditForm({ selected, open, updateProjects }) {
  const { project } = useLoaderData();
  console.log(project);
  const location = useLocation();
  const redirectTo = location.state?.from;
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

    navigate(`${redirectTo}`);
  };

  return (
    <>
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
            <Form method="patch">
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
                  type="date"
                  defaultValue={project.projectDate}
                  name="projectDate"
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  defaultValue={project.projectCategory}
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
                <FormLabel>Status</FormLabel>
                <Select
                  defaultValue={project.projectStatus}
                  name="projectStatus"
                >
                  <option value={"Ongoing"}>Ongoing</option>
                  <option value={"Completed"}>Completed</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  defaultValue={project.projectDescription}
                  name="projectDescription"
                ></Textarea>
              </FormControl>
              <FormControl>
                <Input
                  type="hidden"
                  defaultValue={redirectTo}
                  name="redirect"
                ></Input>
              </FormControl>

              <Flex padding={4} justifyContent={"end"} gap={1}>
                <Button type={"submit"}>Submit</Button>
                <Button onClick={() => handleClose()}>Cancel</Button>
              </Flex>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();
  console.log(data);

  const updates = Object.fromEntries(data);

  const response = await fetch("http://localhost:3000/projects/" + params.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
    body: JSON.stringify(updates),
  });

  if (response.status === 404 || response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Issues" }, { status: 500 });
  }

  if (updates.redirect === "") {
    return redirect(updates.redirect);
  }
  return redirect(updates.redirect);
}
