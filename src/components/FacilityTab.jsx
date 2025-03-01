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
  Flex
} from "@chakra-ui/react";

export default function FacilityTab(props) {
  return (
    <>
      <Box
        paddingTop={5}
        paddingBottom={2}
        paddingInline={12}
        bgColor={"design.200"}
        borderInline={'solid'}
        borderBottom={'solid'}
        borderColor={'design.200'}
      >
        
          <Heading>
            
          </Heading>
          <Flex  flexDir={'column'} gap={2}>
          <Heading  color={"brand.900"} size={'xl'}>
            Classroom and internet services.
          </Heading>
          <Text
        
        paddingRight={{base:0,md:8}}
          >
            The Research Centre has one classroom where any classroom sessions
            which need to be taken during the period of field study can be
            conducted. The classroom has a capacity of 10 to 15 people. It is
            also equiped with 4 computer stations where internet services are
            also provided.
          </Text>
          </Flex>

          <Flex flexDir={'column'} paddingBlock={2} gap={2}
          >
            <Heading  color={"brand.900"}>
            Lab facility.
          </Heading>
          <Text
            
            paddingRight={{base:0,md:8}}
          >
            The lab facility at the Research Centre is a basic wet lab facility
            with equipment such as microscope, spring balance, caliper etc..
            which can be used by the researchers and students.
          </Text>
            </Flex>

          <Flex  flexDir={'column'}  gap={2}  paddingBottom={4}>
          <Heading color={"brand.900"}>
            Equipment and gear for field work
          </Heading>
          <Text
           
           paddingRight={{base:0,md:8}}
          >
            A dinghy is available for hire for researchers/students who wish to
            travel to nearby islands/sites for their field work.Boats can also
            be hired at reasonable prices for this purpose.
          </Text>
          <Text
           
           paddingRight={{base:0,md:16}}
          

          >
            Field equipment available at LAMER can be hired/lent to
            researchers/students when needed, on an availability basis. The
            following equipment are available and has to be requested for, prior
            to arrival to check for their availability during the researcher’s
            period of stay.
          </Text>
          </Flex>
          
        </Box>
        <Box  bgColor={"design.200"}paddingInline={12} borderBottomRadius={24} paddingBottom={2}>
          <TableContainer bgColor={'white'} borderRadius={12} paddingTop={2} marginBottom={4}  paddingInline={2}>
            <Table the variant="simple" size={"sm"}>
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
              <Tbody>{props.equipment.map((equipment)=>{
                return (<Tr>
                  <Td>{equipment.equipmentName}</Td>
                  <Td>{equipment.brand}</Td>
                  <Td>{equipment.modelNo}</Td>
                  <Td>{equipment.quantity}</Td>
                  <Td>{equipment.charge}</Td>
                  </Tr>)
              })}</Tbody>
            </Table>
          </TableContainer>
        
      </Box>
    </>
  );
}
