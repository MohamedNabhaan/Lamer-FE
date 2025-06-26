import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";
import { ChakraProvider, extendTheme, Modal, Tab } from "@chakra-ui/react";
import "@fontsource/bebas-neue";
import "@fontsource/fraunces";
import "@fontsource/open-sans";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#4A6B8A",
      200: "#C8E6F5",
      300: "#E8F4F8",
      400: "#3A4F88",
      500: "#6B85C1",
      600: "#158A47",
      700: "#2A659A",
      800: "#1A2447",
      900: "#353535",
      1000: "#F0F0F0",
    },
    design: {
      100: "#DADCDC",
      200: "#EAECEA",
      300: "#D8CFC6",
      400: "#00000020",
      500: "#F2F2F2",
      600: "#F2F4F4"
    },

    nav: {
      100: "#000000bb",
    },
  },
  fonts: {
    heading: `'Open-Sans', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: "white",
          maxH: "900px",
          border: "solid",
          borderColor: "#F2F4F4",
        },
        overlay: {
          bg: "white", //change the background
        },
      }),
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
