import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import NavCart from "./NavCart";
import Button from "../Button/Button";
import { productCategories } from "../../assets/assetsVariable";

function Navbar() {
  const [navLinks] = useState(["about"]);
  const [navActive, setNavActive] = useState(false);
  const [showProductCategories, setShowProductCategories] = useState(false);
  return (
    <>
      <header className="fixed w-full px-6 border-b-2 z-20 bg-white h-20 flex items-center">
        <div className="flex w-full items-center">
          <NavLink to="/" className="py-6 uppercase font-bold pr-4">
            jStore
          </NavLink>

          <input type="text" placeholder="Search" className="h-8 md:w-1/4 px-2 border-2 rounded-lg mr-12 md:mr-0 z-20 w-1/3" />

          <button id="hamburger" className={`absolute right-6 block md:hidden z-20 top-1/2 -translate-y-1/2 ${navActive ? "hamburger-active" : ""}`} onClick={() => setNavActive((prev) => !prev)}>
            <span className="hamburger-line origin-top-left transition duration-300"></span>
            <span className="hamburger-line transition duration-300"></span>
            <span className="hamburger-line origin-bottom-left transition duration-300"></span>
          </button>

          <nav className={`h-screen fixed  z-10 right-0 top-0 shadow-md md:shadow-none transition-transform duration-300 ml-auto md:static md:h-full md:translate-x-0 bg-white ${navActive ? "translate-x-0" : "translate-x-full"}`}>
            <ul className="w-48 mt-20 md:w-auto md:mt-0 md:flex md:items-center divide-y-2 md:divide-y-0 border-t-2 border-b-2 md:border-none">
              {navLinks.map((navLink, index) => {
                return (
                  <li key={index}>
                    <NavLink to={`/${navLink}`} className=" block w-full py-3 pl-6 md:py-6 group md:px-4" onClick={() => setNavActive((prev) => !prev)}>
                      <p className="after:absolute w-fit after:-bottom-1/4 relative after:left-1/2 after:block after:h-[3px] after:w-0 after:bg-slate-800  after:content-[''] group-hover:after:left-0 group-hover:after:right-0 group-hover:after:w-full after:transition-all after:duration-300 uppercase font-medium">
                        {navLink}
                      </p>
                    </NavLink>
                  </li>
                );
              })}

              <li>
                <div onClick={() => setShowProductCategories((prev) => !prev)} className="block w-full py-3 pl-6 md:py-6 group md:px-4 relative cursor-pointer">
                  <p className="after:absolute w-fit after:-bottom-1/4 relative after:left-1/2 after:block after:h-[3px] after:w-0 after:bg-slate-800  after:content-[''] group-hover:after:left-0 group-hover:after:right-0 group-hover:after:w-full after:transition-all after:duration-300 uppercase font-medium before:content-['▶'] before:rotate-90 before:inline-block before:mr-2">
                    products
                  </p>

                  <div className={`md:absolute bg-white md:shadow-lg rounded-lg md:w-full divide-y-[1px] flex-col md:left-0  md:top-full md:hidden md:group-hover:flex md:py-2 w-full pt-2 ${showProductCategories ? "flex" : "hidden"}`}>
                    {productCategories.map((category, index) => {
                      return (
                        <Link to={`/products/${category}`} className="py-2 hover:underline md:flex md:justify-center md:w-full md:px-4 capitalize" key={index} onClick={() => setNavActive((prev) => !prev)}>
                          {category}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>

              <NavCart />
              <li>
                <NavLink to={`/login`} className="block pl-6 md:pl-0 py-3 md:py-0 z-10">
                  <Button>Login</Button>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div onClick={() => setNavActive((prev) => !prev)} className={`fixed left-0 right-0 md:hidden z-10 bottom-0 top-0 bg-black opacity-40 ${navActive ? "visible" : "invisible"}`}></div>
    </>
  );
}

export default Navbar;
