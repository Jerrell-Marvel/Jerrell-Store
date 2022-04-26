import { useEffect, useState } from "react";
import { useFetch, useFetchParameters, ApiResponse } from "../../customHooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
import { Link } from "react-router-dom";

type ShowProductsType = {
  amount: number;
};

type ShowProductsProps = ShowProductsType & useFetchParameters;
function ShowProducts({ amount, url, category = "", id, title }: ShowProductsProps) {
  const [data, setData] = useState<ApiResponse | undefined>(undefined);

  const response = useFetch({ url: url, category: category, id: id, title: title });
  useEffect(() => {
    const slicedResponse = response?.data.slice(0, amount);
    if (typeof slicedResponse !== "undefined") {
      setData({ data: slicedResponse, loading: true });
    }
  }, [response]);

  return (
    <section className="px-6 py-12 md:py-16">
      <div className="mb-4 flex items-end justify-between">
        <h3 className="text-4xl font-medium mr-4">{title}</h3>
        <Link to={`/products/${category}`} className="text-2xl lg:mr-8 md:mr-4">
          See More ➡
        </Link>
      </div>

      <Swiper slidesPerView={"auto"} spaceBetween={30} freeMode={true} modules={[FreeMode]} grabCursor={true}>
        {data?.data.map((d, index) => {
          return (
            <SwiperSlide className="!w-64" key={index}>
              <Link to={`/products/${category}/${d.id}`}>
                <div className="flex flex-col w-full">
                  <img src={d.imageUrl} alt={d.title} className="!h-72" />
                  <h3>{d.title}</h3>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide className="!w-64">
          <Link to={`/products/${category}`}>
            <div className="flex flex-col w-full h-72 items-center justify-center">
              <p>Show All</p>
            </div>
          </Link>
        </SwiperSlide> */}
      </Swiper>
    </section>
  );
}

export default ShowProducts;
