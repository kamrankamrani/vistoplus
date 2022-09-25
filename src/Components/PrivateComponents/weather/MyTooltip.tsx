import { Grid, Typography } from "@mui/material";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import "../../../Styles/MyTooltip/mytooltip.css";
import { NumToPersian } from "../../../Services/ConvertNum";
import { DailyForecastCustomizedResponse } from "../../../Services/Types";

interface IProps {
  data: DailyForecastCustomizedResponse;
}

const MyTooltip = (props: IProps) => {
  return (
    <Grid container>
      <Grid item xs={12} className="tooltip-content-container">
        <ThermostatRoundedIcon
          color="inherit"
          fontSize="small"
          className="temp-icon"
        />
        <Typography className="tooltip-text temp-icon">
          {NumToPersian(props.data.temp)}
        </Typography>
      </Grid>
      <Grid item xs={12} className="tooltip-content-container">
        <AirRoundedIcon color="inherit" fontSize="small" />
        <Typography className="tooltip-text">
          {NumToPersian(props.data.humidity)} %
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MyTooltip;
