export interface OnlineConsultFromDateType {
    body: string,
    isMoreInfoDisable: boolean,
    upButtonText: string,
    downButtonText: string,
    state: number,
    moreInfoBody?: string,
}

const FormState = {
    state: 0,
    maxState: 0,
    updateStateUp: function(): number {
        this.state++;
        if(this.state > this.maxState) return this.state--;
        else return this.state;
    },
    updateStateDown: function():number{
        this.state--;
        if(this.state < 0) return this.state++;
        else return this.state;
    },
    renderData: function(): OnlineConsultFromDateType {
        const renderObj = {} as OnlineConsultFromDateType;
        switch (this.state) {
            case 0:
                renderObj.body = "آیا شما دارای زیر ساخت آبیاری قطره ای میباشید؟";
                renderObj.upButtonText = "بله، آبیاری قطره ای دارم";
                renderObj.downButtonText = "خیر";
                renderObj.moreInfoBody = "منظور از زیر ساخت قطره ای، لوله کشی آبیاری قطره ای میباشد. آیا در حال حاضر فضای سبز شما لوله کشی شده است؟"
                renderObj.isMoreInfoDisable = false;
                renderObj.state = this.state;
                break;
            default:
                renderObj.body = "خطای داخلی! بعدا تلاش کنید.";
                renderObj.upButtonText = "خطای داخلی";
                renderObj.downButtonText = "خطای داخلی";
                renderObj.isMoreInfoDisable = false;
                renderObj.state = this.state;
                break;
        }
        return renderObj;
    }
}

export default FormState;