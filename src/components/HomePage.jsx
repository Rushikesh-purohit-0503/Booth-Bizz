import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function HomePage() {
    const authStatus=useSelector((state)=>(state.auth.status))


  if (!authStatus){
    return 
  }
}

export default HomePage