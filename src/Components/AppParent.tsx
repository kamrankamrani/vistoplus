import { useState } from "react";
import { Provider } from "react-redux";
import App from "./App";
import DarkModeContext from "./DarkModeContext";
import store from "./store";

export default function AppParent() {
  const theme = useState("light");

  return (
    <DarkModeContext.Provider value={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeContext.Provider>
  );
}
