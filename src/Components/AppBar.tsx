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
import DarkModeContext from "./DarkModeContext";

const StaticAppBar = () => {
  const isSmScreen = useContext(IS_smScreen());
  const [switchValue, setSwitchValue] = useState(false);
  const [theme, setTheme] = useContext(DarkModeContext);

  useEffect(() => {
    if (switchValue) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [switchValue]);

  // useEffect(() => {
  //   console.log("theme is " + theme);
  // }, [theme]);

  const handleSwitchClick = () => {
    setSwitchValue(!switchValue);
  };

  return (
    <AppBar className="static-appbar">
      <Toolbar>
        <Switch
          onClick={handleSwitchClick}
          className="switch-class"
          icon={<LightModeIcon sx={{ fontSize: "20px", color: "#fff" }} />}
          checkedIcon={
            <DarkModeRoundedIcon sx={{ fontSize: "20px", color: "#fff" }} />
          }
        />
        <Grid container>
          <Grid item className="menu-option-container">
            {isSmScreen && (
              <>
                <Button>
                  <Typography
                    variant="h6"
                    component="div"
                    className="appbar-typography"
                  >
                    خانه
                  </Typography>
                </Button>
                <Button>
                  <Typography
                    variant="h6"
                    component="div"
                    className="appbar-typography"
                  >
                    درباره ویستو پلاس
                  </Typography>
                </Button>
                <Button>
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
