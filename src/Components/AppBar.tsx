import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../Styles/AppBar/staticAppBarStyles.css";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { useContext, useEffect, useState } from "react";
import IS_smScreen from "./Screen";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { setDarkMode } from "./featuers/darkModeSlice";
import { useNavigate } from "react-router-dom";

const StaticAppBar = () => {
  const isSmScreen = useContext(IS_smScreen());
  const [switchValue, setSwitchValue] = useState(true);
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.darkMode.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (switchValue) {
      dispatch(setDarkMode("dark"));
    } else {
      dispatch(setDarkMode("light"));
    }
  }, [switchValue]);

  const handleSwitchClick = () => {
    setSwitchValue(!switchValue);
  };

  const handleAppbarClick = (value: string) => {
    switch (value) {
      case "home":
        navigate("/");
        break;
      default:
        navigate("#");
        break;
    }
  };

  return (
    <AppBar
      className={"static-appbar " + (theme === "dark" ? "dark-appbar" : "")}
    >
      <Toolbar>
        <Switch
          onClick={handleSwitchClick}
          className="switch-class"
          icon={<LightModeIcon sx={{ fontSize: "20px", color: "#fff" }} />}
          checkedIcon={
            <DarkModeRoundedIcon sx={{ fontSize: "20px", color: "#fff" }} />
          }
          checked={switchValue}
        />
        <Grid container>
          <Grid item className="menu-option-container">
            {isSmScreen && (
              <>
                <Button onClick={() => handleAppbarClick("home")}>
                  <Typography
                    variant="h6"
                    component="div"
                    className="appbar-typography"
                  >
                    خانه
                  </Typography>
                </Button>
                <Button onClick={() => handleAppbarClick("about")}>
                  <Typography
                    variant="h6"
                    component="div"
                    className="appbar-typography"
                  >
                    درباره ویستو پلاس
                  </Typography>
                </Button>
                <Button onClick={() => handleAppbarClick("idea")}>
                  <Typography
                    variant="h6"
                    component="div"
                    className="appbar-typography"
                  >
                    ثبت ایده!
                  </Typography>
                </Button>
              </>
            )}
          </Grid>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default StaticAppBar;
