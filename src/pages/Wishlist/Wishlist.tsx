import { useWishlistContext, WishlistProvider, ProductWishlistType } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
function Wishlist() {
  const { wishlist, setWishlist } = useWishlistContext();
  console.log(wishlist);

  const removeWishlistHandler = (wishlistedItem: ProductWishlistType) => {
    const confirm = window.confirm("Are you sure to delete this item from wishlist?");
    if (confirm) {
      const removedWishlist = wishlist.filter((list) => {
        return wishlistedItem.id !== list.id;
      });
      setWishlist(removedWishlist);
    } else return;
  };
  return (
    <WishlistProvider>
      <div className="pt-20 text-center">
        <h2 className="my-4 text-4xl font-medium uppercase">Wishlist</h2>

        <div className="bg-slate-100 p-4 text-center ">
          <h3 className="my-4 text-3xl font-medium">My Wishlist</h3>
          {wishlist.length > 0 ? "" : <p>Your wishlist is empty</p>}
        </div>

        <div className="py-6 px-6">
          <ul className="mx-auto w-fit">
            {wishlist.map((list) => {
              return (
                <li className="mb-4 flex w-full flex-col items-center rounded-xl border-2 border-x-2">
                  <div className="grid h-full w-full max-w-lg grid-cols-[35%_65%] justify-between p-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
                    <div className="w-full">
                      <img src={list.imageUrl} alt={list.title} className="w-full"></img>
                    </div>
                    <div className="flex h-full flex-col items-end gap-2 pl-4 text-right">
                      <h4 className="font-medium md:text-lg lg:text-xl">{list.title}</h4>
                      <span>Amount : {list.amount}</span>

                      <Link to={`/products/itemCategory/${list.id}`} className="mb-1 w-fit border-2 border-black bg-primary px-2 py-1 text-sm uppercase text-white transition-colors duration-300">
                        view item
                      </Link>

                      <button
                        onClick={() => {
                          removeWishlistHandler(list);
                        }}
                        className="w-fit border-2 border-black bg-white px-2 py-1 text-sm uppercase text-black transition-colors duration-300 hover:bg-slate-100"
                      >
                        Remove
                      </button>
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
    </WishlistProvider>
  );
}

export default Wishlist;
