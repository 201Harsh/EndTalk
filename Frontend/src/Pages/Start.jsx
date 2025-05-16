import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Start = () => {
  return (
    <div className="h-screen w-screen bg-[url(https://images.unsplash.com/photo-1699891730676-037bed3c1bed?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover bg-no-repeat overflow-auto">
      <div className="flex h-full w-full justify-center items-center p-4">
        <div className="h-auto min-h-[80%] w-full md:w-4/5 lg:h-4/5 border-gray-100 border-2 flex flex-col md:flex-row md:justify-between justify-center bg-[hsla(0,0%,6%,0.4)] rounded-xl backdrop-blur-xl p-4 md:p-8">
          {/* Left side with image - hidden on small screens unless needed */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center pr-0 md:pr-8 mb-6 md:mb-0">
            <div className="md:w-4/5 w-56 h-56 sm:h-64 md:h-3/4 rounded-full bg-white overflow-hidden">
              <img
                src="/harsh.jpg"
                alt="Welcome"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <p className="text-sm md:text-base text-gray-200 mt-4 md:mt-6">
              Made with❤️by{" "}
              <span className="font-semibold text-base md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-sky-500 ">
                Harsh
              </span>
            </p>
          </div>

          {/* Right side with content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Welcome to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-[#01B9CC]">
                EndTalk
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8">
              Connect with people from around the world in real-time
              conversations. Our platform makes it easy to meet new friends,
              share ideas, and build meaningful connections.
            </p>
            <button className="bg-blue-500 cursor-pointer flex items-center gap-4 justify-center hover:bg-blue-600 text-white font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg w-full sm:w-fit transition duration-300">
              Get Started <FaArrowRight />
            </button>

            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center">
              <div className="flex -space-x-2 mb-2 sm:mb-0">
                {[1, 2, 3, 4].map((item) => (
                  <img
                    key={item}
                    src={`https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? "women" : "men"
                    }/${item + 20}.jpg`}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
                    alt={`User ${item}`}
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base sm:ml-4 text-gray-300 text-center sm:text-left">
                Join 10,000+ active users
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
