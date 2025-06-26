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
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Collapse,
  Image,
  Center,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ImageOff,
  Edit,
  Trash2,
} from "lucide-react";
import {
  getApiUrl,
  getApiUrlWithId,
  API_ENDPOINTS,
} from "../../../config/api.js";
import Pagination from "../../../components/Pagination";

export default function AdminSites() {
  const initialSitesData = useLoaderData();
  const [sitesData, setSitesData] = useState(initialSitesData);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sitesPerPage, setSitesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSites, setCurrentPageSites] = useState([]);
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const iconBg = useColorModeValue("gray.100", "gray.600");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  // Component for when no image is available
  const NoImageFallback = () => (
    <Center
      width="100%"
      height="100%"
      bg={iconBg}
      flexDirection="column"
      gap={2}
    >
      <Icon as={ImageOff} w={8} h={8} color={iconColor} />
      <Text fontSize="xs" color={iconColor} textAlign="center">
        No Image
      </Text>
    </Center>
  );

  // Debounce search title
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTitle(searchTitle);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTitle]);

  // Trigger refresh when returning from deletion
  useEffect(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, [location.key]);

  // Initialize pagination on first load
  useEffect(() => {
    const indexOfLastSite = currentPage * sitesPerPage;
    const indexOfFirstSite = indexOfLastSite - sitesPerPage;
    setCurrentPageSites(sitesData.slice(indexOfFirstSite, indexOfLastSite));
  }, [sitesData, currentPage, sitesPerPage]);

  // Refresh data when search changes
  useEffect(() => {
    async function fetchSites() {
      setIsFetching(true);
      const params = {};

      if (debouncedSearchTitle && debouncedSearchTitle !== "") {
        params.siteName = debouncedSearchTitle;
      }

      const url = params.siteName
        ? getApiUrl("sites", params)
        : API_ENDPOINTS.SITES;

      console.log("Fetching sites with URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();

      console.log("Received sites:", resData.length);
      console.log("Sample site data:", resData[0]); // Debug: Check the actual data structure

      // Format image data consistently with other admin pages
      resData.forEach((site) => {
        console.log("Processing site:", site.siteName); // Debug
        console.log("Original sitePicture1:", site.sitePicture1); // Debug
        console.log("Type of sitePicture1:", typeof site.sitePicture1); // Debug

        // Extract sitePicture1
        if (site.sitePicture1) {
          if (typeof site.sitePicture1 === "string") {
            // Check if it's a stringified array or a direct URL
            if (
              site.sitePicture1.startsWith("[") &&
              site.sitePicture1.endsWith("]")
            ) {
              try {
                const vals = site.sitePicture1
                  .replace("[", "")
                  .replace("]", "")
                  .replace(/["]/g, "")
                  .split(",")
                  .filter((val) => val.trim() !== "");
                site.sitePicture1 = vals.length > 0 ? vals[0].trim() : null; // Take first URL as string
                console.log(
                  "Extracted sitePicture1 string:",
                  site.sitePicture1
                ); // Debug
              } catch (error) {
                console.error("Error parsing sitePicture1:", error); // Debug
                site.sitePicture1 = null;
              }
            } else {
              // It's already a direct URL string
              site.sitePicture1 = site.sitePicture1.trim();
              console.log("Direct URL sitePicture1:", site.sitePicture1); // Debug
            }
          } else if (Array.isArray(site.sitePicture1)) {
            // Convert array to first string
            site.sitePicture1 =
              site.sitePicture1.length > 0 ? site.sitePicture1[0] : null;
            console.log("Array to string sitePicture1:", site.sitePicture1); // Debug
          } else {
            site.sitePicture1 = null;
          }
        } else {
          site.sitePicture1 = null;
        }

        // Extract sitePicture2
        if (site.sitePicture2) {
          if (typeof site.sitePicture2 === "string") {
            if (
              site.sitePicture2.startsWith("[") &&
              site.sitePicture2.endsWith("]")
            ) {
              try {
                const vals = site.sitePicture2
                  .replace("[", "")
                  .replace("]", "")
                  .replace(/["]/g, "")
                  .split(",")
                  .filter((val) => val.trim() !== "");
                site.sitePicture2 = vals.length > 0 ? vals[0].trim() : null; // Take first URL as string
              } catch (error) {
                site.sitePicture2 = null;
              }
            } else {
              site.sitePicture2 = site.sitePicture2.trim();
            }
          } else if (Array.isArray(site.sitePicture2)) {
            site.sitePicture2 =
              site.sitePicture2.length > 0 ? site.sitePicture2[0] : null;
          } else {
            site.sitePicture2 = null;
          }
        } else {
          site.sitePicture2 = null;
        }

        // Extract sitePicture3
        if (site.sitePicture3) {
          if (typeof site.sitePicture3 === "string") {
            if (
              site.sitePicture3.startsWith("[") &&
              site.sitePicture3.endsWith("]")
            ) {
              try {
                const vals = site.sitePicture3
                  .replace("[", "")
                  .replace("]", "")
                  .replace(/["]/g, "")
                  .split(",")
                  .filter((val) => val.trim() !== "");
                site.sitePicture3 = vals.length > 0 ? vals[0].trim() : null; // Take first URL as string
              } catch (error) {
                site.sitePicture3 = null;
              }
            } else {
              site.sitePicture3 = site.sitePicture3.trim();
            }
          } else if (Array.isArray(site.sitePicture3)) {
            site.sitePicture3 =
              site.sitePicture3.length > 0 ? site.sitePicture3[0] : null;
          } else {
            site.sitePicture3 = null;
          }
        } else {
          site.sitePicture3 = null;
        }
      });

      console.log("Processed sites data:", resData); // Debug

      setSitesData(resData);
      setCurrentPage(1);
      const indexOfLastSite = 1 * sitesPerPage;
      const indexOfFirstSite = indexOfLastSite - sitesPerPage;
      setCurrentPageSites(resData.slice(indexOfFirstSite, indexOfLastSite));
      setIsFetching(false);
    }

    fetchSites();
  }, [debouncedSearchTitle, refreshTrigger, sitesPerPage]);

  // Helper function to get the first available site image
  const getFirstSiteImage = (site) => {
    console.log("Getting first image for site:", site.siteName); // Debug
    console.log("sitePicture1:", site.sitePicture1); // Debug

    // Use only sitePicture1
    if (
      site.sitePicture1 &&
      typeof site.sitePicture1 === "string" &&
      site.sitePicture1.trim() !== ""
    ) {
      console.log("Using sitePicture1:", site.sitePicture1); // Debug
      return site.sitePicture1;
    }

    // No image available
    console.log("No sitePicture1 available for site:", site.siteName); // Debug
    return null;
  };

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const clearFilters = () => {
    setSearchTitle("");
    setDebouncedSearchTitle("");
    setShowFilters(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (searchTitle) count++;
    return count;
  };

  function paginate(number) {
    setCurrentPage(number);
    if (number < Math.ceil(sitesData.length / sitesPerPage + 1) && number > 0) {
      const indexOfLastSite = number * sitesPerPage;
      const indexOfFirstSite = indexOfLastSite - sitesPerPage;
      setCurrentPageSites(sitesData.slice(indexOfFirstSite, indexOfLastSite));
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
            <VStack spacing={6} align="stretch">
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align={{ base: "stretch", sm: "center" }}
                gap={4}
              >
                <Box>
                  <Heading
                    as="h1"
                    size={{ base: "xl", md: "2xl" }}
                    color={accentColor}
                    mb={2}
                  >
                    SIRC Sites Management
                  </Heading>
                  <Text color={textColor} fontSize={{ base: "md", md: "lg" }}>
                    Manage research sites and field locations
                  </Text>
                  <Text fontSize="sm" color={textColor} mt={1}>
                    {sitesData.length}/3 sites created
                  </Text>
                </Box>

                {sitesData.length >= 3 ? (
                  <Tooltip
                    label="Maximum of 3 sites allowed. Delete an existing site to create a new one."
                    placement="top"
                    hasArrow
                  >
                    <Button
                      size={{ base: "md", md: "lg" }}
                      bg="gray.400"
                      color="white"
                      px={8}
                      w={{ base: "100%", sm: "auto" }}
                      isDisabled={true}
                      cursor="not-allowed"
                    >
                      Add New Site (Limit Reached)
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    as={NavLink}
                    to="new"
                    size={{ base: "md", md: "lg" }}
                    bg={accentColor}
                    color="white"
                    _hover={{ bg: `${accentColor}.600` }}
                    px={8}
                    w={{ base: "100%", sm: "auto" }}
                  >
                    Add New Site
                  </Button>
                )}
              </Flex>

              {/* Search and Filter Controls */}
              <Box>
                <VStack spacing={4} align="stretch">
                  {/* Search Bar */}
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    gap={4}
                    align={{ base: "stretch", sm: "center" }}
                  >
                    <InputGroup size={{ base: "md", md: "lg" }} flex={1}>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={Search} color={textColor} />
                      </InputLeftElement>
                      <Input
                        placeholder="Search sites by name..."
                        value={searchTitle}
                        onChange={handleSearchChange}
                        borderColor={borderColor}
                        _hover={{ borderColor: accentColor }}
                        _focus={{
                          borderColor: accentColor,
                          boxShadow: "outline",
                        }}
                        bg={bgColor}
                      />
                    </InputGroup>

                    <HStack spacing={2}>
                      <Button
                        leftIcon={<Filter size={16} />}
                        onClick={() => setShowFilters(!showFilters)}
                        variant="outline"
                        borderColor={borderColor}
                        _hover={{
                          borderColor: accentColor,
                          bg: `${accentColor}.50`,
                        }}
                        size={{ base: "md", md: "lg" }}
                        position="relative"
                      >
                        Filters
                        {getActiveFilterCount() > 0 && (
                          <Badge
                            position="absolute"
                            top="-8px"
                            right="-8px"
                            colorScheme="red"
                            borderRadius="full"
                            fontSize="xs"
                            minW="20px"
                            h="20px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {getActiveFilterCount()}
                          </Badge>
                        )}
                      </Button>

                      {getActiveFilterCount() > 0 && (
                        <Button
                          leftIcon={<X size={16} />}
                          onClick={clearFilters}
                          variant="ghost"
                          color={textColor}
                          _hover={{
                            bg: `${accentColor}.50`,
                            color: accentColor,
                          }}
                          size={{ base: "md", md: "lg" }}
                        >
                          Clear
                        </Button>
                      )}
                    </HStack>
                  </Flex>

                  {/* Active Filters Display */}
                  {getActiveFilterCount() > 0 && (
                    <Box>
                      <Text fontSize="sm" color={textColor} mb={2}>
                        Active Filters:
                      </Text>
                      <Flex wrap="wrap" gap={2}>
                        {searchTitle && (
                          <Box
                            bg={accentColor}
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="500"
                          >
                            Search: {searchTitle}
                          </Box>
                        )}
                      </Flex>
                    </Box>
                  )}
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>

        {/* Sites List */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={8}>
          {/* Site Limit Warning */}
          {sitesData.length >= 3 && (
            <Alert status="warning" borderRadius="md" mb={6}>
              <AlertIcon />
              <Box>
                <AlertTitle>Site Limit Reached!</AlertTitle>
                <AlertDescription>
                  You have reached the maximum limit of 3 sites. To create a new
                  site, you must first delete an existing one.
                </AlertDescription>
              </Box>
            </Alert>
          )}

          {sitesData.length === 0 && !isFetching ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={12}
              color={textColor}
            >
              <Text fontSize="xl" mb={2}>
                No Sites Available
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
              <Text fontSize="xl">Loading Sites...</Text>
            </Flex>
          ) : (
            <VStack spacing={6}>
              {currentPageSites.map((site) => (
                <Card
                  key={site.id}
                  w="100%"
                  variant="outline"
                  borderRadius={{ base: 15, md: 30 }}
                  boxShadow="sm"
                  overflow="hidden"
                  direction={{ base: "column", md: "row" }}
                  bg={cardBg}
                  borderColor={borderColor}
                  _hover={{
                    boxShadow: "md",
                    borderColor: accentColor,
                  }}
                  transition="all 0.2s"
                >
                  {/* Site Image */}
                  <Box
                    width={{ base: "100%", md: "300px" }}
                    height={{ base: "200px", md: "250px" }}
                    bg="gray.100"
                    position="relative"
                  >
                    {(() => {
                      const firstImage = getFirstSiteImage(site);
                      console.log(
                        "Rendering image for site:",
                        site.siteName,
                        "Image URL:",
                        firstImage
                      ); // Debug

                      if (firstImage) {
                        return (
                          <>
                            <Image
                              src={firstImage}
                              alt={site.siteName}
                              objectFit="cover"
                              width="100%"
                              height="100%"
                              onError={(e) => {
                                console.error(
                                  "Image failed to load:",
                                  firstImage
                                ); // Debug
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                              onLoad={() => {
                                console.log(
                                  "Image loaded successfully:",
                                  firstImage
                                ); // Debug
                              }}
                            />
                            {/* Fallback component - hidden initially, shown on error */}
                            <Box
                              position="absolute"
                              top={0}
                              left={0}
                              right={0}
                              bottom={0}
                              display="none"
                              alignItems="center"
                              justifyContent="center"
                              flexDirection="column"
                              bg="gray.100"
                            >
                              <NoImageFallback />
                            </Box>
                          </>
                        );
                      } else {
                        return <NoImageFallback />;
                      }
                    })()}
                  </Box>

                  {/* Site Details */}
                  <CardBody flex={1} p={{ base: 4, md: 6 }}>
                    <VStack align="start" spacing={4} h="100%">
                      <Box flex={1}>
                        <Heading
                          size={{ base: "md", md: "lg" }}
                          color={accentColor}
                          mb={3}
                          lineHeight="1.3"
                        >
                          {site.siteName}
                        </Heading>

                        <Text
                          color={textColor}
                          fontSize={{ base: "sm", md: "md" }}
                          lineHeight="1.6"
                          noOfLines={3}
                        >
                          {site.siteDescription}
                        </Text>

                        {site.keyFeatures && (
                          <Box mt={3}>
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color={accentColor}
                              mb={1}
                            >
                              Key Features:
                            </Text>
                            <Text fontSize="sm" color={textColor} noOfLines={2}>
                              {site.keyFeatures}
                            </Text>
                          </Box>
                        )}
                      </Box>

                      {/* Action Buttons */}
                      <HStack spacing={3} w="100%">
                        <Button
                          as={NavLink}
                          to={`modify/${site.id}`}
                          leftIcon={<Edit size={16} />}
                          size="sm"
                          variant="outline"
                          borderColor={accentColor}
                          color={accentColor}
                          _hover={{
                            bg: accentColor,
                            color: "white",
                          }}
                          flex={1}
                        >
                          Edit
                        </Button>

                        <Form
                          method="post"
                          action={`${site.id}/destroy`}
                          style={{ flex: 1 }}
                        >
                          <Button
                            type="submit"
                            leftIcon={<Trash2 size={16} />}
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            w="100%"
                            onClick={(e) => {
                              if (
                                !confirm(
                                  "Are you sure you want to delete this site?"
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </Form>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          )}

          {/* Pagination */}
          {!isFetching && (
            <Box py={8}>
              <Pagination
                projPerPage={sitesPerPage}
                totalProj={sitesData.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </Box>
          )}
        </Container>
      </Box>

      <Outlet />
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);

  const response = await fetch(API_ENDPOINTS.SITES + url.search, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sites");
  }

  const sites = await response.json();

  console.log("Loader - received sites:", sites.length); // Debug
  console.log("Loader - sample site:", sites[0]); // Debug

  // Extract and format image fields consistently with other admin pages
  sites.forEach((site) => {
    // Extract sitePicture1
    if (site.sitePicture1) {
      if (typeof site.sitePicture1 === "string") {
        // Check if it's a stringified array or a direct URL
        if (
          site.sitePicture1.startsWith("[") &&
          site.sitePicture1.endsWith("]")
        ) {
          try {
            const vals = site.sitePicture1
              .replace("[", "")
              .replace("]", "")
              .replace(/["]/g, "")
              .split(",")
              .filter((val) => val.trim() !== "");
            site.sitePicture1 = vals.length > 0 ? vals[0].trim() : null; // Take first URL as string
          } catch (error) {
            site.sitePicture1 = null;
          }
        } else {
          // It's already a direct URL string
          site.sitePicture1 = site.sitePicture1.trim();
        }
      } else if (Array.isArray(site.sitePicture1)) {
        // Convert array to first string
        site.sitePicture1 =
          site.sitePicture1.length > 0 ? site.sitePicture1[0] : null;
      } else {
        site.sitePicture1 = null;
      }
    } else {
      site.sitePicture1 = null;
    }

    // Extract sitePicture2
    if (site.sitePicture2) {
      if (typeof site.sitePicture2 === "string") {
        if (
          site.sitePicture2.startsWith("[") &&
          site.sitePicture2.endsWith("]")
        ) {
          try {
            const vals = site.sitePicture2
              .replace("[", "")
              .replace("]", "")
              .replace(/["]/g, "")
              .split(",")
              .filter((val) => val.trim() !== "");
            site.sitePicture2 = vals.length > 0 ? vals[0].trim() : null; // Take first URL as string
          } catch (error) {
            site.sitePicture2 = null;
          }
        } else {
          site.sitePicture2 = site.sitePicture2.trim();
        }
      } else if (Array.isArray(site.sitePicture2)) {
        site.sitePicture2 =
          site.sitePicture2.length > 0 ? site.sitePicture2[0] : null;
      } else {
        site.sitePicture2 = null;
      }
    } else {
      site.sitePicture2 = null;
    }

    // Extract sitePicture3
    if (site.sitePicture3) {
      if (typeof site.sitePicture3 === "string") {
        if (
          site.sitePicture3.startsWith("[") &&
          site.sitePicture3.endsWith("]")
        ) {
          try {
            const vals = site.sitePicture3
              .replace("[", "")
              .replace("]", "")
              .replace(/["]/g, "")
              .split(",")
              .filter((val) => val.trim() !== "");
            site.sitePicture3 = vals.length > 0 ? vals[0].trim() : null; // Take first URL as string
          } catch (error) {
            site.sitePicture3 = null;
          }
        } else {
          site.sitePicture3 = site.sitePicture3.trim();
        }
      } else if (Array.isArray(site.sitePicture3)) {
        site.sitePicture3 =
          site.sitePicture3.length > 0 ? site.sitePicture3[0] : null;
      } else {
        site.sitePicture3 = null;
      }
    } else {
      site.sitePicture3 = null;
    }
  });

  console.log("Loader - processed sites:", sites); // Debug

  return sites;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  // Handle delete operation - site ID comes from URL params
  if (request.method === "POST" && params.id) {
    const response = await fetch(getApiUrlWithId("sites", params.id), {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete site");
    }

    return redirect("/l4m3r-secure-dashboard-panel/sirc-sites");
  }

  return null;
}

export async function siteDetailLoader({ params }) {
  const response = await fetch(getApiUrlWithId("sites", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch site details");
  }

  const site = await response.json();

  // Extract and format image fields consistently with other admin pages
  // Extract sitePicture1
  if (site.sitePicture1 && typeof site.sitePicture1 === "string") {
    try {
      const vals = site.sitePicture1
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",")
        .filter((val) => val.trim() !== "");
      site.sitePicture1 = vals.length > 0 ? vals[0] : null; // Use first image for edit form
    } catch (error) {
      site.sitePicture1 = null;
    }
  } else if (!site.sitePicture1) {
    site.sitePicture1 = null;
  }

  // Extract sitePicture2
  if (site.sitePicture2 && typeof site.sitePicture2 === "string") {
    try {
      const vals = site.sitePicture2
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",")
        .filter((val) => val.trim() !== "");
      site.sitePicture2 = vals.length > 0 ? vals[0] : null; // Use first image for edit form
    } catch (error) {
      site.sitePicture2 = null;
    }
  } else if (!site.sitePicture2) {
    site.sitePicture2 = null;
  }

  // Extract sitePicture3
  if (site.sitePicture3 && typeof site.sitePicture3 === "string") {
    try {
      const vals = site.sitePicture3
        .replace("[", "")
        .replace("]", "")
        .replace(/["]/g, "")
        .split(",")
        .filter((val) => val.trim() !== "");
      site.sitePicture3 = vals.length > 0 ? vals[0] : null; // Use first image for edit form
    } catch (error) {
      site.sitePicture3 = null;
    }
  } else if (!site.sitePicture3) {
    site.sitePicture3 = null;
  }

  return site;
}
