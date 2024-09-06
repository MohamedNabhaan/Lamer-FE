import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
import '@fontsource/fraunces'
import '@fontsource/montserrat'


const theme = extendTheme({
  colors: {
    brand : {
      100:"#57779C",
      200:"#dcf3ff",
      300: "#f0faff",
      400: "#435BA1",
    },
    transparent:{
      100:"00FFFFFF"
    },

    nav : {
      100:"#000000cc"
    }
  },
  fonts: {
    heading: `'Fraunces', sans-serif`,
    body: `'Montserrat', sans-serif`,
    
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
