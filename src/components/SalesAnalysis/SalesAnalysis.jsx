import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { XIcon } from 'lucide-react'; // Importing the cross icon



const SalesAnalysis = () => {
    const data = [
        { transactionId: 1, customerName: 'Alice', name: 'Nachos', price: 50, quantity: 80, sales: 4000 },
        { transactionId: 2, customerName: 'Bob', name: 'Brownie', price: 70, quantity: 60, sales: 3000 },
        { transactionId: 3, customerName: 'Charlie', name: 'Nachos', price: 100, quantity: 25, sales: 2500 },
        // Add more entries here if needed
    ];

    const aggregateData = (data) => {
        const aggregated = data.reduce((acc, item) => {
            const existingProduct = acc.find(p => p.name === item.name);
            if (existingProduct) {
                existingProduct.sales += item.sales;
                existingProduct.quantity += item.quantity;
            } else {
                acc.push({ ...item });
            }
            return acc;
        }, []);
        return aggregated;
    };
    const [showMore, setShowMore] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const aggregatedData = aggregateData(data);

    const totalSales = aggregatedData.reduce((sum, item) => sum + item.sales, 0);
    const totalQuantitySold = aggregatedData.reduce((sum, item) => sum + item.quantity, 0);

    const displayedData = showMore ? data : data.slice(0, 10);

    const handleRowClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="p-5 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-5">Sales Overview & Product Management</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Sales Amount</h2>
                    <p className="text-2xl font-bold">₹{totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Product Sales (Quantity)</h2>
                    <p className="text-2xl font-bold">{totalQuantitySold}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold">Sales Entries</h2>
                <div className="overflow-y-auto max-h-60">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="pb-2">Transaction ID</th>
                                <th className="pb-2">Customer Name</th>
                                <th className="pb-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((item) => (
                                <tr key={item.transactionId} className="border-b last:border-b-0 cursor-pointer" onClick={() => handleRowClick(item)}>
                                    <td className="py-3">{item.transactionId}</td>
                                    <td className="py-3">{item.customerName}</td>
                                    <td className="py-3">₹{item.sales}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.length > 10 && (
                    <button
                        className="mt-2 text-blue-500 hover:underline"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? 'SEE LESS' : 'SEE MORE'}
                    </button>
                )}
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">Product Sales Overview</h2>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={aggregatedData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
                            <Bar dataKey="sales" fill="#f89b94" barSize={30}>
                                <LabelList dataKey="name" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {selectedTransaction && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center" onClick={handleOutsideClick}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                            onClick={closeModal}
                        >
                            <XIcon size={24} />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
                        <p className="mb-2"><strong>Transaction ID:</strong> {selectedTransaction.transactionId}</p>
                        <p className="mb-2"><strong>Customer Name:</strong> {selectedTransaction.customerName}</p>
                        <p className="mb-2"><strong>Product:</strong> {selectedTransaction.name}</p>
                        <p className="mb-2"><strong>Price (Per Product):</strong> ₹{selectedTransaction.price}</p>
                        <p className="mb-2"><strong>Quantity:</strong> {selectedTransaction.quantity}</p>
                        <p><strong>Sales:</strong> ₹{selectedTransaction.sales}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesAnalysis