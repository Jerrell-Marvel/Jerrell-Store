import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import ProductsCategories from "./pages/ProductsCategories/ProductsCategories";
import ProductDetails from "./pages/ProductsDetails/ProductsDetails";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Search from "./pages/Search/Search";
import axios from "axios";
import { useEffect } from "react";
import Pagination from "./components/Pagination/Pagination2";
import TestComponent from "./TestComponent";
import ShowProducts from "./components/ShowProducts/ShowProducts";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import useApi2 from "./customHooks/useApi2";
import { useFetch } from "./customHooks/useFetch2";
import Profile from "./pages/Profile/Profile";
import Wrapper from "./components/Wrapper";

const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   axios.defaults.withCredentials = true;
  // }, []);
  return (
    <div className="App font-primary">
      <QueryClientProvider client={queryClient}>
        {/* <WishlistProvider> */}
        {/* <Wrapper> */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* <Route path="/products" element={<Products />}></Route> */}
          <Route path="/product-category/:category" element={<ProductsCategories />} />
          <Route path="/product/:itemId" element={<ProductDetails />}></Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound statusCode={404} message="Page not found or no longer exist" statusText="Page not found" />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/page" element={<Pagination />} />
        </Routes>
        <Footer />
        {/* </Wrapper> */}

        {/* <TestComponent /> */}

        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>

      {/* </WishlistProvider> */}
    </div>
  );
}

export default App;
