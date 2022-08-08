import {
  Button,
  Dialog,
  Grid,
  Slide,
  SlideProps,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../Styles/InfoDialog/info-dialog.css";
import DarkModeContext from "./DarkModeContext";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  body?: string;
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoDialog(IProps: IProps) {
  const [open, setOpen] = useState(false);
  const [theme] = useContext(DarkModeContext);

  useEffect(() => {
    if (IProps.open) {
      setOpen(IProps.open);
    }
  }, [IProps]);

  const handleClose = () => {
    setOpen(false);
    IProps.setOpen(false);
  };

  return (
    <Dialog
      transitionDuration={400}
      fullWidth={true}
      maxWidth={false}
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      classes={{
        paper: "info-dialog-paper",
        container: "info-dialog-main-container",
      }}
    >
      <Grid
        container
        className={
          "info-dialog-container " +
          (theme === "dark" ? "dark-info-dialog-paper" : "")
        }
      >
        <Grid item xs={12} className="info-dialog-body-container">
          <Typography className="info-dialog-body-text">
            {IProps.body}
          </Typography>
        </Grid>
        <Grid item xs={12} className="info-dialog-button-container">
          <Button
            onClick={handleClose}
            className={
              "info-dialog-button " +
              (theme === "dark" ? "dark-info-dialog-button" : "")
            }
          >
            <Typography className="info-dialog-button-text">
              متوجه شدم
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
