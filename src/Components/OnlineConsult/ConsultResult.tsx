import { Grid, Typography } from "@mui/material";
import "../../Styles/OnlineConsult/online-consult.css";
import { returnResultData } from "./ResonseForm";

export default function ConsultResult(formResult: returnResultData) {
  return (
    <Grid item className="form-body-container">
      <Grid container>
        <Typography className="header-text">{formResult.mainBody}</Typography>
      </Grid>
    </Grid>
  );
}
