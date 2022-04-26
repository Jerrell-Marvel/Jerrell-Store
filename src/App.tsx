import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App font-primary">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" />
        <Route path="/products" />
        <Route path="/cart" />
      </Routes>
    </div>
  );
}

export default App;
