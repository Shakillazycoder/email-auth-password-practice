import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import {
    sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../Firebase/Firebase.init";

const Login = () => {
    const [loginError, SetLoginError] = useState("");
  const [login, setLogin] = useState("");
  const [ShowPassword, SetShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setLogin("");
    SetLoginError("");

    if (password.length < 6) {
      SetLoginError("Password must be at least 6 characters");
      return;
    } else if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    ) {
      SetLoginError(
        "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      );
      return;
    }

    // login user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setLogin("login successfully");
        } else SetLoginError("Please verify your email");
      })
      .catch((error) => {
        console.log(error.message);
        SetLoginError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("please provide an email address");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      alert("please write a valid email");
      return;
    }

    // send password reset email
     sendPasswordResetEmail(auth, email)
     .then(() => {
        alert("password reset email sent");
      })
     .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4">
                  Sign in to your account and explore a world of possibilities.
                  Your journey begins here.
                </p>
              </div>
              <div>
                <label className="text-sm mb-2 block">User Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    ref={emailRef}
                    required
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    placeholder="Enter Your Email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={ShowPassword ? "text" : "password"}
                    required
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                    placeholder="Enter password"
                  />
                  {/* ShowPassword */}
                  <span
                    onClick={() => SetShowPassword(!ShowPassword)}
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                  >
                    {ShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    onClick={handleForgetPassword}
                    href="#"
                    className="text-blue-600 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="!mt-10">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none"
                >
                  Log in
                </button>
              </div>
              <p className="text-sm !mt-10 text-center">
                Don&apos;t have an account{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap cursor-pointer font-bold"
                >
                  Register here
                </Link>
              </p>
            </form>
            {loginError && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3"
                role="alert"
              >
                <p className="font-bold">{loginError}</p>
              </div>
            )}
            {login && (
              <p className="text-center text-green-500 text-2xl font-bold">
                {login}
              </p>
            )}
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-10">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
