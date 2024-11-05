import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
  SimpleGrid,
  List,
  ListItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import logo from "../../assets/SIRC/logo.png";
import sirc from "../../assets/SIRC/SIRC.png";
import StudyItem from "../../components/StudyItem";
import ProgramTab from "../../components/ProgramTab";
import SiteTab from "../../components/SiteTab";

export default function SIRC() {
  return (
    <>
      <Box minH={"36rem"} overflow={"hidden"}>
        <Box
          position={"relative"}
          bgImage={sirc}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
          paddingTop={8}
          paddingLeft={8}
          paddingBottom={4}
        >
          <HStack
            spacing={0}
            paddingLeft={{ base: 0, md: 20 }}
            paddingBottom={4}
          >
            <Image display={"inline"} maxH={"8rem"} src={logo}></Image>

            <Heading
              marginLeft={4}
              padding={2}
              borderRadius={12}
              as="h1"
              size={"3xl"}
              fontWeight={500}
              color={"white"}
              display={"inline"}
              textShadow=" 4px brand.300"
            >
              Small Island Research Center (SIRC)
            </Heading>
          </HStack>

          <Stack
            direction={{ base: "column", md: "row" }}
            gap={12}
            paddingInline={{ base: 0, md: 4 }}
          >
            <Box
              w={{ base: "", md: "65%" }}
              h={"fit-content"}
              boxShadow={"0px 8px 24px grey"}
              marginTop={4}
              bg={"white"}
              borderRadius={12}
              paddingBottom={4}
              paddingLeft={4}
              paddingRight={2}
              marginRight={4}
            >
              <Heading
                color={"brand.400"}
                paddingTop={2}
                paddingBottom={1}
                size={"lg"}
              >
                About the Center
              </Heading>
              <Text>
                The Small Island Research Center was established by Land and
                Marine Environmental Resource Group (LaMer) Pte Ltd in 2016, for
                students and researchers in the field of marine sciences, island
                morphology and climate change. Located in Faresmaathoda in
                Huvadhoo Atoll of Maldives, the Research Center provides
                accommodation, basic lab facility, and classroom and internet
                services. Equipment and gear as well as means of transport to
                the research sites can be hired from the Research Centre. The
                research center includes three inhabited islands; GDh.
                Mahutigala, GDh. Hoothodaa and GDh. Faathiyehutta which are
                within close proximity and leased by the center for the sole
                purpose of conducting research.
              </Text>
            </Box>

            <Box
              borderRadius={12}
              w={{ base: "", md: "35%" }}
              bgColor={"white"}
              marginTop={4}
              marginRight={4}
            >
              <Heading
                borderTopRadius={8}
                paddingTop={2}
                paddingLeft={2}
                size={"lg"}
                bg={"brand.400"}
                paddingBottom={2}
                color={"white"}
                borderBottom={"solid"}
                borderColor={"design.200"}
              >
                Facilitated Research and Studies
              </Heading>
              <List
                spacing={1}
                height={"32rem"}
                overflowY={"scroll"}
                paddingLeft={1}
                scrollBehavior={"smooth"}
                paddingTop={1}
                sx={{
                  "::-webkit-scrollbar": { width: "8px", borderRadius: "8px" },
                  "::-webkit-scrollbar-track": {
                    width: "10px",
                    borderRadius: "8px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#D3D3D3",
                    borderRadius: "8px",
                  },
                }}
              >
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
                <StudyItem></StudyItem>
              </List>
            </Box>
          </Stack>
        </Box>
        <Tabs
          borderTop={"1px solid "}
          borderColor={"design.100"}
          isFitted
          variant={"soft-rounded"}
        >
          <TabList
            bgColor={"design.500"}
            overflowX={{ base: "scroll", md: "hidden" }}
          >
            <Tab
              _hover={{ bgColor: "brand.500" }}
              _selected={{ bgColor: "brand.400", color: "white" }}
            >
              Programs
            </Tab>
            <Tab
              _hover={{ bgColor: "brand.500" }}
              _selected={{ bgColor: "brand.400", color: "white" }}
            >
              Research Sites
            </Tab>
            <Tab
              _hover={{ bgColor: "brand.500" }}
              _selected={{ bgColor: "brand.400", color: "white" }}
            >
              Facilities
            </Tab>

            <Tab
              _hover={{ bgColor: "brand.500" }}
              _selected={{ bgColor: "brand.400", color: "white" }}
            >
              Researchers
            </Tab>
            <Tab
              _hover={{ bgColor: "brand.500", color: "white" }}
              _selected={{ bgColor: "brand.400", color: "white" }}
            >
              Available Equipments
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ProgramTab></ProgramTab>
            </TabPanel>
            <TabPanel paddingTop={0}>
              <SiteTab></SiteTab>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
