import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function UploadedPdf() {
  const navigate = useNavigate();
  const cookieExist = Cookies.get("token");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileLengeth, setFileLengeth] = useState()

  if (!cookieExist) {
    navigate("/login");
  }


  useEffect(() => {
    setLoading(true);
    axios
      .get("https://vidyalai-task-api.onrender.com/uploaded-pdf", {
        headers: {
          token: cookieExist,
        },
      })
      .then((response) => {
        console.log(response.data.files);
        setPdfFiles(response.data.files);
        setFileLengeth(response.data.files.length);
      })
      .catch((error) => {
        console.error("Error fetching PDF files:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cookieExist]);

  return (
    <>
      {fileLengeth === 0 ? (
        <div>
        <div>
          No file uploaded!
        </div>
          <div className="container-fluid">
            <div className="row  mt-2">
              <div className="col-md-4">
                <div className="card mt-4" onClick={()=>{navigate("/upload-pdf");}}>
                  <div className="card-body">
                    <h5 className="card-title">Upload New PDF</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row mt-2">
            {pdfFiles.map((file, index) => (
              <div className="col-md-2" key={index}>
                <div
                  className="card mt-4"
                  style={{
                    backgroundSize: "cover",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{file}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{ display: "inline-block" }}
            wrapperClass="mx-auto"
          />
        </div>
      )}
    </>
  );
}

export default UploadedPdf;
