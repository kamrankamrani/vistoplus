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
import React, { useContext, useEffect } from "react";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";
import DarkModeContext from "./DarkModeContext";

export default function UseLessFacts() {
  const [like, setLike] = React.useState(false);
  const [dislike, setDislike] = React.useState(false);
  const DefaultIconColor = "rgba(0, 0, 0, 0.54)";
  const [theme] = useContext(DarkModeContext);

  useEffect(() => {
    console.log("theme is " + theme);
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
  return (
    <Grid xs={12} md={6} container className="app-container">
      <Paper className="header-paper">
        <Typography variant="h6" className="header-text">
          حقایقی که ممکن است زندگی شما را متحول کند!
        </Typography>
      </Paper>
      <Paper className="bottom-paper">
        <Button className="ready-button">
          <Typography className="ready-button-text">آمادگیشو داری؟</Typography>
        </Button>
        <Grid container className="very-buttom-container">
          <Grid sx={{ flexGrow: 1 }}>
            <IconButton>
              <ThumbUpOffAltRoundedIcon
                className="thumb-up-icon"
                sx={{ color: like ? "#0f0" : DefaultIconColor }}
                onClick={handleLikeClick}
              />
            </IconButton>
            <IconButton>
              <ThumbDownAltRoundedIcon
                sx={{ color: dislike ? "#f00" : DefaultIconColor }}
                onClick={handleDisLikeClick}
              />
            </IconButton>
          </Grid>
          <Button className="new-fact-button">
            <Typography className="new-fact-text">فکت جدید!</Typography>
            <RefreshRoundedIcon sx={{ color: "#f1f1f1" }} />
          </Button>
        </Grid>
      </Paper>
      <Grid container className="share-link-container">
        <Tooltip title="share">
          <Grid item className="round-button-container">
            <ShareIcon sx={{ color: DefaultIconColor }} />
          </Grid>
        </Tooltip>
        <Tooltip title="copy link">
          <Grid item className="round-button-container">
            <LinkIcon sx={{ color: DefaultIconColor }} />
          </Grid>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
