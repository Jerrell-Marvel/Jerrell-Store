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
    const page2 = searchParams.get("page") || "1";
    const sort2 = searchParams.get("sort") || "newest";
    console.log(page2, sort2);
    navigate(location.pathname + `?sort=${sort2}&page=${page2}`);
  }, []);

  const onChangeSortHandler = (value: string) => {
    console.log(value);
    navigate(location.pathname + `?sort=${value}`);
    setSort(value);
  };
  const onClickPageHandler = (value: number) => {
    navigate(location.pathname);
    setPage(value);
    window.scrollTo(0, 0);
  };
  const getTotalPage = (count: number) => {
    const totalPage = Math.ceil(count / 10);
    setPageCount(totalPage);
  };

  return (
    <>
      <ProductsNav />

      <div className="bg-slate-100 px-6 py-10">
        <div className="flex flex-col items-center justify-between">
          <h2 className="mb-2 text-4xl font-medium capitalize">{category}</h2>
          <SortProductsDropdown onChange={onChangeSortHandler} />
        </div>
        <ShowProducts url={`/api/v1/products/?sort=${sort}${category === "all" ? "" : `&category=${category}`}&page=${page}`} setPageCount={getTotalPage} />
        <Pagination pageCount={pageCount} onClick={onClickPageHandler} activePage={page} />
      </div>
    </>
  );
}

export default ProductsCategories;
