import { Box, Heading, Text, ListItem } from "@chakra-ui/react";

export default function StudyItem(props) {
  return (
    <>
      <ListItem>
        <Box
          paddingBlock={2}
          paddingInline={2}
          minH={"5rem"}
          bgColor={"design.500"}
          borderRadius={8} border={'solid'}
          borderColor={'design.100'}
        >
          <Heading
            borderBottom={"1px solid"}
            paddingBottom={1}
            size={"sm"}
            color={"blackAlpha.800"}
            _hover={{ color: "brand.400", textDecoration: "underline" }}
          >
            {props.study.title}
          </Heading>
          <Text paddingTop={2} fontSize={"small"}>
            {props.study.authors} Year : {props.study.year}
          </Text>
        </Box>
      </ListItem>
    </>
  );
}
