import { Grid, IconButton } from "@mui/material";
import "../Styles/BottomBar/bottom-bar.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "./reduxHooks";

export default function BottomBar() {
  const theme = useAppSelector((state) => state.darkMode.value);
  const [renderBackButton, setRenderBackButton] = useState(false);
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const homePage = "/";

  useEffect(() => {
    if (currentLocation.pathname !== homePage) {
      setRenderBackButton(true);
    } else {
      setRenderBackButton(false);
    }
  }, [currentLocation.pathname]);

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <Grid container className="bottom-container">
      {renderBackButton && (
        <IconButton
          onClick={handleBackButton}
          className={
            "back-button " + (theme === "dark" ? "back-button-dark" : "")
          }
        >
          <ArrowBackIcon />
        </IconButton>
      )}
    </Grid>
  );
}
