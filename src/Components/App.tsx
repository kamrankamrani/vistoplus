import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaticAppBar from "./AppBar";
import Home from "./Home";
import UseLessFacts from "./UseLessFacts";
import "vazirmatn/Vazirmatn-font-face.css";
import { Grid } from "@mui/material";
import "../Styles/App/appStyles.css";
import DarkModeContext from "./DarkModeContext";
import { useState } from "react";

export default function App() {
  const theme = useState("light");
  return (
    <BrowserRouter>
      <DarkModeContext.Provider value={theme}>
        <StaticAppBar />
        <Grid id="main-container" container sx={{ marginTop: "80px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uselessfacts" element={<UseLessFacts />} />
          </Routes>
        </Grid>
      </DarkModeContext.Provider>
    </BrowserRouter>
  );
}
