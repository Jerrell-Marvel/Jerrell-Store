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

  const [response, loading] = useFetch({ url: url, category: category, id: id, title: title });

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
          <ul className="w-full grid grid-cols-card-grid py-10 gap-6">
            {[...Array(10)].map((d) => {
              return (
                <li className="flex flex-col p-4 rounded-xl gap-4 bg-white transition-all duration-300 h-96">
                  <div className="flex-1 bg-slate-200 animate-loading"></div>
                  <div className="flex-[5] bg-slate-200 animate-loading"></div>
                  <div className="flex-[2] bg-slate-200 animate-loading"></div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="w-full grid grid-cols-card-grid py-10 gap-6">
            {data?.data?.map((d) => {
              return (
                <Link to={`/products/itemCategory/${d.id}`} key={d.id}>
                  <li className="flex flex-col p-4 rounded-xl gap-4 bg-white h-full transition-transform duration-300 hover:scale-105 lg:hover:scale-110">
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
