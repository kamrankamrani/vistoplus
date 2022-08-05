import { Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home/home.css";
import DarkModeContext from "./DarkModeContext";
import IS_smScreen from "./Screen";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";

export default function Home() {
  const isSmScreen = useContext(IS_smScreen());
  const [theme] = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleItemClick = (element: string) => {
    if (element === "uselessitem") {
      navigate("/uselessfacts");
    } else if (element === "onlineconsult") {
      navigate("/onlineconsult");
    } else if (element === "weather") {
      navigate("/#");
    } else {
      navigate("/#");
    }
  };

  return (
    <React.Fragment>
      <Grid container columnSpacing={3} className="row-container">
        <Grid item xs={6} sm={4} className="item-container">
          <Paper
            onClick={() => handleItemClick("uselessitem")}
            className="paper"
          >
            <Grid
              className={
                "useless-facts " +
                (theme === "dark" ? "dark-item-container" : "")
              }
            >
              <TipsAndUpdatesRoundedIcon
                className={
                  "light-icon " + (theme === "dark" ? "dark-icon" : "")
                }
              />
            </Grid>
            <Typography variant="h5">رندوم فکت!</Typography>
          </Paper>
          {!isSmScreen && (
            <Typography
              className={
                "mobilie-captions " + (theme === "dark" ? "dark-captions" : "")
              }
              variant="h5"
            >
              رندوم فکت!
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sm={4} className="item-container">
          <Paper
            onClick={() => handleItemClick("onlineconsult")}
            className="paper"
          >
            <Grid
              className={
                "online-consultant " +
                (theme === "dark" ? "dark-item-container" : "")
              }
            >
              <SupportAgentRoundedIcon
                className={
                  "light-icon " + (theme === "dark" ? "dark-icon" : "")
                }
              />
            </Grid>
            <Typography variant="h5">مشاور آنلاین آبیاری</Typography>
          </Paper>
          {!isSmScreen && (
            <Typography
              className={
                "mobilie-captions " + (theme === "dark" ? "dark-captions" : "")
              }
              variant="h5"
            >
              مشاور آنلاین آبیاری
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sm={4} className="item-container">
          <Paper onClick={() => handleItemClick("weather")} className="paper">
            <Grid
              className={
                "weather " + (theme === "dark" ? "dark-item-container" : "")
              }
            >
              <ThermostatRoundedIcon
                className={
                  "light-icon " + (theme === "dark" ? "dark-icon" : "")
                }
              />
            </Grid>
            <Typography variant="h5">وضعیت آب و هوا</Typography>
          </Paper>
          {!isSmScreen && (
            <Typography
              className={
                "mobilie-captions " + (theme === "dark" ? "dark-captions" : "")
              }
              variant="h5"
            >
              وضعیت آب و هوا
            </Typography>
          )}
        </Grid>
      </Grid>
      {/* <hr className="divider" /> */}
    </React.Fragment>
  );
}
