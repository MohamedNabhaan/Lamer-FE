import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SERVICE_CATEGORIES } from "..";

export default function EditForm() {
  const { project } = useLoaderData();
  const location = useLocation();
  const redirectTo = location.state?.from;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    project.projectCategory
  );
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedService, setSelectedService] = useState(
    project.projectService
  );

  useEffect(() => {
    // Fetch services for the initial category
    if (project.projectCategory) {
      fetch(
        `http://localhost:3000/services?serviceCategory=${project.projectCategory}`,
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setAvailableServices(data);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setAvailableServices([]);
        });
    }
  }, [project.projectCategory]);

  // Function to handle category change
  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedService(""); // Reset selected service when category changes

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

  // Function to handle service change
  function handleServiceChange(e) {
    setSelectedService(e.target.value);
  }

  return (
    <Box>
      <Box paddingInline={72} paddingBlock={8}>
        <Heading paddingBottom={4} color={"brand.400"}>
          Edit Project
        </Heading>
        <Form method="patch">
          <FormControl>
            <FormLabel>Project Code</FormLabel>
            <Input
              isRequired={true}
              type="text"
              defaultValue={project.projectCode}
              name="projectCode"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              isRequired={true}
              type="text"
              defaultValue={project.title}
              name="title"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Client Name</FormLabel>
            <Input
              isRequired={true}
              type="text"
              defaultValue={project.clientName}
              name="clientName"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              isRequired={true}
              min={"2000-01-01"}
              type="date"
              defaultValue={project.projectDate}
              name="projectDate"
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
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
            <FormLabel>Service</FormLabel>
            <Select
              name="projectService"
              value={selectedService}
              onChange={handleServiceChange}
              isDisabled={!selectedCategory}
            >
              <option value="">Select a service</option>
              {availableServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.serviceName}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select defaultValue={project.projectStatus} name="projectStatus">
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
            <Button onClick={() => navigate(redirectTo || "/Admin/Projects")}>
              Cancel
            </Button>
          </Flex>
        </Form>
      </Box>
    </Box>
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
    return redirect("/Admin/Projects");
  }
  return redirect(updates.redirect);
}
