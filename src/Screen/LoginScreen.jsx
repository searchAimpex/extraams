import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
    const [login,{isSuccess}] = useLoginMutation()
  useEffect(() => {
    if (isSuccess) {
        toast.success("Login success!")
        navigate('/user/dashboard')
    }
    if(userInfo.userType !== 'frenchise'){
      toast.error("Unautherize access")
    }
  }, [navigate, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials(res));
      } catch (err) {
         console.log("fix")
      }
    // Add login logic here
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-blue-300 to-indigo-500 p-4">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Login Form */}
        <div className="w-full md:w-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side: Image inside a transparent box */}
      
      </div>
    </div>
  );
}
