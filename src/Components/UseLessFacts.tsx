import {
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import "../Styles/UselessFacts/uselessFactsStyles.css";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import React, { useContext, useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";
import DarkModeContext from "./DarkModeContext";
import { TranslateApi, UselessApi } from "../Services/Api";
import { TranslateBaseUrl, UselessFactBaseUrl } from "../Info/Config";
import axios, { AxiosResponse } from "axios";
import { TranslateResponse, UselessFactResponse } from "../Services/Types";
import LoadingComponent from "./LoadingComponent";

export default function UseLessFacts() {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [DefaultIconColor, setDefaulColor] = useState("rgba(0, 0, 0, 0.54)");
  const [fact, setFact] = useState("");
  const DefaultLightIconColor = "#f1f1f1";
  const [theme] = useContext(DarkModeContext);

  useEffect(() => {
    if (theme === "dark") {
      setDefaulColor(DefaultLightIconColor);
    } else {
      setDefaulColor("rgba(0, 0, 0, 0.54)");
    }
  }, [theme]);

  const handleLikeClick = () => {
    const like_: boolean = like;
    if (dislike) setDislike(false);
    setLike(!like_);
  };
  const handleDisLikeClick = () => {
    const dislike_: boolean = dislike;
    if (like) setLike(false);
    setDislike(!dislike_);
  };
  const handleApirequest = () => {
    setLoading(true);
    UselessApi.get(UselessFactBaseUrl)
      .then((response: AxiosResponse<"object">) => {
        setLoading(false);
        if (response.data && typeof response.data === "object") {
          const responseData: UselessFactResponse = response.data;
          console.log("original data is ", responseData.text);
          // setFact(responseData.text);
          axios
            .get(
              `https://api.mymemory.translated.net/get?q=${responseData.text}&langpair=en|fa`
            )
            .then((res: AxiosResponse<"object">) => {
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
                  setFact(translatedData.responseData.translatedText);
                }
              }
            })
            .catch((err) => {
              console.log("translate error ", err);
            });
        } else {
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
          <Typography variant="body2" className="response-text">
            {fact}
          </Typography>
        )}
        <Grid container className="very-buttom-container">
          <Grid sx={{ flexGrow: 1 }}>
            <IconButton>
              <ThumbUpOffAltRoundedIcon
                className="thumb-up-icon"
                sx={{ color: like ? "#5BB318" : DefaultIconColor }}
                onClick={handleLikeClick}
              />
            </IconButton>
            <IconButton>
              <ThumbDownAltRoundedIcon
                sx={{ color: dislike ? "#EB1D36" : DefaultIconColor }}
                onClick={handleDisLikeClick}
              />
            </IconButton>
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
            {/* <RefreshRoundedIcon sx={{ color: "#f1f1f1" }} /> */}
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
