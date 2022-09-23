import { Grid, Typography } from "@mui/material";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import "../../../Styles/MyTooltip/mytooltip.css";
import { NumToPersian } from "../../../Services/ConvertNum";

const MyTooltip = () => {
  return (
    <Grid container>
      <Grid item xs={12} className="tooltip-content-container">
        <ThermostatRoundedIcon
          color="inherit"
          fontSize="small"
          className="temp-icon"
        />
        <Typography className="tooltip-text temp-icon">
          {NumToPersian(25)}
        </Typography>
      </Grid>
      <Grid item xs={12} className="tooltip-content-container">
        <AirRoundedIcon color="inherit" fontSize="small" />
        <Typography className="tooltip-text">
          {NumToPersian(133)} km/h
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MyTooltip;
