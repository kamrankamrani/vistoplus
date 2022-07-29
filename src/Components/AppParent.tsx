import { useContext, useState } from "react";
import App from "./App";
import DarkModeContext from "./DarkModeContext";

export default function AppParent() {
  const theme = useState("light");

  return (
    <DarkModeContext.Provider value={theme}>
      <App />
    </DarkModeContext.Provider>
  );
}
