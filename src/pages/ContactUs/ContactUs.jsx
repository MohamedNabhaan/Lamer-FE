import {
  useToast,
  Box,
  Heading,
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Select,
  Button,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Icon,
  Grid,
  GridItem,
  Link as ChakraLink,
  Divider,
  Badge,
  FormHelperText,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Form } from "react-router-dom";
import { COUNTRIES } from "../..";
import { useState } from "react";
import * as Yup from "yup";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Globe,
  Users,
  Upload,
  File,
  X,
  Paperclip,
} from "lucide-react";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function ContactUs() {
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    callcode: "+960",
    number: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const toast = useToast();

  // Color scheme matching the rest of the application
  const bgColor = useColorModeValue("white", "gray.800");
  const sectionBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("brand.400", "brand.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("brand.500", "brand.400");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");
  const badgeBg = useColorModeValue("brand.50", "brand.900");

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Name is required."),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    number: Yup.string()
      .required("Contact Number is required")
      .min(7, "Contact number must be at least 7 digits")
      .max(15, "Contact Number cannot be more than 15 digits"),
    message: Yup.string().required("Message is required"),
  });

  // File validation
  const validateFiles = (files) => {
    const maxSize = 10 * 1024 * 1024; // 10MB per file
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    for (let file of files) {
      if (file.size > maxSize) {
        throw new Error(
          `File "${file.name}" is too large. Maximum size is 10MB.`
        );
      }
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          `File type "${file.type}" is not allowed. Please use images, PDFs, or Office documents.`
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    try {
      validateFiles(files);

      // Limit total attachments to 3
      if (attachments.length + files.length > 3) {
        toast({
          title: "Too many files",
          description: "You can attach maximum 3 files.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setAttachments((prev) => [...prev, ...files]);

      toast({
        title: "Files added successfully",
        description: `${files.length} file(s) attached.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "File upload error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // Reset file input
    e.target.value = "";
  };

  const removeFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await validationSchema.validate(contactInfo, { abortEarly: false });

      const sendFormData = new FormData();
      sendFormData.append("name", contactInfo.fullName);
      sendFormData.append("email", contactInfo.email);
      sendFormData.append(
        "contactNumber",
        `${contactInfo.callcode}${contactInfo.number}`
      );
      sendFormData.append("message", contactInfo.message);
      sendFormData.append("access_key", "184697bb-2f61-48d2-8379-6a373900d5a6");

      // Add file attachments
      attachments.forEach((file, index) => {
        sendFormData.append(`attachment_${index}`, file);
      });

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: sendFormData, // Remove Content-Type header to let browser set it with boundary
      });

      if (res.ok) {
        toast({
          title: "Message Sent Successfully!",
          description:
            "We'll get back to you within 24 hours. Thank you for reaching out!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setContactInfo({
          fullName: "",
          email: "",
          callcode: "+960",
          number: "",
          message: "",
        });
        setAttachments([]); // Clear attachments
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Available 8AM - 4PM (GMT+5)",
      value: "+960 330 5049",
      link: "tel:+960-330-5049",
      color: "green",
    },
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "We reply within 24 hours",
      value: "info@lamer.com.mv",
      link: "mailto:info@lamer.com.mv",
      color: "blue",
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      subtitle: "Monday - Friday, 8AM - 4PM",
      value: "5GC8+89V, Malé, Maldives",
      link: "https://maps.app.goo.gl/RxVDMp8gR8aC22ni7",
      color: "purple",
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor} pt={0}>
      {/* Header Section */}
      <Box
        bg={sectionBg}
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
              Get In Touch
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="container.md"
            >
              Have questions about our services or need expert advice? Our team
              is here to help you with all your marine environmental needs.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Contact Methods Section */}
      <Box bg={bgColor} py={{ base: 12, md: 16 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={{ base: 8, md: 12 }}>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={{ base: 6, md: 8 }}
                w="100%"
              >
                {contactMethods.map((method, index) => (
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
                  >
                    <CardHeader bg={accentColor} color="white" py={6}>
                      <VStack spacing={3}>
                        <Icon as={method.icon} w={8} h={8} />
                        <Heading size="md" textAlign="center">
                          {method.title}
                        </Heading>
                      </VStack>
                    </CardHeader>
                    <CardBody p={6}>
                      <VStack spacing={4} textAlign="center">
                        <Text fontSize="sm" color={mutedTextColor}>
                          {method.subtitle}
                        </Text>
                        <ChakraLink
                          href={method.link}
                          isExternal
                          _hover={{ textDecoration: "none" }}
                        >
                          <Badge
                            colorScheme="brand"
                            px={4}
                            py={2}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="600"
                          >
                            {method.value}
                          </Badge>
                        </ChakraLink>
                      </VStack>
                    </CardBody>
                  </MotionCard>
                ))}
              </Grid>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box bg={sectionBg} py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }}
            gap={{ base: 12, lg: 16 }}
          >
            {/* Info Section */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <VStack spacing={8} align="stretch">
                <VStack spacing={4} align="start">
                  <Heading size="xl" color={headingColor}>
                    Send Us a Message
                  </Heading>
                  <Text fontSize="lg" color={textColor} lineHeight="tall">
                    Ready to discuss your project or have specific questions?
                    Fill out the form and we'll get back to you promptly.
                  </Text>
                </VStack>

                <Card
                  bg={cardBg}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <CardBody p={6}>
                    <VStack spacing={4} align="stretch">
                      <HStack spacing={3}>
                        <Icon as={Clock} color={accentColor} />
                        <VStack align="start" spacing={1}>
                          <Text
                            fontSize="sm"
                            fontWeight="600"
                            color={headingColor}
                          >
                            Response Time
                          </Text>
                          <Text fontSize="sm" color={mutedTextColor}>
                            We typically respond within 24 hours
                          </Text>
                        </VStack>
                      </HStack>

                      <Divider />
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </MotionBox>

            {/* Contact Form */}
            <MotionCard
              bg={cardBg}
              shadow="xl"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CardHeader bg={accentColor} color="white" py={6}>
                <HStack spacing={3} justify="center">
                  <Icon as={MessageCircle} w={6} h={6} />
                  <Heading size="lg">Contact Form</Heading>
                </HStack>
              </CardHeader>

              <CardBody p={8}>
                <Form
                  onSubmit={onSubmit}
                  method="post"
                  encType="multipart/form-data"
                >
                  <VStack spacing={6}>
                    <FormControl isInvalid={!!errors.fullName} isRequired>
                      <FormLabel
                        fontSize="md"
                        fontWeight="600"
                        color={headingColor}
                      >
                        Full Name
                      </FormLabel>
                      <Input
                        value={contactInfo.fullName}
                        onChange={handleChange}
                        name="fullName"
                        placeholder="Enter your full name"
                        size="lg"
                        bg={sectionBg}
                        border="1px solid"
                        borderColor={borderColor}
                        _hover={{ borderColor: accentColor }}
                        _focus={{
                          borderColor: accentColor,
                          boxShadow: `0 0 0 1px ${accentColor}`,
                        }}
                      />
                      {errors.fullName && (
                        <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.email} isRequired>
                      <FormLabel
                        fontSize="md"
                        fontWeight="600"
                        color={headingColor}
                      >
                        Email Address
                      </FormLabel>
                      <Input
                        value={contactInfo.email}
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        size="lg"
                        bg={sectionBg}
                        border="1px solid"
                        borderColor={borderColor}
                        _hover={{ borderColor: accentColor }}
                        _focus={{
                          borderColor: accentColor,
                          boxShadow: `0 0 0 1px ${accentColor}`,
                        }}
                      />
                      {errors.email && (
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.number} isRequired>
                      <FormLabel
                        fontSize="md"
                        fontWeight="600"
                        color={headingColor}
                      >
                        Contact Number
                      </FormLabel>
                      <HStack spacing={2}>
                        <Select
                          name="callcode"
                          value={contactInfo.callcode}
                          onChange={handleChange}
                          size="lg"
                          w="140px"
                          bg={sectionBg}
                          border="1px solid"
                          borderColor={borderColor}
                          _hover={{ borderColor: accentColor }}
                          _focus={{ borderColor: accentColor }}
                        >
                          {COUNTRIES.map((country) => (
                            <option
                              key={country.code}
                              value={country.dial_code}
                            >
                              {country.code} {country.dial_code}
                            </option>
                          ))}
                        </Select>
                        <Input
                          value={contactInfo.number}
                          onChange={handleChange}
                          name="number"
                          type="tel"
                          placeholder="Enter your phone number"
                          size="lg"
                          flex="1"
                          bg={sectionBg}
                          border="1px solid"
                          borderColor={borderColor}
                          _hover={{ borderColor: accentColor }}
                          _focus={{
                            borderColor: accentColor,
                            boxShadow: `0 0 0 1px ${accentColor}`,
                          }}
                        />
                      </HStack>
                      {errors.number && (
                        <FormErrorMessage>{errors.number}</FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.message} isRequired>
                      <FormLabel
                        fontSize="md"
                        fontWeight="600"
                        color={headingColor}
                      >
                        Message
                      </FormLabel>
                      <Textarea
                        value={contactInfo.message}
                        onChange={handleChange}
                        name="message"
                        placeholder="Tell us about your project or inquiry..."
                        rows={5}
                        size="lg"
                        bg={sectionBg}
                        border="1px solid"
                        borderColor={borderColor}
                        _hover={{ borderColor: accentColor }}
                        _focus={{
                          borderColor: accentColor,
                          boxShadow: `0 0 0 1px ${accentColor}`,
                        }}
                        resize="vertical"
                      />
                      {errors.message && (
                        <FormErrorMessage>{errors.message}</FormErrorMessage>
                      )}
                    </FormControl>

                    {/* File Attachments */}
                    <FormControl>
                      <FormLabel
                        fontSize="md"
                        fontWeight="600"
                        color={headingColor}
                      >
                        <HStack spacing={2}>
                          <Icon as={Paperclip} w={4} h={4} />
                          <Text>Attachments (Optional)</Text>
                        </HStack>
                      </FormLabel>

                      {/* File Upload Area */}
                      <VStack spacing={4} align="stretch">
                        <Box
                          position="relative"
                          border="2px dashed"
                          borderColor={borderColor}
                          borderRadius="lg"
                          p={6}
                          textAlign="center"
                          bg={sectionBg}
                          _hover={{ borderColor: accentColor }}
                          transition="border-color 0.2s"
                        >
                          <Input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt,.doc,.docx,.xls,.xlsx"
                            onChange={handleFileUpload}
                            position="absolute"
                            top={0}
                            left={0}
                            width="100%"
                            height="100%"
                            opacity={0}
                            cursor="pointer"
                            zIndex={1}
                          />
                          <VStack spacing={3}>
                            <Icon
                              as={Upload}
                              w={8}
                              h={8}
                              color={mutedTextColor}
                            />
                            <Text
                              fontSize="md"
                              color={textColor}
                              fontWeight="500"
                            >
                              Drop files here or click to browse
                            </Text>
                            <Text fontSize="sm" color={mutedTextColor}>
                              Maximum 3 files, 10MB each
                            </Text>
                            <Text fontSize="xs" color={mutedTextColor}>
                              Supported: Images, PDF, Word, Excel
                            </Text>
                          </VStack>
                        </Box>

                        {/* Selected Files Display */}
                        {attachments.length > 0 && (
                          <VStack spacing={3} align="stretch">
                            <Text
                              fontSize="sm"
                              fontWeight="600"
                              color={headingColor}
                            >
                              Selected Files ({attachments.length}/3):
                            </Text>
                            {attachments.map((file, index) => (
                              <Flex
                                key={index}
                                align="center"
                                justify="space-between"
                                p={3}
                                bg={cardBg}
                                border="1px solid"
                                borderColor={borderColor}
                                borderRadius="md"
                              >
                                <HStack spacing={3} flex="1" minW="0">
                                  <Icon
                                    as={File}
                                    w={4}
                                    h={4}
                                    color={accentColor}
                                  />
                                  <VStack
                                    align="start"
                                    spacing={0}
                                    flex="1"
                                    minW="0"
                                  >
                                    <Text
                                      fontSize="sm"
                                      fontWeight="500"
                                      isTruncated
                                    >
                                      {file.name}
                                    </Text>
                                    <Text fontSize="xs" color={mutedTextColor}>
                                      {formatFileSize(file.size)}
                                    </Text>
                                  </VStack>
                                </HStack>
                                <IconButton
                                  aria-label="Remove file"
                                  icon={<X />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="red"
                                  onClick={() => removeFile(index)}
                                />
                              </Flex>
                            ))}
                          </VStack>
                        )}
                      </VStack>

                      <FormHelperText>
                        <Text fontSize="xs" color={mutedTextColor}>
                          Files will be attached to your message and sent to our
                          team.
                        </Text>
                      </FormHelperText>
                    </FormControl>

                    <Button
                      type="submit"
                      size="lg"
                      bg={accentColor}
                      color="white"
                      rightIcon={<Send />}
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                      w="100%"
                      _hover={{
                        bg: useColorModeValue("brand.600", "brand.300"),
                        transform: "translateY(-2px)",
                      }}
                      transition="all 0.2s"
                    >
                      Send Message
                    </Button>
                  </VStack>
                </Form>
              </CardBody>
            </MotionCard>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
