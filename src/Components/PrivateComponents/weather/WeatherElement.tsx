import "../../../Styles/WeatherElement/weather-element.css";
import { useAppSelector } from "../../reduxHooks";
export function WeatherElement() {
  const currentWeather = useAppSelector(
    (state) => state.weatherSlice.weatherCondition
  );

  return (
    <>
      {currentWeather === "sunny" ? <span className="sun"></span> : null}
      {currentWeather === "cloudy" ? <span className="cloud"></span> : null}
      {currentWeather === "rainy" ? (
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
      {currentWeather === "snow" ? (
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
      {currentWeather === "clear" ? (
        <>
          <ul className="night">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <span className="moon"></span>{" "}
        </>
      ) : null}
    </>
  );
}
