import { Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import "../../../Styles/Chart/chart.css";
import MapTempToHeight from "./MapTempToHeight";
import {
  DailyForecastCustomizedResponse,
  DailyForeCastResponse,
} from "../../../Services/Types";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import MyTooltip from "./MyTooltip";
import { useAppSelector } from "../../reduxHooks";

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

const test_data: Test_list[] = [
  {
    dt: "",
    main: {
      temp_min: "8",
      temp_max: "12",
    },
  },
  {
    dt: "",
    main: {
      temp_min: "5",
      temp_max: "23",
    },
  },
  {
    dt: "",
    main: {
      temp_min: "10",
      temp_max: "28",
    },
  },
  {
    dt: "",
    main: {
      temp_min: "19",
      temp_max: "22",
    },
  },
  {
    dt: "",
    main: {
      temp_min: "2",
      temp_max: "27",
    },
  },
  {
    dt: "",
    main: {
      temp_min: "15",
      temp_max: "25",
    },
  },
  {
    dt: "",
    main: {
      temp_min: "9",
      temp_max: "23",
    },
  },
];

export default function Chart() {
  // const [startPoint, setStartPoint] = useState(0);
  const MAX_HEIGHT = 50;
  // const [forecastData, setForecastData] = useState({} as DailyForeCastResponse);
  const [maxTempPixels, setMaxTempPixels] = useState([] as number[]);
  const [minTempPixels, setMinTempPixels] = useState([] as number[]);
  const foreCastData: DailyForecastCustomizedResponse[] | undefined =
    useAppSelector((state) => state.weatherSlice.dailyForecast);

  useEffect(() => {
    console.log("forecast data ", foreCastData);
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
                    <NightlightRoundedIcon className="moon" />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
