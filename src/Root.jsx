import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
export default function RootPage() {
  const location = useLocation();
  const lastHash = useRef("");
  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        lastHash.current = "";
      }, 100);
    }
  }, [location]);
  return (
    <>
      {location.pathname.toLowerCase().includes('admin')==true? <></> : <Navbar></Navbar>}
      <Outlet />
      <Footer></Footer>
    </>
  );
}
