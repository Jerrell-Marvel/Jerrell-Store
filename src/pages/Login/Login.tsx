import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-slate-200 pt-28 pb-8">
      <form action="" className="mx-auto w-full rounded-lg bg-white p-8 shadow-xl md:w-[576px]">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-4xl font-semibold">Login to Jerrell Store</h2>
          <input type="text" name="email" placeholder="email" className="rounded-lg border-2 p-3" />
          <input type="password" name="password" className="rounded-lg border-2 p-3" placeholder="password" />
          <button className="w-full border-2 border-black bg-primary py-4 uppercase text-white transition-colors duration-300">Login</button>
          <Link to="/" className="hover:underline">
            Forgot Password or Username?
          </Link>
          <div className="grid grid-cols-[1fr_90px_1fr] items-center">
            <div className="h-[1px] bg-slate-600"></div>
            <div>login with</div>
            <div className="h-[1px] bg-slate-600"></div>
          </div>

          <button className="w-full border-2 bg-red-500 py-4 uppercase text-white transition-colors duration-300">Google</button>

          <div>
            <span className="text-lg">Don't have an account? </span>
            <Link to="/" className="text-lg font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
