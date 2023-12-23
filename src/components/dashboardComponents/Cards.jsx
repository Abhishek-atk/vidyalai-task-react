import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Cards() {
  const navigate = useNavigate();
  const cookieExist = Cookies.get("token");
  const handleUploadNavigate = () => {
    if (cookieExist) {
      navigate("/upload-pdf");
    } else {
      navigate("/login");
    }
  };
  const handleUploadedNavigate = () => {
    if (cookieExist) {
      navigate("/uploaded-pdf");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row  mt-2">
          <div className="col-md-4">
            <div className="card mt-4" onClick={handleUploadNavigate}>
              <div className="card-body">
                <h5 className="card-title">Upload New PDF</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card mt-4"
              onClick={handleUploadedNavigate}
            >
              <div className="card-body">
                <h5 className="card-title">Uploaded PDF</h5>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card  mt-4"
            >
              <div className="card-body">
                <h5 className="card-title">Downloaded PDF</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;