import React from 'react'

function Left() {
  return (
    <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-6">Stall 1</h1>
    <button className="block w-full text-left bg-red-200 text-black px-4 py-2 rounded-xl hover:bg-red-300 transition duration-300 mb-4">
        Expense Tracker
    </button>
    <button className="block w-full text-left bg-red-200 text-black px-4 py-2 rounded-xl hover:bg-red-300 transition duration-300">
        POS Tracker
    </button>
</div>
  )
}

export default Left