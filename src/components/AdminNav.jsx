"use client";
import { redirect, Form, NavLink, useLocation, Link } from "react-router-dom";
import logo from "../assets/logo3.png";
import { ADMIN_NAV_ITEMS as NAV_ITEMS } from "../index.js";
import { getCachedUser } from "../utils/auth.jsx";
import {
  Image,
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Center,
  useClipboard,
  HStack,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { GiHamburgerMenu as HamburgerIcon } from "react-icons/gi";

import {
  FaRegWindowClose as CloseIcon,
  FaChevronDown as ChevronDownIcon,
  FaChevronRight as ChevronRightIcon,
} from "react-icons/fa";
import { useEffect, useState, useCallback, useRef } from "react";
import { User } from "lucide-react";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isUserMenuOpen,
    onToggle: toggleUserMenu,
    onClose: closeUserMenu,
  } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState(null);
  const lastScrollY = useRef(0);
  const observerRef = useRef(null);

  // Get user data
  useEffect(() => {
    const userData = getCachedUser();
    setUser(userData);
  }, []);

  // Handle click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest("[data-user-menu]")) {
        closeUserMenu();
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserMenuOpen, closeUserMenu]);

  useEffect(() => {
    // Create observer for the top of the page
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    // Create sentinel element
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.height = "1px";
    sentinel.style.width = "100%";
    document.body.prepend(sentinel);

    observer.observe(sentinel);
    observerRef.current = { observer, sentinel };

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      // Only hide navbar when scrolling down and not at the top
      if (scrollingDown && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Form method="post">
      <Box
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "99999",
          transform: `translateY(${!isVisible ? "-100%" : "0"})`,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
      >
        <Flex
          borderBottom={"solid"}
          borderColor={"design.100"}
          style={{
            height: isScrolled ? "70px" : "90px",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "height",
            backdropFilter: isScrolled ? "blur(8px)" : "none",
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "white",
            boxShadow: isScrolled
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              : "none",
          }}
          py={{ base: isScrolled ? 2 : 3 }}
          px={{ base: 4 }}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: 2 }}
            maxW={8}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", md: "center" }}
            gap={{ base: 0, lg: 20 }}
            pl={{ base: 0, md: 10 }}
            pr={{ base: 0, md: 10 }}
          >
            <Image
              marginRight={{ base: 0, lg: 20 }}
              src={logo}
              style={{
                height: isScrolled ? "60px" : "80px",
                transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              alt="Lamer Admin Logo"
            />

            <Flex
              display={{ base: "none", md: "flex" }}
              ml={{ base: 0, md: 10 }}
            >
              <DesktopNav />
            </Flex>
          </Flex>

          {/* User Profile Section */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }} mr={4}>
            {user && (
              <Box position="relative" data-user-menu>
                <Box
                  cursor="pointer"
                  onClick={toggleUserMenu}
                  _hover={{
                    bg: useColorModeValue("gray.100", "gray.600"),
                  }}
                  transition="all 0.2s"
                >
                  <HStack
                    spacing={3}
                    px={4}
                    py={2}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    borderRadius="full"
                    border="1px solid"
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  >
                    <Avatar
                      size="sm"
                      name={user.name || user.email}
                      bg="brand.400"
                      color="white"
                      icon={<Icon as={User} w={4} h={4} />}
                    />
                    <VStack spacing={0} align="start">
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color={useColorModeValue("gray.800", "white")}
                        lineHeight="1.2"
                      >
                        {user.name || user.email?.split("@")[0] || "User"}
                      </Text>
                      <Text
                        fontSize="xs"
                        color={useColorModeValue("gray.500", "gray.400")}
                        lineHeight="1.2"
                      >
                        {user.email}
                      </Text>
                    </VStack>
                    <Icon
                      as={ChevronDownIcon}
                      w={4}
                      h={4}
                      color={useColorModeValue("gray.400", "gray.500")}
                      transform={
                        isUserMenuOpen ? "rotate(180deg)" : "rotate(0deg)"
                      }
                      transition="transform 0.2s"
                    />
                  </HStack>
                </Box>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    mt={2}
                    border="1px solid"
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                    bg={useColorModeValue("white", "gray.800")}
                    boxShadow="xl"
                    borderRadius="xl"
                    p={0}
                    w="200px"
                    zIndex="dropdown"
                  >
                    <VStack spacing={0} align="stretch">
                      {/* User Info Header */}
                      <Box
                        p={4}
                        borderBottom="1px solid"
                        borderColor={useColorModeValue("gray.100", "gray.700")}
                      >
                        <VStack spacing={1} align="start">
                          <Text
                            fontSize="sm"
                            fontWeight="600"
                            color={useColorModeValue("gray.800", "white")}
                          >
                            {user.name || user.email?.split("@")[0] || "User"}
                          </Text>
                          <Text
                            fontSize="xs"
                            color={useColorModeValue("gray.500", "gray.400")}
                          >
                            {user.email}
                          </Text>
                          {user.role && (
                            <Text
                              fontSize="xs"
                              color="brand.400"
                              fontWeight="500"
                            >
                              {user.role}
                            </Text>
                          )}
                        </VStack>
                      </Box>

                      {/* Link to Unapproved Users - Only show for admin users */}
                      {user.role && user.role.toLowerCase() === "admin" && (
                        <Box p={2}>
                          <Link to="/l4m3r-secure-dashboard-panel/user-approvals">
                            <Button
                              w="100%"
                              size="sm"
                              bg="brand.400"
                              color="white"
                              fontWeight="600"
                              borderRadius="lg"
                              _hover={{
                                bg: "brand.500",
                              }}
                              _active={{
                                bg: "brand.600",
                              }}
                            >
                              Unapproved Users
                            </Button>
                          </Link>
                        </Box>
                      )}

                      {/* Logout Button */}
                      <Box p={2}>
                        <Button
                          type="submit"
                          w="100%"
                          size="sm"
                          bg="red.400"
                          color="white"
                          fontWeight="600"
                          borderRadius="lg"
                          _hover={{
                            bg: "red.500",
                          }}
                          _active={{
                            bg: "red.600",
                          }}
                        >
                          Log Out
                        </Button>
                      </Box>
                    </VStack>
                  </Box>
                )}
              </Box>
            )}
          </HStack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </Form>
  );
}

