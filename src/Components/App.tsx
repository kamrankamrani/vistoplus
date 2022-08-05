import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaticAppBar from "./AppBar";
import Home from "./Home";
import UseLessFacts from "./UseLessFacts";
import "vazirmatn/Vazirmatn-font-face.css";
import { Grid } from "@mui/material";
import "../Styles/App/appStyles.css";
import DarkModeContext from "./DarkModeContext";
import { useContext } from "react";
import BottomBar from "./BottomBar";
import OnlineConsult from "./OnlineConsult";

export default function App() {
  const [darkMode] = useContext(DarkModeContext);

  return (
    <BrowserRouter>
      <StaticAppBar />
      <Grid
        container
        className={"main-container " + (darkMode === "dark" ? "dark-mode" : "")}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uselessfacts" element={<UseLessFacts />} />
          <Route path="/onlineconsult" element={<OnlineConsult />} />
        </Routes>
        <BottomBar />
      </Grid>
    </BrowserRouter>
  );
}
