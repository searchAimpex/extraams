import React, { useEffect, useState } from 'react';
import { useFetchLeadsMutation } from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ViewLead() {
  const { center } = useSelector((state) => state.auth.userInfo);
  const [FetchLeads] = useFetchLeadsMutation();
  const [leads, setLeads] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchLeads(center);
        if (response.data) {
          setLeads(response.data); // Assuming the API returns an array of lead objects
        }
      } catch (err) {
        console.error('Error fetching leads:', err);
      }
    };

    fetchData();
  }, [center, FetchLeads]);
  console.log("Leads",leads)
  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-700">View Leads</h2>
        <button onClick= {()=> {
            navigate('/user/createlead')
        }} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300">
          Create Lead
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Name</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Ref No.</th>

              <th className="text-left px-4 py-3 text-gray-600 font-medium">Email</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Phone</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">University</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Course</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Specialization</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Session</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-3 border-b text-gray-700">{lead.name}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{lead.Unicode}</td>

                  <td className="px-4 py-3 border-b text-gray-700">{lead.email}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{lead.phone}</td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    {lead.university?.universityName}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">{lead.course?.name}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{lead.specialization}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{lead.session?.sessionName}</td>
                  <td className="px-4 py-3 border-b text-gray-700">{lead.status}</td>
              
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-3 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
