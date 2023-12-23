import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UploadForm from "./components/UploadForm";
import ViewPdf from "./components/ViewPdf";
import DownloadPdf from "./components/DownloadPdf";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadedPdf from "./components/UploadedPdf";
function App() {
  const [selectedPage, setSelectedPage] = useState([]);
  const [fileName, setFileName] = useState("")

  const getFileName = (name) => {
    console.log("filename;", name);
    setFileName(name)
  }

  const getSelectedPage = (pages) => {
    setSelectedPage(pages);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/upload-pdf"
          element={<UploadForm getFileName={getFileName} />}
        />
        <Route
          path="/view-pdf"
          element={
            <ViewPdf getSelectedPage={getSelectedPage} fileName={fileName} />
          }
        />
        <Route
          path="/download-pdf"
          element={
            <DownloadPdf selectedPage={selectedPage} fileName={fileName} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/uploaded-pdf' element = {<UploadedPdf/>}/>
      </Routes>
    </Router>
  );
}

export default App;