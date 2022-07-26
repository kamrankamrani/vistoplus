import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaticAppBar from "./AppBar";
import Home from "./Home";
import UseLessFacts from "./UseLessFacts";
import "vazirmatn/Vazirmatn-font-face.css";
import { Grid } from "@mui/material";
import "../Styles/App/appStyles.css";
import { useContext } from "react";
import BottomBar from "./BottomBar";
import OnlineConsult from "./OnlineConsult";
import IS_smScreen from "./Screen";
import Weather from "./Weather";
import { useAppSelector } from "./reduxHooks";

export default function App() {
  const darkMode = useAppSelector((state) => state.darkMode.value);
  const isSmScreen = useContext(IS_smScreen());
  return (
    <BrowserRouter>
      <StaticAppBar />
      <Grid
        container
        className={
          "main-container " +
          (!isSmScreen ? "main-container-mobile " : "") +
          (darkMode === "dark" ? "dark-mode" : "")
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uselessfacts" element={<UseLessFacts />} />
          <Route path="/onlineconsult" element={<OnlineConsult />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
        <BottomBar />
      </Grid>
    </BrowserRouter>
  );
}
