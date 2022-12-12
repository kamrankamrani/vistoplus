import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "./reduxHooks";
import "../Styles/LangSelect/lang-select.css";

interface IProps {
  setLang: React.Dispatch<string>;
}

export default function LangSelect(IProps: IProps) {
  const [lang, setLang] = useState("fa");
  const theme = useAppSelector((state) => state.darkMode.value);
  const handleElClick = (input: string) => {
    if (input === "fa") {
      setLang("fa");
      IProps.setLang("fa");
    } else {
      setLang("en");
      IProps.setLang("en");
    }
  };
  return (
    <Grid container className="lang-container">
      <Grid
        onClick={() => handleElClick("fa")}
        item
        className={
          "fa-lang " +
          (lang === "fa" ? "selected " : "") +
          (theme === "dark" && lang === "fa" ? "dark-selected" : "")
        }
      >
        <Typography className="text" variant="caption">
          persian
        </Typography>
      </Grid>
      <Grid
        onClick={() => handleElClick("en")}
        item
        className={
          "eng-lang " +
          (lang === "en" ? "selected " : "") +
          (theme === "dark" && lang === "en" ? "dark-selected" : "")
        }
      >
        <Typography className="text" variant="caption">
          english
        </Typography>
      </Grid>
    </Grid>
  );
}
