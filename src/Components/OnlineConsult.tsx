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
import { Fragment, useEffect, useRef, useState } from "react";
import DotsProgress from "./OnlineConsult/DotsProgress";
import FormState, {
  OnlineConsultFromDateType,
} from "./OnlineConsult/FormState";
import ResponseOnlineConsultForm, {
  returnResultData,
} from "./OnlineConsult/ResonseForm";
import ConsultResult from "./OnlineConsult/ConsultResult";
const MAX_FROM_STEP = 4; //start from zero

export default function OnlineConsult() {
  const [opendialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({} as OnlineConsultFromDateType);
  const [hideResult, setHideResult] = useState(true);
  const [formResult, setFromResult] = useState({} as returnResultData);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    FormState.maxState = MAX_FROM_STEP;
    setFormData(FormState.renderData());
  }, []);

  const handleFormStepBack = () => {
    FormState.updateStateDown();
    setFormData(FormState.renderData());
  };

  const handleResultConsultClick = () => {
    setHideResult(false);
    // console.log("result ", ResponseOnlineConsultForm.computeResult());
    setFromResult(ResponseOnlineConsultForm.computeResult());
  };

  const handleAnswerClick = (input: "up" | "down") => {
    switch (FormState.state) {
      case 0:
        if (input === "up") ResponseOnlineConsultForm.isPiped = true;
        else if (input === "down") ResponseOnlineConsultForm.isPiped = false;
        break;
      case 1:
        if (input === "up")
          ResponseOnlineConsultForm.waterSource.source = "pump";
        else if (input === "down")
          ResponseOnlineConsultForm.waterSource.source = "pipe";
        break;
      case 2:
        if (input === "up") {
          if (ResponseOnlineConsultForm.waterSource.source === "pump") {
            ResponseOnlineConsultForm.waterSource.threeOrOnephase = "one";
          } else if (ResponseOnlineConsultForm.waterSource.source === "pipe") {
            ResponseOnlineConsultForm.isPower = true;
          }
        } else if (input === "down") {
          if (ResponseOnlineConsultForm.waterSource.source === "pump") {
            ResponseOnlineConsultForm.waterSource.threeOrOnephase = "three";
          } else if (ResponseOnlineConsultForm.waterSource.source === "pipe") {
            ResponseOnlineConsultForm.isPower = false;
          }
        }
        break;
      case 3:
        if (input === "up") ResponseOnlineConsultForm.isAntenn = true;
        else if (input === "down") ResponseOnlineConsultForm.isAntenn = false;
        break;
      default:
        break;
    }
    FormState.updateStateUp();
    setFormData(FormState.renderData());
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
                {FormState.state !== 0 && FormState.state !== MAX_FROM_STEP && (
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
              {formData.state !== MAX_FROM_STEP ? (
                <Typography className="header-text" variant="body2">
                  {typeof formData.body === "string" ? formData.body : ""}
                </Typography>
              ) : (
                <Grid item>
                  <Button
                    disabled={!hideResult}
                    onClick={handleResultConsultClick}
                    className="form-button"
                  >
                    <Typography className="button-text">
                      مشاهده نتیجه مشاوره!
                    </Typography>
                  </Button>
                </Grid>
              )}
            </Grid>
            {!hideResult ? (
              <ConsultResult
                mainBody={formResult.mainBody}
                extraOptions={formResult.extraOptions}
              />
            ) : null}
            {formData.state !== MAX_FROM_STEP ? (
              <Fragment>
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
              </Fragment>
            ) : null}
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
