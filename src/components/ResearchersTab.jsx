import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Icon,
  Badge,
  AspectRatio,
  Divider,
  Link,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { User, GraduationCap, Globe, Mail, ExternalLink } from "lucide-react";
import aslam from "../assets/SIRC/aslam.png";
import hussein from "../assets/SIRC/hussein.png";
import kensh from "../assets/SIRC/kensh.png";

const MotionCard = motion(Card);

export default function ResearchersTab() {
  // Color scheme - standardized to match SIRC page
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");
  const sectionBg = useColorModeValue("gray.50", "gray.700");

  const researchers = [
    {
      name: "Professor Paul Simon Kench",
      position: "Partnered Professor",
      credentials: "MA (Hons) (Auckland), PhD (UNSW)",
      image: kensh,
      title: "Head of School of Environment",
      institution: "The University of Auckland, New Zealand",
      specialization: "Coastal Geomorphologist",
      description:
        "Head of The School of Environment at University of Auckland and coastal geomorphologist with interest in coastal processes, medium-term coastal change, gravel beach processes and the application of coastal science to support coastal management.",
      expertise: [
        "Coral Reef Geomorphology",
        "Coastal Processes",
        "Climate Change Impact",
        "Coastal Management",
      ],
      role: "Research Partnership Director",
    },
    {
      name: "Mohamed Aslam",
      position: "Director of SIRC",
      credentials:
        "MSc in Geography (Auckland) , B.Sc Geological Oceanography (UK)",
      image: aslam,
      title: "Marine Research Specialist",
      institution: "Small Island Research Center",
      specialization: "Marine Biology & Conservation",
      description:
        "Experienced in several development projects in the Maldives.",
      expertise: [
        "Marine Biology",
        "Coral Conservation",
        "Ecosystem Management",
        "Island Morphology",
        "Field Research",
      ],
      role: "Field Research Coordinator",
    },
    {
      name: "Hussein Zahir",
      position: "Marine Biologist",
      credentials:
        "B.Sc. (Hon) Marine Biology(UK) , MPhil in Coral Reef Ecology (UK)",
      image: hussein,
      title: "Senior Marine Scientist",
      institution: "Maldives Marine Research Institute",
      specialization: "Marine Ecology & Climate Research",
      description:
        "Marine scientist with extensive experience in Maldivian marine ecosystems, climate change impacts,coral reef ecology and marine biodiversity conservation.",
      expertise: [
        "Marine Ecology",
        "Coral Reef Ecology",
        "Biodiversity Conservation",
        "Environmental Monitoring",
      ],
      role: "Research Advisor",
    },
  ];

  return (
    <VStack spacing={{ base: 8, md: 10 }} align="stretch">
      {/* Researchers Grid */}
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        spacing={{ base: 4, md: 6, lg: 8 }}
      >
        {researchers.map((researcher, index) => (
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
            transition={{ duration: 0.5, delay: index * 0.2 }}
            _hover={{
              transform: { base: "none", md: "translateY(-6px)" },
              shadow: "xl",
            }}
          >
            {/* Profile Image */}
            <Box position="relative">
              <AspectRatio ratio={{ base: 16 / 9, md: 4 / 3 }}>
                <Image
                  src={researcher.image}
                  alt={researcher.name}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  filter="brightness(1.1)"
                />
              </AspectRatio>
            </Box>

            <CardBody p={{ base: 3, md: 4, lg: 6 }}>
              <VStack
                align="stretch"
                spacing={{ base: 2, md: 3, lg: 4 }}
                h="100%"
              >
                {/* Name and Title */}
                <VStack align="start" spacing={{ base: 1, md: 2 }}>
                  <Heading
                    size={{ base: "xs", md: "sm", lg: "md" }}
                    color={headingColor}
                    lineHeight="1.3"
                    textAlign="left"
                  >
                    {researcher.name}
                  </Heading>
                  <Text
                    fontSize={{ base: "xs", md: "xs", lg: "sm" }}
                    color={accentColor}
                    fontWeight="600"
                    textAlign="left"
                  >
                    {researcher.position}
                  </Text>
                </VStack>

                {/* Institution */}
                <Box bg={sectionBg} borderRadius="lg">
                  <VStack align="start" spacing={{ base: 1, md: 2 }}>
                    <HStack spacing={2} align="center">
                      <Icon
                        as={GraduationCap}
                        w={4}
                        h={4}
                        color={accentColor}
                      />
                      <Text
                        fontSize={{ base: "xs", md: "xs", lg: "sm" }}
                        fontWeight="600"
                        color={headingColor}
                      >
                        {researcher.credentials}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>

                <Divider />

                {/* Description */}
                <Box flex="1">
                  <Text
                    fontSize="xs"
                    color={textColor}
                    lineHeight="tall"
                    textAlign="justify"
                    display={{ base: "-webkit-box", md: "block" }}
                    sx={{
                      base: {
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      },
                    }}
                  >
                    {researcher.description}
                  </Text>
                </Box>

                {/* Expertise Tags - Fixed positioning */}
                <Box mt="auto">
                  <VStack align="start" spacing={{ base: 2, md: 3 }}>
                    <Text
                      fontSize="xs"
                      fontWeight="600"
                      color={headingColor}
                      textAlign="left"
                    >
                      Areas of Expertise:
                    </Text>
                    <Box textAlign="left" w="100%">
                      {researcher.expertise.map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="subtle"
                          colorScheme="brand"
                          mr={1}
                          mb={1}
                          px={{ base: 1, md: 2 }}
                          py={1}
                          borderRadius="md"
                          fontSize="xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </CardBody>
          </MotionCard>
        ))}
      </SimpleGrid>

      {/* Research Collaboration Section */}
      <Card
        bg={cardBg}
        shadow="lg"
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        overflow="hidden"
      >
        <CardHeader bg={accentColor} color="white" py={{ base: 4, md: 6 }}>
          <HStack justify="center" spacing={3} flexWrap="wrap">
            <Icon as={Globe} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} />
            <Heading size={{ base: "md", md: "lg" }}>
              International Research Collaboration
            </Heading>
          </HStack>
        </CardHeader>
        <CardBody p={{ base: 6, md: 8 }}>
          <VStack spacing={{ base: 4, md: 6 }} textAlign="center">
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={textColor}
              lineHeight="tall"
              maxW="800px"
            >
              Our research team strives to provide an environment for fostering
              collaborative studies that advance marine science and climate
              research in the Maldives and beyond.
            </Text>

            <Divider />

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 4, md: 6 }}
              w="100%"
            >
              <VStack spacing={3}>
                <Icon
                  as={GraduationCap}
                  w={{ base: 6, md: 8 }}
                  h={{ base: 6, md: 8 }}
                  color={accentColor}
                />
                <Heading size={{ base: "xs", md: "sm" }} color={headingColor}>
                  Academic Excellence
                </Heading>
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={textColor}
                  textAlign="center"
                >
                  Partnerships with world-renowned universities and research
                  institutions
                </Text>
              </VStack>

              <VStack spacing={3}>
                <Icon
                  as={Globe}
                  w={{ base: 6, md: 8 }}
                  h={{ base: 6, md: 8 }}
                  color={accentColor}
                />
                <Heading size={{ base: "xs", md: "sm" }} color={headingColor}>
                  Global Impact
                </Heading>
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={textColor}
                  textAlign="center"
                >
                  Research contributing to global understanding of climate
                  change and marine conservation
                </Text>
              </VStack>

              <VStack spacing={3}>
                <Icon
                  as={User}
                  w={{ base: 6, md: 8 }}
                  h={{ base: 6, md: 8 }}
                  color={accentColor}
                />
                <Heading size={{ base: "xs", md: "sm" }} color={headingColor}>
                  Expert Mentorship
                </Heading>
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={textColor}
                  textAlign="center"
                >
                  Direct access to leading experts in marine science and coastal
                  research
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>

      {/* Contact CTA */}
      
    </VStack>
  );
}
