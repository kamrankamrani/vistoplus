import ResponseOnlineConsultForm from "./ResonseForm";

export interface OnlineConsultFromDateType {
  body: string;
  isMoreInfoDisable: boolean;
  upButtonText: string;
  downButtonText: string;
  state: number;
  moreInfoBody?: string;
}

const FormState = {
  state: 0,
  maxState: 0,
  updateStateUp: function (): number {
    this.state++;
    if (this.state > this.maxState) return this.state--;
    else return this.state;
  },
  updateStateDown: function (): number {
    this.state--;
    if (this.state < 0) return this.state++;
    else return this.state;
  },
  renderData: function (): OnlineConsultFromDateType {
    const renderObj = {} as OnlineConsultFromDateType;
    switch (this.state) {
      case 0:
        renderObj.body = "آیا شما دارای زیر ساخت آبیاری قطره ای میباشید؟";
        renderObj.upButtonText = "بله، آبیاری قطره ای دارم";
        renderObj.downButtonText = "خیر";
        renderObj.moreInfoBody =
          "منظور از زیر ساخت قطره ای، لوله کشی آبیاری قطره ای میباشد. آیا در حال حاضر فضای سبز شما لوله کشی شده است؟";
        renderObj.isMoreInfoDisable = false;
        renderObj.state = this.state;
        break;
      case 1:
        renderObj.body = "آبیاری فضای سبز شما به چه صورت انجام میگیرد؟";
        renderObj.upButtonText = "پمپ آب ( کفکش، دیواری و...)";
        renderObj.downButtonText = "آب شهری / منبع آب";
        renderObj.moreInfoBody = "";
        renderObj.isMoreInfoDisable = false;
        renderObj.state = this.state;
        break;
      case 2:
        if (ResponseOnlineConsultForm.waterSource.source === "pump") {
          renderObj.body = "پمپ آب شما تک فاز است یا سه فاز؟";
          renderObj.upButtonText = "تک فاز";
          renderObj.downButtonText = "سه فاز";
          renderObj.moreInfoBody = "";
          renderObj.isMoreInfoDisable = true;
          renderObj.state = this.state;
        } else if (ResponseOnlineConsultForm.waterSource.source === "pipe") {
          renderObj.body = "آیا محل مورد نیاز برق دارد یا خیر؟";
          renderObj.upButtonText = "برق دارد";
          renderObj.downButtonText = "برق ندارد";
          renderObj.moreInfoBody = "";
          renderObj.isMoreInfoDisable = true;
          renderObj.state = this.state;
        }
        break;
      case 3:
        renderObj.body = "آیا در محل خود آنتن سیم کارت وجود دارد؟";
        renderObj.upButtonText = "بله، آنتن در حد پیامک و تماس دارد.";
        renderObj.downButtonText = "خیر آنتن ندارد!";
        renderObj.moreInfoBody =
          "نیازی به آنتن اینترنت نیست. اگر حتی یکی از اپراتور ها آنتن داشته باشد، گزینه 'بله' را انتخاب کنید.";
        renderObj.isMoreInfoDisable = false;
        renderObj.state = this.state;
        break;
      default:
        renderObj.body = "";
        renderObj.upButtonText = "";
        renderObj.downButtonText = "";
        renderObj.isMoreInfoDisable = true;
        renderObj.state = this.state;
        break;
    }
    return renderObj;
  },
};

export default FormState;
