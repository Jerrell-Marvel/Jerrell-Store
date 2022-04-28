import { useParams } from "react-router-dom";
import ProductsNav from "../../components/ProductsNav/ProductsNav";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import Button from "../../components/Button/Button";
import { NavLink } from "react-router-dom";

function ProductsCategories() {
  const { category = "all" } = useParams();
  console.log(category);
  return (
    <>
      <ProductsNav />

      <div className="px-6 bg-slate-100 py-10">
        <h2 className="text-4xl font-medium capitalize">{category}</h2>
        <ShowProducts amount={10} url="https://api.spaceflightnewsapi.net/v3/articles" title="Category 3" />
        <NavLink to={`/products/all`} className="mx-auto block w-fit">
          <Button>See All Products</Button>
        </NavLink>
      </div>
    </>
  );
}

export default ProductsCategories;
