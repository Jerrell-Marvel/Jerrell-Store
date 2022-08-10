import ProductsNav from "../../components/ProductsNav/ProductsNav";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import { NavLink } from "react-router-dom";
import Button from "../../components/Button/Button";

function Products() {
  return (
    <div>
      <ProductsNav />
      <div className="bg-slate-100 px-6 py-10">
        <h2 className="text-4xl font-medium">Popular Products</h2>
        <ShowProducts url="/api/v1/products" />
        <NavLink to={`/products/all`} className="mx-auto block w-fit">
          <Button>See All Products</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default Products;
