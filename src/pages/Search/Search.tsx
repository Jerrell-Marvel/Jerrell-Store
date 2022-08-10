import { useSearchParams } from "react-router-dom";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
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
      <div className="bg-slate-200 pt-20 pb-8">
        <div className="bg-slate-100 px-6 py-10">
          <div className="flex flex-col items-center justify-between">
            <span className="mb-4">Showing results for {searchParams.get("q")}</span>
            <SortProductsDropdown onChange={onChangeHandler} />
          </div>
          <ShowProducts url={`/api/v1/products/?sort=${sort}&search=${searchParams.get("q")}`} />
        </div>
      </div>
    </>
  );
}
