/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../customHooks/useFetch2";
import ProductsCarousel from "../../components/Carousel/ProductsCarousel/ProductsCarousel";
import NotFound from "../NotFound/NotFound";
import useApi2 from "../../customHooks/useApi2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useUserContext } from "../../context/UserContext";
import { useQueryClient } from "react-query";
import { UserApiResponseType as UserType } from "../../context/UserContext";

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
    image: string;
  };
};

function ProductDetails() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  // const { wishlist, setWishlist } = useWishlistContext();

  const [itemDetails, setItemDetails] = useState<ProductType | undefined>(undefined);
  const [productAmount, setProductAmount] = useState(1);
  const [isWishlistModalActive, setIsWishlistModalActive] = useState(false);
  const [isCartModalActive, setIsCartModalActive] = useState(false);
  const [wishlistErrorMessage, setWishlistErrorMessage] = useState("");
  const [cartErrorMessage, setCartErrorMessage] = useState("");
  const { user, setUser } = useUserContext();
  const queryClient = useQueryClient();

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

  const {
    data: fetchResponse,
    isLoading: fetchLoading,
    error: fetchError,
    isError: isFetchError,
  } = useFetch<ProductType>({
    url: `/api/v1/products/${itemId}`,
    queryKey: ["product-details", itemId],
  });

  const {
    data: addWishlistResponse,
    isLoading: addWishlistLoading,
    error: addWishlistError,
    isError: isAddWishlistError,
    mutate: sendAddWishlistRequest,
  } = useApi2({
    url: `/api/v1/wishlist`,
    method: "post",
  });

  const {
    data: addCartResponse,
    isLoading: addCartLoading,
    error: addCartError,
    isError: isAddCartError,
    mutate: sendAddCartRequest,
  } = useApi2({
    url: `/api/v1/cart`,
    method: "post",
    options: {
      onSuccess: () => {
        queryClient.setQueryData<UserType | undefined>(["profile"], (oldProfile) => {
          if (oldProfile) {
            return {
              ...oldProfile,
              cartCount: oldProfile.cartCount + 1,
            };
          }
          return oldProfile;
        });
      },
    },
  });

  useEffect(() => {
    if (typeof fetchResponse !== "undefined") {
      setItemDetails(fetchResponse);
    }
  }, [fetchResponse, fetchError]);

  useEffect(() => {
    if (isAddWishlistError) {
      if (addWishlistError.code === "ERR_NETWORK") {
        setWishlistErrorMessage("Something went wrong please try again later");
      }
      if (addWishlistError.response.data.message === "Duplicate value error") {
        setWishlistErrorMessage("Item is already in wishlist");
      }
    }

    if (typeof addWishlistResponse !== "undefined") {
      console.log("inside if statement");
      setIsWishlistModalActive((prev) => !prev);
      setWishlistErrorMessage("");
    }
  }, [addWishlistResponse, addWishlistError]);

  useEffect(() => {
    if (isAddCartError) {
      if (addCartError.code === "ERR_NETWORK") {
        setCartErrorMessage("Something went wrong please try again later");
      }
      if (addCartError.response.data.message === "Duplicate value error") {
        setCartErrorMessage("Item is already in Cart");
      }
    }

    if (typeof addCartResponse !== "undefined") {
      console.log("inside if statement");

      if (typeof user !== "undefined") {
        setUser({ username: user.username, cartCount: user?.cartCount + 1 });
      }
      setProductAmount(1);
      setIsCartModalActive((prev) => !prev);
      setCartErrorMessage("");
    }
  }, [addCartResponse, addCartError]);

  const addToWishlistHandler = () => {
    const isLoggedIn = queryClient.getQueryData(["profile"]);
    if (isLoggedIn) {
      sendAddWishlistRequest({
        body: {
          productId: itemId,
        },
      });
    } else {
      navigate("/login");
    }
  };

  const addToCartHandler = () => {
    sendAddCartRequest({
      body: {
        productId: itemId,
        quantity: productAmount,
      },
    });
  };

  if (isFetchError && (fetchError.response.status === 400 || fetchError.response.status === 404)) {
    return <NotFound statusCode={fetchError.response.status} message={fetchError.response.data.message} statusText={fetchError.request.statusText} />;
  }

  return (
    <>
      <div>
        <section className="bg-slate-50 px-6 pt-20 pb-6">
          <div className="flex flex-wrap">
            <h3 className="my-6 w-full">{itemDetails?.product.category}</h3>

            <div className="w-full md:w-1/2">
              {fetchLoading ? <div className="h-full w-full animate-loading bg-slate-200"></div> : <img src={`/images/${itemDetails?.product.image}`} alt={itemDetails?.product.weight} className="w-full" />}
            </div>

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
              <button
                className="mt-4 flex h-14 w-full items-center justify-center border-2 border-black bg-primary uppercase text-white transition-colors duration-300"
                onClick={() => {
                  addToCartHandler();
                }}
              >
                {addCartLoading ? <LoadingSpinner color="white" /> : "add to cart"}
              </button>
              {cartErrorMessage ? (
                <span className="!mt-2 block text-red-500">
                  Item is already in cart{" "}
                  <Link to="/cart" className="text-black underline">
                    click here
                  </Link>{" "}
                  to check
                </span>
              ) : (
                ""
              )}

              <button
                className="mt-4 flex h-14 w-full items-center justify-center border-2 border-black bg-white uppercase text-primary transition-colors duration-300"
                onClick={() => {
                  addToWishlistHandler();
                }}
              >
                {addWishlistLoading ? <LoadingSpinner color="primary" /> : "add to wishlist"}
              </button>
              {wishlistErrorMessage ? (
                <span className="!mt-2 block text-red-500">
                  Item is already in wishlist{" "}
                  <Link to="/wishlist" className="text-black underline">
                    click here
                  </Link>{" "}
                  to check
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>

        <div className="w-full">
          <ProductsCarousel url="/api/v1/products" category={`${itemDetails?.product.category}`} />
        </div>

        {/* Modal */}
      </div>

      {isWishlistModalActive ? (
        <div>
          <div className="fixed left-0 right-0 bottom-0 top-0 z-10 bg-black opacity-40"></div>
          <div className="fixed left-0 right-0 bottom-0 top-0 z-20 pt-20">
            <div className="absolute top-1/2 left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 lg:w-1/2">
              <h4 className="mb-2 text-3xl font-medium uppercase">successfully added</h4>
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, rem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dolor.</span>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => {
                    setIsWishlistModalActive((prev) => !prev);
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
      ) : (
        ""
      )}

      {isCartModalActive ? (
        <div>
          <div className="fixed left-0 right-0 bottom-0 top-0 z-10 bg-black opacity-40"></div>
          <div className="fixed left-0 right-0 bottom-0 top-0 z-20 pt-20">
            <div className="absolute top-1/2 left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 lg:w-1/2">
              <h4 className="mb-2 text-3xl font-medium uppercase">successfully added</h4>
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, rem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dolor.</span>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => {
                    setIsCartModalActive((prev) => !prev);
                  }}
                  className="w-fit border-2 border-black bg-white py-2 px-4 text-sm uppercase text-black transition-colors duration-300 hover:bg-slate-100"
                >
                  ADD MORE
                </button>
                <Link to="/cart" className="w-fit border-2 border-black bg-primary px-4 py-2 text-sm uppercase text-white transition-colors duration-300">
                  CART PAGE
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ProductDetails;
