import {
  Box,
  Text,
  Image,
  Collapse,
  useDisclosure,
  List,
  ListItem,
  Heading,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const MotionBox = motion(Box);

export default function ServiceCard({ service, subServices, defaultExpanded }) {
  const { isOpen, onToggle, onOpen } = useDisclosure({
    defaultIsOpen: defaultExpanded,
  });

  // Color scheme
  const cardBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const activeBg = useColorModeValue("brand.400", "blue.800");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("brand.400", "blue.300");
  const headingColor = "white";
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");

  // Filter services for this category
  const categoryServices = subServices.filter(
    (s) => service.path === s.serviceCategory
  );

  // Auto expand if defaultExpanded is true
  useEffect(() => {
    if (defaultExpanded) {
      onOpen();
    }
  }, [defaultExpanded, onOpen]);

  return (
    <Box
      id={service.path}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      bg={cardBg}
      borderWidth="1px"
      borderColor={cardBorderColor}
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-4px)",
        borderColor: accentColor,
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Box
        id={`${service.path}`}
        height={{ base: "12rem", md: "20rem" }}
        position="relative"
        overflow="hidden"
        onClick={onToggle}
        cursor="pointer"
      >
        {/* Enhanced gradient overlay */}
        <Box
          position="absolute"
          inset={0}
          bgGradient={`linear(to-b, 
            rgba(0,0,0,0.2) 0%, 
            rgba(0,0,0,0.3) 30%, 
            rgba(0,0,0,0.7) 80%, 
            rgba(0,0,0,0.8) 100%)`}
          zIndex={1}
          transition="opacity 0.3s ease"
          opacity={0.9}
          _groupHover={{ opacity: 0.7 }}
        />

        {/* Header text with enhanced styling */}
        <Heading
          position="absolute"
          top={6}
          left={6}
          right={6}
          color={headingColor}
          size={{ base: "lg", md: "xl" }}
          fontWeight={600}
          zIndex={2}
          textShadow="0 2px 4px rgba(0,0,0,0.5)"
          transition="transform 0.3s ease"
          _groupHover={{ transform: "translateY(-2px)" }}
        >
          {service.label}
        </Heading>

        {/* Enhanced chevron icon */}
        <Box
          position="absolute"
          right={6}
          bottom={6}
          zIndex={2}
          bg={accentColor}
          p={2}
          borderRadius="full"
          boxShadow="lg"
          transition="all 0.3s ease"
          transform={isOpen ? "translateY(0)" : "translateY(0)"}
          _hover={{
            transform: "scale(1.1)",
            boxShadow: "xl",
          }}
        >
          {isOpen ? (
            <ChevronUp size={28} color="white" />
          ) : (
            <ChevronDown size={28} color="white" />
          )}
        </Box>

        <Image
          objectFit="cover"
          w="100%"
          h="100%"
          src={service.img}
          opacity={0.95}
          transition="all 0.5s ease"
          transform="scale(1.01)"
          _hover={{
            opacity: 1,
            transform: "scale(1.08)",
          }}
        />
      </Box>

      <Collapse
        in={isOpen}
        animateOpacity
        transition={{ enter: { duration: 0.4 }, exit: { duration: 0.2 } }}
      >
        <List
          bg={cardBg}
          borderTop="2px solid"
          borderColor={accentColor}
          py={2}
          boxShadow="inner"
        >
          {categoryServices.length > 0 ? (
            categoryServices.map((service) => (
              <NavLink to={`${service.serviceName}`} key={service.serviceName}>
                {({ isActive }) => (
                  <ListItem
                    bg={isActive ? activeBg : "transparent"}
                    position="relative"
                    px={6}
                    py={3}
                    borderBottom="1px solid"
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                    transition="all 0.2s ease-in-out"
                    _before={{
                      content: '""',
                      position: "absolute",
                      left: "0",
                      top: "0",
                      bottom: "0",
                      width: "4px",
                      bg: accentColor,
                      transform: "scaleY(0)",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    _hover={{
                      bg: hoverBg,
                      transform: "translateX(8px)",
                      boxShadow: "sm",
                      _before: {
                        transform: "scaleY(1)",
                      },
                      pl: "8",
                    }}
                    role="group"
                  >
                    <Text
                      color={isActive ? accentColor : textColor}
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight={500}
                      display="flex"
                      alignItems="center"
                      transition="all 0.2s ease"
                      _groupHover={{ color: accentColor }}
                    >
                      <Box
                        w="8px"
                        h="8px"
                        bg={accentColor}
                        borderRadius="full"
                        mr={3}
                        opacity={isActive ? 1 : 0.7}
                        transition="all 0.2s ease"
                        _groupHover={{ transform: "scale(1.2)", opacity: 1 }}
                      />
                      {service.serviceName}
                    </Text>
                  </ListItem>
                )}
              </NavLink>
            ))
          ) : (
            <Center py={6}>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.500"
                fontStyle="italic"
              >
                No services available at the moment
              </Text>
            </Center>
          )}
        </List>
      </Collapse>
    </Box>
  );
}
