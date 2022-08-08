import { useSearchParams } from "react-router-dom";
import ProductsNav from "../../components/ProductsNav/ProductsNav";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import Button from "../../components/Button/Button";
import { NavLink } from "react-router-dom";
import SortProductsDropdown from "../../components/Dropdown/SortProductsDropdown";
import { useState } from "react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState("newest");
  const onChangeHandler = (value: string) => {
    setSort(value);
  };
  return (
    <>
      <div className="bg-slate-100 px-6 py-10">
        <div className="flex flex-col items-center justify-between">
          {/* <h2 className="mb-2 text-4xl font-medium capitalize">{category}</h2> */}
          <SortProductsDropdown onChange={onChangeHandler} />
        </div>
        <ShowProducts url={`http://localhost:5000/api/v1/products/?sort=${sort}&search=${searchParams.get("q")}`} />
        <NavLink to={`/products/all`} className="mx-auto block w-fit">
          <Button>See All Products</Button>
        </NavLink>
      </div>
    </>
  );
}
