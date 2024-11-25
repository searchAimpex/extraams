import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchCenterDetailsFromUserMutation } from '../slices/adminApiSlice';
import { useChangePasswordMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';  // Assuming you have a logout action
import { useLogoutMutation } from '../slices/userApiSlice';

export default function Profile() {
    const { center } = useSelector(state => state.auth.userInfo);
    const [centerDetails, setCenterDetails] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation();
    const [changePassword,{isSuccess}] = useChangePasswordMutation();
    const [logoutApi] = useLogoutMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCenterDetails = async () => {
            try {
                const centerDetails = await fetchCenterDetailsFromUser(center).unwrap();
                setCenterDetails(centerDetails);
            } catch (error) {
                console.error('Error fetching center details:', error);
            }
        };

        if (center) fetchCenterDetails();
    }, [center, fetchCenterDetailsFromUser]);

    const handlePasswordChange = async () => {
        if (!newPassword) {
            setPasswordError('Please enter a new password');
            return;
        }

        try {
            // Call the change password mutation
            await changePassword({ centerId: center, newPassword }).unwrap();
            await logoutApi();
        dispatch(logout());
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError('Failed to change password. Please try again.');
        }
    };

    if (!centerDetails) {
        return <div>Loading...</div>;
    }

    const {
        InstitutionName,
        OwnerName,
        OwnerFatherName,
        email,
        ContactNumber,
        address,
        city,
        state,
        zipCode,
        ProfilePhoto,
        FrontAdhar,
        BackAdhar,
        PanCard,
        VistOffice,
        WhatappNumber,
        CenterCode,
    } = centerDetails;
    console.log('fiux',centerDetails)
    return (
        <div className="max-w-6xl mx-auto p-4 animate-fade-in">
            <h1 className="text-4xl font-bold mb-6">{InstitutionName} - Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Section */}
                <div className="flex flex-col items-center bg-white shadow-lg p-4 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                    <img
                        src={ProfilePhoto}
                        alt="Profile Photo"
                        className="h-48 w-48 rounded-full object-cover mb-4"
                    />
                    <h2 className="text-2xl font-semibold mb-2">{OwnerName}</h2>
                    <p className="text-sm text-gray-600">Owner's Father: {OwnerFatherName}</p>
                    <p className="text-sm text-gray-600">Email: {email}</p>
                    <p className="text-sm text-gray-600">Contact: {ContactNumber}</p>
                </div>

                {/* Center Details Section */}
                <div className="col-span-2 bg-white shadow-lg p-4 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                    <h3 className="text-xl font-semibold mb-4">Center Details</h3>
                    <p><strong>Address:</strong> {address}, {city}, {state} - {zipCode}</p>
                    <p><strong>WhatsApp:</strong> {WhatappNumber}</p>
                    <p><strong>Center Code:</strong>{CenterCode} </p>
                </div>
            </div>

            {/* Documents Section */}
            <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                        <img src={FrontAdhar} alt="Front Adhar" className="h-36 w-full object-cover rounded-lg mb-2" />
                        <p className="text-sm text-gray-600">Front Adhar</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                        <img src={BackAdhar} alt="Back Adhar" className="h-36 w-full object-cover rounded-lg mb-2" />
                        <p className="text-sm text-gray-600">Back Adhar</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                        <img src={PanCard} alt="Pan Card" className="h-36 w-full object-cover rounded-lg mb-2" />
                        <p className="text-sm text-gray-600">Pan Card</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                        <img src={VistOffice} alt="Pan Card" className="h-36 w-full object-cover rounded-lg mb-2" />
                        <p className="text-sm text-gray-600">Visiting Card</p>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="border p-2 rounded w-full mb-4"
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                <button
                    onClick={handlePasswordChange}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Change Password
                </button>
            </div>

       
        </div>
    );
}
