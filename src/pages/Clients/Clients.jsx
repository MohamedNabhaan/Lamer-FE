import {
  Box,
  Heading,
  Container,
  SimpleGrid,
  Text,
  Image,
  useColorModeValue,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../../config/api.js";

const MotionBox = motion(Box);

export default function Clients() {
  const clients = useLoaderData();

  // Color scheme
  const bgColor = useColorModeValue("white", "gray.800");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBorderColor = useColorModeValue("brand.100", "brand.800");
  const nameBoxBg = useColorModeValue("white", "gray.800");

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
              color={headingColor}
              borderLeft="6px solid"
              pl={4}
              lineHeight="1.2"
            >
              Our Valued Clients
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="container.md"
            >
              We are proud to have collaborated with industry leaders who trust
              our expertise. Our diverse client portfolio spans across various
              sectors.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4 }}
            spacing={{ base: 6, md: 8 }}
          >
            {clients.map((client) => (
              <MotionBox
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  bg={cardBg}
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="md"
                  border="1px solid"
                  borderColor={cardBorderColor}
                >
                  {/* Logo Container */}
                  <Box>
                    <AspectRatio ratio={4 / 3}>
                      <Box
                        p={8}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={cardBg}
                      >
                        <Image
                          src={client.logo[0]}
                          alt={client.clientName}
                          maxW="85%"
                          maxH="85%"
                          objectFit="contain"
                          filter={useColorModeValue("none", "brightness(0.9)")}
                          fallbackSrc="https://via.placeholder.com/200x150?text=Logo"
                        />
                      </Box>
                    </AspectRatio>
                  </Box>

                  {/* Client Name */}
                  <Box
                    py={4}
                    px={4}
                    bg={nameBoxBg}
                    borderTop="2px solid"
                    borderColor={cardBorderColor}
                  >
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="600"
                      color={headingColor}
                      textAlign="center"
                      letterSpacing="tight"
                      noOfLines={2}
                    >
                      {client.clientName}
                    </Text>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}

export async function publicClientsLoader() {
  const response = await fetch(API_ENDPOINTS.CLIENTS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const clients = await response.json();

  // Format logo data
  clients.forEach((client) => {
    if (typeof client.logo === "string") {
      try {
        client.logo = client.logo
          .replace("[", "")
          .replace("]", "")
          .replace(/["]/g, "")
          .split(",");
      } catch (error) {
        client.logo = [];
      }
    }
  });

  return clients;
}
