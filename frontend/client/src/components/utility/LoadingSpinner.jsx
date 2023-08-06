import ClipLoader from "react-spinners/ClipLoader";
import "../../style/loading.css";

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <ClipLoader color="aliceblue" size={50} />
    </div>
  );
}

export default LoadingSpinner;
