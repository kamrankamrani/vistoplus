import { Button, Grid, Paper, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "../Styles/Weather/weather.css";
import { useEffect, useState } from "react";
import { DailyForeCastResponse } from "../Services/Types";
import Chart from "./PrivateComponents/weather/Chart";
import CityMenu from "./PrivateComponents/weather/CityMenu";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { setOpenCityAnchor, setOpenCityMenu } from "./featuers/cityMenuSlice";
import {
  useGetCurrentWeatherQuery,
  useGetDailyForecastQuery,
  useGetGeoCodeQuery,
} from "../Services/weatherApiQuery";
import {
  setCurrentWeather,
  setDailyForecastWeather,
} from "./featuers/weatherSlice";

export default function Weather() {
  const LAT = useAppSelector((state) => state.weatherSlice.lat);
  const LON = useAppSelector((state) => state.weatherSlice.lon);
  const City = useAppSelector((state) => state.weatherSlice.city);
  const currentWeather = useAppSelector((state) => state.weatherSlice);
  const dispatch = useAppDispatch();
  const [getGeoCodeSkip, setGetGeoCodeSkip] = useState(true);
  const [currentWeatherSkip, setCurrentWeatherSkip] = useState(false);
  const [dailySkip, setDailySkip] = useState(false);
  const getGeoCodeData = useGetGeoCodeQuery(City, {
    skip: getGeoCodeSkip,
  });
  const getCurrentWeatherData = useGetCurrentWeatherQuery(
    {
      lat: LAT,
      lon: LON,
    },
    {
      skip: currentWeatherSkip,
    }
  );
  const getDailyForecastData = useGetDailyForecastQuery(
    {
      lat: LAT,
      lon: LON,
    },
    {
      skip: dailySkip,
    }
  );
  const [dailyForecast, setDailyForecast] = useState(
    {} as DailyForeCastResponse
  );
  const cityMenuAnchor = useAppSelector(
    (state) => state.cityMenuSlice.anchorForCityMenu
  );

  const handleCityMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!cityMenuAnchor) {
      dispatch(setOpenCityAnchor(event.currentTarget.id));
      dispatch(setOpenCityMenu(true));
    }
  };

  useEffect(() => {
    console.log("geo code data is ", getGeoCodeData.data);
  }, [getGeoCodeData.data]);

  useEffect(() => {
    console.log("current weather data is ", getCurrentWeatherData.data);
    if (getCurrentWeatherData.data) {
      dispatch(setCurrentWeather(getCurrentWeatherData.data));
    }
  }, [getCurrentWeatherData.data]);

  useEffect(() => {
    console.log("daily forecast data is ", getDailyForecastData.data);
    if (getDailyForecastData.data) {
      dispatch(setDailyForecastWeather(getDailyForecastData.data));
    }
  }, [getDailyForecastData.data]);

  return (
    <Grid container className="weather-container">
      <Grid container className="weather-row-container">
        <Grid item xs={6} md={2} className="weather-paper-container">
          <Paper className="weather-paper temp-paper">
            <Grid container className="temp-display">
              <Typography>
                {currentWeather.currentWeather?.temp}&deg;
              </Typography>
              <Typography variant="caption">C</Typography>
            </Grid>
            <Grid container className="city-button-container">
              <Button
                id="city-menu-button"
                className="city-button"
                onClick={(e) => handleCityMenuClick(e)}
              >
                <SettingsOutlinedIcon
                  fontSize="small"
                  sx={{ position: "absolute", color: "inherit", left: "5px" }}
                />
                <Typography className="text temp-text">{City}</Typography>
                <CityMenu />
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} md={2} className="weather-paper-container">
          <Paper className="weather-paper humidity-paper">
            <Typography>{currentWeather.currentWeather?.humidity} %</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} className="weather-paper-container">
          <Paper className="weather-paper">
            <Chart />
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
