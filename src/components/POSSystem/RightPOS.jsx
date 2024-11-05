import React from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';

function RightPOS({ products, incrementQuantity, decrementQuantity, totalAmount, onConfirmSale,onChange,customerName }) {
  
  return (
    <div className="flex-1 p-5 bg-white shadow-md rounded-lg ml-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-gray-600 font-bold">POS System</h1>
        <div className="flex-1 flex justify-center mb-4">
          <label className="block text-gray-700 font-medium mt-2 mr-2">Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded w-72"
            placeholder="Enter customer's name"
          />
         
        </div>
        
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-600 uppercase border-b bg-gray-50">
            <tr>
              <th className="py-3 px-6">Product Name</th>
              
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="bg-white text-lg border-b">
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6 flex items-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition duration-200 mr-2"
                    onClick={() => decrementQuantity(product)}
                  >
                    <MinusIcon size={18} />
                  </button>
                  {product.quantity}
                  <button
                    className="text-blue-500 hover:text-blue-700 transition duration-200 ml-2"
                    onClick={() => incrementQuantity(product)}
                  >
                    <PlusIcon size={18} />
                  </button>
                </td>
                <td className="py-4 px-6">&#8377; {product.price * product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex justify-between items-center">
        <h2 className="text-xl text-gray-600 font-semibold">Total Amount: &#8377; {totalAmount}</h2>

        <button
          className="bg-red-300 text-black py-3 px-7 rounded hover:bg-red-400 transition duration-300"
          onClick={onConfirmSale}
        >
          Check Out
        </button>
      </div>
      
    </div>
  );
}

export default RightPOS;