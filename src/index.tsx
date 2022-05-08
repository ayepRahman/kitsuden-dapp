import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "containers/App";
import { wagmiClient } from "config/wagmi";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { theme, Global } from "styles";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiProvider client={wagmiClient}>
        <ChakraProvider theme={theme}>
          <ColorModeScript />
          <Global />
          <App />
        </ChakraProvider>
      </WagmiProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
