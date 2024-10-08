import React from 'react'

function Left({stallName,className,onClickExpensetaker,onStallClick,onProductClick,onClickSalesAnalysis}) {

 
  return (
    <div className={`w-1/4 p-4 bg-white rounded-lg   shadow-md ${className}` } >
    <h1 className="text-2xl text-center font-bold mb-6">{stallName}</h1>
    <button onClick={(onStallClick)} className="block w-full text-left  text-black px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400  transition duration-300 mb-4">
        Stall Details
    </button>
    <button onClick={(onClickExpensetaker)} className="block w-full text-left  text-black px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400  transition duration-300 mb-4">
        Expense Tracker
    </button>
    <button onClick={onProductClick} className="block w-full text-left  text-black px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 transition duration-300 mb-4">
        Product
    </button>
    <button onClick={onClickSalesAnalysis} className="block w-full text-left  text-black px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 transition duration-300 mb-4">
        Sales & Analysis
    </button>
</div>
  )
}

export default Left