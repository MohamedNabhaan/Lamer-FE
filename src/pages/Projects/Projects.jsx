import {
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Select,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PROJ_CATEGORIES } from "../..";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { ProjectCard } from "../../components/ProjectCard";
import { Filter, Loader } from "lucide-react";

export default function Projects() {
  const [isFetching, setIsFetching] = useState(false);
  let [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const [projPerPage, setProjPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProjs, setCurrentPageProjs] = useState([]);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const headerBg = useColorModeValue("gray.50", "gray.700");

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
        data.projectDate = `${date.getDate().toString().padStart(2, "0")}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
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
        `http://localhost:3000/projects?projectCategory=${filterVal}`
      );
      const resData = await response.json();

      resData.map((data) => {
        const vals = data.images
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");
        const date = new Date(data.projectDate);
        data.projectDate = `${date.getDate().toString().padStart(2, "0")}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
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
        data.projectDate = `${date.getDate().toString().padStart(2, "0")}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
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
        data.projectDate = `${date.getDate().toString().padStart(2, "0")}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
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
      const indexOfLastProj = number * projPerPage;
      const indexOfFirstProj = indexOfLastProj - projPerPage;
      setCurrentPageProjs(projects.slice(indexOfFirstProj, indexOfLastProj));
      window.scrollTo(0, 0);
    }
  }

  return (
    <Box minH="72vh" bg={bgColor} pt={0}>
      {/* Header Section */}
      <Box
        bg={headerBg}
        py={{ base: 8, md: 12 }}
        borderBottom="1px"
        borderColor={borderColor}
        mt={{ base: "70px", md: "90px" }}
      >
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={4} align="stretch">
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              color={accentColor}
              borderLeft="6px solid"
              pl={4}
              lineHeight="1.2"
            >
              Our Projects
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="container.md"
            >
              Explore our diverse portfolio of successful projects across
              various domains
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Filter Section */}
      <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
        <Box mb={8}>
          <HStack spacing={3} mb={2}>
            <Icon as={Filter} color={accentColor} />
            <Text fontSize="lg" fontWeight="600" color={accentColor}>
              Filter Projects
            </Text>
          </HStack>
          <Select
            size="lg"
            placeholder="All Categories"
            onChange={onFilterValueChanged}
            borderColor={borderColor}
            _hover={{ borderColor: accentColor }}
            maxW="md"
          >
            {PROJ_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
        </Box>

        {/* Projects List */}
        {projects.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={12}
            color={textColor}
          >
            <Text fontSize="xl" mb={2}>
              No Projects Available
            </Text>
            <Text>Check back later for updates</Text>
          </Flex>
        ) : null}

        {isFetching ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={12}
            color={accentColor}
          >
            <Icon as={Loader} size={40} mb={4} />
            <Text fontSize="xl">Loading Projects...</Text>
          </Flex>
        ) : (
          <VStack spacing={6}>
            {currentPageProjs.map((project) => (
              <Link
                key={project.id}
                to={`${project.id}`}
                style={{ width: "100%" }}
              >
                <ProjectCard
                  images={project.images}
                  title={project.title}
                  clientName={project.clientName}
                  projectDate={project.projectDate}
                  projectCategory={project.projectCategory}
                />
              </Link>
            ))}
          </VStack>
        )}

        {/* Pagination */}
        {projects.length > 0 && !isFetching && (
          <Box py={8}>
            <Pagination
              projPerPage={projPerPage}
              totalProj={projects.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
