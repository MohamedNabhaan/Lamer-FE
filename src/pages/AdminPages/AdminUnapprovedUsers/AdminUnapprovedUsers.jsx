import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue,
  Badge,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Spacer,
  Icon,
  TableContainer,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../config/api.js";
import { Users, UserCheck, UserX, Calendar, Shield } from "lucide-react";
import { redirect } from "react-router-dom";
import { getCachedUser } from "../../../utils/auth.jsx";
import { useState } from "react";

export default function AdminUnapprovedUsers() {
  const unapprovedUsers = useLoaderData();
  const fetcher = useFetcher();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const handleApprove = async (userId, role) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.SIGN_IN.replace(
          "/auth/signin",
          "/unapproved-users"
        )}/${userId}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          credentials: "include",
          body: JSON.stringify({ role }),
        }
      );

      if (response.ok) {
        toast({
          title: "User Approved",
          description: `User has been successfully approved as ${role}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Navigate to refresh the page instead of window.location.reload()
        navigate("/l4m3r-secure-dashboard-panel/user-approvals", {
          replace: true,
        });
      } else {
        throw new Error("Failed to approve user");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve user. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.SIGN_IN.replace(
          "/auth/signin",
          "/unapproved-users"
        )}/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        toast({
          title: "User Rejected",
          description: "User registration has been rejected and removed.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        // Navigate to refresh the page instead of window.location.reload()
        navigate("/l4m3r-secure-dashboard-panel/user-approvals", {
          replace: true,
        });
      } else {
        throw new Error("Failed to reject user");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject user. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const openApprovalModal = (user) => {
    setSelectedUser(user);
    setSelectedRole("user"); // Default role
    onOpen();
  };

  const confirmApproval = () => {
    if (selectedUser && selectedRole) {
      handleApprove(selectedUser.id || selectedUser._id, selectedRole);
      onClose();
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "red";
      case "moderator":
        return "purple";
      case "user":
      default:
        return "blue";
    }
  };

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      pt={{ base: 20, md: 24 }}
      pb={8}
      px={{ base: 4, md: 8 }}
    >
      <VStack spacing={8} align="stretch" maxW="7xl" mx="auto">
        {/* Header Section */}
        <Card bg={cardBg} shadow="sm" borderRadius="xl">
          <CardHeader pb={4}>
            <Flex align="center" gap={4}>
              <Flex
                align="center"
                justify="center"
                w={12}
                h={12}
                bg="brand.100"
                borderRadius="xl"
              >
                <Icon as={Users} w={6} h={6} color="brand.500" />
              </Flex>
              <Box>
                <Heading
                  size="lg"
                  color={useColorModeValue("gray.800", "white")}
                >
                  User Approvals
                </Heading>
                <Text color={textColor} fontSize="sm" mt={1}>
                  Review and manage user registration requests
                </Text>
              </Box>
              <Spacer />
              {unapprovedUsers && (
                <Badge
                  colorScheme="yellow"
                  fontSize="sm"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {unapprovedUsers.length} Pending
                </Badge>
              )}
            </Flex>
          </CardHeader>
        </Card>

        {/* Content Section */}
        <Card bg={cardBg} shadow="sm" borderRadius="xl" overflow="hidden">
          <CardBody p={0}>
            {unapprovedUsers && unapprovedUsers.length > 0 ? (
              <TableContainer>
                <Table variant="simple">
                  <Thead bg={useColorModeValue("gray.50", "gray.700")}>
                    <Tr>
                      <Th
                        color={textColor}
                        fontWeight="600"
                        fontSize="xs"
                        letterSpacing="wider"
                      >
                        USER DETAILS
                      </Th>
                      <Th
                        color={textColor}
                        fontWeight="600"
                        fontSize="xs"
                        letterSpacing="wider"
                      >
                        EMAIL
                      </Th>
                      <Th
                        color={textColor}
                        fontWeight="600"
                        fontSize="xs"
                        letterSpacing="wider"
                      >
                        REGISTRATION DATE
                      </Th>
                      <Th
                        color={textColor}
                        fontWeight="600"
                        fontSize="xs"
                        letterSpacing="wider"
                      >
                        STATUS
                      </Th>
                      <Th
                        color={textColor}
                        fontWeight="600"
                        fontSize="xs"
                        letterSpacing="wider"
                      >
                        ACTIONS
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {unapprovedUsers.map((user, index) => (
                      <Tr
                        key={user.id || user._id}
                        _hover={{
                          bg: useColorModeValue("gray.50", "gray.700"),
                        }}
                        borderBottom={
                          index === unapprovedUsers.length - 1
                            ? "none"
                            : "1px solid"
                        }
                        borderColor={borderColor}
                      >
                        <Td py={4}>
                          <VStack align="start" spacing={1}>
                            <Text
                              fontWeight="600"
                              color={useColorModeValue("gray.800", "white")}
                              fontSize="sm"
                            >
                              {user.username}
                            </Text>
                            <HStack spacing={1}>
                              <Icon
                                as={Calendar}
                                w={3}
                                h={3}
                                color={textColor}
                              />
                              <Text fontSize="xs" color={textColor}>
                                Registered{" "}
                                {user.createdAt
                                  ? new Date(
                                      user.createdAt
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </Text>
                            </HStack>
                          </VStack>
                        </Td>
                        <Td py={4}>
                          <Text
                            fontSize="sm"
                            color={useColorModeValue("gray.700", "gray.300")}
                          >
                            {user.email}
                          </Text>
                        </Td>
                        <Td py={4}>
                          <Text fontSize="sm" color={textColor}>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "N/A"}
                          </Text>
                        </Td>
                        <Td py={4}>
                          <Badge
                            colorScheme="yellow"
                            variant="subtle"
                            borderRadius="full"
                            px={3}
                            py={1}
                            fontSize="xs"
                            fontWeight="600"
                          >
                            Pending Review
                          </Badge>
                        </Td>
                        <Td py={4}>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              colorScheme="green"
                              variant="solid"
                              leftIcon={<Icon as={UserCheck} w={4} h={4} />}
                              onClick={() => openApprovalModal(user)}
                              isLoading={fetcher.state === "submitting"}
                              borderRadius="lg"
                              fontWeight="600"
                              fontSize="xs"
                              _hover={{
                                transform: "translateY(-1px)",
                                shadow: "md",
                              }}
                              transition="all 0.2s"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              variant="outline"
                              leftIcon={<Icon as={UserX} w={4} h={4} />}
                              onClick={() => handleReject(user.id || user._id)}
                              isLoading={fetcher.state === "submitting"}
                              borderRadius="lg"
                              fontWeight="600"
                              fontSize="xs"
                              _hover={{
                                transform: "translateY(-1px)",
                                shadow: "md",
                                bg: "red.50",
                              }}
                              transition="all 0.2s"
                            >
                              Reject
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Box p={12} textAlign="center">
                <Flex
                  align="center"
                  justify="center"
                  w={16}
                  h={16}
                  bg="gray.100"
                  borderRadius="full"
                  mx="auto"
                  mb={4}
                >
                  <Icon as={UserCheck} w={8} h={8} color="gray.400" />
                </Flex>
                <Heading
                  size="md"
                  color={useColorModeValue("gray.600", "gray.400")}
                  mb={2}
                >
                  All caught up!
                </Heading>
                <Text color={textColor} fontSize="sm">
                  No pending user registration requests at this time.
                </Text>
              </Box>
            )}
          </CardBody>
        </Card>
      </VStack>

      {/* Role Selection Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent mx={4} borderRadius="xl">
          <ModalHeader>
            <HStack spacing={3}>
              <Flex
                align="center"
                justify="center"
                w={10}
                h={10}
                bg="green.100"
                borderRadius="lg"
              >
                <Icon as={Shield} w={5} h={5} color="green.500" />
              </Flex>
              <Box>
                <Text fontSize="lg" fontWeight="600">
                  Approve User
                </Text>
                <Text fontSize="sm" color={textColor} fontWeight="normal">
                  Select a role for {selectedUser?.username}
                </Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="600" color={textColor}>
                Assign Role
              </FormLabel>
              <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                borderRadius="lg"
                border="2px solid"
                borderColor={useColorModeValue("gray.200", "gray.600")}
                _focus={{
                  borderColor: "brand.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                }}
              >
                <option value="user">Simple User - Standard Access</option>
                <option value="moderator">
                  Moderator - Content Management
                </option>
                <option value="admin">Admin - Full System Access</option>
              </Select>

              {/* Role Description */}
              <Box
                mt={3}
                p={3}
                bg={useColorModeValue("gray.50", "gray.700")}
                borderRadius="lg"
              >
                <HStack spacing={2} mb={2}>
                  <Badge
                    colorScheme={getRoleBadgeColor(selectedRole)}
                    variant="subtle"
                    borderRadius="full"
                    px={2}
                    py={1}
                    fontSize="xs"
                  >
                    {selectedRole === "user"
                      ? "Simple User"
                      : selectedRole === "moderator"
                      ? "Moderator"
                      : "Admin"}
                  </Badge>
                </HStack>
                <Text fontSize="xs" color={textColor}>
                  {selectedRole === "user" &&
                    "Standard user with basic access to content and features."}
                  {selectedRole === "moderator" &&
                    "Can manage content, moderate discussions, and assist with user management."}
                  {selectedRole === "admin" &&
                    "Full system access including user management, system configuration, and all administrative functions."}
                </Text>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              variant="ghost"
              onClick={onClose}
              borderRadius="lg"
              fontWeight="600"
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={confirmApproval}
              borderRadius="lg"
              fontWeight="600"
              leftIcon={<Icon as={UserCheck} w={4} h={4} />}
            >
              Approve as{" "}
              {selectedRole === "user"
                ? "Simple User"
                : selectedRole === "moderator"
                ? "Moderator"
                : "Admin"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

// Loader function to fetch unapproved users
export async function loader() {
  try {
    // First, check if the user has admin role
    const user = getCachedUser();
    console.log("Cached user data:", user); // Debug log

    if (!user || !user.role) {
      console.log("No user or no role found, redirecting to no access");
      throw redirect("/l4m3r-secure-dashboard-panel/no-access");
    }

    // Check for admin role (handle both uppercase and lowercase)
    const userRole = user.role.toLowerCase();
    if (userRole !== "admin") {
      console.log(
        `User role "${userRole}" is not admin, redirecting to no access`
      );
      throw redirect("/l4m3r-secure-dashboard-panel/no-access");
    }

    const response = await fetch(
      API_ENDPOINTS.SIGN_IN.replace("/auth/signin", "/unapproved-users"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.log("Unauthorized access, redirecting to no access");
        throw redirect("/l4m3r-secure-dashboard-panel/no-access");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Successfully fetched unapproved users:", data.length);
    return data;
  } catch (error) {
    // If it's a redirect, re-throw it
    if (error instanceof Response) {
      throw error;
    }

    console.error("Failed to fetch unapproved users:", error);
    return [];
  }
}
