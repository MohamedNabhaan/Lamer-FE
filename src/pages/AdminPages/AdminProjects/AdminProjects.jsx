import {
  Box,
  Heading,
  Container,
  Stack,
  Select,
  Button,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PROJ_CATEGORIES } from "../../..";
import {
  Outlet,
  useLoaderData,
  useSearchParams,
  useLocation,
  NavLink,
  useSubmit,
  redirect,
  Form,
} from "react-router-dom";
import { ProjectCard } from "../../../components/ProjectCard";

export default function AdminProjects() {
  const projects = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterVal, setFilterVal] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [searchParamSave, setsearchParamSave] = useState("");
  const location = useLocation();
  const urlSearchString = window.location.search;

  useEffect(() => {
    if (searchParams.get("projectCategory")) {
      setIsSelected(true);
      let searchVals = {
        projectCategory: searchParams.get("projectCategory"),
      };
      if (searchParams.get("title")) {
        const addedVals = { title: searchParams.get("title") };
        searchVals = { ...searchVals, ...addedVals };
      }
      setFilterVal(searchVals);
    }
  }, []);

  useEffect(() => {
    setSearchParams(filterVal);
  }, [filterVal]);

  function setCategoryVal(e) {
    if (e.target.value !== "") {
      const newVal = { projectCategory: e.target.value };
      setsearchParamSave(document.location.search);
      setFilterVal({ ...filterVal, ...newVal });
      setIsSelected(true);
    } else {
      setsearchParamSave(document.location.search);
      setIsSelected(false);
      setFilterVal({});
    }
  }

  function setTitleVal(e) {
    if (e.target.value !== "") {
      const newVal = { title: e.target.value };
      setsearchParamSave(document.location.search);
      setFilterVal({ ...filterVal, ...newVal });
    } else {
      const removeVal = Object.fromEntries(
        Object.entries(filterVal).filter(([key]) => key !== "title")
      );

      setsearchParamSave(document.location.search);
      setFilterVal(removeVal);
    }
  }

  return (
    <>
      <Box minH="72vh" pt={0}>
        <Container
          maxW="container.xl"
          pt={{ base: 6, md: 12 }}
          px={{ base: 4, md: 8, lg: 20 }}
          pb={{ base: 4, md: 6 }}
          borderBottom="1px solid"
          borderColor="design.100"
          mt={{ base: "70px", md: "90px" }}
        >
          <Heading
            borderLeft={{ base: "solid 10px", md: "solid 20px" }}
            pl={{ base: 2, md: 4 }}
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
            fontWeight={500}
            color="brand.400"
            textAlign={{ base: "center", md: "left" }}
          >
            Projects
          </Heading>

          <Box pt={{ base: 6, md: 8 }} pb={{ base: 4, md: 6 }}>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              w="100%"
            >
              <Select
                w="full"
                placeholder="All Categories"
                onChange={setCategoryVal}
                defaultValue={
                  searchParams.get("projectCategory")
                    ? searchParams.get("projectCategory")
                    : ""
                }
                size="lg"
              >
                {PROJ_CATEGORIES.map((category) => {
                  return (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  );
                })}
              </Select>
              {isSelected && (
                <Select
                  w="full"
                  placeholder="All Projects"
                  onChange={setTitleVal}
                  defaultValue={
                    searchParams.get("title") ? searchParams.get("title") : ""
                  }
                  size="lg"
                >
                  <option value={"zxczx xz zxc"}>Numeric Model</option>
                </Select>
              )}
            </Stack>
          </Box>
        </Container>

        <Container
          maxW="container.xl"
          px={{ base: 4, md: 8, lg: 16 }}
          py={{ base: 4, md: 8 }}
        >
          <Flex
            pb={{ base: 3, md: 5 }}
            justify={{ base: "center", md: "flex-end" }}
            mb={{ base: 2, md: 4 }}
          >
            <NavLink to={`Create`}>
              <Button
                bg="brand.400"
                color="white"
                size={{ base: "md", md: "lg" }}
                _hover={{ bg: "brand.500" }}
              >
                Create
              </Button>
            </NavLink>
          </Flex>

          {projects.length === 0 ? (
            <Text
              color="brand.400"
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              No Projects
            </Text>
          ) : (
            <Stack spacing={{ base: 3, md: 5 }}>
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  variant="outline"
                  borderRadius={{ base: 15, md: 30 }}
                  boxShadow="sm"
                  overflow="hidden"
                  direction={{ base: "column", md: "row" }}
                >
                  <Box
                    width={{ base: "100%", md: "250px" }}
                    height={{ base: "200px", md: "250px" }}
                    bg="gray.100"
                  >
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      fallbackSrc="../../../assets/logo.png"
                    />
                  </Box>

                  <CardBody p={{ base: 3, md: 5 }}>
                    <Flex
                      justifyContent="space-between"
                      alignItems={{ base: "flex-start", md: "flex-start" }}
                      flexDirection={{ base: "column", sm: "row" }}
                      gap={{ base: 3, sm: 0 }}
                      mb={3}
                    >
                      <Box>
                        <Heading
                          as="h2"
                          size={{ base: "lg", md: "xl" }}
                          fontWeight={500}
                          mb={2}
                        >
                          {project.title}
                        </Heading>
                        <Text fontSize={{ base: "sm", md: "md" }} mb={1}>
                          <strong>Client:</strong> {project.clientName}
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }} mb={1}>
                          <strong>Date:</strong> {project.projectDate}
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          <strong>Category:</strong> {project.projectCategory}
                        </Text>
                      </Box>

                      <Flex
                        mt={{ base: 2, sm: 0 }}
                        gap={2}
                        flexDirection={{ base: "column", xs: "row" }}
                        w={{ base: "100%", sm: "auto" }}
                      >
                        <NavLink
                          to={`Edit/${project.id}`}
                          state={{
                            from: location.pathname + location.search,
                          }}
                          style={{ width: "100%" }}
                        >
                          <Button
                            bg="brand.400"
                            color="white"
                            mr={{ base: 0, xs: 2 }}
                            w={{ base: "100%", sm: "auto" }}
                            mb={{ base: 2, xs: 0 }}
                            size={{ base: "sm", md: "md" }}
                            _hover={{ bg: "brand.500" }}
                          >
                            Edit
                          </Button>
                        </NavLink>

                        <Form
                          method="post"
                          action={`${project.id}/destroy`}
                          style={{ width: "100%" }}
                        >
                          <input
                            type="hidden"
                            name="redirect"
                            value={location.pathname + location.search}
                          />
                          <Button
                            type="submit"
                            bg="red.500"
                            color="white"
                            w={{ base: "100%", sm: "auto" }}
                            size={{ base: "sm", md: "md" }}
                            _hover={{ bg: "red.600" }}
                          >
                            Delete
                          </Button>
                        </Form>
                      </Flex>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </Stack>
          )}
        </Container>
      </Box>

      <Outlet />
    </>
  );
}

export async function projectsLoader({ request, params }) {
  const url = new URL(request.url);

  const response = await fetch("http://localhost:3000/projects/" + url.search, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const projects = await response.json();

  projects.forEach((data) => {
    try {
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
    } catch (error) {
      data.images = [];
    }
  });

  return projects;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch("http://localhost:3000/projects/" + params.id, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
