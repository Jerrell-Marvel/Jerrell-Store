import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App font-primary overflow-hidden">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" />
        <Route path="/products" />
        <Route path="/cart" />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
