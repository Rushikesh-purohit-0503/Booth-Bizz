import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { XIcon, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AllStallsAnalysis = () => {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const stall = useSelector((state) => state.stall);

    useState(() => {
        if (!authStatus) {
            navigate('/signin');
        }
    }, [authStatus, navigate]);

    // Static data for demonstration
    const stallData = [
        { name: 'Stall 1', sales: 1500, quantity: 30, expense: 1000 },
        { name: 'Stall 2', sales: 2000, quantity: 40, expense: 1200 },
        { name: 'Stall 3', sales: 2500, quantity: 50, expense: 1500 },
        { name: 'Stall 4', sales: 3000, quantity: 60, expense: 1800 }
    ];

    const aggregateData = (data) => {
        return data;
    };

    const [showMore, setShowMore] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const aggregatedData = aggregateData(stallData);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, transactionId: null });
    const totalSales = aggregatedData.reduce((sum, item) => sum + item.sales, 0);
    const totalSpent = aggregatedData.reduce((sum, item) => sum + item.expense, 0);
    const totalRevenue = totalSales - totalSpent;
    const displayedData = showMore ? stallData : stallData.slice(0, 10);

    const handleRowClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
    };

    const handleDeleteClick = (e, transactionId) => {
        e.stopPropagation();
        setDeleteConfirmation({ isOpen: true, transactionId });
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({ isOpen: false, transactionId: null });
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleDeleteTransaction = () => {
        const { transactionId } = deleteConfirmation;
        // Filter out the transaction to be deleted from the saleData array
        const updatedSalesData = stallData.filter((item, index) => index !== transactionId);
        
        // Update state to reflect the deletion
        setSalesData(updatedSalesData);
        closeDeleteConfirmation();
    };

    // Calculate Best Performing Stall (assuming it has the highest sales)
    const bestPerformingStall = aggregatedData.reduce((prev, current) => (prev.sales > current.sales) ? prev : current, {});

    return (
        <div className='flex min-h-screen bg-pink-50 p-6'>
            <div className='w-full ml-4'>
                <div className="p-5 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl text-gray-600 font-bold mb-5">Overall Sales Analysis</h1>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Total Sales Amount (All Stalls)</h2>
                            <p className="text-2xl text-gray-600 font-bold">₹{totalSales.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Total Amount Spent (All Stalls)</h2>
                            <p className="text-2xl text-gray-600 font-bold">₹{totalSpent.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Overall Revenue (All Stalls)</h2>
                            <p className="text-2xl text-gray-600 font-bold">₹{totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Best Performing Stall</h2>
                            <p className="text-2xl text-gray-600 font-bold">{bestPerformingStall.name}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow mb-4">
                        <h2 className="text-lg text-gray-600 font-semibold">Performance Stats of All Stalls</h2>
                        <div className="overflow-y-auto max-h-60">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left text-gray-600 border-b">
                                        <th className="pb-2">Stall No.</th>
                                        <th className="pb-2">Expense</th>
                                        <th className="pb-2">Sales</th>
                                        <th className="pb-2">Revenue</th>
                                        <th className="pb-2"></th> {/* Added for delete button */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData.map((item, index) => (
                                        <tr key={index} className="border-b last:border-b-0 cursor-pointer" onClick={() => handleRowClick(item)}>
                                            <td className="text-gray-600 py-3">{index + 1}</td>
                                            <td className="text-gray-600 py-3">₹{item.expense.toLocaleString()}</td>
                                            <td className="text-gray-600 py-3">₹{item.sales.toLocaleString()}</td>
                                            <td className="text-gray-600 py-3">₹{(item.sales - item.expense).toLocaleString()}</td>
                                            <td className="py-3">
                                                <button
                                                    className="text-red-300 hover:underline"
                                                    onClick={(e) => handleDeleteClick(e, index)}
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {stallData.length > 10 && (
                            <button className="mt-2 text-blue-500 hover:underline" onClick={() => setShowMore(!showMore)}>
                                {showMore ? 'SEE LESS' : 'SEE MORE'}
                            </button>
                        )}
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg text-gray-600 font-semibold">Product Sales Overview</h2>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={aggregatedData} margin={{ top: 40, right: 10, bottom: 10, left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="sales" fill="#f89b94" barSize={30}>
                                        <LabelList dataKey="sales" position="top" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {selectedTransaction && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={handleOutsideClick}>
                    <div className="bg-white p-4 rounded shadow-lg w-1/3 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            onClick={closeModal}
                        >
                            <XIcon size={20} />
                        </button>
                        <h2 className="text-lg text-gray-600 font-semibold mb-2">Transaction Details</h2>
                        <p className="text-gray-600"><strong>Customer Name:</strong> {selectedTransaction.customerName}</p>
                        <p className="text-gray-600"><strong>Product Name:</strong> {selectedTransaction.name}</p>
                        <p className="text-gray-600"><strong>Sales:</strong> ₹{selectedTransaction.sales}</p>
                        <p className="text-gray-600"><strong>Quantity:</strong> {selectedTransaction.quantity}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDeleteClick(selectedTransaction.transactionId)}
                        >
                            Delete Transaction
                        </button>
                    </div>
                </div>
            )}

            {deleteConfirmation.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={handleOutsideClick}>
                    <div className="bg-white p-4 rounded shadow-lg w-1/3">
                        <h2 className="text-lg text-gray-600 font-semibold mb-4">Delete Confirmation</h2>
                        <p className="text-gray-600">Are you sure you want to delete this transaction?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={handleDeleteTransaction}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={closeDeleteConfirmation}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllStallsAnalysis;
