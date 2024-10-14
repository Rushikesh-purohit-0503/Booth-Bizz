import React from 'react';
import { FaStore, FaMoneyBill, FaBoxOpen, FaChartLine } from 'react-icons/fa';

function Left({ stallName, className, onClickExpensetaker, onStallClick, onProductClick, onClickSalesAnalysis }) {
  return (
    <div className={`w-1/4 p-4 bg-white rounded-lg shadow-md ${className}`}>
      <h1 className="text-4xl text-center font-bold mb-6">{stallName}</h1>
      <button onClick={onStallClick} className="block w-full text-left text-black border border-red-400 px-4 py-2 bg-white rounded-lg hover:bg-red-300 transition duration-300 mb-4">
        <FaStore className="inline-block mr-2 w-6 h-6" />
        <span className="text-lg font-normal">Stall Details</span>
      </button>
      <button onClick={onClickExpensetaker} className="block w-full text-left text-black border border-red-400 px-4 py-2 bg-white rounded-lg hover:bg-red-300 transition duration-300 mb-4">
        <FaMoneyBill className="inline-block mr-2 w-6 h-6" />
        <span className="text-lg font-normal">Expense Tracker</span>
      </button>
      <button onClick={onProductClick} className="block w-full text-left text-black border border-red-400 px-4 py-2 bg-white rounded-lg hover:bg-red-300 transition duration-300 mb-4">
        <FaBoxOpen className="inline-block mr-2 w-6 h-6" />
        <span className="text-lg font-normal">Product</span>
      </button>
      <button onClick={onClickSalesAnalysis} className="block w-full text-left text-black border border-red-400 px-4 py-2 bg-white rounded-lg hover:bg-red-300 transition duration-300 mb-4">
        <FaChartLine className="inline-block mr-2 w-6 h-6" />
        <span className="text-lg font-normal">Sales & Analysis</span>
      </button>
    </div>
  );
}

export default Left;
