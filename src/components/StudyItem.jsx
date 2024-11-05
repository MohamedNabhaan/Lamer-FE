import { Box, Heading, Text, ListItem } from "@chakra-ui/react";

export default function StudyItem() {
  return (
    <>
      <ListItem>
        <Box
          paddingBlock={2}
          paddingInline={2}
          minH={"5rem"}
          bgColor={"design.500"}
          borderRadius={8}
        >
          <Heading
            borderBottom={"1px solid"}
            paddingBottom={1}
            size={"sm"}
            color={"blackAlpha.800"}
            _hover={{ color: "brand.400", textDecoration: "underline" }}
          >
            Climate change and coral reef bleaching: An ecological assessment of
            long-term impacts, recovery trends and future outlook
          </Heading>
          <Text paddingTop={2} fontSize={"small"}>
            Chris T. Perry, Kyle M. Morgan, Michael A. Salter Year : 2020
          </Text>
        </Box>
      </ListItem>
    </>
  );
}
