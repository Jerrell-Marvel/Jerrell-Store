import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ProductsNav from "../../components/ProductsNav/ProductsNav";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import SortProductsDropdown from "../../components/Dropdown/SortProductsDropdown";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";

function ProductsCategories() {
  const [searchParams] = useSearchParams();
  const { category = "all" } = useParams();
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let sortValue = searchParams.get("sort");
    let pageValue = Number(searchParams.get("page"));
    // setPage(pageValue);
    // setSort(sortValue);
    // console.log(page, sort);
    if (!sortValue || !pageValue) {
      navigate(location.pathname + `?sort=${sortValue || "newest"}&page=${pageValue || 1}`);
    }
  }, []);

  console.log(sort);

  const onChangeSortHandler = (value: string) => {
    console.log(value);
    navigate(location.pathname + `?sort=${value}&page=1`);
    // setSort(value);
    // setPage(1);
  };
  const onClickPageHandler = (pageValue: number, sortValue: string) => {
    navigate(location.pathname + `?sort=${searchParams.get("sort") || "newest"}&page=${pageValue}`);
    // setPage(pageValue);
    window.scrollTo(0, 0);
  };
  const getTotalPage = (count: number) => {
    const totalPage = Math.ceil(count / 10);
    setPageCount(totalPage);
  };

  console.log("rerendered");
  return (
    <>
      <ProductsNav />

      <div className="bg-slate-100 px-6 py-10">
        <div className="flex flex-col items-center justify-between">
          <h2 className="mb-2 text-4xl font-medium capitalize">{category}</h2>
          <SortProductsDropdown onChange={onChangeSortHandler} />
        </div>
        <ShowProducts url={`/api/v1/products/?sort=${searchParams.get("sort")}${category === "all" ? "" : `&category=${category}`}&page=${searchParams.get("page")}`} setPageCount={getTotalPage} />
        <Pagination pageCount={pageCount} onClick={onClickPageHandler} activePage={Number(searchParams.get("page")) || 1} sort={sort} />
      </div>
    </>
  );
}

export default ProductsCategories;
