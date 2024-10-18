import React, { useEffect } from 'react'
import Left from '../../ExpenseTracker/Left'
// import Right from '../ExpenseTracker/Right'
import { useNavigate } from 'react-router-dom'
import stall1 from '../../../assets/stall-1.jpeg'; // Replace with the relevant stall image

import { useDispatch, useSelector } from 'react-redux';
import { setStallName } from '../../../store/stallSlice';
import RightStallDetails from './RightStallDetails';


function StallDetails() {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => (state.auth.status))
  const stall = useSelector((state) => (state.stall.clickedStall))
  

  useEffect(() => {
    if (!authStatus) navigate('/signin')

  }, [authStatus, navigate])
  // useEffect(() => {
  //   // Load stall details from local storage
  //   const savedStall = localStorage.getItem('stallDetails'); // Ensure 'stalls' is the correct key
  //   if (savedStall) {
  //     const stallData = JSON.parse(savedStall);
  //     if (Array.isArray(stallData) && stallData.length > 0) {
  //       dispatch(setStallName(stallData)); // Update Redux state with saved data
  //     }
  //   }
  // }, [dispatch]);


  const onExpenseClick = () => ((navigate('/expense-tracker')))
  return (
    <div className="flex min-h-screen bg-pink-50 p-6">
      <Left
        stallName={stall.stallName}
        onClickExpensetaker={onExpenseClick}
        onProductClick={() => (navigate('/product'))}
        onClickSalesAnalysis={() => (navigate('/sales-analysis'))}
      />
      <RightStallDetails src={stall.image} product={stall.productCategory} eventName={stall.eventName} location={stall.city} />
    </div>
  )
}

export default StallDetails