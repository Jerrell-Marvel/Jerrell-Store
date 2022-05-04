import { useWishlistContext, WishlistProvider } from "../../context/WishlistContext";

function Wishlist() {
  const { wishlist, setWishlist } = useWishlistContext();
  console.log(wishlist);
  return (
    <WishlistProvider>
      <div className="pt-20 text-center">
        <h2 className="my-4 text-4xl font-medium uppercase">Wishlist</h2>

        <div className="bg-slate-50 p-4 text-center ">
          <h3 className="text-3xl font-medium">My Wishlist</h3>
          <p>No products added to wishlist</p>
        </div>

        {wishlist.map((wishlist) => {
          return <div>{JSON.stringify(wishlist)}</div>;
        })}
      </div>
    </WishlistProvider>
  );
}

export default Wishlist;
