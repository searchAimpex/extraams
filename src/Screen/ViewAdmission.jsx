import React, { useEffect, useState } from 'react';
import { useFetchStudentByCenterMutation } from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';

export default function ViewAdmission() {
  const [FetchStudentByCenter, { data, isLoading, isError, error }] = useFetchStudentByCenterMutation();
  const { center } = useSelector((state) => state.auth.userInfo);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchStudentByCenter(center);
        if (response.data) {
          setStudents(response.data); // Assuming response.data contains the student array
          setFilteredStudents(response.data); // Initialize the filtered students
        }
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchData();
  }, [FetchStudentByCenter, center]);

  // Handle filtering
  useEffect(() => {
    const filtered = students.filter((student) => {
      const refNoMatch = student.unicode.toLowerCase().includes(searchTerm.toLowerCase());
      const nameMatch = student.StudentName.toLowerCase().includes(searchTerm.toLowerCase());
      const centerCodeMatch = student.center.CenterCode.toLowerCase().includes(searchTerm.toLowerCase());
      return refNoMatch || nameMatch || centerCodeMatch;
    });
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, students]);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredStudents.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || 'Failed to fetch data'}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admissions by Center</h1>

      {/* Search and Rows per Page */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Ref No, Name, or Center Code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={15}>15 rows</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <div className="w-[1200px] overflow-scroll shadow-md border border-gray-300">
          <table className=" border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Ref No.</th>
                <th className="border px-4 py-2">Pay</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">University</th>
                <th className="border px-4 py-2">Session</th>
                <th className="border px-4 py-2">Father Name</th>
                <th className="border px-4 py-2">Course</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">State</th>
                <th className="border px-4 py-2">Pincode</th>
                <th className="border px-4 py-2">Enrollment Number</th>
                <th className="border px-4 py-2">Roll Number</th>
                <th className="border px-4 py-2">Application Status</th>
                <th className="border px-4 py-2">Document Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows && currentRows.length > 0 ? (
                currentRows.map((student) => (
                  <tr key={student._id}>
                    <td className="border px-4 py-2">{student.unicode}</td>
                    <td className="border px-4 py-2">
                      <span className="bg-teal-500 p-2 rounded-xl text-white">Pay</span>
                    </td>
                    <td className="border px-4 py-2">{student.StudentName}</td>
                    <td className="border px-4 py-2">{student.university?.universityName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.session?.sessionName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.FatherName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.course?.shortName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.StudentPhone || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.State || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.PinCode || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.enrollmentNo || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.rollNo || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.applicationStatus || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.documentStatus || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="border px-4 py-2 text-center">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange('prev')}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}