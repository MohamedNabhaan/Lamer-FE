import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, redirect, useSubmit } from "react-router-dom";
import { SERVICE_CATEGORIES } from "..";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArchiveRestore } from "lucide-react";
import { X } from "lucide-react";

export default function AddForm() {
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const submit = useSubmit();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((files) => [...files, ...acceptedFiles]);
  }, []);

  const { acceptedFiles, fileRejections, getInputProps, getRootProps } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [".jpeg"],
        "image/png": [".png"],
        "image/jpg": [".jpg"],
      },
      maxFiles: 5,
    });

  function removeFile(index) {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(index), 1);
    setFiles(newFiles);
  }

  // Function to handle category change
  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);

    // Fetch services for the selected category
    fetch(`http://localhost:3000/services?serviceCategory=${category}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setAvailableServices(data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setAvailableServices([]);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append(e.target[0].name, e.target[0].value);
    formData.append(e.target[1].name, e.target[1].value);
    formData.append(e.target[2].name, e.target[2].value);
    formData.append(e.target[3].name, e.target[3].value);
    formData.append(e.target[4].name, e.target[4].value);
    formData.append(e.target[5].name, e.target[5].value);
    formData.append(e.target[6].name, e.target[6].value);
    formData.append(e.target[7].name, e.target[7].value);

    if (files.length !== 0) {
      files.map((file) => {
        formData.append("files", file, file.name);
      });
    }

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  }

  return (
    <>
      <Box>
        <Box paddingInline={72} paddingBlock={8}>
          <Heading paddingBottom={4} color={"brand.400"}>
            Create
          </Heading>
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel paddingTop={2}>Code</FormLabel>
              <Input
                isRequired={true}
                type="text"
                name="projectCode"
                placeholder="ProjectCode"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Title</FormLabel>
              <Input
                isRequired={true}
                type="text"
                name="title"
                placeholder="Project Name..."
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Client Name</FormLabel>
              <Input
                isRequired={true}
                type="text"
                name="clientName"
                placeholder="Client Name..."
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Date</FormLabel>
              <Input isRequired={true} type="date" name="projectDate"></Input>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Category</FormLabel>
              <Select
                name="projectCategory"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">Select a category</option>
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Service</FormLabel>
              <Select name="projectService" isDisabled={!selectedCategory}>
                <option value="">Select a service</option>
                {availableServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.serviceName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Status</FormLabel>
              <Select name="projectStatus">
                <option value={"Ongoing"}>Ongoing</option>
                <option value={"Completed"}>Completed</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Description</FormLabel>
              <Textarea
                name="projectDescription"
                placeholder="Project Description..."
              ></Textarea>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Image Upload</FormLabel>
              <Box
                {...getRootProps()}
                border={"solid 1px"}
                padding={8}
                borderRadius={8}
                borderColor={"design.100"}
              >
                <Input {...getInputProps()} />
                <Flex justify={"center"}>
                  <ArchiveRestore></ArchiveRestore>
                </Flex>
                <Text textAlign={"center"}>
                  Click to select images or drag-and-drop the images here
                </Text>
                <Text textAlign={"center"} fontSize={"sm"} color={"grey"}>
                  Max : 5
                </Text>
              </Box>
            </FormControl>

            <Flex padding={4} justifyContent={"end"} gap={1}>
              <Button type={"submit"}>Submit</Button>
              <Button onClick={() => navigate("/Admin/Projects")}>
                Cancel
              </Button>
            </Flex>
          </Form>
        </Box>
      </Box>
    </>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();

  console.log(data.get("files"));
  const project = Object.fromEntries(data);
  console.log(project);

  const response = await fetch("http://localhost:3000/projects/create", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
    body: data,
  });

  if (response.status === 404 || response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Issues" }, { status: 500 });
  }

  // return redirect("/Admin/Projects");
  return redirect("/Admin/Projects");
}
