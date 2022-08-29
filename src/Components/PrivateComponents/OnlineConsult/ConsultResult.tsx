import { Chip, Divider, Grid, Typography } from "@mui/material";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import "../../../Styles/OnlineConsult/online-consult.css";
import { returnResultData } from "./ResonseForm";
import DarkModeContext from "../../DarkModeContext";
import { useContext } from "react";

export default function ConsultResult(formResult: returnResultData) {
  const [theme] = useContext(DarkModeContext);
  return (
    <Grid item className="result-container">
      <Grid container className="result-body-container">
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "5px",
          }}
        >
          <Typography className="result-body-text">انتخاب های شما:</Typography>
          <PlaylistAddCheckRoundedIcon
            sx={{
              marginLeft: "5px",
              color: theme === "dark" ? "#eeeeee" : "#01579b",
            }}
          />
        </Grid>
        <Grid item container xs={12} className="result-choices-chips-container">
          {formResult.choices.map((value, index) => {
            return (
              <Grid item key={index}>
                <Chip
                  className={"chip " + (theme === "dark" ? "dark-chip" : "")}
                  label={
                    <Typography className="small-chip-text">{value}</Typography>
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Divider variant="middle" className="divider" />
      <Grid container>
        <Typography className="result-body-text">
          <TaskRoundedIcon
            sx={{
              verticalAlign: "middle",
              color: theme === "dark" ? "#eeeeee" : "#52A051",
            }}
          />
          {formResult.mainBody}
        </Typography>
      </Grid>
      <Divider variant="middle" className="divider" />
      <Grid container className="result-body-container">
        {formResult.extraOptions.map((value, index) => {
          return (
            <Grid
              key={index}
              item
              xs={12}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="subtitle1"
                className="result-extra-option-text"
              >
                <ReportGmailerrorredRoundedIcon
                  sx={{
                    verticalAlign: "middle",
                    color: theme === "dark" ? "#eeeeee" : "#c62828",
                  }}
                />
                {value}
              </Typography>
              {index !== formResult.extraOptions.length ? (
                <Divider variant="middle" className="small-divider" />
              ) : null}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
