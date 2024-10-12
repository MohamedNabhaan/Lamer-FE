import { Box, Stack, Text, Button, Center } from "@chakra-ui/react";

export default function Pagination({
  projPerPage,
  totalProj,
  paginate,
  currentPage,
}) {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProj / projPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Box paddingBlock={8}>
        <Stack direction={"row"} justifyContent={"center"}>
          <Button onClick={() => paginate(currentPage - 1)}>Prev Page</Button>
          <Stack direction={"row"}>
            {pageNumbers.map((number) => {
              return (
                <Center
                  key={number}
                  onClick={() => paginate(number)}
                  paddingInline={4}
                  _hover={{ bgColor: "design.100" }}
                >
                  <Text>{number}</Text>
                </Center>
              );
            })}
          </Stack>
          <Button onClick={() => paginate(currentPage + 1)}>Next Page</Button>
        </Stack>
      </Box>
    </>
  );
}
