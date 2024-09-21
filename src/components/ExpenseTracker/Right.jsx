import React from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react';
function Right({expenses,totalAmount,...prop}) {
  return (
    <div className="w-3/4 p-4 bg-white rounded-lg shadow-md ml-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Transactions</h2>
                <div className="flex items-center space-x-4">
                    <p className="text-gray-600">Amount - {totalAmount} ₹</p>
                    <button className="bg-red-200 px-4 py-2 rounded-md hover:bg-red-300 transition duration-300">
                        Add Expense
                    </button>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="text-left border-b">
                        <th className="pb-2">Date</th>
                        <th className="pb-2">Description</th>
                        <th className="pb-2">Category</th>
                        <th className="pb-2">Amount</th>
                        <th className="pb-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                            <td className="py-3">{expense.date}</td>
                            <td className="py-3">{expense.description}</td>
                            <td className="py-3">{expense.category}</td>
                            <td className="py-3">₹ {expense.amount}</td>
                            <td className="py-3 flex items-center">
                                <button className="text-blue-500 hover:text-blue-600 mr-2">
                                    <PencilIcon size={18} />
                                </button>
                                <button className="text-red-500 hover:text-red-600">
                                    <TrashIcon size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default Right