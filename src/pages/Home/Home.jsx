import { Box } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Introduction from "./sections/Introduction";

import IntroServices from "./sections/IntroService";
import IntroClients from "./sections/IntroClients";
import Footer from "../../components/Footer";
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
