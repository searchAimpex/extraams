import React, { useEffect, useState } from 'react';
import { useFetchOnlineApplicationMutation } from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';

export default function ViewOnlineAdmission() {
  const [FetchOnlineApplication, { data, error, isLoading }] = useFetchOnlineApplicationMutation();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { center } = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await FetchOnlineApplication(center); // Pass center if required by the API
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchData();
  }, [FetchOnlineApplication, center]);

  useEffect(() => {
    if (data) {
      setApplications(data); // Store the data in state once fetched
      setFilteredApplications(data); // Set filtered data initially
    }
  }, [data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = applications.filter(
      (app) =>
        app.Unicode?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        app.name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        app.email?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredApplications(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Online Admissions</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Unicode, Name, or Email"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Ref No.</th>
              <th className="border px-4 py-2 text-left">Payment Status</th> {/* New column */}
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Course</th>
              <th className="border px-4 py-2 text-left">University</th>
              <th className="border px-4 py-2 text-left">Center</th>
              <th className="border px-4 py-2 text-left">Application Status</th>
              <th className="border px-4 py-2 text-left">Document Status</th>
              <th className="border px-4 py-2 text-left">Created At</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {filteredApplications && filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <tr
                  key={application._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border px-4 py-2">{application.Unicode}</td>
                  <td className="border px-4 py-2">{application.paymentStatus || 'Pending'}</td> {/* New column */}
                  <td className="border px-4 py-2">{application.name}</td>
                  <td className="border px-4 py-2">{application.email}</td>
                  <td className="border px-4 py-2">{application.course?.name || 'N/A'}</td>
                  <td className="border px-4 py-2">{application.university?.universityName || 'N/A'}</td>
                  <td className="border px-4 py-2">{application.center?.InsitutionName || 'N/A'}</td>
                  <td className="border px-4 py-2">{application.applicationStatus}</td>
                  <td className="border px-4 py-2">{application.docStatus}</td>
                  <td className="border px-4 py-2">
                    {new Date(application.createdAt).toLocaleDateString() || 'N/A'} {/* New column */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="border px-4 py-2 text-center">
                  No applications available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
