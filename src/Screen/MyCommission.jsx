import React, { useEffect, useState } from 'react'
import { useFetchCenterDetailsFromUserMutation } from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';

export default function MyCommission() {
    const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation()
    const [universities,setUniversities] = useState()
    const { center } = useSelector((state) => state.auth.userInfo);

     useEffect(() => {
        const fetchDetails = async () => {
          try {
            const response = await fetchCenterDetailsFromUser(center);
            if (response?.data) {
              setUniversities(response.data?.AssignUniversity || []);
            }
          } catch (error) {
            console.error('Error fetching center details:', error);
          }
        };
    
        fetchDetails();
      }, [center, fetchCenterDetailsFromUser]);
      console.log("fix",universities)
    
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold mb-4 text-center">University Commissions</h2>
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-100">
          <th className="border border-gray-300 px-4 py-2">Logo</th>
          <th className="border border-gray-300 px-4 py-2">University Name</th>
          <th className="border border-gray-300 px-4 py-2">Commission (%)</th>
        </tr>
      </thead>
      <tbody>
        {universities && universities.length > 0 ? (
          universities.map((uni) => (
            <tr key={uni._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                <img
                  src={uni.university.UniLogo}
                  alt={uni.universityName}
                  className="w-16 h-16 rounded-full mx-auto"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{uni.university.universityName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{uni.commissionPercentage}%</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  )
}
