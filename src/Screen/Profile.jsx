import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchCenterDetailsFromUserMutation } from '../slices/adminApiSlice';

export default function Profile() {
    const { center } = useSelector(state => state.auth.userInfo);
    const [centerDetails, setCenterDetails] = useState(null);
    const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation();

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

    if (!centerDetails) {
        return <div>Loading...</div>;
    }

    const {
        InstitutionName,
        OwnerName,
        OwnerFatherName,
        email,
        contactNumber,
        address,
        city,
        state,
        zipCode,
        ProfilePhoto,
        FrontAdhar,
        BackAdhar,
        PanCard,
        VistOffice,
        WhatappNumber
    } = centerDetails;

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
                    <p className="text-sm text-gray-600">Contact: {contactNumber}</p>
                </div>

                {/* Center Details Section */}
                <div className="col-span-2 bg-white shadow-lg p-4 rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                    <h3 className="text-xl font-semibold mb-4">Center Details</h3>
                    <p><strong>Address:</strong> {address}, {city}, {state} - {zipCode}</p>
                    <p><strong>WhatsApp:</strong> {WhatappNumber}</p>
                    <p><strong>Visit Office:</strong> <a href={VistOffice} className="text-blue-500" target="_blank" rel="noopener noreferrer">Click here</a></p>
                </div>
            </div>

            {/* Documents Section */}
            <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                </div>
            </div>

            {/* Visiting Card Section */}
            <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Visiting Card</h3>
                <div className="relative group w-full max-w-xs mx-auto overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={VistOffice}
                        alt="Visiting Card"
                        className="w-full h-48 object-cover transform transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity"></div>
                    <p className="absolute inset-x-0 bottom-4 text-center text-white font-semibold">{InstitutionName}</p>
                </div>
            </div>

            {/* Contact Buttons */}
            <div className="mt-6 flex space-x-4">
                <a href={`mailto:${email}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition">Email Center</a>
                <a href={`tel:${contactNumber}`} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition">Call Center</a>
            </div>
        </div>
    );
}
