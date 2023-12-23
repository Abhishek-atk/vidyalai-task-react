import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import { ProgressBar } from "react-loader-spinner";
UploadForm.propTypes = {
  getFileName: PropTypes.func.isRequired,
};
function UploadForm({ getFileName }) {
  const cookieExist = Cookies.get("token");
  useEffect(() => {
    if (!cookieExist) {
      navigate("/login");
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await axios
          .post("https://vidyalai-task-api.onrender.com/upload", formData, {
            headers: {
              token: cookieExist,
            },
          })
          .finally(() => {
            setLoading(false);
          });
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          console.log("File uploaded successfully!");
          getFileName(response.data.fileName);
          navigate("/view-pdf");
        } else {
          toast.error("File upload failed.");
        }
      } catch (error) {
        toast.error("Error during file upload");
        console.error("Error during file upload:", error);
      }
    } else {
      toast.error("Please select a file before submitting.");
    }
    setLoading(false);

  };

  return (
    <>
      <Toaster />
      {loading && (
        <div className="text-center">
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg rounded-lg bg-light rounded">
          <h2 className="mb-4 text-center text-primary">Uploade your pdf</h2>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="fileInput" className="font-weight-bold m-2">
                Choose File:
              </label>
              <input
                type="file"
                className="form-control-file"
                id="fileInput"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Upload File
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadForm;
