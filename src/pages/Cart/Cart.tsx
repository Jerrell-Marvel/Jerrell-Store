import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../customHooks/useFetch2";
import useApi from "../../customHooks/useApi";
import useApi2 from "../../customHooks/useApi2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ProductDetails from "../ProductsDetails/ProductsDetails";
import { useUserContext } from "../../context/UserContext";
import { useQueryClient } from "react-query";
import { UserApiResponseType as UserType } from "../../context/UserContext";

type CartType = {
  _id: string;
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
  quantity: string;
};

type CartApiResponseType = {
  success: boolean;
  items: CartType[];
};
type DeleteCartApiResponseType = {
  success: boolean;
  item: {
    createdAt: string;
    createdBy: string;
    product: string;
    updatedAt: string;
    __v: 0;
    _id: string;
  };
};

type UpdateCartApiResponseType = {
  success: boolean;
  item: {
    createdAt: string;
    createdBy: string;
    product: string;
    updatedAt: string;
    __v: 0;
    _id: string;
    quantity: string;
  };
};
export default function Cart() {
  const [cart, setCart] = useState<CartType[] | []>([]);
  const [itemId, setItemId] = useState("");
  const navigate = useNavigate();
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const { user, setUser } = useUserContext();
  const queryClient = useQueryClient();

  const {
    data: cartData,
    isLoading: fetchLoading,
    error: fetchError,
    isError: isFetchError,
  } = useFetch<CartApiResponseType>({
    url: "/api/v1/cart",
    queryKey: ["cart"],
  });

  const {
    data: deleteCartResponse,
    isLoading: deleteCartLoading,
    error: deleteCartError,
    isError: isDeleteCartError,
    mutate: sendDeleteCartRequest,
  } = useApi2<DeleteCartApiResponseType>({
    url: `/api/v1/cart`,
    method: "delete",
    options: {
      onSuccess: (deleteCartResponse) => {
        queryClient.setQueryData<CartApiResponseType | undefined>(["cart"], (oldCart) => {
          if (oldCart) {
            const deletedCart = oldCart?.items.filter((item) => {
              return item._id !== deleteCartResponse.item._id;
            });
            return {
              ...oldCart,
              items: deletedCart,
              count: deletedCart.length,
            };
          }
          return oldCart;
        });

        queryClient.setQueryData<UserType | undefined>(["profile"], (oldProfile) => {
          if (oldProfile) {
            return {
              ...oldProfile,
              cartCount: oldProfile.cartCount - 1,
            };
          }
          return oldProfile;
        });
      },
    },
  });

  const [updateCartResponse, updateCartLoading, updateCartError, sendUpdateCartRequest] = useApi<UpdateCartApiResponseType>({
    url: `/api/v1/cart`,
    method: "patch",
  });

  useEffect(() => {
    if (!updateCartError.success) {
      if (updateCartError.code === "ERR_NETWORK") {
        // return setWishlistErrorMessage("Something went wrong please try again later");
        console.log("something");
      }
      if (updateCartError.response.data.message === "Duplicate value error") {
        // return setWishlistErrorMessage("Item is already in wishlist");
      }
    }

    if (typeof updateCartResponse !== "undefined") {
      const cartIndex = cart.findIndex((e) => {
        return e._id === updateCartResponse.item._id;
      });
      const updatedItem = cart[cartIndex];
      updatedItem.quantity = updateCartResponse.item.quantity;
      const newCart = [...cart];
      newCart[cartIndex] = updatedItem;

      setCart(newCart);
    }
  }, [updateCartResponse, updateCartLoading, updateCartError]);

  useEffect(() => {
    if (isDeleteCartError) {
      if (deleteCartError.code === "ERR_NETWORK") {
        // return setWishlistErrorMessage("Something went wrong please try again later");
        console.log("something");
      }
      if (deleteCartError.response.data.message === "Duplicate value error") {
        // return setWishlistErrorMessage("Item is already in wishlist");
      }
    }

    // if (typeof deleteCartResponse !== "undefined") {
    //   const newCart = [...cart];
    //   console.log(newCart);
    //   const deletedCart = newCart.filter((cart) => {
    //     return cart._id !== deleteCartResponse.item._id;
    //   });
    //   console.log(deletedCart);

    //   setCart(deletedCart);
    //   if (typeof user !== "undefined") {
    //     setUser({ username: user.username, cartCount: user?.cartCount - 1 });
    //   }
    //   console.log(deleteCartResponse);
    // }
  }, [deleteCartResponse, deleteCartLoading, deleteCartError]);

  useEffect(() => {
    if (typeof cartData !== "undefined") {
      setCart(cartData.items);
    }

    if (isFetchError) {
      if (fetchError.response.status === 401) {
        navigate("/login");
      } else if (fetchError.code === "ERR_NETWORK") {
        setFetchErrorMessage("Something went wrong please try again later");
      } else {
        setFetchErrorMessage("Something went wrong please try again");
      }
    }
  }, [cartData, fetchError, isFetchError]);

  const removeWishlistHandler = (id: string) => {
    alert("are you sure to remove item from cart?");
    sendDeleteCartRequest({ itemId: id });
  };

  const changeQuantityHandler = (id: string, body: { quantity: string }) => {
    if (Number(body.quantity) < 1) {
      return;
    }
    sendUpdateCartRequest(id, body);
  };
  return (
    <>
      <div className="pt-20 text-center">
        <h2 className="my-4 text-4xl font-medium uppercase">Cart</h2>
        <div className="bg-slate-100 p-4 text-center ">
          {!isFetchError ? (
            fetchLoading ? (
              <LoadingSpinner color="primary" />
            ) : (
              <div>
                <h3 className="my-4 text-3xl font-medium">My Cart</h3>
                {cart.length > 0 ? "" : <p>Your cart is empty</p>}
              </div>
            )
          ) : (
            <p>{fetchErrorMessage}</p>
          )}
        </div>
        <div className="py-6 px-6">
          <ul className="flex w-full flex-col items-center">
            {cartData?.items.map((item) => {
              return (
                <li className="mb-4 flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-x-2" key={item._id}>
                  <div className="grid h-full w-full grid-cols-[1fr_1fr] justify-between p-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
                    <div className="w-full bg-slate-400">
                      <img src={`/images/${item.product.image}`} alt={""} className="w-full"></img>
                    </div>
                    <div className="flex h-full flex-col items-end gap-2 pl-4 text-right">
                      <h4 className="font-medium md:text-lg lg:text-xl">{item.product.name}</h4>

                      <Link to={`/product/${item.product._id}`} className="mb-1 w-fit border-2 border-black bg-primary px-2 py-1 text-sm uppercase text-white transition-colors duration-300">
                        view item
                      </Link>
                      <div className="flex">
                        <button
                          className="px-4 py-2 pl-0 text-2xl"
                          onClick={() => {
                            const updatedQuantity = Number(item.quantity) - 1;
                            console.log(updatedQuantity);
                            changeQuantityHandler(item._id, { quantity: updatedQuantity.toString() });
                          }}
                        >
                          -
                        </button>
                        <span className="flex items-center px-4 py-2 text-lg">{item.quantity}</span>

                        <button
                          className="px-4 py-2 pr-0"
                          onClick={() => {
                            const updatedQuantity = Number(item.quantity) + 1;
                            changeQuantityHandler(item._id, { quantity: updatedQuantity.toString() });
                          }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="h-10 w-20 border-2 border-black bg-white py-2 px-3 text-sm uppercase text-black transition-colors duration-300  hover:bg-slate-100"
                        onClick={() => {
                          removeWishlistHandler(item._id);
                        }}
                      >
                        {deleteCartLoading ? <LoadingSpinner color="primary" height="h-4" width="w-4" /> : "remove"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {cartData && cartData?.items.length < 1 ? (
            <Link to="/wishlist" className="w-fit border-2 border-black bg-primary px-4 py-2 text-sm uppercase text-white transition-colors duration-300">
              WISHLIST PAGE
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
