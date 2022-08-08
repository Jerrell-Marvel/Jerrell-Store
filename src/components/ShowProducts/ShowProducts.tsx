import { useEffect, useState } from "react";
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
  }[];
};

type ShowProductsProps = {
  url: string;
};

function ShowProducts({ url }: ShowProductsProps) {
  const [datas, setDatas] = useState<ProductsType | undefined>(undefined);
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");

  const [response, loading, error] = useFetch<ProductsType>({
    url: url,
  });

  useEffect(() => {
    if (typeof response !== "undefined") {
      setDatas(response);
    }

    if (!error.success) {
      if (error.code === "ERR_NETWORK") {
        setFetchErrorMessage("Something went wrong please try again later");
      }
    }
  }, [response, loading, error]);

  return (
    <>
      <ul>
        {loading ? (
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
              ""
            )}
            {datas?.products.map((product, index) => {
              return (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <li className={`flex h-full flex-col gap-4 rounded-xl bg-white p-4 transition-transform duration-300 hover:scale-105`}>
                    <h3 className="d">{product.name}</h3>
                    <div>
                      <img src={`https://source.unsplash.com/random/400x${400 - index}`} className="w-full" alt="temporary-alt"></img>
                    </div>

                    <p className="">{product.description}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </ul>
    </>
  );
}

export default ShowProducts;
