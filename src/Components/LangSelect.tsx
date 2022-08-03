import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import "../Styles/LangSelect/lang-select.css";

interface IProps {
  setLang: React.Dispatch<string>;
}

export default function LangSelect(IProps: IProps) {
  const [lang, setLang] = useState("fa");
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
    <Grid container className="container">
      <Grid
        onClick={() => handleElClick("fa")}
        item
        className={"fa-lang " + (lang === "fa" ? "selected" : "")}
      >
        <Typography className="text" variant="caption">
          persian
        </Typography>
      </Grid>
      <Grid
        onClick={() => handleElClick("en")}
        item
        className={"eng-lang " + (lang === "en" ? "selected" : "")}
      >
        <Typography className="text" variant="caption">
          english
        </Typography>
      </Grid>
    </Grid>
  );
}
