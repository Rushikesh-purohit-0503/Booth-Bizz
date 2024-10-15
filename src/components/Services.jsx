import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ExpenseImg from "../assets/events-image.png"
import StallImg from "../assets/stall-image.png"
import PosImg from "../assets/Pos-image.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';



function Service() {


 return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
                             

    <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 mt-10">
      Our Services 
    </h1>      
    <div className="max-w-7xl w-full flex flex-col md:flex-row items-start justify-between gap-12 mb-28 mt-5">
      <div className="w-full mb-8 md:mb-0 md:mr-8">
          <img
            src={ExpenseImg}
            alt="Stall Management Illustration"
            className="w-full h-auto rounded-3xl shadow-2xl "
          />
        </div>

        <div className="max-w-xl mb-8 md:mb-0 md:mr-8">
          <h2 className="text-5xl md:text-5xl font-bold mb-4">
          A Quick 4-Step {' '}
            <span className="bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Expense
            </span>{' '}
            Tracking Software.
          </h2>
          <p className="text-gray-600 text-lg mb-5 font-semibold font">
            Enter the date, description, category, and amount to add an expense. Easily edit or 
             entries as needed. Customize your categories for more personalized tracking. 
              All of this, and more, is simple and efficient with our Expense Tracker          </p>
          <Link
            to="/signin"
            className="inline-block bg-red-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Explore Feature
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>
        
      </div>

      {/* Stall */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 mb-28 mt-8">
        <div className="max-w-xl text mb-8 md:mb-0 md:mr-8">
          <h1 className="text-5xl md:text-5xl font-bold mb-4">
            A Quick & Versatile Solution for Managing your{' '}
            <span className="bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Stalls
            </span>{' '}
            .
          </h1>
          <p className="text-gray-600 text-lg mb-5 font-semibold font">
            Add single or multiple stalls for various events, all displayed in one convenient place. 
            Track details such as expenses and POS data. Experience efficient and comprehensive stall management 
            with our platform.            
          </p>
          <Link
            to="/signin"
            className="inline-block bg-red-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Explore Feature
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>

        <div className="w-full mb-8 md:mb-0 md:mr-8">
          <img
            src={StallImg}
            alt="Stall Management Illustration"
            className="w-full h-auto rounded-3xl shadow-2xl"
          />
        </div>
      </div>


      {/* POS Tracker */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-start justify-between gap-12 mb-28 mt-8">
      <div className="w-full mb-8 md:mb-0 md:mr-8">
          <img
            src={PosImg}
            alt="Stall Management Illustration"
            className="w-full h-auto rounded-3xl shadow-2xl "
          />
        </div>

        <div className="max-w-xl mb-8 md:mb-0 md:mr-8">
          <h2 className="text-5xl md:text-5xl font-bold mb-4">
            Streamline Your Sales with Our {' '}
            <span className="bg-gradient-to-r  from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Point of Sales(POS)
            </span>{' '}
            System.
          </h2>
          <p className="text-gray-600 text-lg mb-5 font-semibold font">
            Optimize your business with real-time inventory and sales analytics. 
            Perfect for retailers and vendors. Enhance efficiency and customer experience with our user-friendly POS solution.
          </p>
          <Link
            to="/signin"
            className="inline-block bg-red-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Explore Feature
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>
        
      </div>

    </div>
  )
}

export default Service