// import { StyledEngineProvider } from "@mui/material";
// import ReactDom from "react-dom";
// import App from "./Components/App";

// ReactDom.render(
//   <StyledEngineProvider injectFirst>
//     <App />
//   </StyledEngineProvider>,
//   document.getElementById("root")
// );

import { createRoot } from "react-dom/client";
import App from "./Components/App";
import { StyledEngineProvider } from "@mui/material";

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>
);
