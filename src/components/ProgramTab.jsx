import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  Badge,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Clock, BookOpen, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";

const MotionCard = motion(Card);

export default function ProgramTab(props) {
  // Pagination state
  const [programsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePrograms, setCurrentPagePrograms] = useState([]);

  // Color scheme - enhanced for better visual appeal
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");

  // Initialize pagination when programs change
  useEffect(() => {
    if (props.program && props.program.length > 0) {
      const indexOfLastProgram = currentPage * programsPerPage;
      const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
      setCurrentPagePrograms(
        props.program.slice(indexOfFirstProgram, indexOfLastProgram)
      );
    }
  }, [props.program, currentPage, programsPerPage]);

  // Pagination function
  function paginate(pageNumber) {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(props.program.length / programsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  }

  return (
    <VStack spacing={{ base: 6, md: 8 }} align="stretch">
      {/* Programs Grid */}
      {props.program && props.program.length > 0 ? (
        <>
          <SimpleGrid columns={1} spacing={{ base: 6, md: 8 }}>
            {currentPagePrograms.map((program, index) => (
              <MotionCard
                key={index}
                bg={cardBg}
                shadow="xl"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                _hover={{
                  transform: { base: "none", md: "translateY(-8px)" },
                  shadow: "2xl",
                  borderColor: accentColor,
                }}
                position="relative"
              >
                {/* Decorative background pattern */}
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  w="120px"
                  h="120px"
                  bgGradient={`radial(circle, ${accentColor}15 0%, transparent 70%)`}
                  borderBottomLeftRadius="full"
                />

                <CardHeader
                  bg={accentColor}
                  color="white"
                  py={{ base: 6, md: 8 }}
                  px={{ base: 6, md: 8 }}
                  position="relative"
                  overflow="hidden"
                >
                  {/* Header background decoration */}
                  <Box
                    position="absolute"
                    top="-20px"
                    right="-20px"
                    w="80px"
                    h="80px"
                    bg="whiteAlpha.100"
                    borderRadius="full"
                  />
                  <Box
                    position="absolute"
                    bottom="-10px"
                    left="-10px"
                    w="60px"
                    h="60px"
                    bg="whiteAlpha.50"
                    borderRadius="full"
                  />

                  <Flex
                    justify="space-between"
                    align="center"
                    position="relative"
                  >
                    <HStack spacing={4} flex="1">
                      <Icon
                        as={GraduationCap}
                        w={{ base: 8, md: 10 }}
                        h={{ base: 8, md: 10 }}
                        color="white"
                        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
                      />
                      <Heading
                        as="h3"
                        size={{ base: "lg", md: "xl" }}
                        color="white"
                        lineHeight="1.2"
                        fontWeight="700"
                        textShadow="0px 2px 4px rgba(0,0,0,0.1)"
                      >
                        {program.title}
                      </Heading>
                    </HStack>

                    <Badge
                      bg="whiteAlpha.200"
                      color="white"
                      px={{ base: 3, md: 4 }}
                      py={2}
                      borderRadius="full"
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight="600"
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      Program
                    </Badge>
                  </Flex>
                </CardHeader>

                <CardBody p={{ base: 6, md: 8 }} position="relative">
                  <VStack align="stretch" spacing={{ base: 6, md: 8 }}>
                    {/* Description section with better typography */}
                    <Box>
                      <HStack spacing={3} mb={4}>
                        <Icon as={BookOpen} w={5} h={5} color={accentColor} />
                        <Text
                          fontSize="md"
                          fontWeight="600"
                          color={accentColor}
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          About This Program
                        </Text>
                      </HStack>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color={textColor}
                        lineHeight="1.7"
                        fontWeight="400"
                      >
                        {program.desc}
                      </Text>
                    </Box>

                    {/* Simple divider */}
                    <Divider borderColor={borderColor} />

                    {/* Duration section with enhanced styling */}
                    <Box
                      bg={useColorModeValue("gray.50", "gray.700")}
                      p={6}
                      borderRadius="xl"
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <HStack spacing={3}>
                        <Box
                          bg={accentColor}
                          p={2}
                          borderRadius="lg"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={Clock} w={5} h={5} color="white" />
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text
                            fontSize="sm"
                            fontWeight="600"
                            color={accentColor}
                            textTransform="uppercase"
                            letterSpacing="wide"
                          >
                            Duration
                          </Text>
                          <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            color={textColor}
                            fontWeight="600"
                          >
                            {program.duration || "Contact for details"}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </VStack>
                </CardBody>
              </MotionCard>
            ))}
          </SimpleGrid>

          {/* Pagination */}
          <Box mt={4}>
            <Pagination
              projPerPage={programsPerPage}
              totalProj={props.program.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Box>
        </>
      ) : (
        <Box
          bg={cardBg}
          p={{ base: 8, md: 12 }}
          borderRadius="2xl"
          textAlign="center"
          border="2px dashed"
          borderColor={borderColor}
          shadow="lg"
          position="relative"
          overflow="hidden"
        >
          {/* Background decoration for empty state */}
          <Box
            position="absolute"
            top="-50px"
            right="-50px"
            w="100px"
            h="100px"
            bg={useColorModeValue("brand.50", "brand.900")}
            borderRadius="full"
            opacity={0.5}
          />

          <VStack spacing={6}>
            <Box
              bg={accentColor}
              p={4}
              borderRadius="full"
              display="inline-flex"
            >
              <Icon as={GraduationCap} w={8} h={8} color="white" />
            </Box>
            <VStack spacing={3}>
              <Heading size={{ base: "lg", md: "xl" }} color={headingColor}>
                No Available Programs at the moment
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                maxW="500px"
                lineHeight="1.6"
              >
                We are currently updating our program offerings. Please check
                back later or contact us for more information about upcoming
                programs.
              </Text>
            </VStack>
          </VStack>
        </Box>
      )}
    </VStack>
  );
}
