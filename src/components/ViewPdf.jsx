import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

ViewPdf.propTypes = {
  getSelectedPage: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
};

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function ViewPdf({ getSelectedPage, fileName }) {
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState();
  const [selectedPages, setSelectedPages] = useState([]);

  useEffect(() => {
    const cookieExist = Cookies.get("token");
    if (!cookieExist) {
      navigate("/login");
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const toggleSelection = (page) => {
    const isSelected = selectedPages.includes(page);
    if (isSelected) {
      setSelectedPages(
        selectedPages.filter((selectedPage) => selectedPage !== page)
      );
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };

  const handleClick = () => {
    if (selectedPages.length === 0) {
      toast.error("Select atleast one page to continue")
    } else {
      getSelectedPage(selectedPages);
      navigate("/download-pdf");
    }
  };

  return (
    <>
      <Toaster />
      <div style={{ overflowX: "hidden" }}>
        <Document
          file={`http://localhost:4000/uploads/${fileName}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <div className="row mt-3">
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="col-md-4 mb-3">
                <div
                  className={`card ${
                    selectedPages.includes(index + 1) ? "border-primary" : ""
                  }`}
                >
                  <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                    <Page
                      pageNumber={index + 1}
                      onClick={() => toggleSelection(index + 1)}
                      width={200}
                      scale={2}
                    />
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(index + 1)}
                      onChange={() => toggleSelection(index + 1)}
                      className="mt-2"
                    />
                    <p className="card-text mt-2">Page {index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Document>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "10px",
            background: "#f8f9fa",
            border: "black solid 1px",
              zIndex: "999"
          }}
        >
          <p>Selected Pages: {selectedPages.join(", ")}</p>
          <div className="d-flex justify-content-center">
            <button onClick={handleClick} className="btn btn-primary">
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPdf;
