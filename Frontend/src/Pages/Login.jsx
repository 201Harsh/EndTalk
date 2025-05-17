import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CheckIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import Axios from "../Config/Axios";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        const UserData = response.data.User;
        localStorage.setItem("name", UserData.name);

        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        setTimeout(() => {
          Navigate("/chat");
        }, 1500);

        setemail("");
        setpassword("");
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }

      const errorArray = error.response.data.errors;

      if (errorArray) {
        errorArray.forEach((error) => {
          toast.error(error.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-[url(https://images.unsplash.com/photo-1699891730676-037bed3c1bed?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover bg-no-repeat overflow-auto">
      <div className="flex h-full w-full justify-center items-center p-4">
        <div className="h-auto min-h-[80%] w-full md:w-4/5 lg:h-4/5 lg:w-3/4 xl:w-2/3 border-gray-100/30 border flex flex-col md:flex-row md:justify-between justify-center bg-[hsla(0,0%,6%,0.5)] rounded-2xl backdrop-blur-xl p-6 md:p-10 shadow-2xl">
          {/* Left side with logo */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center pr-0 md:pr-10 mb-8 md:mb-0">
            <div className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-white/30 rounded-full bg-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center p-6">
              <ShieldCheckIcon className="h-full w-full text-white/90" />
            </div>
            <p className="text-sm md:text-base text-gray-200 mt-6 md:mt-8">
              Powered by{" "}
              <span className="font-semibold text-base md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-sky-400">
                <a href="https://emoaichatbot.onrender.com/" target="_blank">
                  EndGaming AI
                </a>
              </span>
            </p>
          </div>

          {/* Right side with form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8">
              Login to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-400">
                EndTalk
              </span>
            </h1>

            <form
              onSubmit={handleForm}
              className="flex flex-col text-white space-y-4"
            >
              {/* Email Field */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="text-sm font-medium mb-1 flex items-center"
                >
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="EndTalk@gmail.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 pl-10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition"
                  />
                  <EnvelopeIcon className="h-5 w-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="text-sm font-medium mb-1 flex items-center"
                >
                  <LockClosedIcon className="h-4 w-4 mr-2" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    required
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 pl-10 pr-10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition"
                  />
                  <LockClosedIcon className="h-5 w-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                Login
                <ArrowLongRightIcon className="h-5 w-5 ml-2" />
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm flex w-full gap-2">
                New Here? Create Account{" "}
                <Link
                  to="/register"
                  className="text-cyan-300 hover:text-cyan-200 font-medium transition flex items-center justify-center"
                >
                  Register <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
