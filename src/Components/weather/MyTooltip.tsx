import { Grid, Typography } from "@mui/material";

const MyTooltip = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>دما : 25</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>باد شدید</Typography>
      </Grid>
    </Grid>
  );
};

export default MyTooltip;
