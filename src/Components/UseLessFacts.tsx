import { Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import "../Styles/UselessFacts/uselessFactsStyles.css";
import React, { useContext, useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";
import DarkModeContext from "./DarkModeContext";
import { UselessApi } from "../Services/Api";
import { UselessFactBaseUrl } from "../Info/Config";
import axios, { AxiosResponse } from "axios";
import { TranslateResponse, UselessFactResponse } from "../Services/Types";
import LoadingComponent from "./LoadingComponent";
import LangSelect from "./LangSelect";
import type { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { setPersianValue } from "./reducers/uselessFactSlice";

export default function UseLessFacts() {
  const [loading, setLoading] = React.useState(false);
  const [DefaultIconColor, setDefaulColor] = useState("rgba(0, 0, 0, 0.54)");
  // const [fact, setFact] = useState("");
  const fact = useSelector((state: RootState) => state.persianFact.value);
  const [EnFact, setEnFact] = useState("");
  const DefaultLightIconColor = "#f1f1f1";
  const [lang, setLang] = useState("fa");
  const [theme] = useContext(DarkModeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      setDefaulColor(DefaultLightIconColor);
    } else {
      setDefaulColor("rgba(0, 0, 0, 0.54)");
    }
  }, [theme]);

  const handleApirequest = () => {
    setLoading(true);
    UselessApi.get(UselessFactBaseUrl)
      .then((response: AxiosResponse<"object">) => {
        // setLoading(false);
        if (response.data && typeof response.data === "object") {
          const responseData: UselessFactResponse = response.data;
          console.log("original data is ", responseData.text);
          setEnFact(responseData.text);
          axios
            .get(
              `https://api.mymemory.translated.net/get?q=${responseData.text}&langpair=en|fa`
            )
            .then((res: AxiosResponse<"object">) => {
              setLoading(false);
              if (res.data && typeof res.data === "object") {
                const translatedData: TranslateResponse = res.data;
                if (
                  translatedData.responseData &&
                  translatedData.responseData.translatedText
                ) {
                  console.log(
                    "translate => ",
                    translatedData.responseData.translatedText
                  );
                  dispatch(
                    setPersianValue(translatedData.responseData.translatedText)
                  );
                }
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log("translate error ", err);
            });
        } else {
          setLoading(false);
          console.log("response data type", typeof response.data);
        }
      })
      .catch((error: string) => {
        setLoading(false);
        console.log("error is", error);
      });
  };
  return (
    <Grid xs={12} md={6} container className="app-container">
      <Paper
        className={"header-paper " + (theme === "dark" ? "dark-paper" : "")}
      >
        <Typography variant="h6" className="header-text">
          حقایقی تصادفی که مطمئنا نمیدانستید!
        </Typography>
      </Paper>
      <Paper
        className={"bottom-paper " + (theme === "dark" ? "dark-paper" : "")}
      >
        {!fact.length ? (
          <Button
            onClick={() => handleApirequest()}
            className={
              "ready-button " +
              (theme === "dark" ? "dark-button " : "") +
              (loading ? "disable-button" : "")
            }
          >
            {!loading ? (
              <Typography className="ready-button-text">
                آمادگیشو داری؟
              </Typography>
            ) : (
              <LoadingComponent />
            )}
          </Button>
        ) : (
          <Typography
            variant="body2"
            className={
              "response-text " + (lang === "fa" ? "rtl-direction" : "")
            }
          >
            {lang === "en" ? EnFact : fact}
          </Typography>
        )}
        <Grid container className="very-buttom-container">
          <Grid item style={{ flexGrow: 1 }}>
            <LangSelect setLang={setLang} />
          </Grid>
          <Button
            onClick={() => handleApirequest()}
            disabled={fact.length ? false : true}
            className={
              "new-fact-button " +
              (theme === "dark" ? "dark-button " : "") +
              (!fact.length ? "disable-button" : "")
            }
          >
            {!loading ? (
              <Typography className="new-fact-text">فکت جدید!</Typography>
            ) : (
              <LoadingComponent />
            )}
          </Button>
        </Grid>
      </Paper>
      <Grid container className="share-link-container">
        <Tooltip title="share">
          <Grid
            item
            className={
              "round-button-container " + (theme === "dark" ? "dark-paper" : "")
            }
          >
            <ShareIcon
              sx={{
                color:
                  theme !== "dark" ? DefaultIconColor : DefaultLightIconColor,
              }}
            />
          </Grid>
        </Tooltip>
        <Tooltip title="copy link">
          <Grid
            item
            className={
              "round-button-container " + (theme === "dark" ? "dark-paper" : "")
            }
          >
            <LinkIcon
              className="link-icon"
              sx={{
                color:
                  theme !== "dark" ? DefaultIconColor : DefaultLightIconColor,
              }}
            />
          </Grid>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
