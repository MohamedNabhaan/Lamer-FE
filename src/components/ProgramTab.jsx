import { Box, List, ListItem, Text, Heading } from "@chakra-ui/react";

export default function ProgramTab() {
  return (
    <>
      <Box paddingBottom={8} paddingTop={4}>
        <List spacing={8}>
          <ListItem>
            <Heading color={"brand.400"}>
              Coral Reef Systems: Form and Function
            </Heading>
            <Text>
              This course provides a unique opportunity to study and examine the
              physical ecological and oceanographic processes of tropical coral
              reef systems. Topics include: the structure and formation of coral
              reefs, reef geomorphology, coral reef ecology, reef hydrodynamics
              and ecomorphodynamic processes. You will learn fundamental
              concepts and field techniques for use in tropical coral reef
              systems. The course will 100% internally assessed.
            </Text>
          </ListItem>
          <ListItem>
            <Heading color={"brand.400"}>
              Summer coral reef ecology course in Maldives
            </Heading>
            <Text>
              This course is designed to provide students of any level with a
              sound foundation in ecological concepts, survey techniques and
              experimental design in field research applied to coral reef
              ecosystems. It provides a brief introduction on coral ecology,
              focusing on corals, sponges, echinoderms, reef fish and other
              organisms. We will cover lecturers on coral anatomy, physiology
              and ecological requirements. We will also assess the roles of
              these organisms on the reef and cover ways the reefs are being
              impacted by both anthropogenic and natural factors. Reef health
              sampling techniques will be discussed and practiced in the field
              and we will go over numerous experimental designs and sampling
              schemes aimed at describing the reef community and reef health
              status as a whole.
            </Text>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
