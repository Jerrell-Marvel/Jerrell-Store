import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import NavCart from "./NavCart";
import Button from "../Button/Button";
import { useCookies } from "react-cookie";

const navLinks = ["about", "wishlist"];
const productCategories = ["all", "hoodie", "snacks", "jeans", "shorts", "shirts"];
function Navbar() {
  const navigate = useNavigate();
  const [navActive, setNavActive] = useState(false);
  const [showProductCategories, setShowProductCategories] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [search, setSearch] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    navigate(`/search?q=${search}`);
  };

  return (
    <>
      <header className="fixed z-[99] flex h-20 w-full items-center border-b-2 bg-white px-6">
        <div className="flex w-full items-center">
          <NavLink to="/" className="py-6 pr-4 font-bold uppercase">
            jStore
          </NavLink>

          <form
            className="w-1/3 md:w-[18%]"
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
          >
            <input
              type="text"
              placeholder="Search"
              className="z-20 mr-12 h-8 w-full rounded-lg border-2 px-2 md:mr-0 "
              onChange={(e) => {
                onChangeHandler(e);
              }}
              value={search}
            />
          </form>

          <button id="hamburger" className={`absolute right-6 top-1/2 z-[103] block -translate-y-1/2 md:hidden ${navActive ? "hamburger-active" : ""}`} onClick={() => setNavActive((prev) => !prev)}>
            <span className="hamburger-line origin-top-left transition duration-300"></span>
            <span className="hamburger-line transition duration-300"></span>
            <span className="hamburger-line origin-bottom-left transition duration-300"></span>
          </button>

          <nav className={`fixed right-0  top-0 z-[102] ml-auto h-screen bg-white shadow-md transition-transform duration-300 md:static md:h-full md:translate-x-0 md:shadow-none ${navActive ? "translate-x-0" : "translate-x-full"}`}>
            <ul className="mt-20 w-48 divide-y-2 border-t-2 border-b-2 md:mt-0 md:flex md:w-auto md:items-center md:divide-y-0 md:border-none">
              {navLinks.map((navLink, index) => {
                return (
                  <li key={index}>
                    <NavLink to={`/${navLink}`} className=" group block w-full py-3 pl-6 md:py-6 md:px-4" onClick={() => setNavActive((prev) => !prev)}>
                      <p className="relative w-fit font-medium uppercase after:absolute after:-bottom-1/4 after:left-1/2 after:block after:h-[3px]  after:w-0 after:bg-slate-800 after:transition-all after:duration-300 after:content-[''] group-hover:after:left-0 group-hover:after:right-0 group-hover:after:w-full">
                        {navLink}
                      </p>
                    </NavLink>
                  </li>
                );
              })}

              <li>
                <div onClick={() => setShowProductCategories((prev) => !prev)} className="group relative block w-full cursor-pointer py-3 pl-6 md:py-6 md:px-4">
                  <p className="relative w-fit font-medium uppercase before:mr-2 before:inline-block before:rotate-90 before:content-['▶'] after:absolute  after:-bottom-1/4 after:left-1/2 after:block after:h-[3px] after:w-0 after:bg-slate-800 after:transition-all after:duration-300  group-hover:after:left-0 group-hover:after:right-0 group-hover:after:w-full">
                    products
                  </p>

                  <div className={`w-full flex-col divide-y-[1px] rounded-lg bg-white pt-2 md:absolute md:left-0  md:top-full md:hidden md:w-full md:py-2 md:shadow-lg md:group-hover:flex ${showProductCategories ? "flex" : "hidden"}`}>
                    {productCategories.map((category, index) => {
                      return (
                        <Link to={`/product-category/${category}`} className="py-2 capitalize hover:underline md:flex md:w-full md:justify-center md:px-4" key={index} onClick={() => setNavActive((prev) => !prev)}>
                          {category}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>

              <NavCart />

              <li>
                {cookies.token ? (
                  <span className="z-10 block py-3 pl-6 md:py-0 md:pl-0">Username</span>
                ) : (
                  <NavLink to={`/login`} className="z-10 block py-3 pl-6 md:py-0 md:pl-0">
                    <Button>Login</Button>
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <div onClick={() => setNavActive((prev) => !prev)} className={`fixed left-0 right-0 bottom-0 top-0 z-[100] bg-black opacity-40 md:hidden ${navActive ? "visible" : "invisible"}`}></div>
      </header>
    </>
  );
}

export default Navbar;
