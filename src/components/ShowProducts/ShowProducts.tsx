import { useEffect, useState } from "react";
import { useFetch } from "../../customHooks/useFetch2";
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
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError, error } = useFetch<ProductsType>({
    url: url,
    queryKey: ["show-products", url],
    options: {
      onSuccess: (data) => {
        if (typeof setPageCount !== "undefined") {
          setPageCount(data.totalCount);
        }
      },
      onError: () => {
        setFetchErrorMessage("Something went wrong please try again later");
      },
    },
  });

  // useEffect(() => {
  //   if (typeof data !== "undefined") {
  //     if (typeof setPageCount !== "undefined") {
  //       setPageCount(data.totalCount);
  //     }
  //   }

  //   if (isError) {
  //     // if (error.code === "ERR_NETWORK") {
  //     //   setFetchErrorMessage("Something went wrong please try again later");
  //     // }
  //     setFetchErrorMessage("Something went wrong please try again later");
  //   }
  // }, [data, isLoading, error, isError]);

  if (isLoading || isError) {
    return (
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
    );
  }

  return (
    <>
      <ul className="grid w-full grid-cols-card-grid gap-6 py-10">
        {data && data.products.length < 1 ? (
          <div className="text-center">
            <span>No products found</span>
            <NavLink to={`/product-category/all`} className="mx-auto mt-8 block w-fit">
              <Button>See All Products</Button>
            </NavLink>
          </div>
        ) : (
          data?.products.map((product, index) => {
            return (
              <Link to={`/product/${product._id}`} key={product._id}>
                <li className={`flex h-full flex-col gap-4 rounded-xl bg-white p-4 transition-transform duration-300 hover:scale-105`}>
                  <h3 className="text-xl font-medium">{product.name}</h3>
                  <div>
                    <img src={`/images/${product.image}`} className="w-full" alt="temporary-alt"></img>
                  </div>
                  <div className="">{product.description}</div>
                  <div>{product.price}</div>
                </li>
              </Link>
            );
          })
        )}
      </ul>
    </>
  );
}

export default ShowProducts;
