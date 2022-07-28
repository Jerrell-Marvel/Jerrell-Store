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
import ShowProducts from "./components/ShowProducts/ShowProducts";
// import Wishlist from "./pages/Wishlist/Wishlist";
// import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <div className="App font-primary">
      {/* <WishlistProvider> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/products" element={<Products />}></Route>
        {/* <Route path="/products/:category" element={<ProductsCategories />}></Route> */}
        <Route path="/products/:itemId" element={<ProductDetails />}></Route>

        <Route path="/cart" />

        {/* <Route path="/wishlist" element={<Wishlist />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound statusCode={404} message="Page not found or no longer exist" />} />
      </Routes>

      <Footer />
      {/* </WishlistProvider> */}
    </div>
  );
}

export default App;
