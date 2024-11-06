import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function FacilityTab() {
  return (
    <>
      <Box
        paddingTop={6}
        paddingBottom={2}
        paddingInline={12}
        bgColor={"design.500"}
      >
        <Heading color={"brand.400"} size={"2xl"}>
          Facilities
        </Heading>
        <Box>
          <Text
            paddingTop={6}
            paddingRight={12}
            fontSize={{ base: "lg", md: "xl" }}
          >
            The center will facilitate accommodation, basic lab facility,
            classroom and internet services for students and researchers who
            choose to carryout research work at reefs, lagoon and islands.
          </Text>
        </Box>
        <Box paddingBlock={8}>
          <Heading paddingTop={4} paddingBottom={2} color={"brand.400"}>
            Classroom and internet services.
          </Heading>
          <Text
            paddingBottom={2}
            paddingRight={16}
            fontSize={{ base: "lg", md: "xl" }}
          >
            The Research Centre has one classroom where any classroom sessions
            which need to be taken during the period of field study can be
            conducted. The classroom has a capacity of 10 to 15 people. It is
            also equiped with 4 computer stations where internet services are
            also provided.
          </Text>

          <Heading paddingTop={4} paddingBottom={2} color={"brand.400"}>
            Lab facility.
          </Heading>
          <Text
            ext
            paddingBottom={2}
            paddingRight={16}
            fontSize={{ base: "lg", md: "xl" }}
          >
            The lab facility at the Research Centre is a basic wet lab facility
            with equipment such as microscope, spring balance, caliper etc..
            which can be used by the researchers and students.
          </Text>
          <Heading paddingTop={4} paddingBottom={2} color={"brand.400"}>
            Equipment and gear for field work
          </Heading>
          <Text
            ext
            paddingBottom={2}
            paddingRight={16}
            fontSize={{ base: "lg", md: "xl" }}
          >
            A dinghy is available for hire for researchers/students who wish to
            travel to nearby islands/sites for their field work.Boats can also
            be hired at reasonable prices for this purpose.
          </Text>
          <Text
            ext
            paddingBottom={2}
            paddingRight={16}
            fontSize={{ base: "lg", md: "xl" }}
          >
            Field equipment available at LAMER can be hired/lent to
            researchers/students when needed, on an availability basis. The
            following equipment are available and has to be requested for, prior
            to arrival to check for their availability during the researcher’s
            period of stay.
          </Text>
        </Box>
        <Box>
          <TableContainer>
            <Table variant="simple" size={"sm"}>
              <TableCaption>Available Equipment and Prices</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Brand</Th>
                  <Th>Model No.</Th>
                  <Th>Qty</Th>
                  <Th>Daily Charge(USD)</Th>
                </Tr>
              </Thead>
              <Tbody></Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
