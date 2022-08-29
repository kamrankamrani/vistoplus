import { Button, Grid, Paper, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "../Styles/Weather/weather.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { OpenWeatherApiKey } from "../Info/Config";
import {
  CurrentWeatherResponse,
  DailyForeCastResponse,
  GeoCodingResponse,
} from "../Services/Types";
import Chart from "./PrivateComponents/weather/Chart";

export default function Weather() {
  const [LAT, setLat] = useState("35.6892523");
  const [LON, setLon] = useState("51.3896004");
  const [City, setCity] = useState("Tehran");
  const [dailyForecast, setDailyForecast] = useState(
    {} as DailyForeCastResponse
  );

  const getGeoCode = (city_ = "Tehran") => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city_}&limit=1&appid=${OpenWeatherApiKey}`
      )
      .then((response: AxiosResponse<"object">) => {
        if (response.data && typeof response.data === "object") {
          const GeoCodingRes: GeoCodingResponse = response.data;
          setLat(GeoCodingRes.lat);
          setLon(GeoCodingRes.lon);
          setCity(GeoCodingRes.name);
          console.log(GeoCodingRes);
        }
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  const getCurrentWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${OpenWeatherApiKey}&units=metric`
      )
      .then((response: AxiosResponse<"object">) => {
        if (response.data && typeof response.data === "object") {
          const CurrentWeatherRes: CurrentWeatherResponse = response.data;
          console.log("current weather ", CurrentWeatherRes);
        }
      })
      .catch((err) => {
        console.log("current weather err is ", err);
      });
  };

  function getForecastDaily() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&cnt=7&appid=${OpenWeatherApiKey}&units=metric`
      )
      .then((response: AxiosResponse<"object">) => {
        if (response.data && typeof response.data === "object") {
          setDailyForecast(response.data);
          const DailyForeCastRes: DailyForeCastResponse = response.data;
          console.log("forecast is ", DailyForeCastRes);
        }
      })
      .catch((err) => {
        console.log("daily forecast error", err);
      });
  }

  useEffect(() => {
    // getGeoCode();
    // getCurrentWeather();
    // getForecastDaily();
  }, []);
  return (
    <Grid container className="weather-container">
      <Grid container className="weather-row-container">
        <Grid item xs={6} md={2} className="weather-paper-container">
          <Paper className="weather-paper temp-paper">
            <Grid container className="temp-display">
              <Typography>25&deg;</Typography>
              <Typography variant="caption">C</Typography>
            </Grid>
            <Grid container className="city-button-container">
              <Button className="city-button">
                <SettingsOutlinedIcon
                  fontSize="small"
                  sx={{ position: "absolute", color: "inherit", left: "5px" }}
                />
                <Typography className="text">تهران</Typography>
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} className="weather-paper-container">
          <Paper className="weather-paper">
            <Chart dailyForecast={dailyForecast} />
          </Paper>
        </Grid>
        <Grid item xs={6} md={2} className="weather-paper-container">
          <Paper className="weather-paper">
            <Typography>quality</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Grid>
  );
}
