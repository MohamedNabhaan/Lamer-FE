import { Box, Center, Image, Text } from "@chakra-ui/react";

import ImageCarousel from "../../../components/ImageCarousel";
import { INTRODUCTION_IMAGES } from "../../../index.js";

export default function Introduction() {
  return (
    <Box overflow={"hidden"}>
      <Center>
        <Box w="100%">
          <ImageCarousel images={INTRODUCTION_IMAGES} />
        </Box>
      </Center>
    </Box>
  );
}
