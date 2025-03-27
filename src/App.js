import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pdf from "./components/Pdfscreen/pdf"
import PdfScreen1 from './components/Pdfscreen/pdf1.jsx';
import Sidebar from "./components/main/index.jsx"

function App() {
  return (
    <div className="flex">
      <Sidebar />
      
      <Routes>
      <Route path="/pdf" element={<Pdf />} />
      <Route path="/pdf1" element={<PdfScreen1 />} />
      </Routes>
    </div>
  );
}

export default App;
