import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useFetch2, ApiResponse } from "../../customHooks/useFetch2";
import { useFetch, ApiResponse } from "../../customHooks/useFetch";
import ProductsCarousel from "../../components/ProductsCarousel/ProductsCarousel";

type ProductDetailsType = {
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
};
function ProductDetails() {
  const { itemId } = useParams();
  //   console.log(itemId);

  const [itemDetails, setItemDetails] = useState<ApiResponse<ProductDetailsType> | undefined>(undefined);

  const response = useFetch<ProductDetailsType>({ url: "https://api.spaceflightnewsapi.net/v3/articles", id: `/${itemId}` });

  useEffect(() => {
    if (typeof response !== "undefined") {
      setItemDetails(response);
    }
  }, [response]);

  return (
    <>
      <section className="pt-20 px-6 bg-slate-50 pb-6">
        <div className="flex flex-wrap">
          <h3 className="my-6 w-full">{itemDetails?.data.publishedAt}</h3>

          <div className="w-full md:w-1/2">
            <img src={itemDetails?.data.imageUrl} alt={itemDetails?.data.title} />
          </div>

          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="mb-4 mt-8 font-medium uppercase text-2xl md:mt-0 lg:text-4xl">{itemDetails?.data.title}</h2>
            <h4 className="uppercase font-primary font-semibold md:text-lg lg:text-xl">description</h4>
            <p>{itemDetails?.data.summary}</p>

            <div className="flex border-2 w-fit mt-4">
              <button className="px-4 py-2 text-2xl">-</button>
              <input type="text" className="pl-3 w-8" value={1} />
              <button className="px-4 py-2">+</button>
            </div>

            <button className="uppercase bg-primary mt-4 w-full py-4 text-white border-2 border-black transition-colors duration-300">add to cart</button>
            <button className="uppercase bg-white mt-4 w-full py-4 text-black border-2 border-black hover:bg-slate-100 transition-colors duration-300">add to wishlist</button>
          </div>
        </div>
      </section>

      <div className="w-full">
        <ProductsCarousel amount={10} url="https://api.spaceflightnewsapi.net/v3/articles" title="Related Products" />
      </div>
    </>
  );
}

export default ProductDetails;
