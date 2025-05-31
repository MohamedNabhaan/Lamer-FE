import {
  Stack,
  HStack,
  Link,
  Divider,
  Image,
  IconButton,
  Box,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo3.png";
import Wave from "react-wavify";

const navigationSections = [
  {
    title: "Services",
    links: [
      { label: "Our Services", path: "/Services" },
      { label: "SIRC Research", path: "/SIRC" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/AboutUs" },
      { label: "Our Projects", path: "/Projects" },
      { label: "Our Clients", path: "/Clients" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Careers", path: "/Careers" },
      { label: "Contact Us", path: "/ContactUs" },
    ],
  },
];

const socialAccounts = [
  {
    url: "https://www.facebook.com/lamermaldives/",
    label: "Facebook",
    type: "facebook",
    icon: <FaFacebook />,
  },
  {
    url: "https://mv.linkedin.com/company/lamer-group-pvt-ltd",
    label: "LinkedIn",
    type: "linkedin",
    icon: <FaLinkedin />,
  },
];

const Footer = () => {
  const linkColor = useColorModeValue("white", "gray.200");
  const hoverColor = useColorModeValue("blue.200", "blue.300");
  const headingColor = useColorModeValue("blue.100", "blue.200");

  return (
    <Box marginTop="auto" bottom={0}>
      {/* Wave Container - Separate from footer content */}
      <Box position="relative" height="60px" overflow="hidden">
        {/* Wave Animations */}
        <Wave
          fill="#435BA1"
          paused={false}
          style={{ display: "flex", position: "absolute", top: 0 }}
          opacity={0.8}
          options={{
            height: 30,
            amplitude: 25,
            speed: 0.15,
            points: 3,
          }}
        />
        <Wave
          fill="#3A4F94"
          paused={false}
          style={{ display: "flex", position: "absolute", top: 0 }}
          opacity={0.6}
          options={{
            height: 25,
            amplitude: 35,
            speed: 0.1,
            points: 4,
          }}
        />
        <Wave
          fill="#3A4F88"
          paused={false}
          style={{ display: "flex", position: "absolute", top: 0 }}
          opacity={0.4}
          options={{
            height: 20,
            amplitude: 30,
            speed: 0.08,
            points: 5,
          }}
        />
      </Box>

      {/* Main Footer Content - No background */}
      <Box bg="brand.400">
        {/* Main Footer Content */}
        <Box py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: 8, md: 12 }}
            maxW="container.xl"
            mx="auto"
          >
            {/* Company Info Section */}
            <VStack spacing={4} align={{ base: "center", md: "start" }}>
              <VStack spacing={2} align={{ base: "center", md: "start" }}>
                <Text
                  fontSize="sm"
                  color={linkColor}
                  fontWeight="600"
                  textAlign={{ base: "center", md: "left" }}
                >
                  LAMER Group Pvt Ltd
                </Text>
                <Text
                  fontSize="xs"
                  color="whiteAlpha.800"
                  textAlign={{ base: "center", md: "left" }}
                  maxW="250px"
                >
                  Leading Maldivian Environmental Consultancy since 2000,
                  specializing in marine research and sustainable development.
                </Text>
              </VStack>
            </VStack>

            {/* Navigation Sections */}
            {navigationSections.map((section, index) => (
              <VStack
                key={index}
                spacing={4}
                align={{ base: "center", md: "start" }}
              >
                <Heading size="sm" color={headingColor} fontWeight="600">
                  {section.title}
                </Heading>
                <VStack spacing={3} align={{ base: "center", md: "start" }}>
                  {section.links.map((link, linkIndex) => (
                    <CustomLink
                      key={linkIndex}
                      to={link.path}
                      color={linkColor}
                      hoverColor={hoverColor}
                    >
                      {link.label}
                    </CustomLink>
                  ))}
                </VStack>
              </VStack>
            ))}

            {/* Social Media Section */}
            <VStack spacing={4} align={{ base: "center", md: "start" }}>
              <Heading size="sm" color={headingColor} fontWeight="600">
                Follow Us
              </Heading>
              <VStack spacing={3} align={{ base: "center", md: "start" }}>
                <Text
                  fontSize="xs"
                  color="whiteAlpha.800"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Stay connected for updates and insights
                </Text>
                <HStack spacing={3}>
                  {socialAccounts.map((account, index) => (
                    <IconButton
                      key={index}
                      as={Link}
                      href={account.url}
                      isExternal
                      aria-label={account.label}
                      icon={account.icon}
                      colorScheme={account.type}
                      variant="ghost"
                      color="white"
                      _hover={{
                        bg: "whiteAlpha.200",
                        transform: "translateY(-2px)",
                      }}
                      transition="all 0.2s"
                      size="md"
                    />
                  ))}
                </HStack>
              </VStack>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Bottom Copyright Bar */}
        <Box
          bg="blackAlpha.400"
          py={4}
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
        >
          <HStack
            justify="space-between"
            align="center"
            maxW="container.xl"
            mx="auto"
            px={{ base: 4, md: 8 }}
            flexDirection={{ base: "column", md: "row" }}
            spacing={{ base: 3, md: 0 }}
          >
            <Text
              fontSize="sm"
              color={linkColor}
              textAlign={{ base: "center", md: "left" }}
            >
              © 2025 LAMER Group Pvt Ltd. All rights reserved.
            </Text>

            <HStack spacing={6} display={{ base: "none", md: "flex" }}>
              <Text fontSize="xs" color="whiteAlpha.700">
                Environmental Excellence
              </Text>
              <Text fontSize="xs" color="whiteAlpha.700">
                •
              </Text>
              <Text fontSize="xs" color="whiteAlpha.700">
                Sustainable Solutions
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

const CustomLink = ({ children, to, color, hoverColor, ...props }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      fontSize="sm"
      fontWeight="400"
      color={color}
      _hover={{
        color: hoverColor,
        textDecoration: "underline",
        transform: "translateX(4px)",
      }}
      transition="all 0.2s"
      textAlign={{ base: "center", md: "left" }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Footer;
