import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme, Modal } from "@chakra-ui/react";
import "@fontsource/fraunces";
import "@fontsource/montserrat";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#57779C",
      200: "#dcf3ff",
      300: "#f0faff",
      400: "#435BA1",
      500: "#8aa1e3",
      600: "#19A357",
    },
    design: {
      100: "#E6E8E8",
      200: "#F2F4F4",
      300: "#E1D9D1",
    },

    nav: {
      100: "#000000cc",
    },
  },
  fonts: {
    heading: `'Fraunces', sans-serif`,
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
