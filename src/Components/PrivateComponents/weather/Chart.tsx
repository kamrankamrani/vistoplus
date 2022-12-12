import { Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import "../../../Styles/Chart/chart.css";
import MapTempToHeight from "./MapTempToHeight";
import { DailyForecastCustomizedResponse } from "../../../Services/Types";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import MyTooltip from "./MyTooltip";
import { useAppSelector } from "../../reduxHooks";
import { NumToPersian } from "../../../Services/ConvertNum";

export interface Test_list {
  dt?: string;
  main: {
    temp?: string;
    feels_like?: string;
    temp_min: string;
    temp_max: string;
    pressure?: string;
    sea_level?: string;
    grnd_level?: string;
    humidity?: string;
    temp_kf?: string;
  };
}

export default function Chart() {
  // const [startPoint, setStartPoint] = useState(0);
  const MAX_HEIGHT = 50;
  const [maxTempPixels, setMaxTempPixels] = useState([] as number[]);
  const [minTempPixels, setMinTempPixels] = useState([] as number[]);
  const foreCastData: DailyForecastCustomizedResponse[] | undefined =
    useAppSelector((state) => state.weatherSlice.dailyForecast);
  const theme = useAppSelector((state) => state.darkMode.value);

  useEffect(() => {
    if (foreCastData) {
      const [maxPixels, minPixels] = MapTempToHeight(foreCastData, MAX_HEIGHT);
      setMaxTempPixels(maxPixels);
      setMinTempPixels(minPixels);
    }
  }, [JSON.stringify(foreCastData)]);

  return (
    <Grid container className="chart-container">
      <Grid item xs={12} className="chart-sun-icon-container">
        <Grid container className="icons-wrapper">
          {foreCastData
            ? foreCastData.map((val, index) => {
                return (
                  <Grid key={index} item className="single-icon-wrapper">
                    <WbSunnyRoundedIcon style={{ color: "#FC9601" }} />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className="chart-wrapper">
          {foreCastData
            ? foreCastData.map((val, index) => {
                return (
                  <Grid key={index} item className="circle-wrapper">
                    <Tooltip
                      title={<MyTooltip data={val} />}
                      classes={{
                        popper: "tooltip-container",
                        tooltip: "tooltip",
                      }}
                    >
                      <div
                        className="circle"
                        style={{ top: maxTempPixels[index] }}
                      ></div>
                    </Tooltip>
                  </Grid>
                );
              })
            : null}
          {/* <svg style={{ width: "100%", position: "absolute" }}>
            <line
              x1={startPoint.toString()}
              y1="0"
              x2="200"
              y2="200"
              style={{ stroke: "rgb(255,0,0)", strokeWidth: "5" }}
            ></line>
          </svg> */}
        </Grid>
        <Grid container className="chart-wrapper">
          {foreCastData
            ? foreCastData.map((val, index) => {
                return (
                  <Grid key={index} item className="circle-wrapper">
                    <Tooltip
                      title={<MyTooltip data={val} />}
                      classes={{
                        popper: "tooltip-container",
                        tooltip: "tooltip",
                      }}
                    >
                      <div
                        className="circle"
                        style={{ top: minTempPixels[index] }}
                      ></div>
                    </Tooltip>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
      <Grid item xs={12} className="chart-moon-icon-container">
        <Grid container className="icons-wrapper">
          {foreCastData
            ? foreCastData.map((val, index) => {
                return (
                  <Grid key={index} item className="single-icon-wrapper">
                    <NightlightRoundedIcon
                      className={
                        "moon " + (theme === "dark" ? "dark-moon" : "")
                      }
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
      <Grid item xs={12} className="chart-moon-icon-container">
        <Grid container className="icons-wrapper">
          {foreCastData
            ? foreCastData.map((val, index) => {
                const d_ = new Date(val.datetime).getHours();
                // console.log("date is ", val.datetime);
                return (
                  <Grid key={index} item className="single-icon-wrapper">
                    <Typography
                      className={
                        "date-text " +
                        (theme === "dark" ? "dark-date-text" : "")
                      }
                      variant="caption"
                    >
                      {NumToPersian(`${d_}:00`)}
                    </Typography>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
