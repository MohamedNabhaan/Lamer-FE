import { Box, Center } from "@chakra-ui/react";
import Carousel from "../../../components/Carousel";
import Wave from "react-wavify";

export default function Feature() {
  return (
    <Box overflow={"hidden"} bgColor={"design.100"}>
      <Center paddingBlockStart={"2.5%"}>
        <Box w="85%">
          <Carousel></Carousel>
        </Box>
      </Center>
    </Box>
  );
}
