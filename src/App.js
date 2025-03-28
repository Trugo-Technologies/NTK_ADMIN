import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Pdf from "./components/Pdfscreen/pdf"
import PdfScreen1 from './components/Pdfscreen/pdf1.jsx';
import Lists from "./components/main/Lists.jsx";
import State from "./components/main/State.jsx";
import Sidebar from "./components/main/sidebar.jsx";

function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="content-area">
        <Routes>
          <Route path="/" element={<State />} />
          <Route path="/pdf" element={<Pdf />} />
          <Route path="/pdf1" element={<PdfScreen1 />} />
          <Route path="/lists" element={<Lists />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
