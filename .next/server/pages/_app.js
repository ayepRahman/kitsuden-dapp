"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./config/wagmi.ts":
/*!*************************!*\
  !*** ./config/wagmi.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"wagmiClient\": () => (/* binding */ wagmiClient)\n/* harmony export */ });\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wagmi__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi/providers/alchemy */ \"wagmi/providers/alchemy\");\n/* harmony import */ var wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wagmi/providers/public */ \"wagmi/providers/public\");\n/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(wagmi_providers_public__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var wagmi_connectors_coinbaseWallet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wagmi/connectors/coinbaseWallet */ \"wagmi/connectors/coinbaseWallet\");\n/* harmony import */ var wagmi_connectors_coinbaseWallet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(wagmi_connectors_coinbaseWallet__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi/connectors/injected */ \"wagmi/connectors/injected\");\n/* harmony import */ var wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var wagmi_connectors_metaMask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wagmi/connectors/metaMask */ \"wagmi/connectors/metaMask\");\n/* harmony import */ var wagmi_connectors_metaMask__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(wagmi_connectors_metaMask__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var wagmi_connectors_walletConnect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! wagmi/connectors/walletConnect */ \"wagmi/connectors/walletConnect\");\n/* harmony import */ var wagmi_connectors_walletConnect__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(wagmi_connectors_walletConnect__WEBPACK_IMPORTED_MODULE_6__);\n// import { createClient, chain, defaultChains } from \"wagmi\";\n// import * as ethers from \"ethers\";\n// import { CoinbaseWalletConnector } from \"wagmi/connectors/coinbaseWallet\";\n// import { InjectedConnector } from \"wagmi/connectors/injected\";\n// import { MetaMaskConnector } from \"wagmi/connectors/metaMask\";\n// import { ALCHEMY_API_ID, ALCHEMY_API_URL, GANACHE_TEST_URL } from \"config\";\n// const chains = [\n//   ...defaultChains,\n//   {\n//     id: 1337,\n//     name: \"Ganache\",\n//     rpcUrls: {\n//       default: \"http://127.0.0.1:7545\",\n//     },\n//   },\n// ];\n// const defaultChain = chain.mainnet;\n// export const wagmiClient = createClient({\n//   autoConnect: true,\n//   connectors({ chainId }) {\n//     const chain = chains.find((x) => x.id === chainId) ?? defaultChain;\n//     const rpcUrl = chain.rpcUrls.alchemy\n//       ? ALCHEMY_API_URL\n//       : chain.rpcUrls.default;\n//     const metamaskConnector = new MetaMaskConnector({\n//       chains,\n//     });\n//     const coinbaseConnector = new CoinbaseWalletConnector({\n//       chains,\n//       options: {\n//         appName: \"someappname.xyz\",\n//         chainId: chain.id,\n//         jsonRpcUrl: rpcUrl,\n//       },\n//     });\n//     const injectConnector = new InjectedConnector({\n//       chains,\n//       options: { name: \"Injected\" },\n//     });\n//     return [metamaskConnector, coinbaseConnector, injectConnector];\n//   },\n//   provider(config) {\n//     if (config.chainId === 1337) {\n//       return new ethers.providers.JsonRpcProvider(GANACHE_TEST_URL);\n//     }\n//     return new ethers.providers.AlchemyProvider(config.chainId, ALCHEMY_API_ID);\n//   },\n// });\n\n\n\n\n\n\n\nconst ALCHEMY_ID = \"W2A0e0vVgS6GTQdLKAo8-UimRYd1_9e3\";\n// Configure chains & providers with the Alchemy provider.\n// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)\nconst { chains , provider , webSocketProvider  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_0__.configureChains)(wagmi__WEBPACK_IMPORTED_MODULE_0__.defaultChains, [\n    (0,wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_1__.alchemyProvider)({\n        alchemyId: ALCHEMY_ID\n    }),\n    (0,wagmi_providers_public__WEBPACK_IMPORTED_MODULE_2__.publicProvider)(), \n]);\n// Set up client\nconst wagmiClient = (0,wagmi__WEBPACK_IMPORTED_MODULE_0__.createClient)({\n    autoConnect: true,\n    connectors: [\n        new wagmi_connectors_metaMask__WEBPACK_IMPORTED_MODULE_5__.MetaMaskConnector({\n            chains\n        }),\n        new wagmi_connectors_coinbaseWallet__WEBPACK_IMPORTED_MODULE_3__.CoinbaseWalletConnector({\n            chains,\n            options: {\n                appName: \"wagmi\"\n            }\n        }),\n        new wagmi_connectors_walletConnect__WEBPACK_IMPORTED_MODULE_6__.WalletConnectConnector({\n            chains,\n            options: {\n                qrcode: true\n            }\n        }),\n        new wagmi_connectors_injected__WEBPACK_IMPORTED_MODULE_4__.InjectedConnector({\n            chains,\n            options: {\n                name: \"Injected\",\n                shimDisconnect: true\n            }\n        }), \n    ],\n    provider,\n    webSocketProvider\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25maWcvd2FnbWkudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQThEO0FBQzlELG9DQUFvQztBQUNwQyw2RUFBNkU7QUFDN0UsaUVBQWlFO0FBQ2pFLGlFQUFpRTtBQUNqRSw4RUFBOEU7QUFFOUUsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixNQUFNO0FBQ04sZ0JBQWdCO0FBQ2hCLHVCQUF1QjtBQUN2QixpQkFBaUI7QUFDakIsMENBQTBDO0FBQzFDLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMLHNDQUFzQztBQUV0Qyw0Q0FBNEM7QUFDNUMsdUJBQXVCO0FBQ3ZCLDhCQUE4QjtBQUM5QiwwRUFBMEU7QUFFMUUsMkNBQTJDO0FBQzNDLDBCQUEwQjtBQUMxQixpQ0FBaUM7QUFFakMsd0RBQXdEO0FBQ3hELGdCQUFnQjtBQUNoQixVQUFVO0FBQ1YsOERBQThEO0FBQzlELGdCQUFnQjtBQUNoQixtQkFBbUI7QUFDbkIsc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUM3Qiw4QkFBOEI7QUFDOUIsV0FBVztBQUNYLFVBQVU7QUFDVixzREFBc0Q7QUFDdEQsZ0JBQWdCO0FBQ2hCLHVDQUF1QztBQUN2QyxVQUFVO0FBRVYsc0VBQXNFO0FBQ3RFLE9BQU87QUFDUCx1QkFBdUI7QUFDdkIscUNBQXFDO0FBQ3JDLHVFQUF1RTtBQUN2RSxRQUFRO0FBRVIsbUZBQW1GO0FBQ25GLE9BQU87QUFDUCxNQUFNO0FBRStEO0FBQ1g7QUFDRjtBQUNrQjtBQUNaO0FBQ0E7QUFDVTtBQUV4RSxNQUFNUyxVQUFVLEdBQUdDLGtDQUFzQztBQUV6RCwwREFBMEQ7QUFDMUQseUVBQXlFO0FBQ3pFLE1BQU0sRUFBRUcsTUFBTSxHQUFFQyxRQUFRLEdBQUVDLGlCQUFpQixHQUFFLEdBQUdiLHNEQUFlLENBQUNELGdEQUFhLEVBQUU7SUFDN0VFLHdFQUFlLENBQUM7UUFBRWEsU0FBUyxFQUFFUCxVQUFVO0tBQUUsQ0FBQztJQUMxQ0wsc0VBQWMsRUFBRTtDQUNqQixDQUFDO0FBRUYsZ0JBQWdCO0FBQ1QsTUFBTWEsV0FBVyxHQUFHakIsbURBQVksQ0FBQztJQUN0Q2tCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCQyxVQUFVLEVBQUU7UUFDVixJQUFJWix3RUFBaUIsQ0FBQztZQUFFTSxNQUFNO1NBQUUsQ0FBQztRQUNqQyxJQUFJUixvRkFBdUIsQ0FBQztZQUMxQlEsTUFBTTtZQUNOTyxPQUFPLEVBQUU7Z0JBQ1BDLE9BQU8sRUFBRSxPQUFPO2FBQ2pCO1NBQ0YsQ0FBQztRQUNGLElBQUliLGtGQUFzQixDQUFDO1lBQ3pCSyxNQUFNO1lBQ05PLE9BQU8sRUFBRTtnQkFDUEUsTUFBTSxFQUFFLElBQUk7YUFDYjtTQUNGLENBQUM7UUFDRixJQUFJaEIsd0VBQWlCLENBQUM7WUFDcEJPLE1BQU07WUFDTk8sT0FBTyxFQUFFO2dCQUNQRyxJQUFJLEVBQUUsVUFBVTtnQkFDaEJDLGNBQWMsRUFBRSxJQUFJO2FBQ3JCO1NBQ0YsQ0FBQztLQUNIO0lBQ0RWLFFBQVE7SUFDUkMsaUJBQWlCO0NBQ2xCLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL2NvbmZpZy93YWdtaS50cz9hOTU0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGNyZWF0ZUNsaWVudCwgY2hhaW4sIGRlZmF1bHRDaGFpbnMgfSBmcm9tIFwid2FnbWlcIjtcbi8vIGltcG9ydCAqIGFzIGV0aGVycyBmcm9tIFwiZXRoZXJzXCI7XG4vLyBpbXBvcnQgeyBDb2luYmFzZVdhbGxldENvbm5lY3RvciB9IGZyb20gXCJ3YWdtaS9jb25uZWN0b3JzL2NvaW5iYXNlV2FsbGV0XCI7XG4vLyBpbXBvcnQgeyBJbmplY3RlZENvbm5lY3RvciB9IGZyb20gXCJ3YWdtaS9jb25uZWN0b3JzL2luamVjdGVkXCI7XG4vLyBpbXBvcnQgeyBNZXRhTWFza0Nvbm5lY3RvciB9IGZyb20gXCJ3YWdtaS9jb25uZWN0b3JzL21ldGFNYXNrXCI7XG4vLyBpbXBvcnQgeyBBTENIRU1ZX0FQSV9JRCwgQUxDSEVNWV9BUElfVVJMLCBHQU5BQ0hFX1RFU1RfVVJMIH0gZnJvbSBcImNvbmZpZ1wiO1xuXG4vLyBjb25zdCBjaGFpbnMgPSBbXG4vLyAgIC4uLmRlZmF1bHRDaGFpbnMsXG4vLyAgIHtcbi8vICAgICBpZDogMTMzNyxcbi8vICAgICBuYW1lOiBcIkdhbmFjaGVcIixcbi8vICAgICBycGNVcmxzOiB7XG4vLyAgICAgICBkZWZhdWx0OiBcImh0dHA6Ly8xMjcuMC4wLjE6NzU0NVwiLFxuLy8gICAgIH0sXG4vLyAgIH0sXG4vLyBdO1xuLy8gY29uc3QgZGVmYXVsdENoYWluID0gY2hhaW4ubWFpbm5ldDtcblxuLy8gZXhwb3J0IGNvbnN0IHdhZ21pQ2xpZW50ID0gY3JlYXRlQ2xpZW50KHtcbi8vICAgYXV0b0Nvbm5lY3Q6IHRydWUsXG4vLyAgIGNvbm5lY3RvcnMoeyBjaGFpbklkIH0pIHtcbi8vICAgICBjb25zdCBjaGFpbiA9IGNoYWlucy5maW5kKCh4KSA9PiB4LmlkID09PSBjaGFpbklkKSA/PyBkZWZhdWx0Q2hhaW47XG5cbi8vICAgICBjb25zdCBycGNVcmwgPSBjaGFpbi5ycGNVcmxzLmFsY2hlbXlcbi8vICAgICAgID8gQUxDSEVNWV9BUElfVVJMXG4vLyAgICAgICA6IGNoYWluLnJwY1VybHMuZGVmYXVsdDtcblxuLy8gICAgIGNvbnN0IG1ldGFtYXNrQ29ubmVjdG9yID0gbmV3IE1ldGFNYXNrQ29ubmVjdG9yKHtcbi8vICAgICAgIGNoYWlucyxcbi8vICAgICB9KTtcbi8vICAgICBjb25zdCBjb2luYmFzZUNvbm5lY3RvciA9IG5ldyBDb2luYmFzZVdhbGxldENvbm5lY3Rvcih7XG4vLyAgICAgICBjaGFpbnMsXG4vLyAgICAgICBvcHRpb25zOiB7XG4vLyAgICAgICAgIGFwcE5hbWU6IFwic29tZWFwcG5hbWUueHl6XCIsXG4vLyAgICAgICAgIGNoYWluSWQ6IGNoYWluLmlkLFxuLy8gICAgICAgICBqc29uUnBjVXJsOiBycGNVcmwsXG4vLyAgICAgICB9LFxuLy8gICAgIH0pO1xuLy8gICAgIGNvbnN0IGluamVjdENvbm5lY3RvciA9IG5ldyBJbmplY3RlZENvbm5lY3Rvcih7XG4vLyAgICAgICBjaGFpbnMsXG4vLyAgICAgICBvcHRpb25zOiB7IG5hbWU6IFwiSW5qZWN0ZWRcIiB9LFxuLy8gICAgIH0pO1xuXG4vLyAgICAgcmV0dXJuIFttZXRhbWFza0Nvbm5lY3RvciwgY29pbmJhc2VDb25uZWN0b3IsIGluamVjdENvbm5lY3Rvcl07XG4vLyAgIH0sXG4vLyAgIHByb3ZpZGVyKGNvbmZpZykge1xuLy8gICAgIGlmIChjb25maWcuY2hhaW5JZCA9PT0gMTMzNykge1xuLy8gICAgICAgcmV0dXJuIG5ldyBldGhlcnMucHJvdmlkZXJzLkpzb25ScGNQcm92aWRlcihHQU5BQ0hFX1RFU1RfVVJMKTtcbi8vICAgICB9XG5cbi8vICAgICByZXR1cm4gbmV3IGV0aGVycy5wcm92aWRlcnMuQWxjaGVteVByb3ZpZGVyKGNvbmZpZy5jaGFpbklkLCBBTENIRU1ZX0FQSV9JRCk7XG4vLyAgIH0sXG4vLyB9KTtcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50LCBkZWZhdWx0Q2hhaW5zLCBjb25maWd1cmVDaGFpbnMgfSBmcm9tIFwid2FnbWlcIjtcbmltcG9ydCB7IGFsY2hlbXlQcm92aWRlciB9IGZyb20gXCJ3YWdtaS9wcm92aWRlcnMvYWxjaGVteVwiO1xuaW1wb3J0IHsgcHVibGljUHJvdmlkZXIgfSBmcm9tIFwid2FnbWkvcHJvdmlkZXJzL3B1YmxpY1wiO1xuaW1wb3J0IHsgQ29pbmJhc2VXYWxsZXRDb25uZWN0b3IgfSBmcm9tIFwid2FnbWkvY29ubmVjdG9ycy9jb2luYmFzZVdhbGxldFwiO1xuaW1wb3J0IHsgSW5qZWN0ZWRDb25uZWN0b3IgfSBmcm9tIFwid2FnbWkvY29ubmVjdG9ycy9pbmplY3RlZFwiO1xuaW1wb3J0IHsgTWV0YU1hc2tDb25uZWN0b3IgfSBmcm9tIFwid2FnbWkvY29ubmVjdG9ycy9tZXRhTWFza1wiO1xuaW1wb3J0IHsgV2FsbGV0Q29ubmVjdENvbm5lY3RvciB9IGZyb20gXCJ3YWdtaS9jb25uZWN0b3JzL3dhbGxldENvbm5lY3RcIjtcblxuY29uc3QgQUxDSEVNWV9JRCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FMQ0hFTVlfQVBJX0lEO1xuXG4vLyBDb25maWd1cmUgY2hhaW5zICYgcHJvdmlkZXJzIHdpdGggdGhlIEFsY2hlbXkgcHJvdmlkZXIuXG4vLyBUd28gcG9wdWxhciBwcm92aWRlcnMgYXJlIEFsY2hlbXkgKGFsY2hlbXkuY29tKSBhbmQgSW5mdXJhIChpbmZ1cmEuaW8pXG5jb25zdCB7IGNoYWlucywgcHJvdmlkZXIsIHdlYlNvY2tldFByb3ZpZGVyIH0gPSBjb25maWd1cmVDaGFpbnMoZGVmYXVsdENoYWlucywgW1xuICBhbGNoZW15UHJvdmlkZXIoeyBhbGNoZW15SWQ6IEFMQ0hFTVlfSUQgfSksXG4gIHB1YmxpY1Byb3ZpZGVyKCksXG5dKTtcblxuLy8gU2V0IHVwIGNsaWVudFxuZXhwb3J0IGNvbnN0IHdhZ21pQ2xpZW50ID0gY3JlYXRlQ2xpZW50KHtcbiAgYXV0b0Nvbm5lY3Q6IHRydWUsXG4gIGNvbm5lY3RvcnM6IFtcbiAgICBuZXcgTWV0YU1hc2tDb25uZWN0b3IoeyBjaGFpbnMgfSksXG4gICAgbmV3IENvaW5iYXNlV2FsbGV0Q29ubmVjdG9yKHtcbiAgICAgIGNoYWlucyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgYXBwTmFtZTogXCJ3YWdtaVwiLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBuZXcgV2FsbGV0Q29ubmVjdENvbm5lY3Rvcih7XG4gICAgICBjaGFpbnMsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHFyY29kZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgbmV3IEluamVjdGVkQ29ubmVjdG9yKHtcbiAgICAgIGNoYWlucyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgbmFtZTogXCJJbmplY3RlZFwiLFxuICAgICAgICBzaGltRGlzY29ubmVjdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHByb3ZpZGVyLFxuICB3ZWJTb2NrZXRQcm92aWRlcixcbn0pO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsImRlZmF1bHRDaGFpbnMiLCJjb25maWd1cmVDaGFpbnMiLCJhbGNoZW15UHJvdmlkZXIiLCJwdWJsaWNQcm92aWRlciIsIkNvaW5iYXNlV2FsbGV0Q29ubmVjdG9yIiwiSW5qZWN0ZWRDb25uZWN0b3IiLCJNZXRhTWFza0Nvbm5lY3RvciIsIldhbGxldENvbm5lY3RDb25uZWN0b3IiLCJBTENIRU1ZX0lEIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FMQ0hFTVlfQVBJX0lEIiwiY2hhaW5zIiwicHJvdmlkZXIiLCJ3ZWJTb2NrZXRQcm92aWRlciIsImFsY2hlbXlJZCIsIndhZ21pQ2xpZW50IiwiYXV0b0Nvbm5lY3QiLCJjb25uZWN0b3JzIiwib3B0aW9ucyIsImFwcE5hbWUiLCJxcmNvZGUiLCJuYW1lIiwic2hpbURpc2Nvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./config/wagmi.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(wagmi__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styles */ \"./styles/index.ts\");\n/* harmony import */ var config_wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! config/wagmi */ \"./config/wagmi.ts\");\n\n\n\n\n\nconst MyApp = ({ Component , pageProps  })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_2__.WagmiConfig, {\n        client: config_wagmi__WEBPACK_IMPORTED_MODULE_4__.wagmiClient,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {\n            theme: styles__WEBPACK_IMPORTED_MODULE_3__.theme,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/arifrahman/Code/personal/kitsuden-dapp/pages/_app.tsx\",\n                lineNumber: 11,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/Users/arifrahman/Code/personal/kitsuden-dapp/pages/_app.tsx\",\n            lineNumber: 10,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/arifrahman/Code/personal/kitsuden-dapp/pages/_app.tsx\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUFrRDtBQUNkO0FBRUw7QUFDWTtBQUUzQyxNQUFNSSxLQUFLLEdBQUcsQ0FBQyxFQUFFQyxTQUFTLEdBQUVDLFNBQVMsR0FBWSxHQUFLO0lBQ3BELHFCQUNFLDhEQUFDTCw4Q0FBVztRQUFDTSxNQUFNLEVBQUVKLHFEQUFXO2tCQUM5Qiw0RUFBQ0gsNERBQWM7WUFBQ0UsS0FBSyxFQUFFQSx5Q0FBSztzQkFDMUIsNEVBQUNHLFNBQVM7Z0JBQUUsR0FBR0MsU0FBUzs7Ozs7eUJBQUk7Ozs7O3FCQUNiOzs7OztpQkFDTCxDQUNkO0NBQ0g7QUFFRCxpRUFBZUYsS0FBSyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFrcmFQcm92aWRlciB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgeyBXYWdtaUNvbmZpZyB9IGZyb20gXCJ3YWdtaVwiO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tIFwic3R5bGVzXCI7XG5pbXBvcnQgeyB3YWdtaUNsaWVudCB9IGZyb20gXCJjb25maWcvd2FnbWlcIjtcblxuY29uc3QgTXlBcHAgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxXYWdtaUNvbmZpZyBjbGllbnQ9e3dhZ21pQ2xpZW50fT5cbiAgICAgIDxDaGFrcmFQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICA8L0NoYWtyYVByb3ZpZGVyPlxuICAgIDwvV2FnbWlDb25maWc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJDaGFrcmFQcm92aWRlciIsIldhZ21pQ29uZmlnIiwidGhlbWUiLCJ3YWdtaUNsaWVudCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiY2xpZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/Global.tsx":
