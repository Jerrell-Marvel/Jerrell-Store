import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Products from "./pages/Products/Products";
import ProductsCategories from "./pages/ProductsCategories/ProductsCategories";
import ProductDetails from "./pages/ProductsDetails/ProductsDetails";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="App font-primary">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/products" element={<Products />}></Route>
        <Route
          path="/products/:category"
          element={<ProductsCategories />}
        ></Route>
        <Route
          path="/products/:category/:itemId"
          element={<ProductDetails />}
        ></Route>

        <Route path="/cart" />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
