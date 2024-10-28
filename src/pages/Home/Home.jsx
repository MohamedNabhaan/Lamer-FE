import { Box } from "@chakra-ui/react";
import Introduction from "./sections/Introduction";
import IntroServices from "./sections/IntroService";
import IntroClients from "./sections/IntroClients";
import WhoAreWe from "./sections/WhoAreWe";

export default function Home() {
  return (
    <Box>
      <Introduction></Introduction>
      <WhoAreWe></WhoAreWe>
      <IntroServices></IntroServices>
      <IntroClients></IntroClients>
    </Box>
  );
}
