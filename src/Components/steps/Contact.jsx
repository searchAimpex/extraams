import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../contexts/StepperContex';

export default function Contact({ handleValidation }) {
    const { userData, setUserData } = useContext(StepperContext);
    const [error, setError] = useState("");

    // Handle the change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Validate the form on change of userData
    useEffect(() => {
        handleValidation(validateForm());
    }, [userData]);

    // Form validation logic
    const validateForm = () => {
        const requiredFields = ['phone', 'email', 'address', 'pinCode', 'city', 'district', 'state', 'country'];

        // Check if any required field is missing
        for (const field of requiredFields) {
            if (!userData[field]) {
                setError(`${field} is required!`);
                return false; // Return false if any required field is empty
            }
        }

        setError(""); // Reset error if all fields are filled
        return true;
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-5 p-4 m-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Student Mobile No.</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="00000000" 
                        type="number" 
                        name="phone" 
                        value={userData.phone || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Alternate Mobile No.</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="00000000" 
                        type="number" 
                        name="alternatePhone" 
                        value={userData.alternatePhone || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Student Email</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="example@gmail.com" 
                        type="email" 
                        name="email" 
                        value={userData.email || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Mobile No.</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="0000000" 
                        type="text" 
                        name="parentMobile" 
                        value={userData.parentMobile || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Email</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="example@gmail.com" 
                        type="email" 
                        name="parentEmail" 
                        value={userData.parentEmail || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="Address" 
                        name="address" 
                        value={userData.address || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">PinCode</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="PinCode" 
                        name="pinCode" 
                        value={userData.pinCode || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">City/Town</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="City/Town" 
                        name="city" 
                        value={userData.city || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">District</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="District" 
                        name="district" 
                        value={userData.district || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="State" 
                        name="state" 
                        value={userData.state || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="Country" 
                        name="country" 
                        value={userData.country || ''} 
                        onChange={handleChange} 
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm font-bold">{error}</p>} {/* Show error message if any */}
        </div>
    );
}
