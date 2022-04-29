import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center pt-20 text-center">
      <h2 className="text-2xl font-medium md:text-4xl">
        Page cannot be found or no longer exist
      </h2>
      <div className="mt-6 text-xl md:text-3xl">
        <p>404 | Page Not Found</p>
      </div>
      <Link
        to="/"
        className="mt-6 w-fit border-2 border-black bg-primary py-4 px-8 uppercase text-white transition-colors duration-300"
      >
        Back to Home Page
      </Link>
    </div>
  );
}

export default NotFound;
