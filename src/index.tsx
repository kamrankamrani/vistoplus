import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material";
import React from "react";
import AppParent from "./Components/AppParent";

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <AppParent />
    </React.StrictMode>
  </StyledEngineProvider>
);
