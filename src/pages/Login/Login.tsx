import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import usePost from "../../customHooks/usePost";
import matchRegex from "../../utils/matchRegex";
import { useCookies } from "react-cookie";

type LoginApiResponse = {
  username: string;
  token: string;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [cookies, setCookie] = useCookies(["token"]);

  const [response, loading, error, sendRequest, setSendRequest] = usePost<LoginApiResponse>({
    url: "http://localhost:5000/api/v1/auth/login",
    method: "post",
    body: {
      email,
      password,
    },
  });

  useEffect(() => {
    if (!error.success && error.code !== "ERR_NETWORK") {
      if (error.response.data.message === "incorrect password") {
        setPasswordErrorMessage("Incorrect password");
      } else if (error.response.data.message === "email is not registered") {
        setEmailErrorMessage("Email is not registered");
      } else {
        setErrorMessage(error.response.data.message);
      }
    }

    if (!error.success && error.code === "ERR_NETWORK") {
      setErrorMessage("Something went wrong please try again later");
    }

    if (typeof response !== "undefined") {
      setCookie("token", response.token, { path: "/" });
      console.log(response);
    }
  }, [response, loading, error]);

  const handleSubmit = () => {
    if (!email || !password) {
      setErrorMessage("Please fill value for each field");
    }
    const isMatch = matchRegex(email, /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (isMatch) {
      setSendRequest(true);
    } else {
      setEmailErrorMessage("Please provide valid email");
    }
  };

  return (
    <div className="bg-slate-200 pt-28 pb-8">
      <form
        action=""
        className="mx-auto w-full rounded-lg bg-white p-8 shadow-xl md:w-[576px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-4xl font-semibold">Login to Jerrell Store</h2>
          <div>
            <input
              type="text"
              name="email"
              placeholder="email"
              className={`rounded-lg border-2 ${!emailErrorMessage ? "" : "border-red-500"} w-full p-3`}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <span className="mt-2 text-red-500">{emailErrorMessage}</span>
          </div>

          <div>
            <input
              type="password"
              name="password"
              className={`rounded-lg border-2 ${!passwordErrorMessage ? "" : "border-red-500"} w-full p-3`}
              required
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span className="mt-2 text-red-500">{passwordErrorMessage}</span>
          </div>

          {errorMessage ? <span className="mt-2 text-red-500">{errorMessage}</span> : ""}
          <button className="w-full border-2 border-black bg-primary py-4 uppercase text-white transition-colors duration-300">Login</button>
          <Link to="/" className="text-center hover:underline">
            Forgot Password or Username?
          </Link>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="h-[1px] bg-slate-600"></div>
            <div className="px-3 text-center">Login with</div>
            <div className="h-[1px] bg-slate-600"></div>
          </div>

          <button className="w-full border-2 bg-red-500 py-4 uppercase text-white transition-colors duration-300">Google</button>

          <div className="text-center">
            <span className="text-lg">Don't have an account? </span>
            <Link to="/register" className="text-lg font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
      <p>{loading ? "LOADINGGGGGGG" : ""}</p>
    </div>
  );
}

export default Login;
