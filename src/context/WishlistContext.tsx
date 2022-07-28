// import { createContext, ReactNode, useContext, useState } from "react";
// import { ProductDetailsType } from "../pages/ProductsDetails/ProductsDetails";

// export type ProductWishlistType = ProductDetailsType & { amount: number };

// type WishlistContextValue = {
//   wishlist: ProductWishlistType[];
//   setWishlist: React.Dispatch<React.SetStateAction<[] | ProductWishlistType[]>>;
// };
// export const WishlistContext = createContext({} as WishlistContextValue);

// export const useWishlistContext = () => {
//   return useContext(WishlistContext);
// };

// type WishlistProviderProps = {
//   children: ReactNode;
// };
// export function WishlistProvider({ children }: WishlistProviderProps) {
//   const [wishlist, setWishlist] = useState<ProductWishlistType[] | []>([]);
//   return <WishlistContext.Provider value={{ wishlist, setWishlist }}>{children}</WishlistContext.Provider>;
// }

export {};