/*!***************************!*\
  !*** ./styles/Global.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Global\": () => (/* binding */ Global)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ \"@emotion/react\");\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Global = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_emotion_react__WEBPACK_IMPORTED_MODULE_1__.Global, {\n        styles: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`\n      @import url(\"https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap\");\n\n      @font-face {\n        font-family: \"NineTsukiRegular\";\n        src: url(\"fonts/NineTsukiRegular.ttf\") format(\"truetype\");\n      }\n\n      @font-face {\n        font-family: \"Montserrat\", sans-serif;\n      }\n    `\n    }, void 0, false, {\n        fileName: \"/Users/arifrahman/Code/personal/kitsuden-dapp/styles/Global.tsx\",\n        lineNumber: 4,\n        columnNumber: 3\n    }, undefined)\n;\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvR2xvYmFsLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQThEO0FBRTlELE1BQU1BLE1BQU0sR0FBRyxrQkFDYiw4REFBQ0Msa0RBQWE7UUFDWkUsTUFBTSxFQUFFRCwrQ0FBRyxDQUFDOzs7Ozs7Ozs7OztJQVdaLENBQUM7Ozs7O2lCQUNEO0FBQ0Y7QUFFZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9zdHlsZXMvR2xvYmFsLnRzeD8yNzk1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbCBhcyBFbW90aW9uR2xvYmFsLCBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcblxuY29uc3QgR2xvYmFsID0gKCkgPT4gKFxuICA8RW1vdGlvbkdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgQGltcG9ydCB1cmwoXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU1vbnRzZXJyYXQ6d2dodEAxMDA7MjAwOzMwMDs0MDA7NTAwOzYwMDs3MDA7ODAwJmRpc3BsYXk9c3dhcFwiKTtcblxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBcIk5pbmVUc3VraVJlZ3VsYXJcIjtcbiAgICAgICAgc3JjOiB1cmwoXCJmb250cy9OaW5lVHN1a2lSZWd1bGFyLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKTtcbiAgICAgIH1cblxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBcIk1vbnRzZXJyYXRcIiwgc2Fucy1zZXJpZjtcbiAgICAgIH1cbiAgICBgfVxuICAvPlxuKTtcblxuZXhwb3J0IHsgR2xvYmFsIH07XG4iXSwibmFtZXMiOlsiR2xvYmFsIiwiRW1vdGlvbkdsb2JhbCIsImNzcyIsInN0eWxlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./styles/Global.tsx\n");

