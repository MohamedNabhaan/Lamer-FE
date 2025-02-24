import {
  Box,
  Text,
  Image,
  Collapse,
  useDisclosure,
  List,
  ListItem,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ServiceCard(props) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Box
        id={`${props.service.path}`}
        height={{ base: "24", md: "40vh" }}
        position={"relative"}
        bgColor={"black"}
        overflow={"hidden"}
        onClick={onToggle}
      >
        <Heading
          position={"absolute"}
          color={"white"}
          w={"100%"}
          zIndex={1}
          bottom={3}
          left={4}
          size={{ base: "md",md:'lg', lg: "4xl" }}
          fontWeight={300}
          textOverflow={"ellipsis"}
        >
          {props.service.label}
        </Heading>
        {isOpen ? (
          <Box
            position={"absolute"}
            right={0}
            zIndex={1}
            bottom={{ base: 4, md: 24 }}
          >
            <ChevronUp size={40} color="white"></ChevronUp>
          </Box>
        ) : (
          <Box
            position={"absolute"}
            right={0}
            zIndex={1}
            bottom={{ base: 4, md: 24 }}
          >
            <ChevronDown size={40} color="white"></ChevronDown>
          </Box>
        )}

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
      <Collapse in={isOpen} animateOpacity={true}>
        <List
          bgColor={"brand.400"}
          paddingTop={1}
          paddingBottom={3}
          borderBottomRadius={8}
        >
          <ListItem _hover={{ bgColor: "brand.800" }}>
            <Text
              marginInline={2}
              paddingInline={2}
              borderBottom={"1px solid"}
              borderColor={"white"}
              color={"white"}
              fontSize={"3xl"}
            >
              Georno
            </Text>
          </ListItem>
          <ListItem _hover={{ bgColor: "brand.800" }}>
            <Text
              marginInline={2}
              paddingInline={2}
              borderBottom={"1px solid"}
              borderColor={"white"}
              color={"white"}
              fontSize={"3xl"}
            >
              Georno
            </Text>
          </ListItem>
          <ListItem _hover={{ bgColor: "brand.800" }}>
            <Text
              marginInline={2}
              paddingInline={2}
              borderBottom={"1px solid"}
              borderColor={"white"}
              color={"white"}
              fontSize={"3xl"}
            >
              Georno
            </Text>
          </ListItem>
        </List>
      </Collapse>
    </Box>
  );
}
