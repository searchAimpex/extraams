import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useFetchCenterDetailsFromUserMutation,
    useFetchuniversityDocMutation
} from '../slices/adminApiSlice';

export default function UniversityMaterial() {
    const { center } = useSelector((state) => state.auth.userInfo); // Fetching the center from the Redux store
    const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation();
    const [FetchUniversityDoc] = useFetchuniversityDocMutation();

    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [documents, setDocuments] = useState([]);

    // Fetch universities when the center is available
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const centerDetails = await fetchCenterDetailsFromUser(center).unwrap();
                const assignedUniversities = centerDetails.AssignUniversity || [];
                setUniversities(assignedUniversities);
            } catch (error) {
                console.error('Error fetching center details:', error);
            }
        };

        if (center) fetchUniversities();
    }, [center, fetchCenterDetailsFromUser]);

    // Fetch documents for the selected university
    const handleUniversityChange = async (event) => {
        const universityId = event.target.value;
        setSelectedUniversity(universityId);

        try {
            if (universityId) {
                const universityDocs = await FetchUniversityDoc(universityId).unwrap();
                setDocuments(universityDocs);
            } else {
                setDocuments([]);
            }
        } catch (error) {
            console.error('Error fetching university documents:', error);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                University Material
            </h1>

            {/* University Selection */}
            <div className="mb-6">
                <label
                    htmlFor="university-select"
                    className="block text-lg font-medium text-gray-700 mb-2"
                >
                    Select a University:
                </label>
                <select
                    id="university-select"
                    value={selectedUniversity}
                    onChange={handleUniversityChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                    <option value="">-- Select University --</option>
                    {universities.map((university) => (
                        <option key={university.id} value={university?.university?._id}>
                            {university?.university?.universityName}
                        </option>
                    ))}
                </select>
            </div>

            {/* University Documents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {doc.title || `Document ${index + 1}`}
                        </h2>
                        <a
                            href={doc.DocURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 bg-green-500 text-white text-center rounded-lg font-medium hover:bg-green-600"
                        >
                            Download
                        </a>
                    </div>
                ))}
            </div>

            {/* No Documents Message */}
            {selectedUniversity && documents.length === 0 && (
                <p className="text-center text-gray-600 mt-8">
                    No documents available for the selected university.
                </p>
            )}
        </div>
    );
}
