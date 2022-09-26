import "../Styles/LoadingSpinner/loading-spinner.css";

interface Iprops {
  isShowText?: boolean;
}

export default function LoadingSpinner(props: Iprops) {
  let showtext = false;
  if (props.isShowText === undefined) {
    showtext = false;
  } else if (props.isShowText) {
    showtext = true;
  } else if (!props.isShowText) {
    showtext = false;
  }
  return (
    <div className="spinner-container">
      {showtext ? <p className="spinner-text">در حال دریافت </p> : null}
      <div className="spinner-dots-container">
        <div className="spinner-div"></div>
        <div className="spinner-div"></div>
        <div className="spinner-div"></div>
      </div>
    </div>
  );
}
