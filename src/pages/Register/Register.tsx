import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../customHooks/useApi";
import matchRegex from "../../utils/matchRegex";

type userType = {
  username: string;
  email: string;
  password: string;
};

type RegisterType = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const navigate = useNavigate();

  const [response, loading, error, sendRequest] = useApi<userType>({
    url: "http://localhost:5000/api/v1/auth/register",
    body: {
      username,
      email,
      password,
    },
    method: "post",
  });
  console.log("rendered");

  useEffect(() => {
    if (!error.success && error.code !== "ERR_NETWORK") {
      if (error.response.data.name === "ValidationError") {
        console.log(error.response);
        setErrorMessage("Please provide information");
      }
      if (error.response.data.name === "MongoServerError") {
        setEmailErrorMessage("Email is already registered");
      }
    }

    if (!error.success && error.code === "ERR_NETWORK") {
      setEmailErrorMessage("");
      setErrorMessage("Something went wrong please try again later");
    }

    if (typeof response !== "undefined") {
      setIsSuccess(true);
      setErrorMessage("");
      // setTimeout(() => {
      //   navigate("/login");
      // }, 1000);
    }
  }, [response, loading, error]);

  const handleSubmit = () => {
    if (!email || !username || !password) {
      return setErrorMessage("Please fill value for each field");
    }

    const isMatch = matchRegex(email, /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    if (isMatch) {
      sendRequest();
    } else {
      setEmailErrorMessage("Please provide valid email");
    }
  };

  return (
    <>
      <div className="bg-slate-200 pt-28 pb-8">
        <form
          className="mx-auto w-full rounded-lg bg-white p-8 shadow-xl md:w-[576px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-center text-4xl font-semibold">Register to Jerrell Store</h2>
            <div>
              <input
                type="text"
                required
                name="username"
                placeholder="username"
                className="w-full rounded-lg border-2 p-3"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                required
                name="email"
                placeholder="email"
                className={`rounded-lg border-2 ${!emailErrorMessage ? "" : "border-red-500"} w-full p-3`}
                value={email}
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
                className="w-full rounded-lg border-2 p-3"
                placeholder="password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {errorMessage ? <span className="mt-2 text-red-500">{errorMessage}</span> : ""}

            <button className="w-full border-2 border-black bg-primary py-4 uppercase text-white transition-colors duration-300">{loading ? "loading" : "register"}</button>
          </div>
        </form>
      </div>

      <div className={`${isSuccess ? "visible" : "invisible"}`}>
        <div className="fixed left-0 right-0 bottom-0 top-0 z-10 bg-black opacity-40"></div>
        <div className="fixed left-0 right-0 bottom-0 top-0 z-20 pt-20">
          <div className="absolute top-1/2 left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 lg:w-1/2">
            <h4 className="mb-2 text-3xl font-medium uppercase">registered successfully</h4>
            <p>Your account is successfully registered</p>
          </div>
        </div>
      </div>
    </>
  );
}
