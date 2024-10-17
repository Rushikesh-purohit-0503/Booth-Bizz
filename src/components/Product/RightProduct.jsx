import React from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';

function RightProduct({ products, onAddProduct, totalAmount,onEditProduct, onDeleteProduct, onStartPOS }) {
  if (!products || !Array.isArray(products)) {
    return <div>No products available</div>; // Handling if products are not available
  }
 
  return (
    
    <div className="flex-1 p-5 bg-white shadow-md rounded-lg  ml-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-gray-600 font-semibold">Catalogue</h1>
        <div>
          <button
            className="bg-red-300 text-black py-2 px-4 rounded hover:bg-red-400 transition duration-300 mr-2"
            onClick={onAddProduct}
          >
            Add Product
          </button>
          <button
            className="bg-red-300 text-black py-2 px-4 rounded hover:bg-red-400 transition duration-300 mr-2"
            onClick={onStartPOS}
          >
            Start POS
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-600 uppercase bg-gray-50">
            <tr className='border-b'>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="bg-white text-lg border-b">
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">₹{product.price}</td>
                <td className="py-4 px-6">{product.quantity}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onEditProduct(product)}
                    className="text-blue-500 hover:text-blue-800 mr-2"
                  >
                    <PencilIcon size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product)}
                    className="text-red-500 hover:text-red-800"
                  >
                    <TrashIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-5">
        <h2 className="text-xl text-gray-600 font-semibold">Total Amount(per unit): &#8377; {totalAmount}</h2>
      </div> */}
    </div>
  );
}

export default RightProduct;
