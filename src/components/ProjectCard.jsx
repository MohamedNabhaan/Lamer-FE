import {
  Card,
  Image,
  CardBody,
  Box,
  Heading,
  Text,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import fallback from "../assets/logo.png";
import { NavLink, useLocation, Form, useSubmit, Link } from "react-router-dom";

import {
  Trash2Icon as DeleteIcon,
  FilePenLine as EditIcon,
} from "lucide-react";

export function ProjectCard({
  project,
  projId,
  projIndex,
  images,
  title,
  clientName,
  projectDate,
  projectCategory,
  delProject,
  editProject,
  searchParams,
}) {
  const location = useLocation();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const pathname = location.pathname;
  const search = location.search;

  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow={"hidden"}
      variant={"outline"}
      align={"center"}
    >
      <Image
        w={"250px"}
        h={"250px"}
        src={images[0]}
        fallbackSrc={fallback}
      ></Image>
      <CardBody
        borderLeft={"solid"}
        borderColor={"design.100"}
        padding={0}
        paddingBottom={6}
      >
        <Box>
          {location.pathname.toLowerCase() === "/admin/projects" ? (
            <Box position={"absolute"} top={0} right={0} zIndex={1}>
              <NavLink to={`${projId}`} state={{ from: [pathname + search] }}>
                <Button variant={"ghost"} rounded={false} zIndex={1}>
                  <EditIcon></EditIcon>
                </Button>
              </NavLink>

              <Input name="id" value={`${projId}`} type="hidden"></Input>

              <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                isLazy
                closeOnBlur={true}
              >
                <PopoverTrigger>
                  <Button variant={"ghost"} rounded={false} zIndex={9999999}>
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody>
                    <Text paddingBlock={2} paddingLeft={1}>
                      Are you sure?
                    </Text>
                    <Form method="post" action={`${projId}/destroy`}>
                      <Input
                        type="hidden"
                        defaultValue={`${pathname + search}`}
                        name="redirect"
                      ></Input>
                      <Flex gap={1}>
                        <Button
                          bgColor={"design.100"}
                          color={"blackAlpha.700"}
                          w={"100%"}
                          type="submit"
                          onClick={onClose}
                          _hover={{
                            bgColor: "red.500",
                            color: "white",
                            transitionDuration: "500ms",
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          w={"100%"}
                          color={"blackAlpha.700"}
                          bgColor={"design.100"}
                          onClick={onClose}
                          _hover={{
                            bgColor: "blue.200",
                            color: "white",
                            transitionDuration: "500ms",
                          }}
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Form>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          ) : (
            ""
          )}
          <Heading
            w="100%"
            as={"h2"}
            size={"2xl"}
            paddingBottom={4}
            paddingLeft={8}
            borderBottom={"solid 2px"}
            borderColor="design.100"
          >
            {title}
          </Heading>

          <Box paddingLeft={8} paddingTop={4}>
            <Text fontSize={"xl"}>Client : {clientName}</Text>
            <Text fontSize={"xl"}>Date : {projectDate}</Text>
            <Text fontSize={"xl"}>Project Category : {projectCategory}</Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}
