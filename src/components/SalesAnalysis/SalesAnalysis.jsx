import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { XIcon, Trash } from 'lucide-react'; // Importing the cross icon
import Left from '../ExpenseTracker/Left';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StallManagement from '../../firebase/Backend/stallManagement';
const SalesAnalysis = () => {
    const [saleData, setSalesData] = useState([]);
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status)
    const stall = useSelector((state) => state.stall.clickedStall)
    const user = useSelector((state) => state.auth.userData)
    const [totalSpent, setTotalSpent] = useState(0)
    const [graphData, setGraphData] = useState([])
    useEffect(() => {
        if (!authStatus) {
            navigate('/signin')
        }
    }, [authStatus, navigate]);
    const stallManagement = useMemo(() => new StallManagement({ uid: user.uid }), [user.uid]);



    // Fetch POS data from Firestore on component load
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const salesData = await stallManagement.getPOS(stall.id); // Fetch POS data using stall ID
                console.log("sale data", salesData);

                const processedData = salesData.flatMap((sale) =>
                    sale.products.map((product) => ({
                        ...product,
                        customerName: sale.customerName,
                        transactionId: sale.transactionId, // Use UUID-based ID
                        totalAmount: sale.totalAmount,
                        date: new Date(sale.date).toLocaleDateString(),
                    }))
                );
                // console.log("processed data",processedData);

                const expense = await stallManagement.getExpenses(stall.id);
                const totalSpentAmount = expense.reduce((sum, expense) => Number(sum) + Number(expense.amount), 0);
                setTotalSpent(totalSpentAmount);

                // Call the aggregation function here
                const aggregatedData = aggregateData(processedData);
                setSalesData(aggregatedData);
                console.log(aggregatedData);
                const graphData = getGraphData(aggregatedData);
                setGraphData(graphData); // A
            } catch (error) {
                console.error("Error fetching sales data:", error);
                // Handle error by redirecting to POS system
            }
        };

        fetchSalesData();
    }, [navigate, stall.id]);


    const getGraphData = (aggregatedData) => {
        const productSales = {};

        aggregatedData.forEach(transaction => {
            transaction.products.forEach(product => {
                if (!productSales[product.name]) {
                    productSales[product.name] = {
                        name: product.name,
                        sales: 0,
                        price: product.price // Store product price if needed
                    };
                }
                productSales[product.name].sales += product.sales;
            });
        });

        return Object.values(productSales);
    };


    const aggregateData = (data) => {
        const aggregated = data.reduce((acc, item) => {
            // console.log("Processing Item:", item); 

            const existingTransaction = acc.find(t => t.transactionId === item.transactionId);

            // Handle existing transaction
            if (existingTransaction) {
                existingTransaction.sales += Number(item.sales);
                existingTransaction.quantity += Number(item.quantity);

                // Check if the product already exists in the existing transaction
                const existingProduct = existingTransaction.products.find(p => p.name === item.name);
                if (existingProduct) {
                    // Update quantity and sales for the existing product
                    existingProduct.quantity += Number(item.quantity);
                    existingProduct.sales += Number(item.sales); // Update sales if necessary
                } else {
                    // Add new product to the existing transaction
                    existingTransaction.products.push({
                        name: item.name,
                        price: item.price,
                        quantity: Number(item.quantity),
                        sales: Number(item.sales) // Initialize sales for the new product
                    });
                }
            } else {
                // Create a new transaction entry if it doesn't exist
                acc.push({
                    transactionId: item.transactionId,
                    customerName: item.customerName,
                    date: item.date,
                    sales: Number(item.sales), // Initialize sales for the new transaction
                    quantity: Number(item.quantity), // Initialize quantity for the new transaction
                    products: [{
                        name: item.name,
                        price: item.price,
                        quantity: Number(item.quantity),
                        sales: Number(item.sales) // Initialize sales for the product
                    }],
                });
            }

            return acc;
        }, []);

        return aggregated;
    };


    // useEffect(()=>{},[]) Handle Total Spent Coming form POS



    const [showMore, setShowMore] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const aggregatedData = saleData
    // console.log(aggregatedData);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, transactionId: null });
    const totalSales = saleData.reduce((sum, item) => sum + item.sales, 0);
    const totalQuantitySold = saleData.reduce((sum, item) => sum + Number(item.quantity), 0);

    const displayedData = showMore ? aggregatedData : aggregatedData.slice(0, 10);

    const handleRowClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
    };
    // const handleDeleteClick = (e, transactionId) => {
    //     e.stopPropagation();
    //     setDeleteConfirmation({ isOpen: true, transactionId });
    // };
    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({ isOpen: false, transactionId: null });
    };
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    // const handleDeleteTransaction = () => {
    //     const { transactionId } = deleteConfirmation;
    //     // Filter out the transaction to be deleted from the saleData array
    //     const updatedSalesData = saleData.filter((item) => item.transactionId !== transactionId);

    //     // Update state to reflect the deletion
    //     setSalesData(updatedSalesData);

    //     // Re-structure sales data into an array to update localStorage
    //     const updatedLocalStorageData = [];

    //     updatedSalesData.forEach(item => {
    //         const existingSale = updatedLocalStorageData.find(sale => sale.customerName === item.customerName);

    //         if (existingSale) {
    //             existingSale.products.push({
    //                 name: item.name,
    //                 price: item.price,
    //                 quantity: item.quantity,
    //                 sales: item.sales
    //             });
    //         } else {
    //             updatedLocalStorageData.push({
    //                 customerName: item.customerName,
    //                 products: [{
    //                     name: item.name,
    //                     price: item.price,
    //                     quantity: item.quantity,
    //                     sales: item.sales
    //                 }]
    //             });
    //         }
    //     });

    //     // Update the localStorage with the updated sales data
    //     localStorage.setItem('allSalesData', JSON.stringify(updatedLocalStorageData));
    //     closeDeleteConfirmation();
    // };


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
                            <p className="text-2xl text-gray-600 font-bold">{totalQuantitySold}</p>
                        </div>


                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Total Amount Spent </h2>
                            <p className="text-2xl text-gray-600 font-bold">₹{(totalSpent)}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg text-gray-600 font-semibold">Revenue</h2>
                            <p className="text-2xl text-gray-600 font-bold">₹{  (totalSales-totalSpent)}</p>
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
                                            {/* <td>
                                                <button
                                                    className="text-red-300 hover:underline"
                                                    onClick={(e) => handleDeleteClick(e, item.transactionId)}
                                                >
                                                   <Trash size={18} />
                                                </button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {aggregatedData.length > 10 && (
                            <button className="mt-2 text-blue-500 hover:underline" onClick={() => setShowMore(!showMore)}>
                                {showMore ? 'SEE LESS' : 'SEE MORE'}
                            </button>
                        )}
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg text-gray-600 font-semibold">Product Sales Overview</h2>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={graphData} margin={{ top: 40, right: 10, bottom: 10, left: 10 }}>
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
                                <p className="mb-2"><strong>Date:</strong> {selectedTransaction.date}</p>
                                <h3 className= "font-bold text-lg mt-4 ">Products:</h3>
                                {selectedTransaction.products.map((product, index) => (
                                    <div key={index} className="mb-2">
                                        <p><strong>Product:</strong> {product.name}</p>
                                        <p><strong>Price (Per Product):</strong> ₹{product.price}</p>
                                        <p><strong>Quantity:</strong> {product.quantity}</p>
                                        <p><strong>Sales:</strong> ₹{product.sales}</p>
                                    </div>
                                ))}
                                <p className="mt-4"><strong>Total Quantity:</strong> {selectedTransaction.quantity}</p>
                                <p className=""><strong>Total Sales:</strong> ₹{selectedTransaction.sales}</p>
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
