import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../customHooks/useFetch2";
import useApi2 from "../../customHooks/useApi2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useUserContext } from "../../context/UserContext";
import { useQueryClient } from "react-query";

type WishlistType = {
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
};

type WishlistApiResponseType = {
  success: boolean;
  wishlists: WishlistType[];
};
type DeleteWishlistApiResponseType = {
  success: boolean;
  wishlist: {
    createdAt: string;
    createdBy: string;
    product: string;
    updatedAt: string;
    __v: 0;
    _id: string;
  };
};
export default function Wishlist() {
  // const [wishlist, setWishlist] = useState<WishlistType[] | []>([]);
  const navigate = useNavigate();
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const {
    data: wishlistData,
    isLoading,
    error,
    isError: isFetchError,
  } = useFetch<WishlistApiResponseType>({
    url: "/api/v1/wishlist",
    queryKey: ["wishlist"],
  });

  const {
    data: deleteWishlistResponse,
    isLoading: deleteWishlistLoading,
    error: deleteWishlistError,
    isError: isDeleteWishlistError,
    mutate: sendDeleteWishlistRequest,
  } = useApi2<DeleteWishlistApiResponseType>({
    url: `/api/v1/wishlist`,
    method: "delete",
    options: {
      onSuccess: (deleteWishlistResponse) => {
        queryClient.setQueryData<WishlistApiResponseType | undefined>(["wishlist"], (oldQueryData) => {
          if (oldQueryData) {
            const deletedWishlist = oldQueryData?.wishlists.filter((wishlist) => {
              return wishlist._id !== deleteWishlistResponse.wishlist._id;
            });
            return {
              ...oldQueryData,
              wishlists: deletedWishlist,
              count: deletedWishlist.length,
            };
          }
        });
      },
    },
  });

  useEffect(() => {
    if (isDeleteWishlistError) {
      if (deleteWishlistError.code === "ERR_NETWORK") {
        // return setWishlistErrorMessage("Something went wrong please try again later");
        console.log("something");
      }
      if (deleteWishlistError.response.data.message === "Duplicate value error") {
        // return setWishlistErrorMessage("Item is already in wishlist");
      }
    }

    // if (typeof deleteWishlistResponse !== "undefined") {
    //   const newWishlist = [...wishlist];
    //   console.log(newWishlist);
    //   const deletedWishlist = newWishlist.filter((wishlist) => {
    //     return wishlist._id !== deleteWishlistResponse.wishlist._id;
    //   });
    //   console.log(deletedWishlist);

    //   setWishlist(deletedWishlist);

    //   console.log(deleteWishlistResponse);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteWishlistResponse, deleteWishlistLoading, deleteWishlistError, isDeleteWishlistError]);

  useEffect(() => {
    if (isFetchError) {
      if (error.response.status === 401) {
        navigate("/login");
      } else if (error.code === "ERR_NETWORK") {
        setFetchErrorMessage("Something went wrong please try again later");
      } else {
        setFetchErrorMessage("Something went wrong please try again later");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlistData, error, isFetchError]);

  const removeWishlistHandler = (id: string) => {
    alert("are you sure to remove item from wishlist?");
    sendDeleteWishlistRequest({ itemId: id });
  };

  console.log(wishlistData);
  return (
    <>
      <div className="pt-20 text-center">
        <h2 className="my-4 text-4xl font-medium uppercase">Wishlist</h2>
        <div className="bg-slate-100 p-4 text-center ">
          {!isFetchError ? (
            isLoading ? (
              <LoadingSpinner color="primary" />
            ) : (
              <div>
                <h3 className="my-4 text-3xl font-medium">My Wishlist</h3>
                {wishlistData && wishlistData?.wishlists.length > 0 ? "" : <p>Your wishlist is empty</p>}
              </div>
            )
          ) : (
            <p>{fetchErrorMessage}</p>
          )}
        </div>
        <div className="py-6 px-6">
          <ul className="flex w-full flex-col items-center">
            {wishlistData?.wishlists.map((list) => {
              return (
                <li className="mb-4 flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-x-2" key={list._id}>
                  <div className="grid h-full w-full grid-cols-[1fr_1fr] justify-between p-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
                    <div className="w-full bg-slate-400">
                      <img src={`/images/${list.product.image}`} alt={""} className="w-full"></img>
                    </div>
                    <div className="flex h-full flex-col items-end gap-2 pl-4 text-right">
                      <h4 className="font-medium md:text-lg lg:text-xl">{list.product.name}</h4>

                      <Link to={`/product/${list.product._id}`} className="mb-1 w-fit border-2 border-black bg-primary px-2 py-1 text-sm uppercase text-white transition-colors duration-300">
                        view item
                      </Link>

                      <button
                        className="w-20 border-2 border-black bg-white py-1 text-sm uppercase text-black transition-colors duration-300 hover:bg-slate-100"
                        onClick={() => {
                          removeWishlistHandler(list._id);
                        }}
                      >
                        {deleteWishlistLoading ? <LoadingSpinner color="primary" height="h-4" width="w-4" /> : "remove"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {wishlistData && wishlistData?.wishlists.length < 1 ? (
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
