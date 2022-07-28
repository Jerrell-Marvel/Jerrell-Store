import { useEffect, useState } from "react";
import { useFetch, useFetchParameters } from "../../../customHooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper";
import { Link } from "react-router-dom";

export type ProductsProps = ProductsType & useFetchParameters;

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

type ProductsCarouselProps = {
  url: string;
};

function ProductsCarousel({ url }: ProductsCarouselProps) {
  const [datas, setDatas] = useState<ProductsType | undefined>(undefined);

  const [response, loading] = useFetch<ProductsType>({
    url: url,
  });

  useEffect(() => {
    if (typeof response !== "undefined") {
      // const slicedResponse = response?.data.slice(0, amount);
      setDatas(response);
    }
  }, [response]);

  return (
    <section className="px-6 py-12 md:py-16">
      {loading ? (
        <div className="w-full overflow-hidden">
          <div className="flex h-72 w-fit">
            {[...Array(10)].map((element, index) => (
              <div className="mr-4 h-full w-64 animate-loading rounded-sm bg-slate-200" key={index}></div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-end justify-between">
            <h3 className="mr-4 text-2xl font-medium sm:text-3xl md:text-4xl lg:text-5xl">Related products</h3>
            {/* <Link to={`/products/${category}`} className="text-lg sm:text-xl md:mr-4 md:text-2xl lg:mr-8 lg:text-3xl">
              See More ➡
            </Link> */}
          </div>

          <Swiper slidesPerView={"auto"} spaceBetween={30} freeMode={true} modules={[FreeMode]} grabCursor={true}>
            {datas?.products.map((product, index) => {
              return (
                <SwiperSlide className="!w-64" key={index}>
                  <Link to={`/products/itemCategory/${product._id}`}>
                    <div className="flex w-full flex-col">
                      {/* <img src={d.imageUrl} alt={d.title} className="mb-3 !h-72" /> */}
                      <h3>{product.name}</h3>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </section>
  );
}

export default ProductsCarousel;

// <section className="px-6 py-12 md:py-16">
//   <div className="mb-4 flex items-end justify-between">
//     <h3 className="text-4xl font-medium mr-4">{title}</h3>
//     <Link to={`/products/${category}`} className="text-2xl lg:mr-8 md:mr-4">
//       See More ➡
//     </Link>
//   </div>

//   <Swiper slidesPerView={"auto"} spaceBetween={30} freeMode={true} modules={[FreeMode]} grabCursor={true}>
//     {data?.data?.map((d, index) => {
//       return (
//         <SwiperSlide className="!w-64" key={index}>
//           <Link to={`/products/itemCategory/${d.id}`}>
//             <div className="flex flex-col w-full">
//               <img src={d.imageUrl} alt={d.title} className="!h-72 mb-3" />
//               <h3>{d.title}</h3>
//             </div>
//           </Link>
//         </SwiperSlide>
//       );
//     })}
//     {/* <SwiperSlide className="!w-64">
//       <Link to={`/products/${category}`}>
//         <div className="flex flex-col w-full h-72 items-center justify-center">
//           <p>Show All</p>
//         </div>
//       </Link>
//     </SwiperSlide> */}
//   </Swiper>
// </section>
