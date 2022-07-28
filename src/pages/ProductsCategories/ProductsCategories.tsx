import { useParams } from "react-router-dom";
import ProductsNav from "../../components/ProductsNav/ProductsNav";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import Button from "../../components/Button/Button";
import { NavLink } from "react-router-dom";

function ProductsCategories() {
  const { category = "all" } = useParams();
  return (
    <>
      <ProductsNav />

      <div className="bg-slate-100 px-6 py-10">
        <h2 className="text-4xl font-medium capitalize">{category}</h2>
        <ShowProducts url="http://localhost:5000/api/v1/products" />
        <NavLink to={`/products/all`} className="mx-auto block w-fit">
          <Button>See All Products</Button>
        </NavLink>
      </div>
    </>
  );
}

export default ProductsCategories;
