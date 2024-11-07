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
import { PROJ_CATEGORIES } from "..";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArchiveRestore } from "lucide-react";
import { X } from "lucide-react";

export default function AddForm() {
  const [files, setFiles] = useState([]);
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
    console.log("here");
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(index), 1);
    setFiles(newFiles);
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

    console.log(files);
    if (files.length !== 0) {
      files.map((file) => {
        formData.append("files", file, file.name);
        console.log(file);
      });
    }

    console.log("beforeaction", formData.get("files"));
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
            Create a Project
          </Heading>
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel paddingTop={2}>Code</FormLabel>
              <Input
                type="text"
                name="projectCode"
                placeholder="ProjectCode"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Title</FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Project Name..."
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Client Name</FormLabel>
              <Input
                type="text"
                name="clientName"
                placeholder="Client Name..."
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Date</FormLabel>
              <Input type="date" name="projectDate"></Input>
            </FormControl>
            <FormControl>
              <FormLabel paddingTop={2}>Category</FormLabel>
              <Select name="projectCategory">
                {PROJ_CATEGORIES.map((category) => {
                  return (
                    <option value={category.value}>{category.label}</option>
                  );
                })}
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
              {/* <Input type="file" name="files" multiple></Input> */}
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
            {fileRejections.length > 0 ? (
              <Box>
                <Text>{fileRejections[0].errors[0].message}</Text>
              </Box>
            ) : (
              ""
            )}
            {files.length === 0 ? (
              <Box padding={4}>
                <Text textAlign={"center"}>No Files Uploaded Yet</Text>
              </Box>
            ) : (
              <Flex padding={4} flexWrap={"wrap"} gap={2}>
                {files.map((file, index) => {
                  return (
                    <Flex
                      bgColor={"design.100"}
                      padding={1}
                      borderRadius={4}
                      z-index={9999}
                    >
                      <Text>{file.name}</Text>

                      <Box onClick={() => removeFile(index)}>
                        <Text>
                          <X></X>
                        </Text>
                      </Box>
                    </Flex>
                  );
                })}
              </Flex>
            )}

            <Button type="submit">Submit</Button>
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
