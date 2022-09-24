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
import CityMenu from "./PrivateComponents/weather/CityMenu";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { setOpenCityAnchor, setOpenCityMenu } from "./featuers/cityMenuSlice";
import { useGetCurrentWeatherQuery } from "../Services/weatherApiQuery";
import { setCurrentLocation } from "./featuers/weatherSlice";

export default function Weather() {
  const LAT = useAppSelector((state) => state.weatherSlice.lat);
  const LON = useAppSelector((state) => state.weatherSlice.lon);
  const City = useAppSelector((state) => state.weatherSlice.city);
  const dispatch = useAppDispatch();
  const getCurrentWeatherData = useGetCurrentWeatherQuery({
    lat: LAT,
    lon: LON,
  });
  const [dailyForecast, setDailyForecast] = useState(
    {} as DailyForeCastResponse
  );
  const cityMenuAnchor = useAppSelector(
    (state) => state.cityMenuSlice.anchorForCityMenu
  );

  const getGeoCode = (city_ = "Tehran") => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city_}&limit=1&appid=${OpenWeatherApiKey}`
      )
      .then((response: AxiosResponse<"object">) => {
        if (response.data && typeof response.data === "object") {
          const GeoCodingRes: GeoCodingResponse = response.data;
          dispatch(
            setCurrentLocation({
              lat: GeoCodingRes.lat,
              lon: GeoCodingRes.lon,
              city: GeoCodingRes.name,
            })
          );
          // setLat(GeoCodingRes.lat);
          // setLon(GeoCodingRes.lon);
          // setCity(GeoCodingRes.name);
          // console.log(GeoCodingRes);
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
          // console.log("current weather ", CurrentWeatherRes);
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
          // console.log("forecast is ", DailyForeCastRes);
        }
      })
      .catch((err) => {
        console.log("daily forecast error", err);
      });
  }

  const handleCityMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!cityMenuAnchor) {
      dispatch(setOpenCityAnchor(event.currentTarget.id));
      dispatch(setOpenCityMenu(true));
    }
  };

  useEffect(() => {
    // getGeoCode();
    // getCurrentWeather();
    // getForecastDaily();
  }, []);

  useEffect(() => {
    console.log("weather data is ", getCurrentWeatherData.data);
  }, [getCurrentWeatherData.data]);

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
              <Button
                id="city-menu-button"
                className="city-button"
                onClick={(e) => handleCityMenuClick(e)}
              >
                <SettingsOutlinedIcon
                  fontSize="small"
                  sx={{ position: "absolute", color: "inherit", left: "5px" }}
                />
                <Typography className="text">تهران</Typography>
                <CityMenu />
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} md={2} className="weather-paper-container">
          <Paper className="weather-paper">
            <Typography>quality</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} className="weather-paper-container">
          <Paper className="weather-paper">
            <Chart dailyForecast={dailyForecast} />
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
