import React from 'react'
import Left from '../ExpenseTracker/Left'
import Right from '../ExpenseTracker/Right'
import { useNavigate } from 'react-router-dom'
function AnalysisPage() {
  const navigate=useNavigate()
  return (
    <div className="flex min-h-screen bg-pink-50 p-6">
            <Left onClick={()=>(navigate('/expense-tracker'))}/>
            <div className='className="w-3/4 p-4 bg-white rounded-lg shadow-md ml-4 ' >Graphs</div>
        </div>
  )
}

export default AnalysisPage