import './App.css';
import Pdf from "./components/Pdfscreen/pdf"
import PdfScreen1 from './components/Pdfscreen/pdf1.jsx';
import Dashboard from "./components/main/index.jsx"

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Pdf />
      <PdfScreen1 />
    </div>
  );
}

export default App;
