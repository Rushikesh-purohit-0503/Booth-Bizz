import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,LabelList } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StallManagement from '../../firebase/Backend/stallManagement';

const AllStallsAnalysis = () => {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [stallData, setStallData] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const user = useSelector((state) => state.auth.userData);
    const stallManager = useMemo(() => new StallManagement({ uid: user.uid }), [user.uid]);
    useEffect(() => {
        if (!authStatus) navigate('/signin');

        const fetchData = async () => {
            try {

                const data = await stallManager.getStallsWithStats();
                setStallData(data);
            } catch (error) {
                console.error("Error fetching stall data", error);
            }
        };

        fetchData();
    }, [authStatus, navigate]);

    const totalSales = stallData.reduce((sum, item) => sum + item.totalSales, 0);
    const totalSpent = stallData.reduce((sum, item) => sum + item.totalExpenses, 0);
    const totalRevenue = totalSpent - totalSales;

    const displayedData = showMore ? stallData : stallData.slice(0, 10);

    const bestPerformingStall = stallData.reduce((prev, current) =>
        prev.totalSales > current.totalSales ? prev : current, {});

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
                            <p className="text-2xl text-gray-600 font-bold">{bestPerformingStall.stallName}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow mb-4">
                        <h2 className="text-lg text-gray-600 font-semibold">Performance Stats of All Stalls</h2>
                        <div className="overflow-y-auto max-h-60">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left text-gray-600 border-b">
                                        <th className="pb-2">Stall Name</th>
                                        <th className="pb-2">Expense</th>
                                        <th className="pb-2">Sales</th>
                                        <th className="pb-2">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData.map((item, index) => (
                                        <tr key={index} onClick={()=>(navigate('/dashboard'))} className="border-b last:border-b-0 cursor-pointer">
                                            <td className="text-gray-600 py-3">{item.stallName}</td>
                                            <td className="text-gray-600 py-3">₹{item.totalExpenses.toLocaleString()}</td>
                                            <td className="text-gray-600 py-3">₹{item.totalSales.toLocaleString()}</td>
                                            <td className="text-gray-600 py-3">₹{item.revenue.toLocaleString()}</td>
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
                        <h2 className="text-lg text-gray-600 font-semibold">Sales, Expenses, and Revenue Overview</h2>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stallData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="1 1" />
                                    <XAxis dataKey="stallName" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="totalSales" fill="#E57373" name="Sales" barSize={30}/>
                                    <Bar dataKey="totalExpenses" fill="	#722F37" name="Expenses" barSize={30} />
                                    {/* <Bar dataKey="revenue" fill="#E30B5C" name="Revenue" barSize={30}/> */}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllStallsAnalysis;
