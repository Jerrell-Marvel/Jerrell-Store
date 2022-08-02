import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useFetch } from "../../customHooks/useFetch";
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
  };
};

type WishlistApiResponseType = {
  success: boolean;
  wishlists: WishlistType[];
};
export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistType[] | []>([]);
  const [cookies] = useCookies(["token"]);
  const [response, loading, error] = useFetch<WishlistApiResponseType>({
    url: "http://localhost:5000/api/v1/wishlist",
    headers: {
      authorization: `Bearer ${cookies.token}`,
    },
  });

  useEffect(() => {
    if (typeof response !== "undefined") {
      setWishlist(response.wishlists);
    }
  }, [response, loading, error]);
  return (
    <>
      <div className="pt-20 text-center">
        <h2 className="my-4 text-4xl font-medium uppercase">Wishlist</h2>
        <div className="bg-slate-100 p-4 text-center ">
          <h3 className="my-4 text-3xl font-medium">My Wishlist</h3>
          {wishlist.length > 0 ? "" : <p>Your wishlist is empty</p>}
        </div>
        <div className="py-6 px-6">
          <ul className="flex w-full flex-col items-center">
            {wishlist.map((list) => {
              return (
                <li className="mb-4 flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-x-2" key={list._id}>
                  <div className="grid h-full w-full grid-cols-[1fr_1fr] justify-between p-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
                    <div className="w-full bg-slate-400">{/* <img src={list._id} alt={""} className="w-full"></img> */}</div>
                    <div className="flex h-full flex-col items-end gap-2 pl-4 text-right">
                      <h4 className="font-medium md:text-lg lg:text-xl">{list.product.name}</h4>

                      <Link to={`/products/itemCategory/${list.product._id}`} className="mb-1 w-fit border-2 border-black bg-primary px-2 py-1 text-sm uppercase text-white transition-colors duration-300">
                        view item
                      </Link>

                      <button className="w-fit border-2 border-black bg-white px-2 py-1 text-sm uppercase text-black transition-colors duration-300 hover:bg-slate-100">Remove</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {wishlist.length < 1 ? (
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
