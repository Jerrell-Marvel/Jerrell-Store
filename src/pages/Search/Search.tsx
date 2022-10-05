import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import SortProductsDropdown from "../../components/Dropdown/SortProductsDropdown";
import { useState, useEffect } from "react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const sortValue = searchParams.get("sort");
    const searchValue = searchParams.get("q");
    // setSort(sortValue);
    // console.log(sort, searchValue);
    if (!sortValue) {
      navigate(location.pathname + `?q=${searchValue}&sort=${sortValue || "newest"}`);
    }
    // navigate(location.pathname + `?q=${searchValue}&sort=${sortValue}`);
  }, []);

  console.log("rerendered");

  const onChangeSortHandler = (value: string) => {
    console.log(value);
    const searchValue = searchParams.get("q");
    navigate(location.pathname + `?q=${searchValue}&sort=${value}`);
    // setSort(value);
  };
  return (
    <>
      <div className="bg-slate-200 pt-20 pb-8">
        <div className="bg-slate-100 px-6 py-10">
          <div className="flex flex-col items-center justify-between">
            <span className="mb-4">Showing results for {searchParams.get("q")}</span>
            <SortProductsDropdown onChange={onChangeSortHandler} />
          </div>
          <ShowProducts url={`/api/v1/products/?sort=${searchParams.get("sort")}&search=${searchParams.get("q")}`} />
        </div>
      </div>
    </>
  );
}
