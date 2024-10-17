import {
  Image,
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Select,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PROJ_CATEGORIES } from "../../..";
import { Link, Outlet } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { ProjectCard } from "../../../components/ProjectCard";
import EditForm from "../../../components/EditForm";

export default function AdminProjects() {
  const [isFetching, setIsFetching] = useState(false);
  let [projects, setProjects] = useState([]);
  const [edited, setEdited] = useState(false);
  const [showing, setShowing] = useState(false);
  const [selected, setSelected] = useState();
  const [filtered, setFiltered] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const [projPerPage, setProjPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProjs, setCurrentPageProjs] = useState([]);

  async function fetchProjects() {
    setIsFetching(true);
    const response = await fetch("http://localhost:3000/projects");

    const resData = await response.json();

    resData.map((data) => {
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

    setProjects(resData);
    const indexOfLastProj = currentPage * projPerPage;
    const indexOfFirstProj = indexOfLastProj - projPerPage;
    setCurrentPageProjs(resData.slice(indexOfFirstProj, indexOfLastProj));
    setIsFetching(false);
    resData;
  }

  async function filteredFetchProjects() {
    setIsFetching(true);
    const response = await fetch(
      `http://localhost:3000/projects?projectCategory=` + `${filterVal}`
    );

    const resData = await response.json();

    resData.map((data) => {
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

    setProjects(resData);
    const indexOfLastProj = currentPage * projPerPage;
    const indexOfFirstProj = indexOfLastProj - projPerPage;
    setCurrentPageProjs(resData.slice(indexOfFirstProj, indexOfLastProj));
    setIsFetching(false);
  }

  useEffect(() => {
    if (filtered) {
      filteredFetchProjects();
    } else {
      fetchProjects();
    }
  }, []);

  async function onFilterValueChanged(e) {
    if (e.target.value !== "") {
      const response = await fetch(
        "http://localhost:3000/projects?projectCategory=" + `${e.target.value}`
      );
      const resData = await response.json();

      resData.map((data) => {
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
      setProjects(resData);
      const indexOfLastProj = 1 * projPerPage;
      const indexOfFirstProj = indexOfLastProj - projPerPage;
      setCurrentPageProjs(resData.slice(indexOfFirstProj, indexOfLastProj));
      setCurrentPage(1);
      setFilterVal(e.target.value);
      setFiltered(true);
    } else {
      const response = await fetch("http://localhost:3000/projects");

      const resData = await response.json();

      resData.map((data) => {
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
      setProjects(resData);
      setCurrentPage(1);
      const indexOfLastProj = 1 * projPerPage;
      const indexOfFirstProj = indexOfLastProj - projPerPage;
      setCurrentPageProjs(resData.slice(indexOfFirstProj, indexOfLastProj));

      setFilterVal(e.target.value);
      setFiltered(false);
    }
  }

  function paginate(number) {
    setCurrentPage(number);
    projects;
    if (number < Math.ceil(projects.length / projPerPage + 1) && number > 0) {
      const indexOfLastProj = number * projPerPage;
      const indexOfFirstProj = indexOfLastProj - projPerPage;
      setCurrentPageProjs(projects.slice(indexOfFirstProj, indexOfLastProj));
      window.scrollTo(0, 0);
    }
  }

  async function deleteProject(id, projIndex) {
    const projPos = (currentPage - 1) * 10 + projIndex;

    projPos;
    const indexOfLastProj = currentPage * projPerPage;
    const indexOfFirstProj = indexOfLastProj - projPerPage;
    const response = await fetch("http://localhost:3000/projects/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": null,
      },
      credentials: "include",
    });

    if (response.status === 200) {
      projects
        .filter((project, index) => index !== projPos)
        .slice(indexOfFirstProj, indexOfLastProj);
      setProjects(projects.filter((project, index) => index !== projPos));
      setCurrentPageProjs(
        projects
          .filter((project, index) => index !== projPos)
          .slice(indexOfFirstProj, indexOfLastProj)
      );
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
          <Box paddingTop={12} paddingBottom={8}>
            <Select placeholder="All" onChange={onFilterValueChanged}>
              {PROJ_CATEGORIES.map((category) => {
                return <option value={category.value}>{category.label}</option>;
              })}
            </Select>
          </Box>
        </Container>
        <Box paddingInline={16} paddingBlock={8}>
          {currentPageProjs.length === 0 ? (
            <Text>No Projects at the moment</Text>
          ) : (
            ""
          )}
          {isFetching ? (
            <Text>Loading</Text>
          ) : (
            <Stack>
              {currentPageProjs.map((project, index) => {
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
                    delProject={deleteProject}
                    editProject={open}
                  ></ProjectCard>
                );
              })}
            </Stack>
          )}
          <Pagination
            projPerPage={projPerPage}
            totalProj={projects.length}
            paginate={paginate}
            currentPage={currentPage}
          ></Pagination>
        </Box>
      </Box>
      <Outlet></Outlet>
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const updates = Object.fromEntries(formData);
  updates;
  // const response = await fetch("http://localhost:3000/projects/", {
  //   method: "Patch",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Credentials": true,
  //     "Access-Control-Allow-Origin": null,
  //   },
  //   credentials: "include",
  //   body: JSON.stringify(authData),
  // });

  // if (response.status === 404 || response.status === 400) {
  //   return response;
  // }

  // if (!response.ok) {
  //   throw json({ message: "Authentication issue" }, { status: 500 });
  // }

  // return redirect("/Admin/Projects");
}