const DesktopNav = () => {
  const { pathname } = useLocation();
  const linkColor = useColorModeValue("black.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack
      as="nav"
      direction={"row"}
      spacing={{ base: 4, lg: 8 }}
      alignItems={"center"}
    >
      {NAV_ITEMS.map((navItem) => (
        <Center key={navItem.label}>
          <Box>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Box
                  p={{ base: 0, lg: 2 }}
                  fontSize={{ base: "sm", lg: "lg" }}
                  borderRadius={"xl"}
                >
                  {navItem.path ? (
                    <NavLink to={`${navItem.path}`}>
                      {({ isActive }) => (
                        <Text
                          fontWeight={
                            isActive || navItem.subRoutes.includes(pathname)
                              ? 600
                              : 500
                          }
                          color={"brand.400"}
                          _hover={{
                            color:
                              isActive || navItem.subRoutes.includes(pathname)
                                ? "brand.400"
                                : linkHoverColor,
                          }}
                        >
                          {navItem.label}
                        </Text>
                      )}
                    </NavLink>
                  ) : (
                    <Text
                      fontWeight={
                        navItem.subRoutes.includes(pathname) ? 600 : 500
                      }
                      color={"brand.400"}
                      _hover={{
                        color: navItem.subRoutes.includes(pathname)
                          ? "brand.400"
                          : linkHoverColor,
                        cursor: navItem.children ? "pointer" : "default",
                      }}
                    >
                      {navItem.label}
                    </Text>
                  )}
                </Box>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        </Center>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, path }) => {
  return (
    <Box
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            <NavLink to={`${path}`}>{label}</NavLink>
          </Text>
          <Text fontSize={"sm"}></Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ lg: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, path }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4}>
      <Box
        py={2}
        as={path ? NavLink : "div"}
        to={path}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={children ? onToggle : undefined}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("brand.400", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <NavLink
                key={child.label}
                to={child.path}
                style={({ isActive }) => ({
                  fontWeight: isActive ? "600" : "400",
                  color: isActive
                    ? "var(--chakra-colors-brand-400)"
                    : "inherit",
                  display: "block",
                  width: "100%",
                  padding: "0.5rem 0",
                })}
              >
                {child.label}
              </NavLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
