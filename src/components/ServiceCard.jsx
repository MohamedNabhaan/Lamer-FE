import { Box, Text, Image, Collapse, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export default function ServiceCard(props) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Box
        height={"32vh"}
        position={"relative"}
        bgColor={"black"}
        overflow={"hidden"}
        onClick={onToggle}
      >
        <Text
          position={"absolute"}
          color={"white"}
          w={"100%"}
          zIndex={1}
          bottom={2}
          left={4}
          fontSize={"xl"}
        >
          {props.service.label}
        </Text>

        <Image
          transform={"scale(1.10)"}
          maxH={"100%"}
          h={"100%"}
          opacity={0.4}
          w={"100%"}
          src={props.service.img}
          transition={"ease-in"}
          transitionDuration={"600ms"}
          _hover={{
            transform: "scale(1.03)",
            opacity: 1,
            cursor: "pointer",
          }}
        ></Image>
      </Box>
      <Collapse
        in={isOpen}
        transition={{ enter: { duration: 1 }, exit: { duration: 0.5 } }}
        transitionTimingFunction="ease-in-out"
      >
        <Text
          bgColor={"brand.400"}
          borderBottomRadius={16}
          padding={4}
          color={"white"}
        >
          {props.service.description}
        </Text>
      </Collapse>
    </Box>
  );
}
