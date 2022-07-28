import { useEffect, useState } from "react";
import { useFetch } from "../../customHooks/useFetch";
import { Link } from "react-router-dom";

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


  const [response, loading] = useFetch<ProductsType>({
    url: url,
  });

  useEffect(() => {
    // if (response?.data instanceof Array && typeof response !== "undefined") {
    //   // const slicedResponse = response?.data.slice(0, amount);
    //   setDatas({ data: response.data });
    // }
    if (typeof response !== "undefined") {
      setDatas(response);
    }
  }, [response]);

  return (
    <>
      <ul>
        {loading ? (
          <ul className="grid w-full grid-cols-card-grid gap-6 py-10">
            {[...Array(10)].map((element, index) => {
              return (
                <li className="flex h-96 flex-col gap-4 rounded-xl bg-white p-4 transition-all duration-300" key={index}>
                  <div className="flex-1 animate-loading bg-slate-200"></div>
                  <div className="flex-[5] animate-loading bg-slate-200"></div>
                  <div className="flex-[2] animate-loading bg-slate-200"></div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="grid w-full grid-cols-card-grid gap-6 py-10">
            {datas?.products.map((product) => {
              return (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <li className="flex h-full flex-col gap-4 rounded-xl bg-white p-4 transition-transform duration-300 hover:scale-105">
                    <h3 className="d">{product.name}</h3>
                    <div>{/* <img src={d.imageUrl} className="w-full" alt={d.title}></img> */}</div>

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
