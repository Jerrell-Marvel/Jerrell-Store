import { useEffect, useState } from "react";
import { useFetch, ApiResponse } from "../../customHooks/useFetch";
import { Link } from "react-router-dom";
import { ProductsProps } from "../Carousel/ProductsCarousel/ProductsCarousel";

type ShowProductsType = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  launches: [];
  events: [];
}[];
function ShowProducts({ amount, url, category = "", id, title }: ProductsProps) {
  const [data, setData] = useState<ApiResponse<ShowProductsType> | undefined>(undefined);

  const [response, loading] = useFetch({
    url: url,
    category: category,
    id: id,
    title: title,
  });

  useEffect(() => {
    if (response?.data instanceof Array && typeof response !== "undefined") {
      const slicedResponse = response?.data.slice(0, amount);
      setData({ data: slicedResponse, loading: false });
    }
  }, [response, amount]);

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
            {data?.data?.map((d) => {
              return (
                <Link to={`/products/itemCategory/${d.id}`} key={d.id}>
                  <li className="flex h-full flex-col gap-4 rounded-xl bg-white p-4 transition-transform duration-300 hover:scale-105">
                    <h3 className="d">{d.title}</h3>
                    <div>
                      <img src={d.imageUrl} className="w-full" alt={d.title}></img>
                    </div>

                    <p className="">{d.updatedAt}</p>
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