/***/ }),

/***/ "./styles/index.ts":
/*!*************************!*\
  !*** ./styles/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Global\": () => (/* reexport safe */ _Global__WEBPACK_IMPORTED_MODULE_1__.Global),\n/* harmony export */   \"theme\": () => (/* binding */ theme)\n/* harmony export */ });\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global */ \"./styles/Global.tsx\");\n\n\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.extendTheme)({\n    fonts: {\n        heading: \"NineTsukiRegular\",\n        body: \"Montserrat,  sans-serif;\"\n    },\n    colors: {\n        brand: {\n            100: \"#FFFDE5\",\n            200: \"#F36800\"\n        }\n    },\n    components: {\n    }\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBK0M7QUFDYjtBQUVsQyxNQUFNRSxLQUFLLEdBQUdGLDZEQUFXLENBQUM7SUFDeEJHLEtBQUssRUFBRTtRQUNMQyxPQUFPLEVBQUUsa0JBQWtCO1FBQzNCQyxJQUFJLEVBQUUsMEJBQTBCO0tBQ2pDO0lBQ0RDLE1BQU0sRUFBRTtRQUNOQyxLQUFLLEVBQUU7QUFDTCxlQUFHLEVBQUUsU0FBUztBQUNkLGVBQUcsRUFBRSxTQUFTO1NBQ2Y7S0FDRjtJQUNEQyxVQUFVLEVBQUU7S0EyQlg7Q0FDRixDQUFDO0FBS2UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9zdHlsZXMvaW5kZXgudHM/MzAzYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHRlbmRUaGVtZSB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5leHBvcnQgeyBHbG9iYWwgfSBmcm9tIFwiLi9HbG9iYWxcIjtcblxuY29uc3QgdGhlbWUgPSBleHRlbmRUaGVtZSh7XG4gIGZvbnRzOiB7XG4gICAgaGVhZGluZzogXCJOaW5lVHN1a2lSZWd1bGFyXCIsXG4gICAgYm9keTogXCJNb250c2VycmF0LCAgc2Fucy1zZXJpZjtcIixcbiAgfSxcbiAgY29sb3JzOiB7XG4gICAgYnJhbmQ6IHtcbiAgICAgIDEwMDogXCIjRkZGREU1XCIsXG4gICAgICAyMDA6IFwiI0YzNjgwMFwiLFxuICAgIH0sXG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICAvLyBAbGluayAtIGZpeGluZyBpc3N1ZSB3aXRoIG92ZXJsYXkgaW4gbW9kYWwvZHJhd2VyL3BvcnRhbCBodHRwczovL2dpdGh1Yi5jb20vY2hha3JhLXVpL2NoYWtyYS11aS9pc3N1ZXMvMjg5M1xuICAgIC8vIERyYXdlcjoge1xuICAgIC8vICAgdmFyaWFudHM6IHtcbiAgICAvLyAgICAgYWx3YXlzT3Blbjoge1xuICAgIC8vICAgICAgIHBhcnRzOiBbXCJkaWFsb2csIGRpYWxvZ0NvbnRhaW5lclwiXSxcbiAgICAvLyAgICAgICBkaWFsb2c6IHtcbiAgICAvLyAgICAgICAgIHBvaW50ZXJFdmVudHM6IFwiYXV0b1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAgZGlhbG9nQ29udGFpbmVyOiB7XG4gICAgLy8gICAgICAgICBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgfSxcbiAgICAvLyB9LFxuICAgIC8vIE1vZGFsOiB7XG4gICAgLy8gICB2YXJpYW50czoge1xuICAgIC8vICAgICBjbGlja1Rocm91Z2g6IHtcbiAgICAvLyAgICAgICBkaWFsb2dDb250YWluZXI6IHtcbiAgICAvLyAgICAgICAgIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAgZGlhbG9nOiB7XG4gICAgLy8gICAgICAgICBwb2ludGVyRXZlbnRzOiBcImF1dG9cIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgfSxcbiAgICAvLyB9LFxuICB9LFxufSk7XG5cbnR5cGUgVGhlbWUgPSB0eXBlb2YgdGhlbWU7XG5cbmV4cG9ydCB0eXBlIHsgVGhlbWUgfTtcbmV4cG9ydCB7IHRoZW1lIH07XG4iXSwibmFtZXMiOlsiZXh0ZW5kVGhlbWUiLCJHbG9iYWwiLCJ0aGVtZSIsImZvbnRzIiwiaGVhZGluZyIsImJvZHkiLCJjb2xvcnMiLCJicmFuZCIsImNvbXBvbmVudHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./styles/index.ts\n");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@emotion/react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

module.exports = require("wagmi");

/***/ }),

/***/ "wagmi/connectors/coinbaseWallet":
/*!**************************************************!*\
  !*** external "wagmi/connectors/coinbaseWallet" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("wagmi/connectors/coinbaseWallet");

/***/ }),

/***/ "wagmi/connectors/injected":
/*!********************************************!*\
  !*** external "wagmi/connectors/injected" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("wagmi/connectors/injected");

/***/ }),

/***/ "wagmi/connectors/metaMask":
/*!********************************************!*\
  !*** external "wagmi/connectors/metaMask" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("wagmi/connectors/metaMask");

/***/ }),

/***/ "wagmi/connectors/walletConnect":
/*!*************************************************!*\
  !*** external "wagmi/connectors/walletConnect" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("wagmi/connectors/walletConnect");

/***/ }),

/***/ "wagmi/providers/alchemy":
/*!******************************************!*\
  !*** external "wagmi/providers/alchemy" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("wagmi/providers/alchemy");

/***/ }),

/***/ "wagmi/providers/public":
/*!*****************************************!*\
  !*** external "wagmi/providers/public" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("wagmi/providers/public");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();