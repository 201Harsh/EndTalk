import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[hsla(0,0%,6%,0.9)] flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Pulsing outer circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 animate-ping opacity-75"></div>
          {/* Solid inner circle with icon */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* App name with gradient text */}
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-400 mb-2">
          EndTalk
        </h2>

        {/* Loading text */}
        <p className="text-white/70 mb-6">Loading your conversations...</p>

        {/* Animated progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full"
            style={{
              animation: "loading 2s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
