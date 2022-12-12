import { Button, Grid, Paper, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useEffect, useState } from "react";
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
  changeWeatherConditionClass,
  setCurrentWeather,
  setDailyForecastWeather,
} from "./featuers/weatherSlice";
import LoadingSpinner from "./LoadingSpinner";
import { NumToPersian } from "../Services/ConvertNum";
import { WeatherElement } from "./PrivateComponents/weather/WeatherElement";
import WindIcon from "./PrivateComponents/weather/WindIcon";
import DropIcon from "./PrivateComponents/weather/DropIcon";
import "../Styles/Weather/weather.css";

export default function Weather() {
  const LAT = useAppSelector((state) => state.weatherSlice.lat);
  const LON = useAppSelector((state) => state.weatherSlice.lon);
  const City = useAppSelector((state) => state.weatherSlice.city);
  const theme = useAppSelector((state) => state.darkMode.value);

  const weatherConditionClass = useAppSelector(
    (state) => state.weatherSlice.weatherConditionClass
  ); //sunny cloudy rainy clear snow
  const currentWeather = useAppSelector(
    (state) => state.weatherSlice.currentWeather
  );

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
  const cityMenuAnchor = useAppSelector(
    (state) => state.cityMenuSlice.anchorForCityMenu
  );

  useEffect(() => {
    if (currentWeather !== undefined) {
      dispatch(
        changeWeatherConditionClass(
          currentWeather.weatherStatus.toLocaleLowerCase()
        )
      );
    }
  }, [currentWeather?.weatherStatus]);

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
          <Paper
            className={"weather-paper temp-paper " + weatherConditionClass}
          >
            {!getDailyForecastData.isSuccess ? (
              <LoadingSpinner isShowText={false} />
            ) : null}
            <WeatherElement />
            <Grid container className="temp-display">
              <Typography className="main-temp-show-text">
                {NumToPersian(currentWeather?.temp)}&deg;
              </Typography>
              <Typography className="degree-sign-text" variant="caption">
                C
              </Typography>
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
        <Grid item xs={6} md={2} className="wind-hum-container">
          <Paper
            className={"weather-paper humidity-paper " + weatherConditionClass}
          >
            {!getDailyForecastData.isSuccess ? (
              <LoadingSpinner isShowText={false} />
            ) : (
              <DropIcon />
            )}
            <Typography className="main-humidity-show-text">
              {NumToPersian(currentWeather?.humidity)} %
            </Typography>
          </Paper>
          <Paper
            className={"weather-paper wind-paper " + weatherConditionClass}
          >
            {!getDailyForecastData.isSuccess ? (
              <LoadingSpinner isShowText={false} />
            ) : (
              <WindIcon />
            )}
            <Typography variant="body2" className="main-humidity-show-text">
              {NumToPersian(currentWeather?.wind.speed)} km/h
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} className="weather-paper-container">
          <Paper
            className={
              "weather-paper " + (theme === "dark" ? "dark-weather-paper " : "")
            }
          >
            {!getDailyForecastData.isSuccess ? (
              <LoadingSpinner isShowText={true} />
            ) : null}
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
