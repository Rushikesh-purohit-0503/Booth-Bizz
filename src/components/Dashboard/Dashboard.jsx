import React, { useState, useEffect, useMemo } from 'react';
import DashboardImg from './DashboardImage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStall as reduxAddStall, deleteStall as reduxDeleteStall, clickedStall } from '../../store/stallSlice';
import AddStallPopup from './addstallpopup/AddStallPopup';
import StallManagement from '../../firebase/Backend/stallManagement'; // Update this path
const stall1 = "/assets/stall-1.jpeg";
const stall2 = "/assets/stall-2.jpeg";
const stall3 = "/assets/stall-3.jpeg";

const Dashboard = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [stallDetails, setStallDetails] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const uid = userData?.uid; // Check if uid exists

    const Img = [
        { src: stall1, title: 'Stall 1' },
        { src: stall3, title: 'Stall 3' },
    ];

    // Memoize the StallManagement instance to prevent unnecessary re-instantiation
    const stallManagement = useMemo(() => new StallManagement({ uid }), [uid]);
 
    const handleAddStallClick = () => setIsPopupVisible(true);

    const handleDeleteStall = async (stall) => {
        try {
            const stallId = stall.id;
            console.log(stall.stallName)
            dispatch(reduxDeleteStall(stall.stallName));
            await stallManagement.deleteStall(stallId);

            const updatedStalls = stallDetails.filter((s) => s.id !== stallId);
            setStallDetails(updatedStalls); // Update local state
            localStorage.setItem('stallDetails', JSON.stringify(updatedStalls)); // Persist state
        } catch (error) {
            console.error('Error deleting stall:', error);
        }
    };

    const handleSaveCard = async (details) => {
        try {
            const imagePath = Img[Math.floor(Math.random() * Img.length)].src;
            const newStall = {
                ...details,
                image: imagePath,
                // Add timestamp for sorting
            };

            const stallId = await stallManagement.addStall(newStall);
            console.log(stallId)
            const newStallwithId = {...newStall, id:stallId.toString()}
            console.log(newStallwithId) // Backend save
            const updatedStalls = [...stallDetails, newStallwithId]
            setStallDetails(updatedStalls); // Update state with sorted stalls
            localStorage.setItem('stallDetails', JSON.stringify(updatedStalls)); // Persist state
            dispatch(reduxAddStall(newStallwithId)); // Redux state update
            setIsPopupVisible(false); // Close the popup
        } catch (error) {
            console.error('Error adding stall:', error);
        }
    };
    useEffect(() => {
        const fetchStalls = async () => {
            try {
                const fetchedStalls = await stallManagement.getStalls(); // Fetch from backend
                console.log(fetchedStalls)
                const sortedStalls = fetchedStalls.sort((a, b) => a.createdAt - b.createdAt); // Sort by timestamp
                setStallDetails(sortedStalls); // Update local state

                localStorage.setItem('stallDetails', JSON.stringify(sortedStalls)); // Persist state
            } catch (error) {
                console.error('Error fetching stalls:', error);
            }
        };

        fetchStalls(); // Fetch stalls on component mount

        if (!authStatus) {
            navigate('/signin'); // Redirect if not authenticated
        }
    }, [authStatus, navigate, stallManagement]);
    const handleStallClick = (stall) => {
        dispatch(clickedStall(stall)); // Store clicked stall in Redux
        navigate('/stall-details'); // Navigate to details page
    };

    const handleOverallAnalysisClick = () => navigate('/overall-stalls-analysis');
    const handleCancelPopup = () => setIsPopupVisible(false);


    const sortedStallData = [...stallDetails].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <>
            <div className="relative w-full">
                <div className="absolute top-4 right-4 z-10">
                    <button
                        className="py-2 px-4 rounded bg-red-300 text-black font-semibold hover:bg-red-400 transition duration-300"
                        onClick={handleOverallAnalysisClick}
                    >
                        Overall Stalls Analysis
                    </button>
                </div>
            </div>
            <main className="flex flex-col items-center m-auto mt-10 max-w-6xl px-5">
                <div className="grid mt-12 grid-cols-3 gap-5 w-full">
                    <div className="cursor-pointer" onClick={handleAddStallClick}>
                        <div className="relative border-2 border-dashed border-gray-300 bg-white text-gray-300 text-6xl font-bold flex justify-center items-center h-full rounded-lg transition-colors duration-300 hover:bg-gray-100 hover:text-gray-500">
                            + Add Stall
                        </div>
                    </div>

                    {sortedStallData.map((details, index) => (

                        <DashboardImg
                            key={`stall-${details.id || index}`}
                            src={details.image}
                            onClick={() => handleStallClick(details)}
                            title={details.stallName}
                            stallNumber={details.stallNumber}
                            event={details.eventName}
                            onDelete={() => handleDeleteStall(details)}
                        />

                    ))}
                </div>

                {isPopupVisible && (
                    <AddStallPopup onSave={handleSaveCard} onCancel={handleCancelPopup} />
                )}
            </main>
        </>
    );
};

export default Dashboard;
