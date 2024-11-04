import { Box } from "@chakra-ui/react";
import Introduction from "./sections/Introduction";
import IntroServices from "./sections/IntroService";
import IntroClients from "./sections/IntroClients";
import WhoAreWe from "./sections/WhoAreWe";
import IntroTechnology from "./sections/IntroTechnology";
import IntroSirc from "./sections/IntroSirc";

export default function Home() {
  return (
    <Box>
      <Introduction></Introduction>
      <WhoAreWe></WhoAreWe>
      <IntroServices></IntroServices>
      <IntroTechnology></IntroTechnology>
      <IntroSirc></IntroSirc>
      <IntroClients></IntroClients>
    </Box>
  );
}
