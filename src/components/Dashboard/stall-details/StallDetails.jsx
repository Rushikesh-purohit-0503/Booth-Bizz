import React, { useEffect } from 'react'
import Left from '../../ExpenseTracker/Left'
// import Right from '../ExpenseTracker/Right'
import { useNavigate } from 'react-router-dom'
import stall1 from '../../../assets/stall-1.jpeg'; // Replace with the relevant stall image
import RightAnalysis from './RightStallDetails';
import { useSelector } from 'react-redux';


function StallDetails() {
  const navigate = useNavigate()
  const onExpenseClick = () => ((navigate('/expense-tracker')))
 
  const authStatus=useSelector((state)=>(state.auth.status))
 const stall=useSelector((state)=>(state.stall))


  useEffect(()=>{
    if(!authStatus) navigate('/signin')
    
  },[authStatus,navigate])
   
  const eventName = "WhiteFlea";
  const product = "Food";
  const location = "Surat";
 
  return (
    <div className="flex min-h-screen bg-pink-50 p-6">
      <Left
        stallName={stall.stall.name}
        onClickExpensetaker={onExpenseClick}
        onProductClick={()=>(navigate('/product'))}
        onClickSalesAnalysis={()=>(navigate('/sales-analysis'))}
      />
     <RightAnalysis src={stall.stall.src} product={product} eventName={eventName} location={location}/>
    </div>
  )
}

export default StallDetails