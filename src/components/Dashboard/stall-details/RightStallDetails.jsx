import React from 'react'

function RightStallDetails({src,eventName,product,location}) {
  return (
    <div className="flex-grow p-4 h-screen bg-white rounded-lg shadow-md ml-4  flex items-center justify-center">
    <div className="flex flex-col items-center justify-center p-5 bg-[#f7f0f7] rounded-lg shadow-md ">
      <div className="stall-image mb-5 w-full">
        <img src={src} alt="Stall" className="w-full rounded-lg shadow-md" />
      </div>
      <div className="stall-info text-center text-gray-800 w-full">
        <h1 className="text-2xl font-bold mb-2">{eventName}</h1>
        <h2 className="text-xl mb-2">Product Category: {product}</h2>
        <p className="text-lg">{location}</p>
      </div>
    </div>
  </div>
  )
}

export default RightStallDetails