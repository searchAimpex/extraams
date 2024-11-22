import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StepperContext } from '../../contexts/StepperContex';
import { useCreateOnlineApplicationMutation, useFetchLeadOnlineMutation, useFetchLeadsMutation } from '../../slices/adminApiSlice';

function Basic({ handleValidation }) {
    const dispatch = useDispatch();
    const { userData, setUserData } = useContext(StepperContext);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [dataFound, setDataFound] = useState(false);
    const [existError, setExistError] = useState(false);
    const [error, setError] = useState('');
    const [leads, setLeads] = useState();
    const [loading, setLoading] = useState(false); // Added loading state
    const [LeadsfetchOne] =   useFetchLeadsMutation();
    const { center } = useSelector((state) => state.auth.userInfo); // Fetching the center from the Redux store

    const handleChange = (e) =>{
        const {name,value} = e.target
        setUserData({...userData,[name]:value})
    }
    
    console.log("===>",leads)
    console.log("data found",userData)
    useEffect(() => {
        // Call the handleValidation function whenever userData changes
        handleValidation(validateForm());
    }, [userData]);

    const validateForm = () => {
        if (existError || !referenceNumber) {
            return false;
        }
        return true;
    };

    const handleSearch = async () => {
        if (!referenceNumber) return;

        setLoading(true); // Set loading to true before performing the search
        try {
            // Check if reference number already exists in the database
            const exist = await fetch(`http://localhost:3000/api/admin/student/check/unicode/${referenceNumber}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });
            const rawData = await exist.json();
            setExistError(rawData);

            if (rawData) return; // If exists, return without proceeding further

            // Find lead by reference number (Unicode)
            console.log("leads",leads)
            const response = await LeadsfetchOne(center).unwrap();
            setLeads(response); // Set the fetched leads data
            console.log("leads2",leads)

            const foundLead = leads.find((lead) => lead?.Unicode?.includes(referenceNumber));
            console.log("found leads",foundLead)
            if (foundLead) {
                setDataFound(true);
                setUserData({ ...foundLead }); // Populate form fields with the found lead data
            } else {
                setDataFound(false);
                setUserData({}); // Clear form fields if lead not found
            }
        } catch (error) {
            setError("An error occurred during the search. Please try again.");
        } finally {
            setLoading(false); // Set loading to false after the search is completed
        }
    };

    return (
        <div>
            {loading ? ( // Display loading indicator when data is being fetched
                <div className="text-center text-indigo-500 font-bold py-4">
                    Loading data...
                </div>
            ) : !userData ? ( // Render search bar if data is not found
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4">
                    <div className="col-span-1">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter reference number"
                            value={referenceNumber}
                            onChange={(e) => setReferenceNumber(e.target.value)}
                        />
                      
                        <button
                            className="mt-3 w-full bg-indigo-500 text-white py-2 rounded-xl font-bold hover:bg-indigo-600"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
                    <div>
                        <input
                            type="text"
                            name="university"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="University"
                            value={userData?.university?.universityName || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="center"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Center"
                            value={userData?.center?.OwnerName || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="session"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Session"
                            value={userData?.session?.sessionName || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="course"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Course"
                            value={userData?.course?.name || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="specialization"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Specialization"
                            value={userData?.specialization || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="admissionType"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Admission Type"
                            value="Fresh"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="year"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Year"
                            value={1}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Basic;
