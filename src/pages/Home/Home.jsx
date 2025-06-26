import { Box } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import Introduction from "./sections/Introduction";
import IntroServices from "./sections/IntroService";
import IntroClients from "./sections/IntroClients";
import WhoAreWe from "./sections/WhoAreWe";
import IntroTechnology from "./sections/IntroTechnology";
import IntroSirc from "./sections/IntroSirc";
import { API_ENDPOINTS } from "../../config/api.js";

export default function Home() {
  const { programs } = useLoaderData();

  return (
    <Box pt={0} mt={{ base: "70px", md: "90px" }}>
      <Introduction></Introduction>
      <IntroClients></IntroClients>
      <WhoAreWe></WhoAreWe>
      <IntroServices></IntroServices>
      <IntroTechnology></IntroTechnology>
      <IntroSirc programs={programs}></IntroSirc>
    </Box>
  );
}

// Loader to fetch the 3 most recent programs for the SIRC section
export async function loader() {
  try {
    const response = await fetch(API_ENDPOINTS.PROGRAMS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allPrograms = await response.json();

    // Sort programs by creation date (most recent first) and take the first 3
    const recentPrograms = allPrograms
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.created_at || 0) -
          new Date(a.createdAt || a.created_at || 0)
      )
      .slice(0, 3);

    return { programs: recentPrograms };
  } catch (error) {
    console.error("Error fetching programs for home page:", error);
    // Return empty array as fallback
    return { programs: [] };
  }
}
