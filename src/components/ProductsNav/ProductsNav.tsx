import { NavLink } from "react-router-dom";
const productCategories = ["all", "hoodie", "snacks", "jeans", "shorts", "shirts"];

function ProductsNav() {
  return (
    <>
      <div className="w-full h-[40vh] flex lg:h-[50vh] items-center relative justify-center text-center px-6 pt-20 border-b-2 bg-[url('https://source.unsplash.com/random/800x300')] bg-cover after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-slate-800 after:opacity-40">
        <h2 className="text-5xl sm:leading-[6rem] font-medium text-white z-[2]">Explore Products</h2>
      </div>
      <div className="sticky top-20 bg-white z-[50]">
        <ul className="flex justify-between border-b-2 bg-white items-center gap-8 overflow-auto px-6 h-16 lg:justify-evenly">
          {productCategories.map((category, index) => {
            return (
              <li className="h-full" key={index}>
                <NavLink to={`/products/${category}`} className="flex group h-full items-center">
                  <p className="after:absolute w-fit after:-bottom-1/4 relative after:left-1/2 after:block after:h-[3px] after:w-0 after:bg-slate-800  after:content-[''] group-hover:after:left-0 group-hover:after:right-0 group-hover:after:w-full after:transition-all after:duration-300 uppercase font-medium">
                    {category}
                  </p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ProductsNav;
