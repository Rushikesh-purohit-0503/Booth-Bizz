import React, { useState, useEffect, useMemo } from 'react';
import stall1 from '../../assets/stall-1.jpeg';
import stall2 from '../../assets/stall-2.jpeg';
import stall3 from '../../assets/stall-3.jpeg';
import DashboardImg from './DashboardImage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStall as reduxAddStall, setStallName as reduxsetStallName } from '../../store/stallSlice';
import { clickedStall, deleteStall as reduxDeleteStall } from '../../store/stallSlice';
import AddStallPopup from './addstallpopup/AddStallPopup';
import StallManagement from '../../firebase/Backend/stallManagement'; // Update this path

const Dashboard = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [stallDetails, setStallDetails] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const uid = userData.uid;
    const Img = [
        { src: stall1, title: "Stall 1" },
        { src: stall2, title: "Stall 2" },
        { src: stall3, title: "Stall 3" },
    ];

    // Create an instance of StallManagement
    const stallManagement = useMemo(()=> new StallManagement({ uid: uid }),[uid]) // Pass the correct user object

    const handleAddStallClick = () => {
        setIsPopupVisible(true);
    };

    const handleDeleteStall = async (stall) => {
        try {
            const stallId = stall.id; // Assuming each stall has a unique 'id' property
            dispatch(reduxDeleteStall(stallId));

            // Remove the stall from the local stallDetails array
            const updatedStalls = stallDetails.filter((s) => s.id !== stallId);
            setStallDetails(updatedStalls);

            // Remove from local storage
            localStorage.setItem('stallDetails', JSON.stringify(updatedStalls));

            // Call the backend to delete the stall
            await stallManagement.deleteStall(stallId);
        } catch (error) {
            console.error("Error deleting stall:", error);
        }
    };

    const handleSaveCard = async (details) => {
        try {
            const imagePath = Img[Math.floor(Math.random() * Img.length)].src;

            const newStall = {
                ...details,
                image: imagePath,
            };

            // Call the backend to add the stall
            await stallManagement.addStall(newStall);

            dispatch(reduxAddStall(newStall));
            const updatedStalls = [...stallDetails, newStall];
            setStallDetails(updatedStalls);

            // Save the updated stalls to localStorage
            localStorage.setItem('stallDetails', JSON.stringify(updatedStalls));

            setIsPopupVisible(false);
        } catch (error) {
            console.error("Error adding stall:", error);
        }
    };

    const handleClick = (stall) => {
        dispatch(clickedStall(stall));
        navigate('/stall-details');
    };

    const handleCancelPopup = () => {
        setIsPopupVisible(false);
    };

    const handleOverallAnalysisClick = () => {
        navigate('/overall-stalls-analysis');
    }

    useEffect(() => {
        const fetchStalls = async () => {
            try {
                const fetchedStalls = await stallManagement.getStalls(); // Implement this in StallManagement
                setStallDetails(fetchedStalls);

                // Optionally save to localStorage if needed
                // localStorage.setItem('stallDetails', JSON.stringify(fetchedStalls));
            } catch (error) {
                console.error("Error fetching stalls:", error);
            }
        };

        fetchStalls();

        if (!authStatus) {
            navigate('/signin');
        }
    }, [authStatus, navigate, stallManagement]);

    return (
        <>
            <div className="fixed top-28 right-14 z-10">
                <button
                    className="py-2 px-4 rounded bg-red-300 text-black font-semibold hover:bg-red-400 transition duration-300"
                    onClick={handleOverallAnalysisClick}
                >
                    Overall Stalls Analysis
                </button>
            </div>
            <main className="flex flex-col items-center m-auto mt-10 max-w-6xl px-5">
                <div className="grid mt-12 grid-cols-3 gap-5 w-full">
                    <div className="cursor-pointer" onClick={handleAddStallClick}>
                        <div className="relative border-2 border-dashed border-gray-300 bg-white text-gray-300 text-6xl font-bold flex justify-center items-center h-full rounded-lg transition-colors duration-300 hover:bg-gray-100 hover:text-gray-500">
                            + Add Stall
                        </div>
                    </div>

                    {stallDetails.map((details, index) => (
                        <DashboardImg
                            key={`dynamic-${index}`}
                            src={details.image}
                            onClick={() => handleClick(details)}
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
