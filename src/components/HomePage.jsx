import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import HomeImg from "../assets/HomePage.png"

// import "../styles/HomePage.css"
function HomePage() {
    const authStatus=useSelector((state)=>(state.auth.status))


  if (!authStatus || authStatus){
    return (
      <div className="bg-pink-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-5xl font-bold mb-4">
              Elevate Your Business on Stalls with{' '}
              <span className="bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Seamless Management
              </span>{' '}
              and Smart Sales.
            </h1>
            <p className="text-gray-600 text-lg mb-5 font-bold font">
              BoothBiz streamlines your business with intuitive management tools and smart sales solutions for any event or market.
            </p>
            <Link
              to="/signin"
              className="inline-block bg-red-300 text-black px-8 py-3 rounded-lg font-semibold hover:bg-red-400 transition duration-300"
            >
              Explore
            </Link>
          </div>
          <div className="w-full mt-0 mb-10">
            <img
              src={HomeImg}
              alt="Stall Management Illustration"
              className="w-full h-auto rounded-lg "
            />
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage