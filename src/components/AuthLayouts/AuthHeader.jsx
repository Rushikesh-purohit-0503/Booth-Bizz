import React from "react";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <header className="bg-white flex justify-between items-center p-4 shadow-lg sticky">
      <div className="text-2xl font-bold text-black">
        <Link to="/" className="no-underline text-black">BoothBiz</Link>
      </div>
      
      <h2 className="text-2xl font-bold text-center mx-auto">
        Elevate Your Business on Stalls with{" "}
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Seamless Management
        </span>{" "}
        and Smart Sales.
      </h2>
    </header>
  );
};

export default AuthHeader;
