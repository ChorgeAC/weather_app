import { Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import CountryDetail from "./Components/CountryDetail";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/countrydetail" element={<CountryDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
