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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Clock, BookOpen, GraduationCap } from "lucide-react";

const MotionCard = motion(Card);

export default function ProgramTab(props) {
  // Color scheme - standardized to match SIRC page
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");
  const sectionBg = useColorModeValue("gray.50", "gray.700");

  return (
    <VStack spacing={{ base: 6, md: 8 }} align="stretch">
      {/* Programs Grid */}
      {props.program && props.program.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
          {props.program.map((program, index) => (
            <MotionCard
              key={index}
              bg={cardBg}
              shadow="lg"
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              _hover={{
                transform: { base: "none", md: "translateY(-4px)" },
                shadow: "xl",
              }}
            >
              <CardHeader
                bg={accentColor}
                color="white"
                py={{ base: 3, md: 4 }}
              >
                <HStack justify="space-between" align="center">
                  <Icon
                    as={GraduationCap}
                    w={{ base: 5, md: 6 }}
                    h={{ base: 5, md: 6 }}
                  />
                  <Badge
                    bg={badgeBg}
                    color={accentColor}
                    px={{ base: 2, md: 3 }}
                    py={1}
                    borderRadius="full"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="600"
                  >
                    Program
                  </Badge>
                </HStack>
              </CardHeader>

              <CardBody p={{ base: 4, md: 6 }}>
                <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
                  <Heading
                    as="h3"
                    size={{ base: "sm", md: "md" }}
                    color={headingColor}
                    lineHeight="1.3"
                  >
                    {program.title}
                  </Heading>

                  <HStack spacing={3}>
                    <Icon
                      as={Clock}
                      w={{ base: 4, md: 5 }}
                      h={{ base: 4, md: 5 }}
                      color={accentColor}
                    />
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      color={textColor}
                      fontWeight="600"
                    >
                      Duration: {program.duration}
                    </Text>
                  </HStack>

                  <Divider />

                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color={textColor}
                    lineHeight="tall"
                  >
                    {program.desc}
                  </Text>
                </VStack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>
      ) : (
        <Box
          bg={cardBg}
          p={{ base: 8, md: 12 }}
          borderRadius="xl"
          textAlign="center"
          border="1px solid"
          borderColor={borderColor}
          shadow="md"
        >
          <VStack spacing={4}>
            
            <Heading size={{ base: "md", md: "lg" }} color={headingColor}>
              No Available Programs at the moment
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={textColor}
              maxW="400px"
            >
              We are currently updating our program offerings. Please check back
              later or contact us for more information.
            </Text>
          </VStack>
        </Box>
      )}

      {/* Contact CTA */}
      
    </VStack>
  );
}
