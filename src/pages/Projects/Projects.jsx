import {
  Image,
  Box,
  Heading,
  Container,
  Stack,
  Card,
  CardBody,
  Text,
  CardHeader,
  List,
  ListItem,
  Select,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Button,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import fallback from "../../assets/logo.png";
import { PROJ_CATEGORIES } from "../..";
import ProjectModal from "../../components/ProjectModal";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function Projects() {
  const [isFetching, setIsFetching] = useState(false);
  let [projects, setProjects] = useState([]);
  const [edited, setEdited] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const [projPerPage, setProjPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProjs, setCurrentPageProjs] = useState([]);

  useEffect(() => {
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
    if (number < Math.ceil(projects.length / projPerPage + 1) && number > 0) {
      console.log(number);
      const indexOfLastProj = number * projPerPage;
      const indexOfFirstProj = indexOfLastProj - projPerPage;
      setCurrentPageProjs(projects.slice(indexOfFirstProj, indexOfLastProj));
      window.scrollTo(0, 0);
    }
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
          {projects.length === 0 ? <Text>No Projects at the moment</Text> : ""}
          {isFetching ? (
            <Text>Loading</Text>
          ) : (
            <Stack>
              {currentPageProjs.map((project) => {
                return (
                  <Link to={`${project.id}`}>
                    <Card
                      direction={{ base: "column", md: "row" }}
                      overflow={"hidden"}
                      variant={"outline"}
                      align={"center"}
                    >
                      <Image
                        w={"250px"}
                        h={"250px"}
                        src={project.images[0]}
                        fallbackSrc={fallback}
                      ></Image>
                      <CardBody
                        borderLeft={"solid"}
                        borderColor={"design.100"}
                        padding={0}
                        paddingBottom={6}
                      >
                        <Box>
                          <Heading
                            w="100%"
                            as={"h2"}
                            size={"2xl"}
                            paddingBottom={4}
                            paddingLeft={8}
                            borderBottom={"solid 2px"}
                            borderColor="design.100"
                          >
                            {project.title}
                          </Heading>
                          <Box paddingLeft={8} paddingTop={4}>
                            <Text fontSize={"xl"}>
                              Client : {project.clientName}
                            </Text>
                            <Text fontSize={"xl"}>
                              Date : {project.projectDate}
                            </Text>
                            <Text fontSize={"xl"}>
                              Project Category : {project.projectCategory}
                            </Text>
                          </Box>
                        </Box>
                      </CardBody>
                    </Card>
                  </Link>
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
      <Outlet context={[edited, setEdited]}></Outlet>
    </>
  );
}
