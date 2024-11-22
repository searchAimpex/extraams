import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PrivateLayout from '../Layout/PrivateLayout';


export default function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);

   return userInfo?.userType === "frenchise" ? <PrivateLayout /> : <Navigate to='/' replace />

}

