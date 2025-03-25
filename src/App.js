import logo from './logo.svg';
import './App.css';
import Pdf from "./components/Pdfscreen/pdf"
import Dashboard from "./components/main/index.jsx"

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Pdf />
    </div>
  );
}

export default App;
