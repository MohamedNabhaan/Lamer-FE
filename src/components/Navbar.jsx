"use client";

import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo3.png";
import { NAV_ITEMS } from "../index.js";
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
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  const [shrink, setShrink] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 70) {
      setShrink(true);
    } else {
      setShrink(false);
    }
  };

  return (
    <Box
      sx={{
        position: "-webkit-sticky",
        position: "sticky",
        top: "0",
        zIndex: "99999",
      }}
    >
      <Flex
        borderBottom={"solid"}
        borderColor={"design.100"}
        height={`${shrink ? "8vh" : "12vh"}`}
        transition={"ease"}
        transitionDuration={"600ms"}
        bg="white"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 1 }}
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
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
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
          <Image marginRight={{ base: 0, lg: 20 }} src={logo} />

          <Flex display={{ base: "none", md: "flex" }} ml={{ base: 0, md: 10 }}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
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

      <Button
        bg={"brand.400"}
        textColor={"white"}
        fontWeight={600}
        border="solid"
        transition={"0.5s"}
        _hover={{
          textDecoration: "none",
          textColor: "brand.400",
          bgColor: "white",
          border: "solid",
        }}
      >
        Contact Us
      </Button>
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
            color={"brand.400"}
            _groupHover={{ color: "gray.800" }}
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
          <Icon color={"gray.800"} w={5} h={5} as={ChevronRightIcon} />
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
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
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
              <Box key={child.label} py={2}>
                <NavLink to={`${child.path}`}>{child.label}</NavLink>
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
