import { Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import "../Styles/Home/home.css";
import IS_smScreen from "./Screen";

export default function Home() {
  const isSmScreen = useContext(IS_smScreen());
  return (
    <React.Fragment>
      <Grid container columnSpacing={3} className="row-container">
        <Grid item xs={6} sm={4} className="item-container">
          <Paper className="paper">
            <div className="useless-facts" />
            <Typography variant="h5">رندوم فکت!</Typography>
          </Paper>
          {!isSmScreen && (
            <Typography className="mobilie-captions" variant="h5">
              رندوم فکت!
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sm={4} className="item-container">
          <Paper className="paper">
            <div className="online-consultant" />
            <Typography variant="h5">مشاور آنلاین آبیاری</Typography>
          </Paper>
          {!isSmScreen && (
            <Typography className="mobilie-captions" variant="h5">
              مشاور آنلاین آبیاری
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sm={4} className="item-container">
          <Paper className="weather-paper">
            <div className="weather" />
            <Typography variant="h5">وضعیت آب و هوا</Typography>
          </Paper>
          {!isSmScreen && (
            <Typography className="mobilie-captions" variant="h5">
              وضعیت آب و هوا
            </Typography>
          )}
        </Grid>
      </Grid>
      <hr className="divider" />
    </React.Fragment>
  );
}
