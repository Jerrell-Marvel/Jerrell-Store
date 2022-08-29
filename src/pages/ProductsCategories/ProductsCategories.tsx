import { useParams } from "react-router-dom";
import ProductsNav from "../../components/ProductsNav/ProductsNav";
import ShowProducts from "../../components/ShowProducts/ShowProducts";
import SortProductsDropdown from "../../components/Dropdown/SortProductsDropdown";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";

function ProductsCategories() {
  const { category = "all" } = useParams();
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const onChangeSortHandler = (value: string) => {
    setSort(value);
  };
  const onClickPageHandler = (value: number) => {
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
