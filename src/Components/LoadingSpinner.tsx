import "../Styles/LoadingSpinner/loading-spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <p className="spinner-text">در حال دریافت </p>
      <div className="spinner-dots-container">
        <div className="spinner-div"></div>
        <div className="spinner-div"></div>
        <div className="spinner-div"></div>
      </div>
    </div>
  );
}
