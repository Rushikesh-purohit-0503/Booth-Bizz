import React, { useEffect } from 'react'
import Left from '../../ExpenseTracker/Left'
// import Right from '../ExpenseTracker/Right'
import { useNavigate } from 'react-router-dom'
import stall1 from '../../../assets/stall-1.jpeg'; // Replace with the relevant stall image
import RightAnalysis from './RightAnalysis';
import { useSelector } from 'react-redux';


function AnalysisPage() {
  const navigate = useNavigate()
  const onExpenseClick = () => ((navigate('/expense-tracker')))
 
  const authStatus=useSelector((state)=>(state.auth.status))
  useEffect(()=>{
    if(!authStatus) navigate('/signin')
    
  },[authStatus,navigate])

  const eventName = "WhiteFlea";
  const product = "Nachos & Brownie";
  const location = "Surat";
  return (
    <div className="flex min-h-screen bg-pink-50 p-6">
      <Left
        onClickExpensetaker={onExpenseClick}
        onProductClick={()=>(navigate('/product'))}
        
      />
     <RightAnalysis src={stall1} product={product} eventName={eventName} location={location}/>
    </div>
  )
}

export default AnalysisPage