import { useEffect, useState } from "react";
import { useFetch, ApiResponse } from "../../customHooks/useFetch";
import { Link } from "react-router-dom";
import { ProductsProps } from "../ProductsCarousel/ProductsCarousel";

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

  const response = useFetch({ url: url, category: category, id: id, title: title });
  useEffect(() => {
    if (response?.data instanceof Array && typeof response !== "undefined") {
      const slicedResponse = response?.data.slice(0, amount);
      setData({ data: slicedResponse, loading: false });
    }
  }, [response]);

  return (
    <>
      <ul className="w-full grid grid-cols-card-grid py-10 gap-6">
        {data?.data?.map((d) => {
          return (
            <Link to={`/products/itemCategory/${d.id}`} key={d.id}>
              <li className="flex flex-col p-4 rounded-xl gap-4 bg-white h-full transition-all duration-300 hover:shadow-md">
                <h3 className="d">{d.title}</h3>
                <div>
                  <img src={d.imageUrl} className="h-64" alt={d.title}></img>
                </div>

                <p className="">{d.updatedAt}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default ShowProducts;
