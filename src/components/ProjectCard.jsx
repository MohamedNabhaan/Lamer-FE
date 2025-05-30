import {
  Card,
  Image,
  Box,
  Heading,
  Text,
  Button,
  Input,
  Flex,
  Badge,
  useColorModeValue,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import fallback from "../assets/logo.png";
import { NavLink, useLocation, Form, Link } from "react-router-dom";
import { Calendar, Building2, Tag } from "lucide-react";
import { SERVICES } from "../index.js";

export function ProjectCard({
  images,
  title,
  clientName,
  projectDate,
  projectCategory,
}) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("brand.400", "brand.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const imageBorderColor = useColorModeValue("gray.100", "gray.700");

  // Map category to service label
  const serviceLabel =
    SERVICES.find((service) => service.path === projectCategory)?.label ||
    projectCategory;

  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="outline"
      borderColor={borderColor}
      bg={cardBg}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
        borderColor: accentColor,
      }}
      transition="all 0.2s"
      minH={{ md: "220px" }}
      maxH={{ md: "220px" }}
    >
      <Box
        position="relative"
        width={{ base: "100%", md: "35%" }}
        minW={{ md: "250px" }}
        minH={{ base: "200px", md: "auto" }}
      >
        <Image
          objectFit="cover"
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          left="0"
          src={images[0]}
          fallbackSrc={fallback}
          alt={title}
          borderRight={{ md: "1px solid" }}
          borderBottom={{ base: "1px solid", md: "none" }}
          borderColor={imageBorderColor}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)"
        />
      </Box>

      <Flex
        direction="column"
        p={{ base: 4, md: 4 }}
        width="100%"
        justify="space-between"
      >
        <Box>
          <Heading
            as="h3"
            size={{ base: "md", md: "lg" }}
            mb={3}
            color={accentColor}
            noOfLines={2}
          >
            {title}
          </Heading>

          <VStack spacing={2} align="stretch" mb={3}>
            <HStack spacing={2}>
              <Icon as={Building2} color={accentColor} size={16} />
              <Text fontSize="sm" color={textColor}>
                <Text as="span" fontWeight="semibold" color={accentColor}>
                  Client:
                </Text>{" "}
                {clientName}
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Icon as={Calendar} color={accentColor} size={16} />
              <Text fontSize="sm" color={textColor}>
                <Text as="span" fontWeight="semibold" color={accentColor}>
                  Date:
                </Text>{" "}
                {projectDate}
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Icon as={Tag} color={accentColor} size={16} />
              <Text fontSize="sm" color={textColor}>
                <Text as="span" fontWeight="semibold" color={accentColor}>
                  Category:
                </Text>{" "}
                {serviceLabel}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* <Box>
          <Badge
            colorScheme="blue"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="full"
          >
            View Details
          </Badge>
        </Box> */}
      </Flex>
    </Card>
  );
}
