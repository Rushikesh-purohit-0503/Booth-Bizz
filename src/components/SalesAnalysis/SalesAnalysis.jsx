import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { XIcon,Trash } from 'lucide-react'; // Importing the cross icon
import Left from '../ExpenseTracker/Left';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SalesAnalysis = () => {
    const [saleData, setSalesData] = useState([]);
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status)
    const stall = useSelector((state) => state.stall.clickedStall)
    useEffect(() => {
        if (!authStatus) {
            navigate('/signin')
        }
    }, [authStatus, navigate]);
    useEffect(() => {
        const allSalesDataFromStorage = localStorage.getItem('allSalesData');
        if (allSalesDataFromStorage) {
            const parsedData = JSON.parse(allSalesDataFromStorage);

            // Flatten and map the data to add customer name and transaction IDs
            const processedData = parsedData.flatMap((sale, saleIndex) =>
                sale.products.map((product, productIndex) => ({
                    ...product,
                    customerName: sale.customerName,
                    transactionId: `${saleIndex + 1}-${productIndex + 1}`, // Sequential ID for each transaction
                }))
            );

            setSalesData(processedData);
        } else {
            navigate('/pos'); // Navigate back to POS system or handle as needed
        }
    }, [navigate]);
    useEffect(()=>{

    },[])
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
    
    
    // useEffect(()=>{},[]) Handle Total Spent Coming form POS



    const [showMore, setShowMore] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const aggregatedData = aggregateData(saleData);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, transactionId: null });
    const totalSales = aggregatedData.reduce((sum, item) => sum + item.sales, 0);
    const totalQuantitySold = aggregatedData.reduce((sum, item) => sum + Number(item.quantity), 0);
    const totalSpent=(localStorage.getItem('totalamount'))
    const displayedData = showMore ? saleData : saleData.slice(0, 10);

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
        const updatedSalesData = saleData.filter((item) => item.transactionId !== transactionId);

        // Update state to reflect the deletion
        setSalesData(updatedSalesData);

        // Re-structure sales data into an array to update localStorage
        const updatedLocalStorageData = [];

        updatedSalesData.forEach(item => {
            const existingSale = updatedLocalStorageData.find(sale => sale.customerName === item.customerName);

            if (existingSale) {
                existingSale.products.push({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    sales: item.sales
                });
            } else {
                updatedLocalStorageData.push({
                    customerName: item.customerName,
                    products: [{
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        sales: item.sales
                    }]
                });
            }
        });

        // Update the localStorage with the updated sales data
        localStorage.setItem('allSalesData', JSON.stringify(updatedLocalStorageData));
        closeDeleteConfirmation();
    };


    return (
        <div className='flex min-h-screen bg-pink-50 p-6'>
            <Left stallName={stall.stallName} onClickExpensetaker={() => navigate('/expense-tracker')} onProductClick={() => navigate('/product')} onStallClick={() => navigate('/stall-details')} />
            <div className='w-3/4 ml-4'>
                <div className="p-5 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl text-gray-600 font-bold mb-5">Sales Overview & Product Management</h1>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Total Sales Amount</h2>
                            <p className="text-2xl text-gray-600 font-bold">₹{totalSales.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Total Product Sales (Quantity)</h2>
                            <p className="text-2xl text-gray-600 font-bold">₹{totalQuantitySold}</p>
                        </div>
                   
                       
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Total Amount Spent </h2>
                            <p className="text-2xl text-gray-600 font-bold">{(totalSpent)}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Revenue</h2>
                            <p className="text-2xl text-gray-600 font-bold">{(-1)*(totalSpent-totalSales)}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow mb-4">
                        <h2 className="text-lg text-gray-600 font-semibold">Sales Entries</h2>
                        <div className="overflow-y-auto max-h-60">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left text-gray-600 border-b">
                                        <th className="pb-2">Transaction ID</th>
                                        <th className="pb-2">Customer Name</th>
                                        <th className="pb-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData.map((item) => (
                                        <tr key={item.transactionId} className="border-b last:border-b-0 cursor-pointer" onClick={() => handleRowClick(item)}>
                                            <td className="text-gray-600 py-3">{item.transactionId}</td>
                                            <td className="text-gray-600 py-3">{item.customerName}</td>
                                            <td className="text-gray-600 py-3">₹{item.sales}</td>
                                            <td>
                                                <button
                                                    className="text-red-300 hover:underline"
                                                    onClick={(e) => handleDeleteClick(e, item.transactionId)}
                                                >
                                                   <Trash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {saleData.length > 10 && (
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
                                <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={closeModal}>
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
                    {deleteConfirmation.isOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                                <p>Are you sure you want to delete this transaction?</p>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        className="px-4 py-2 bg-gray-200  text-gray-800 hover:bg-gray-300 rounded mr-2"
                                        onClick={closeDeleteConfirmation}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-300 hover:bg-red-400 text-black rounded"
                                        onClick={handleDeleteTransaction}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesAnalysis;
