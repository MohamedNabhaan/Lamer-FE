import {
  Box,
  Heading,
  Container,
  Stack,
  Select,
  Button,
  Flex,
  Text,
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
} from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { ProjectCard } from "../../../components/ProjectCard";

export default function AdminProjects() {
  const projects = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterVal, setFilterVal] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [searchParamSave, setsearchParamSave] = useState("");
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

  function open(project) {
    setSelected(project);
    setShowing(true);
  }

  function close() {
    setSelected(null);
    setShowing(false);
  }

  return (
    <>
      <Box minH={"72vh"}>
        <Container
          maxW={"container.xl"}
          paddingTop={12}
          paddingLeft={20}
          borderBottom={"solid"}
          borderColor={"design.100"}
          justifyContent={"center"}
        >
          <Heading
            borderLeft={"solid 20px"}
            paddingLeft={2}
            as="h1"
            size={"3xl"}
            fontWeight={500}
            color={"brand.400"}
            display={"block"}
            textAlign={{ base: "center", md: "left" }}
          >
            Our Projects
          </Heading>
          <Box paddingTop={12} paddingBottom={8} display={"flex"}>
            <Stack direction={"row"} flex={1}>
              <Select
                w={{ base: "8rem", sm: "16rem", md: "32rem" }}
                placeholder="All"
                onChange={setCategoryVal}
                defaultValue={
                  searchParams.get("projectCategory")
                    ? searchParams.get("projectCategory")
                    : ""
                }
              >
                {PROJ_CATEGORIES.map((category) => {
                  return (
                    <option value={category.value}>{category.label}</option>
                  );
                })}
              </Select>
              {isSelected ? (
                <Select
                  w={{ base: "8rem", sm: "16rem", md: "32rem" }}
                  placeholder="All"
                  onChange={setTitleVal}
                  defaultValue={
                    searchParams.get("title") ? searchParams.get("title") : ""
                  }
                >
                  <option value={"zxczx xz zxc"}>Numeric Model</option>
                </Select>
              ) : (
                ""
              )}
            </Stack>
          </Box>
        </Container>
        <Box paddingInline={16} paddingBottom={8} paddingTop={4}>
          <Flex paddingBottom={4} justify={"flex-end"}>
            <NavLink to={`Create`}>
              <Button bg={"brand.400"} color={"white"}>
                Create Project
              </Button>
            </NavLink>
          </Flex>
          {projects.length === 0 ? (
            <Text color={"brand.400"} textAlign={"center"} fontSize={"2xl"}>
              No Projects
            </Text>
          ) : (
            <Stack>
              {projects.map((project, index) => {
                return (
                  <ProjectCard
                    project={project}
                    projId={project.id}
                    projIndex={index}
                    images={project.images}
                    title={project.title}
                    clientName={project.clientName}
                    projectDate={project.projectDate}
                    projectCategory={project.projectCategory}
                    editProject={open}
                    searchParams={searchParamSave}
                  ></ProjectCard>
                );
              })}
            </Stack>
          )}
        </Box>
      </Box>

      <Outlet></Outlet>
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

  projects.map((data) => {
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

  return projects;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);
  console.log(form.redirect);
  console.log(params);
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
