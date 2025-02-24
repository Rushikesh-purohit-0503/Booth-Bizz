import React from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';


function Right({expenses,totalAmount,onAddExpense,onEditExpense,onDeleteExpense}) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const data = expenses.map((expense, index) => ({
        name: expense.category,
        value: expense.amount,
        color: COLORS[index % COLORS.length]
      }));


  return (
    <div className="w-3/4 p-4 bg-white rounded-lg shadow-md ml-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl  text-gray-600  font-bold">Transactions</h2>
                <div className="flex items-center space-x-4">
                    <p className="text-gray-600 font-medium text-xl">Total Spent - ₹ {parseInt(totalAmount,10)} </p>
                    <button onClick={onAddExpense} className="bg-red-300 px-4 py-2 rounded-md hover:bg-red-400 transition duration-300">
                        Add Expense
                    </button>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-600 border-b">
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
                                <button onClick={()=>onEditExpense(expense)} className="text-blue-400  hover:text-blue-700 hover:cursor-pointer- mr-2">
                                    <PencilIcon size={18} />
                                </button>
                                <button onClick={()=>onDeleteExpense(expense)} className="text-red-400 hover:text-red-700 hover:cursor-pointer">
                                    <TrashIcon size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-12">
                <h2 className="text-xl text-gray-600 font-bold mb-4">Expense Distribution</h2>
                <PieChart width={400} height={400}>
                <Legend layout="horizontal" verticalAlign="top" align="center"/>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    
                    
                </PieChart>
            </div>

        </div>
  )
}

export default Right