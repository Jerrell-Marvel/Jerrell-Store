import { useEffect, useState, useRef, useCallback } from "react";
import { useFetch } from "../../customHooks/useFetch";
import { Link, NavLink } from "react-router-dom";
import Button from "../../components/Button/Button";

type ProductsType = {
  success: boolean;
  products: {
    _id: string;
    name: string;
    weight: string;
    category: string;
    stock: string;
    description: string;
    price: string;
    createdAt: string;
    updatedAt: string;
    image: string;
  }[];
  count: number;
  totalCount: number;
};

type ShowProductsProps = {
  url: string;
  setPageCount?: (count: number) => void;
};

function ShowProducts({ url, setPageCount }: ShowProductsProps) {
  const [datas, setDatas] = useState<ProductsType | undefined>(undefined);
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [response, initialLoading, error] = useFetch<ProductsType>({
    url: url,
    pageNumber: pageNumber,
  });

  useEffect(() => {
    if (typeof response !== "undefined") {
      setDatas(response);
      if (typeof setPageCount !== "undefined") {
        setPageCount(response.totalCount);
      }
    }

    if (!error.success) {
      if (error.code === "ERR_NETWORK") {
        setFetchErrorMessage("Something went wrong please try again later");
      }
    }
  }, [response, initialLoading, error]);

  return (
    <>
      {initialLoading ? (
        <ul className="grid w-full grid-cols-card-grid gap-6 py-10">
          {[...Array(10)].map((element, index) => {
            return (
              <li className="flex h-96 flex-col gap-4 rounded-xl bg-white p-4 transition-all duration-300" key={index}>
                <div className="flex-1 animate-loading bg-slate-200"></div>
                <div className="flex flex-[5] animate-loading items-center justify-center bg-slate-200 px-6 text-center">{fetchErrorMessage}</div>
                <div className="flex-[2] animate-loading bg-slate-200"></div>
              </li>
            );
          })}
        </ul>
      ) : (
        // grid w-full grid-cols-card-grid gap-6 py-10
        // <ul className={`${datas && datas?.products.length < 4 ? "flex flex-wrap" : "grid grid-cols-card-grid"} w-full gap-6 py-10`}>
        <ul className="grid w-full grid-cols-card-grid gap-6 py-10">
          {datas && datas.products.length < 1 ? (
            <div className="text-center">
              <span>No products found</span>
              <NavLink to={`/product-category/all`} className="mx-auto mt-8 block w-fit">
                <Button>See All Products</Button>
              </NavLink>
            </div>
          ) : (
            datas?.products.map((product, index) => {
              if (datas.products.length === index + 1) {
                return (
                  <Link to={`/product/${product._id}`} key={product._id}>
                    <li className={`flex h-full flex-col gap-4 rounded-xl bg-white p-4 transition-transform duration-300 hover:scale-105`}>
                      <h3 className="text-xl font-medium">{product.name}</h3>
                      <div>
                        <img src={`/images/${product.image}`} className="w-full" alt="temporary-alt"></img>
                      </div>
                      <div className="">{product.description}</div>
                    </li>
                  </Link>
                );
              }
              return (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <li className={`flex h-full flex-col gap-4 rounded-xl bg-white p-4 transition-transform duration-300 hover:scale-105`}>
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <div>
                      <img src={`/images/${product.image}`} className="w-full" alt="temporary-alt"></img>
                    </div>
                    <div className="">{product.description}</div>
                  </li>
                </Link>
              );
            })
          )}
        </ul>
      )}
    </>
  );
}

export default ShowProducts;
