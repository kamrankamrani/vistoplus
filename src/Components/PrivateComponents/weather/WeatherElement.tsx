import { WeatherStatusCode } from "../../../Info/Config";
import "../../../Styles/WeatherElement/weather-element.css";
import { useAppSelector } from "../../reduxHooks";
export function WeatherElement() {
  const currentWeather = useAppSelector(
    (state) => state.weatherSlice.weatherCondition
  );

  return (
    <>
      {currentWeather === WeatherStatusCode.sunny ? (
        <span className="sun"></span>
      ) : null}
      {currentWeather === WeatherStatusCode.cloud ? (
        <span className="cloud"></span>
      ) : null}
      {currentWeather === WeatherStatusCode.rain ? (
        <>
          <ul className="ul-rainy-element">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <span className="rainy"></span>
        </>
      ) : null}
      {currentWeather === WeatherStatusCode.snow ? (
        <>
          <ul className="ul-snow-element">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <span className="snow"></span>
        </>
      ) : null}
      {currentWeather === WeatherStatusCode.clear ? (
        <>
          <ul className="night">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <span className="moon-element"></span>{" "}
        </>
      ) : null}
    </>
  );
}
