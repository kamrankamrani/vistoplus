import { Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import "../Styles/UselessFacts/uselessFactsStyles.css";
import { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";
import LoadingComponent from "./LoadingComponent";
import LangSelect from "./LangSelect";
import { setEnglishFact, setPersianValue } from "./featuers/uselessFactSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useGetRandomFactQuery } from "../Services/uselessFactApiQuery";
import { useGetTranslatedDataQuery } from "../Services/translateToPersianApi";

export default function UseLessFacts() {
  const [enFactskip, setGetEnFactSkip] = useState(true);
  const [skipTranslate, setSkipTranslate] = useState(true);
  const [DefaultIconColor, setDefaulColor] = useState("rgba(0, 0, 0, 0.54)");
  const persianFact = useAppSelector((state) => state.uselessFact.persianValue);
  const EnFact = useAppSelector((state) => state.uselessFact.englishFact);
  const DefaultLightIconColor = "#f1f1f1";
  const [lang, setLang] = useState("fa");
  const theme = useAppSelector((state) => state.darkMode.value);
  const dispatch = useAppDispatch();
  const EngFactFromQuery = useGetRandomFactQuery(undefined, {
    skip: enFactskip,
  });
  const TranslatedFactFromQuery = useGetTranslatedDataQuery(EnFact, {
    skip: skipTranslate,
  });

  useEffect(() => {
    if (theme === "dark") {
      setDefaulColor(DefaultLightIconColor);
    } else {
      setDefaulColor("rgba(0, 0, 0, 0.54)");
    }
  }, [theme]);

  useEffect(() => {
    setGetEnFactSkip(true);
    if (EngFactFromQuery.isSuccess) {
      dispatch(setEnglishFact(EngFactFromQuery.data));
      setSkipTranslate(false);
    }
  }, [EngFactFromQuery.data]);

  useEffect(() => {
    setSkipTranslate(true);
    if (TranslatedFactFromQuery.isSuccess) {
      if (TranslatedFactFromQuery.data) {
        dispatch(
          setPersianValue(
            TranslatedFactFromQuery.data?.responseData.translatedText
          )
        );
      }
    }
  }, [TranslatedFactFromQuery.data]);

  useEffect(() => {
    console.log("en fact is", EnFact);
  }, [EnFact]);

  const handleApirequest = () => {
    setGetEnFactSkip(false);
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
        {!EnFact.length ? (
          <Button
            onClick={() => handleApirequest()}
            className={
              "ready-button " +
              (theme === "dark" ? "dark-button " : "") +
              (TranslatedFactFromQuery.isFetching || EngFactFromQuery.isFetching
                ? "disable-button"
                : "")
            }
          >
            {!(
              TranslatedFactFromQuery.isFetching || EngFactFromQuery.isFetching
            ) ? (
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
            {lang === "en" ? EnFact : persianFact}
          </Typography>
        )}
        <Grid container className="very-buttom-container">
          <Grid item style={{ flexGrow: 1 }}>
            <LangSelect setLang={setLang} />
          </Grid>
          <Button
            onClick={() => handleApirequest()}
            disabled={persianFact.length ? false : true}
            className={
              "new-fact-button " +
              (theme === "dark" ? "dark-button " : "") +
              (!persianFact.length ? "disable-button" : "")
            }
          >
            {!(
              TranslatedFactFromQuery.isFetching || EngFactFromQuery.isFetching
            ) ? (
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
