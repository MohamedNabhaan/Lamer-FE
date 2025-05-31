import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  Container,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { getApiUrlWithId } from "../config/api.js";

export default function EquipmentEditForm() {
  const equipment = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const redirectTo =
    location.state?.from || "/l4m3r-secure-dashboard-panel/laboratory-assets";
  const toast = useToast();
  const [errors, setErrors] = useState({});

  function validateForm(formData) {
    const newErrors = {};

    if (!formData.equipmentName) {
      newErrors.equipmentName = "Equipment name is required";
    }

    if (!formData.quantity || isNaN(parseInt(formData.quantity))) {
      newErrors.quantity = "Quantity is required and must be a number";
    } else if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (formData.charge && isNaN(parseFloat(formData.charge))) {
      newErrors.charge = "Charge must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData);

    if (!validateForm(formObject)) {
      toast({
        title: "Error",
        description: "Please check the form for errors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    submit(formData, { method: "post" });
  }

  function handleCancel() {
    navigate(redirectTo);
  }

  return (
    <Container
      maxW="container.xl"
      px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 6, md: 8 }}
    >
      <Box
        w="full"
        maxW={{ base: "100%", md: "90%", lg: "80%" }}
        mx="auto"
        py={{ base: 4, md: 6 }}
        px={{ base: 4, md: 8, lg: 12 }}
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Heading
          size={{ base: "xl", md: "2xl" }}
          color="brand.400"
          mb={{ base: 4, md: 6 }}
          textAlign={{ base: "center", md: "left" }}
        >
          Edit Equipment
        </Heading>

        <Form method="post" onSubmit={handleSubmit}>
          <FormControl isRequired mb={4} isInvalid={errors.equipmentName}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Equipment Name
            </FormLabel>
            <Input
              name="equipmentName"
              defaultValue={equipment.equipmentName}
              placeholder="e.g. Drone"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
            {errors.equipmentName && (
              <FormErrorMessage>{errors.equipmentName}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Brand</FormLabel>
            <Input
              name="brand"
              defaultValue={equipment.brand}
              placeholder="e.g. DJI"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Model Number
            </FormLabel>
            <Input
              name="modelNo"
              defaultValue={equipment.modelNo}
              placeholder="e.g. Phantom 4 Pro"
              size="lg"
              fontSize={{ base: "md", md: "md" }}
            />
          </FormControl>

          <FormControl isRequired mb={4} isInvalid={errors.quantity}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>Quantity</FormLabel>
            <NumberInput
              min={1}
              defaultValue={equipment.quantity || 1}
              size="lg"
            >
              <NumberInputField
                name="quantity"
                placeholder="Enter quantity"
                fontSize={{ base: "md", md: "md" }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {errors.quantity && (
              <FormErrorMessage>{errors.quantity}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4} isInvalid={errors.charge}>
            <FormLabel fontSize={{ base: "md", md: "lg" }}>
              Charge (USD)
            </FormLabel>
            <NumberInput
              min={0}
              precision={2}
              defaultValue={equipment.charge || 0}
              size="lg"
            >
              <NumberInputField
                name="charge"
                placeholder="Enter charge amount"
                fontSize={{ base: "md", md: "md" }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {errors.charge && (
              <FormErrorMessage>{errors.charge}</FormErrorMessage>
            )}
          </FormControl>

          <Input type="hidden" name="redirect" defaultValue={redirectTo} />

          <Flex
            mt={{ base: 6, md: 8 }}
            gap={4}
            flexDir={{ base: "column", sm: "row" }}
            justifyContent={{ base: "center", sm: "flex-start" }}
            width="100%"
          >
            <Button
              type="submit"
              bg="brand.400"
              color="white"
              size="lg"
              width={{ base: "100%", sm: "auto" }}
              _hover={{ bg: "brand.500" }}
            >
              Save Changes
            </Button>
            <Button
              onClick={handleCancel}
              size="lg"
              width={{ base: "100%", sm: "auto" }}
              variant="outline"
            >
              Cancel
            </Button>
          </Flex>
        </Form>
      </Box>
    </Container>
  );
}

export async function equipmentItemLoader({ params }) {
  const response = await fetch(getApiUrlWithId("equipment", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load equipment");
  }

  const equipment = await response.json();
  return equipment;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);
  const redirectPath =
    formObject.redirect || "/l4m3r-secure-dashboard-panel/laboratory-assets";

  try {
    const response = await fetch(getApiUrlWithId("equipment", params.id), {
      method: "PATCH",
      body: JSON.stringify({
        equipmentName: formObject.equipmentName,
        brand: formObject.brand || undefined,
        modelNo: formObject.modelNo || undefined,
        quantity: parseInt(formObject.quantity),
        charge: formObject.charge ? parseFloat(formObject.charge) : undefined,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": null,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to update equipment");
    }

    return redirect(redirectPath);
  } catch (error) {
    console.error("Error updating equipment:", error);
    return { error: error.message };
  }
}
