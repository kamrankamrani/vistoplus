import {
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoDialog from "./InfoDialog";
import "../Styles/OnlineConsult/online-consult.css";
import { useEffect, useState } from "react";
import DotsProgress from "./OnlineConsult/DotsProgress";
import FormState, {
  OnlineConsultFromDateType,
} from "./OnlineConsult/FormState";
const MAX_FROM_STEP = 4; //start from zero

export default function OnlineConsult() {
  const [opendialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({} as OnlineConsultFromDateType);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    FormState.maxState = MAX_FROM_STEP;
    setFormData(FormState.renderData());
    setOpenDialog(true);
  }, []);

  const handleFormStepBack = () => {
    FormState.updateStateDown();
    setFormData(FormState.renderData());
  };

  const handleAnswerClick = (input: "up" | "down") => {
    if (input === "up" || input === "down") {
      FormState.updateStateUp();
      setFormData(FormState.renderData());
    } else {
      typeof input;
    }
  };

  return (
    <Grid container className="online-consult-container">
      <Grid item xs={12} md={6} className="online-consult-paper-container">
        <Paper className="form-paper">
          <Grid container>
            <Grid item xs={12} className="form-header">
              <Typography className="header-text" variant="body1">
                مشاور آنلاین!
              </Typography>
              <Grid item className="icon-button-container">
                {FormState.state !== 0 && (
                  <IconButton
                    size="small"
                    onClick={handleFormStepBack}
                    className="icon-button"
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} className="form-body-container">
              <Typography className="header-text" variant="body2">
                {formData.body}
              </Typography>
            </Grid>
            <Grid item xs={12} className="more-info-container">
              <Chip
                disabled={formData.isMoreInfoDisable}
                onClick={handleOpenDialog}
                className="chip"
                label={
                  <Typography variant="caption" className="chip-text">
                    اطلاعات بیشتر
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12} className="form-answer-container">
              <Button
                onClick={() => handleAnswerClick("up")}
                className="form-button"
              >
                <Typography className="button-text">
                  {formData.upButtonText}
                </Typography>
              </Button>
              <Button
                onClick={() => handleAnswerClick("down")}
                className="form-button"
              >
                <Typography className="button-text">
                  {formData.downButtonText}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <DotsProgress number={MAX_FROM_STEP + 1} index={formData.state} />
      </Grid>
      <InfoDialog
        body={formData.moreInfoBody}
        open={opendialog}
        setOpen={setOpenDialog}
      />
    </Grid>
  );
}
