import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  console.log('heloo', isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/signin" />;
}
