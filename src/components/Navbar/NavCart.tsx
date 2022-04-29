import { NavLink } from "react-router-dom";

function NavCart() {
  return (
    <li>
      <NavLink
        to={`/cart`}
        className="group flex w-full items-center py-3 pl-6 md:py-6  md:px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          className="group-hover:animate-[wiggle_1s_ease-in-out_infinite]"
        >
          <path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
        </svg>
        <h5 className="ml-2 font-medium">0</h5>
      </NavLink>
    </li>
  );
}

export default NavCart;
