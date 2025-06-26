import {
  Box,
  Heading,
  Container,
  Stack,
  Button,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  NavLink,
  redirect,
  Form,
} from "react-router-dom";
import {
  getApiUrl,
  getApiUrlWithId,
  API_ENDPOINTS,
} from "../../../config/api.js";
import { Search, Loader, X } from "lucide-react";
import Pagination from "../../../components/Pagination";

export default function AdminEquipment() {
  const initialEquipments = useLoaderData();
  const [equipments, setEquipments] = useState(initialEquipments);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName, setDebouncedSearchName] = useState("");
  const [equipmentPerPage, setEquipmentPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageEquipment, setCurrentPageEquipment] = useState([]);
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");

  // Debounce search name
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchName(searchName);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchName]);

  // Trigger refresh when returning from deletion
  useEffect(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, [location.key]);

  // Initialize pagination on first load
  useEffect(() => {
    const indexOfLastEquipment = currentPage * equipmentPerPage;
    const indexOfFirstEquipment = indexOfLastEquipment - equipmentPerPage;
    setCurrentPageEquipment(
      equipments.slice(indexOfFirstEquipment, indexOfLastEquipment)
    );
  }, [equipments, currentPage, equipmentPerPage]);

  // Refresh data when search changes
  useEffect(() => {
    async function fetchEquipment() {
      setIsFetching(true);
      const params = {};

      if (debouncedSearchName && debouncedSearchName !== "") {
        params.equipmentName = debouncedSearchName;
      }

      const url = params.equipmentName
        ? getApiUrl("equipment", params)
        : API_ENDPOINTS.EQUIPMENT;

      console.log("Fetching equipment with URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();

      console.log("Received equipment:", resData.length);

      setEquipments(resData);
      setCurrentPage(1);
      const indexOfLastEquipment = 1 * equipmentPerPage;
      const indexOfFirstEquipment = indexOfLastEquipment - equipmentPerPage;
      setCurrentPageEquipment(
        resData.slice(indexOfFirstEquipment, indexOfLastEquipment)
      );
      setIsFetching(false);
    }

    fetchEquipment();
  }, [debouncedSearchName, refreshTrigger, equipmentPerPage]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const clearSearch = () => {
    setSearchName("");
    setDebouncedSearchName("");
  };

  function paginate(number) {
    setCurrentPage(number);
    if (
      number < Math.ceil(equipments.length / equipmentPerPage + 1) &&
      number > 0
    ) {
      const indexOfLastEquipment = number * equipmentPerPage;
      const indexOfFirstEquipment = indexOfLastEquipment - equipmentPerPage;
      setCurrentPageEquipment(
        equipments.slice(indexOfFirstEquipment, indexOfLastEquipment)
      );
      window.scrollTo(0, 0);
    }
  }

  return (
    <>
      <Box minH="72vh" bg={bgColor} pt={{ base: "80px", md: "100px" }}>
        {/* Header Section */}
        <Box
          bg={headerBg}
          py={{ base: 8, md: 12 }}
          borderBottom="1px"
          borderColor={borderColor}
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
                Equipment
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={textColor}
                maxW="container.md"
              >
                Manage your equipment inventory and resources
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Search and Controls Section */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={6}>
          <Box mb={8}>
            {/* Search Bar and Create Button */}
            <VStack spacing={4} align="stretch">
              {/* Search Bar */}
              <Box w="100%">
                <InputGroup size={{ base: "md", md: "lg" }}>
                  <InputLeftElement>
                    <Icon as={Search} color={accentColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search equipment by name..."
                    value={searchName}
                    onChange={handleSearchChange}
                    borderColor={borderColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{
                      borderColor: accentColor,
                      boxShadow: `0 0 0 1px ${accentColor}`,
                    }}
                    bg={bgColor}
                  />
                </InputGroup>
              </Box>

              {/* Controls Row */}
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify={{ base: "stretch", sm: "space-between" }}
                align={{ base: "stretch", sm: "center" }}
                gap={{ base: 3, sm: 0 }}
              >
                <HStack
                  spacing={2}
                  justify={{ base: "center", sm: "flex-start" }}
                  flexWrap="wrap"
                >
                  {searchName && (
                    <Badge colorScheme="blue" fontSize="sm">
                      1 active search
                    </Badge>
                  )}
                </HStack>

                <HStack
                  spacing={3}
                  w={{ base: "100%", sm: "auto" }}
                  justify={{ base: "stretch", sm: "flex-end" }}
                >
                  {searchName && (
                    <Button
                      variant="outline"
                      colorScheme="red"
                      leftIcon={<X />}
                      onClick={clearSearch}
                      size={{ base: "md", sm: "md" }}
                      flex={{ base: 1, sm: "none" }}
                    >
                      Clear
                    </Button>
                  )}
                  <NavLink to="new">
                    <Button
                      color={"white"}
                      bg={"brand.400"}
                      size={{ base: "md", sm: "md" }}
                      _hover={{ bg: "brand.300" }}
                      flex={{ base: 1, sm: "none" }}
                      w={{ base: "100%", sm: "auto" }}
                    >
                      Create
                    </Button>
                  </NavLink>
                </HStack>
              </Flex>
            </VStack>

            {/* Active Search Display */}
            {searchName && (
              <Box mt={4}>
                <Text fontSize="sm" fontWeight="600" color={textColor} mb={2}>
                  Active Search:
                </Text>
                <Box
                  bg={accentColor}
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="500"
                  display="inline-block"
                >
                  Search: "{searchName}"
                </Box>
              </Box>
            )}
          </Box>

          {/* Loading State */}
          {isFetching && (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={12}
              color={accentColor}
            >
              <Icon as={Loader} size={40} mb={4} />
              <Text fontSize="xl">Loading Equipment...</Text>
            </Flex>
          )}

          {/* Equipment List */}
          {!isFetching && (
            <>
              {equipments.length === 0 ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py={12}
                  color={textColor}
                >
                  <Text fontSize="xl" mb={2}>
                    {searchName
                      ? "No equipment found"
                      : "No Equipment Available"}
                  </Text>
                  <Text>
                    {searchName
                      ? "Try adjusting your search criteria"
                      : "Add equipment to get started"}
                  </Text>
                </Flex>
              ) : (
                <>
                  <Stack spacing={{ base: 4, md: 6 }}>
                    {(currentPageEquipment.length > 0
                      ? currentPageEquipment
                      : equipments
                    ).map((equipment) => (
                      <Card
                        key={equipment.id}
                        bg={cardBg}
                        variant="outline"
                        borderRadius="xl"
                        boxShadow="sm"
                        overflow="hidden"
                        _hover={{
                          shadow: "md",
                          transform: "translateY(-2px)",
                          transition: "all 0.2s",
                        }}
                      >
                        <CardHeader
                          borderBottom="1px solid"
                          borderColor={borderColor}
                          pb={{ base: 3, md: 4 }}
                          pt={{ base: 4, md: 5 }}
                          px={{ base: 4, md: 6 }}
                        >
                          <Flex
                            justifyContent="space-between"
                            alignItems={{ base: "flex-start", md: "center" }}
                            flexDirection={{ base: "column", sm: "row" }}
                            gap={{ base: 3, sm: 0 }}
                          >
                            <Box flex="1">
                              <Heading
                                as="h3"
                                size={{ base: "lg", md: "xl" }}
                                color={accentColor}
                                fontWeight={600}
                                mb={{ base: 1, md: 2 }}
                              >
                                {equipment.equipmentName}
                              </Heading>
                              {equipment.createdAt && (
                                <Text
                                  fontSize={{ base: "sm", md: "md" }}
                                  color={textColor}
                                >
                                  Created:{" "}
                                  {new Date(
                                    equipment.createdAt
                                  ).toLocaleDateString()}
                                </Text>
                              )}
                            </Box>

                            <HStack
                              spacing={2}
                              w={{ base: "100%", sm: "auto" }}
                              justify={{ base: "stretch", sm: "flex-end" }}
                            >
                              <NavLink
                                to={`modify/${equipment.id}`}
                                state={{
                                  from: location.pathname + location.search,
                                }}
                                style={{ flex: { base: 1, sm: "none" } }}
                              >
                                <Button
                                  bg={accentColor}
                                  color="white"
                                  size={{ base: "sm", md: "md" }}
                                  w={{ base: "100%", sm: "auto" }}
                                  _hover={{ bg: `${accentColor}.600` }}
                                >
                                  Edit
                                </Button>
                              </NavLink>

                              <Form
                                method="post"
                                action={`${equipment.id}/destroy`}
                                style={{ flex: { base: 1, sm: "none" } }}
                              >
                                <input
                                  type="hidden"
                                  name="redirect"
                                  value={location.pathname + location.search}
                                />
                                <Button
                                  type="submit"
                                  colorScheme="red"
                                  variant="outline"
                                  size={{ base: "sm", md: "md" }}
                                  w={{ base: "100%", sm: "auto" }}
                                  _hover={{ bg: "red.50" }}
                                >
                                  Delete
                                </Button>
                              </Form>
                            </HStack>
                          </Flex>
                        </CardHeader>

                        <CardBody
                          px={{ base: 4, md: 6 }}
                          py={{ base: 4, md: 5 }}
                        >
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <Stack spacing={2}>
                              {equipment.brand && (
                                <Text
                                  fontSize={{ base: "sm", md: "md" }}
                                  color={textColor}
                                >
                                  <Text
                                    as="span"
                                    fontWeight="600"
                                    color={accentColor}
                                  >
                                    Brand:
                                  </Text>{" "}
                                  {equipment.brand}
                                </Text>
                              )}
                              {equipment.modelNo && (
                                <Text
                                  fontSize={{ base: "sm", md: "md" }}
                                  color={textColor}
                                >
                                  <Text
                                    as="span"
                                    fontWeight="600"
                                    color={accentColor}
                                  >
                                    Model No:
                                  </Text>{" "}
                                  {equipment.modelNo}
                                </Text>
                              )}
                            </Stack>
                            <Stack spacing={2}>
                              <Text
                                fontSize={{ base: "sm", md: "md" }}
                                color={textColor}
                              >
                                <Text
                                  as="span"
                                  fontWeight="600"
                                  color={accentColor}
                                >
                                  Quantity:
                                </Text>{" "}
                                {equipment.quantity}
                              </Text>
                              {equipment.charge !== null &&
                                equipment.charge !== undefined && (
                                  <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    color={textColor}
                                  >
                                    <Text
                                      as="span"
                                      fontWeight="600"
                                      color={accentColor}
                                    >
                                      Charge:
                                    </Text>{" "}
                                    ${equipment.charge.toFixed(2)}
                                  </Text>
                                )}
                            </Stack>
                          </SimpleGrid>
                        </CardBody>

                        {(equipment.quantity || equipment.charge) && (
                          <CardFooter
                            justifyContent="flex-start"
                            px={{ base: 4, md: 6 }}
                            py={{ base: 3, md: 4 }}
                            bg={headerBg}
                          >
                            <HStack spacing={3}>
                              <Badge
                                borderRadius="full"
                                px={3}
                                py={1.5}
                                bg={accentColor}
                                color="white"
                                fontSize={{ base: "xs", md: "sm" }}
                                fontWeight="600"
                              >
                                Qty: {equipment.quantity}
                              </Badge>
                              {equipment.charge !== null &&
                                equipment.charge !== undefined && (
                                  <Badge
                                    borderRadius="full"
                                    px={3}
                                    py={1.5}
                                    bg="green.500"
                                    color="white"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="600"
                                  >
                                    ${equipment.charge.toFixed(2)}
                                  </Badge>
                                )}
                            </HStack>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                  </Stack>

                  {/* Pagination */}
                  {!isFetching && (
                    <Box mt={8}>
                      <Pagination
                        currentPage={currentPage}
                        projPerPage={equipmentPerPage}
                        totalProj={equipments.length}
                        paginate={paginate}
                        setCurrentPage={setCurrentPage}
                        setProjPerPage={setEquipmentPerPage}
                      />
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </Box>

      <Outlet />
    </>
  );
}

export async function equipmentAdminLoader({ request }) {
  const url = new URL(request.url);
  const equipmentName = url.searchParams.get("equipmentName");

  const endpoint = equipmentName
    ? getApiUrl("equipment", { equipmentName })
    : API_ENDPOINTS.EQUIPMENT;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const equipments = await response.json();
  return equipments;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const form = Object.fromEntries(data);

  const response = await fetch(getApiUrlWithId("equipment", params.id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return redirect(`${form.redirect}`);
}
