import { Document, Page, pdfjs } from "react-pdf";
import jsPDF from "jspdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import html2canvas from "html2canvas";
import PropTypes from "prop-types";

DownloadPdf.propTypes = {
  selectedPage: PropTypes.array.isRequired,
  fileName: PropTypes.string.isRequired,
};

function DownloadPdf({ selectedPage, fileName }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    console.log(numPages);
  }
  const handleDownload = () => {
    const input = document.getElementById("pdf");
    const rect = input.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    html2canvas(input, {
      canvas: canvas,
      dpi: window.devicePixelRatio * 200,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "px", [width, height]);
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(fileName);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div id="pdf">
        <Document
          file={`https://vidyalai-task-api.onrender.com/uploads/${fileName}`}
          onLoadSuccess={onDocumentLoadSuccess}
          style={{
            margin: "auto",
          }}
        >
          {selectedPage.map((pageNumber) => (
            <div
              key={`page_${pageNumber}`}
              id={`react-pdf-page-${pageNumber}`}
              style={{
                border: "1px solid #000",
                marginTop: "0px",
                padding: "0px",
              }}
            >
              <Page pageNumber={pageNumber} scale={1.5} />
            </div>
          ))}
        </Document>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "10px",
          background: "#f8f9fa",
          border: "black solid 1px",
          display: "flex",
        }}
      >
        <button className="btn btn-primary" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

export default DownloadPdf;
