import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// import { useFetch2, ApiResponse } from "../../customHooks/useFetch2";
import { useFetch } from "../../customHooks/useFetch";
import ProductsCarousel from "../../components/Carousel/ProductsCarousel/ProductsCarousel";
import NotFound from "../NotFound/NotFound";
// import { useWishlistContext } from "../../context/WishlistContext";

type ProductType = {
  success: boolean;
  product: {
    _id: string;
    name: string;
    weight: string;
    category: string;
    stock: string;
    description: string;
    price: string;
    createdAt: string;
    updatedAt: string;
  };
};

function ProductDetails() {
  const { itemId } = useParams();
  // const { wishlist, setWishlist } = useWishlistContext();

  const [itemDetails, setItemDetails] = useState<ProductType | undefined>(undefined);
  const [productAmount, setProductAmount] = useState(1);
  const [isModalActive, setIsModalActive] = useState(false);

  const incrementAmount = () => {
    setProductAmount(productAmount + 1);
  };
  const decrementAmount = () => {
    if (productAmount <= 1) {
      setProductAmount(1);
    } else {
      setProductAmount(productAmount - 1);
    }
  };

  const [response, loading, error] = useFetch<ProductType>({
    url: `http://localhost:5000/api/v1/products/${itemId}`,
  });

  useEffect(() => {
    if (typeof response !== "undefined") {
      setItemDetails(response);
    }
  }, [response, loading, error]);

  // const addToWishlistHandler = (itemDetails: ProductType | undefined) => {
  //   if (typeof itemDetails !== "undefined") {
  //     const itemWithAmount = {
  //       ...itemDetails,
  //       amount: productAmount,
  //     };

  //     const itemIndex = wishlist.findIndex((list) => {
  //       return list.id === itemDetails.id;
  //     });

  //     if (itemIndex !== -1) {
  //       const newItem = { ...itemDetails, amount: wishlist[itemIndex].amount + itemWithAmount.amount };

  //       const newWishlist = [...wishlist];
  //       newWishlist.splice(itemIndex, 1);
  //       newWishlist.unshift(newItem);

  //       setWishlist(newWishlist);
  //     } else {
  //       setWishlist([itemWithAmount, ...wishlist]);
  //     }

  //     // console.log(itemIndex);
  //     // console.log(itemWithAmount);
  //     setProductAmount(1);
  //   } else return;
  // };

  return (
    <>
      {error.success ? (
        <div>
          <section className="bg-slate-50 px-6 pt-20 pb-6">
            <div className="flex flex-wrap">
              <h3 className="my-6 w-full">{itemDetails?.product.category}</h3>

              <div className="w-full md:w-1/2">{loading ? <div className="h-full w-full animate-loading bg-slate-200"></div> : <img src={itemDetails?.product.weight} alt={itemDetails?.product.weight} />}</div>

              <div className="w-full md:w-1/2 md:pl-8">
                <h2 className="mb-4 mt-8 text-2xl font-medium uppercase md:mt-0 lg:text-4xl">{itemDetails?.product.name}</h2>
                <h4 className="font-primary font-semibold uppercase md:text-lg lg:text-xl">description</h4>
                <p>{itemDetails?.product.description}</p>

                <div className="mt-4 flex w-fit border-2">
                  <button className="px-4 py-2 text-2xl" onClick={decrementAmount}>
                    -
                  </button>
                  <div className="flex items-center px-4 py-2 text-lg">{productAmount}</div>
                  <button className="px-4 py-2" onClick={incrementAmount}>
                    +
                  </button>
                </div>

                <button className="mt-4 w-full border-2 border-black bg-primary py-4 uppercase text-white transition-colors duration-300">add to cart</button>
                <button
                  // onClick={(e) => {
                  //   addToWishlistHandler(itemDetails?.data);
                  //   setIsModalActive((prev) => !prev);
                  // }}
                  className="mt-4 w-full border-2 border-black bg-white py-4 uppercase text-black transition-colors duration-300 hover:bg-slate-100"
                >
                  add to wishlist
                </button>
              </div>
            </div>
          </section>

          <div className="w-full">
            <ProductsCarousel url="http://localhost:5000/api/v1/products" category={`${itemDetails?.product.category}`} />
          </div>

          {/* Modal */}
          <div className={`${isModalActive ? "visible" : "invisible"}`}>
            <div className="fixed left-0 right-0 bottom-0 top-0 z-10 bg-black opacity-40"></div>
            <div className="fixed left-0 right-0 bottom-0 top-0 z-20 pt-20">
              <div className="absolute top-1/2 left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 lg:w-1/2">
                <h4 className="mb-2 text-3xl font-medium uppercase">successfully added</h4>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, rem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dolor.</span>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => {
                      setIsModalActive((prev) => !prev);
                    }}
                    className="w-fit border-2 border-black bg-white py-2 px-4 text-sm uppercase text-black transition-colors duration-300 hover:bg-slate-100"
                  >
                    ADD MORE
                  </button>
                  <Link to="/wishlist" className="w-fit border-2 border-black bg-primary px-4 py-2 text-sm uppercase text-white transition-colors duration-300">
                    WISHLIST PAGE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound statusCode={error.statusCode} message={error.message} />
      )}
    </>
  );
}

export default ProductDetails;
