import React, { useState, useEffect } from 'react';
import stall1 from '../../assets/stall-1.jpeg';
import stall2 from '../../assets/stall-2.jpeg';
import stall3 from '../../assets/stall-3.jpeg';
import DashboardImg from './DashboardImage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStallName as reduxsetStallName } from '../../store/stallnameSlice';
import AddStallPopup from './addstallpopup/AddStallPopup';
const Dashboard = () => {



    
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [stallName, setStallName] = useState('');
    const [stallDetails, setStallDetails] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => (state.auth.status))
    const Img = [
        { src: stall1, title: "Stall 1" },
        { src: stall2, title: "Stall 2" },
        { src: stall3, title: "Stall 3" }]

    
    const handleAddStallClick = () => {
        setIsPopupVisible(true);
    };
    const handleClick = (stall) => {
        dispatch(reduxsetStallName(stall))
        localStorage.setItem('stall', JSON.stringify(stall));
        navigate('/stall-details')
    }
    const handleSaveCard = (details) => {
        const imagePath = Img[Math.floor(Math.random() * Img.length)].src 
        console.log(imagePath)
        setStallDetails([...stallDetails, { 
          ...details, 
          image: imagePath 
        }]); 
        setIsPopupVisible(false);
      };
    
    const handleCancelPopup = () => {
        setIsPopupVisible(false);
        setStallName('');
    };
    useEffect(() => {
        if (!authStatus) {
            navigate('/signin');
        }
    }, [authStatus, navigate]);
    return (
        <main className="flex flex-col items-center m-auto mt-10 max-w-6xl px-5">
            <div className="grid mt-12 grid-cols-3 gap-5 w-full">
                <div className="cursor-pointer" onClick={handleAddStallClick}>
                    <div className="relative border-2 border-dashed border-gray-300 bg-white text-gray-300 text-6xl font-bold flex justify-center items-center h-full rounded-lg transition-colors duration-300 hover:bg-gray-100 hover:text-gray-500">
                        + Add Stall
                    </div>
                </div>
                {
                    Img.map((ImageObj, index) => (<DashboardImg key={index} src={ImageObj.src} title={ImageObj.title} onClick={() => (handleClick({ name: ImageObj.title, src: ImageObj.src }))} />))
                }
                {stallDetails.map((details, index) => (
                    <DashboardImg
                        key={`dynamic-${index}`}
                        src={details.image}
                        onClick={handleClick}
                        title={details.stallName}
                        stallNumber={details.stallNumber}
                        event={details.eventName}
                    />
                ))}
                {/* <DashboardImg src={stall1} onClick={()=>(navigate('/analysis-page'))} title={"Stall1"}/>
                <DashboardImg src={stall2} onClick={()=>(navigate('/analysis-page'))} title={"Stall2"}/>
                <DashboardImg src={stall3} onClick={()=>(navigate('/analysis-page'))} title={"Stall3"}/>
                <DashboardImg src={stall3} onClick={()=>(navigate('/analysis-page'))} title={"Stall4"}/> */}
            </div>

            {isPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg w-full max-w-md">
                        <h2 className="text-lg">Add New Stall</h2>
                        <input
                            type="text"
                            value={stallName}
                            onChange={(e) => setStallName(e.target.value)}
                            placeholder="Enter stall name"
                            className="mt-2 p-2 w-full border border-gray-300 rounded"
                        />
                        <div className='flex gap-6'>
                            <button onClick={handleSaveCard} className="mt-4 w-full py-2 rounded bg-red-300 text-white hover:bg-red-400">Save</button>
                            <button onClick={handleCancelPopup} className="mt-4 w-full py-2 rounded bg-gray-300 text-black hover:bg-gray-400">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
             {isPopupVisible && <AddStallPopup onSave={handleSaveCard} onCancel={handleCancelPopup} />}
        </main>
    );
};

export default Dashboard;
