interface ResponseConsultType {
  isPiped: boolean;
  waterSource: {
    source: "pump" | "pipe";
    threeOrOnephase?: "three" | "one";
  };
  isPower: boolean;
  isAntenn: boolean;
  computeResult: () => returnResultData;
}

interface resultOptionsType {
  digitalTimer: string;
  remoteController: string;
  batteryTimer: string;
  electricValve: string;
}

export interface returnResultData {
  mainBody: string;
  extraOptions: string[];
}

const resultOptions: resultOptionsType = {
  digitalTimer: "تایمر دیجیتال",
  remoteController: "مرکز کنترل از راه دور از طریق پیامک یا اینترنت",
  batteryTimer: "تایمر های مکانیکی یا دیجیتال باتری خور ( بصورت نصب روی لوله)",
  electricValve: "شیر برقی آب",
};

const ResponseOnlineConsultForm: ResponseConsultType = {
  isPiped: false,
  waterSource: { source: "pipe" },
  isPower: false,
  isAntenn: false,
  computeResult: function () {
    const returningData = {
      mainBody: "",
      extraOptions: [] as string[],
    } as returnResultData;
    let str_ = "";
    let textResult =
      "با توجه به انتخاب های شما، بهترین گزینه برای هوشمند سازی آبیاری فضای سبز خود، استفاده از ";
    if (this.waterSource.source === "pump") {
      if (!this.isAntenn) {
        textResult += resultOptions.digitalTimer;
      } else if (this.isAntenn) {
        textResult += resultOptions.remoteController;
      }
      if (this.waterSource.threeOrOnephase === "three") {
        str_ =
          "دقت کنید، چون پمپ شما سه فاز میباشد، پس حتما از قبل کنتاکتور در محل نصب شده است. شما میتوانید از دستگاه های کنترل اتوماتیک با رله های جریان پایین نیزاستفاده کنید. در این صورت باید دستگاه کنترل را به فرمان کنتاکتور متصل کنید.";
        returningData.extraOptions.push(str_);
      } else if (this.waterSource.threeOrOnephase === "one") {
        str_ =
          "به دلیل اینکه پمپ شما تک فاز میباشد، به آمپر پمپ خود دقت کنید! دستگاهی که برای پمپ خود تهیه میکند، باید ظرفیت آمپر بیشتری از پمپ شما داشته باشد. مثلا از دستگاهی که دارای رله 10 آمپری میباشد نمیتوان برای پمپ 15 آمپری استفاده کرد! برای حل این مشکل نیاز به رله یا کنتاکتور اضافه خواهید داشت!";
        returningData.extraOptions.push(str_);
      }
    }
    if (this.waterSource.source === "pipe") {
      if (this.isPower) {
        if (this.isAntenn) {
          textResult +=
            resultOptions.remoteController +
            " و " +
            resultOptions.electricValve;
        } else if (!this.isAntenn) {
          textResult += resultOptions.digitalTimer;
        }
        str_ =
          "دقت داشته باشید چون در این حالت از آب شهری یا پمپ استفاده میکنید نیاز به شیر برقی خواهید داشت. شیر برقی کار قطع و وصل آب را انجام میدهد. شما باید شیر برقی را باید به مرکز کنترل خود متصل کنید.";
        returningData.extraOptions.push(str_);
      } else if (!this.isAntenn) {
        textResult += resultOptions.batteryTimer;
        str_ =
          "توجه کنید این مدل تایمر همراه شیر برقی و خود تایمر میباشد. شما باید این تایمر را به لوله آب متصلکیند.";
        returningData.extraOptions.push(str_);
      }
    }
    textResult += " میباشد.";
    returningData.mainBody = textResult;

    return returningData;
  },
};

export default ResponseOnlineConsultForm;
