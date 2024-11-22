import React, { useEffect, useState } from 'react';
import {
  useFetchCenterDetailsFromUserMutation,
  useFetchCourseByUniversityMutation,
} from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';

export default function FeesScreen() {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [fees, setFees] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const { center } = useSelector((state) => state.auth.userInfo);
  const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation();
  const [fetchCourseByUniversity] = useFetchCourseByUniversityMutation();

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

  useEffect(() => {
    const fetchCourses = async () => {
      if (selectedUniversity) {
        try {
          const response = await fetchCourseByUniversity(selectedUniversity).unwrap();
          setCourses(response.course);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
    };

    fetchCourses();
  }, [selectedUniversity, fetchCourseByUniversity]);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);

    const selectedCourseObj = courses.find((course) => course._id === courseId);
    setSpecializations(selectedCourseObj?.specializations || []);
  };

  const handleSpecializationChange = (e) => {
    const specializationId = e.target.value;
    setSelectedSpecialization(specializationId);

    const selectedSpec = specializations.find((spec) => spec._id === specializationId);
    setFees(selectedSpec?.fees);
  };

  const calculateColumnTotal = (key) =>
    fees?.fees?.reduce((total, fee) => total + Number(fee[key] || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-teal-200 to-purple-300 p-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-800">Fees Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-lg font-medium mb-3">Select University</label>
          <select
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSelectedUniversity(e.target.value)}
            value={selectedUniversity}
          >
            <option value="">Select University</option>
            {universities.map((uni) => (
              <option key={uni._id} value={uni.university._id}>
                {uni.university.universityName}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-lg font-medium mb-3">Select Course</label>
          <select
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleCourseChange}
            value={selectedCourse}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-lg font-medium mb-3">Select Specialization</label>
          <select
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleSpecializationChange}
            value={selectedSpecialization}
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec._id} value={spec._id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Fees Structure</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
              <th className="border px-4 py-2">
                {fees?.type === 'semester' ? 'Semester' : 'Yearly'}
                </th>                
                <th className="border px-4 py-2">Course Fee</th>
                <th className="border px-4 py-2">Examination Fee</th>
                <th className="border px-4 py-2">Late Fee</th>
                <th className="border px-4 py-2">Other Charge</th>
                <th className="border px-4 py-2">Prospectus Fee</th>
                <th className="border px-4 py-2">Registration Fee</th>
                <th className="border px-4 py-2">Service Charge</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {fees?.fees?.map((fee, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{fee.year}</td>
                  <td className="border px-4 py-2">{fee.courseFee}</td>
                  <td className="border px-4 py-2">{fee.examinationFee}</td>
                  <td className="border px-4 py-2">{fee.lateFee}</td>
                  <td className="border px-4 py-2">{fee.otherCharge}</td>
                  <td className="border px-4 py-2">{fee.prospectusFee}</td>
                  <td className="border px-4 py-2">{fee.registrationFee}</td>
                  <td className="border px-4 py-2">{fee.serviceCharge}</td>
                  <td className="border px-4 py-2 font-semibold">
                    {[fee.courseFee, fee.examinationFee, fee.lateFee, fee.otherCharge, fee.prospectusFee, fee.registrationFee, fee.serviceCharge]
                      .map(Number)
                      .reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-200 font-semibold">
              <tr>
                <td className="border px-4 py-2">Total</td>
                <td className="border px-4 py-2">{calculateColumnTotal('courseFee')}</td>
                <td className="border px-4 py-2">{calculateColumnTotal('examinationFee')}</td>
                <td className="border px-4 py-2">{calculateColumnTotal('lateFee')}</td>
                <td className="border px-4 py-2">{calculateColumnTotal('otherCharge')}</td>
                <td className="border px-4 py-2">{calculateColumnTotal('prospectusFee')}</td>
                <td className="border px-4 py-2">{calculateColumnTotal('registrationFee')}</td>
                <td className="border px-4 py-2">{calculateColumnTotal('serviceCharge')}</td>
                <td className="border px-4 py-2">{fees?.fees?.reduce((total, fee) => total + 
                  Object.values(fee).slice(1).reduce((sum, val) => sum + Number(val), 0), 0)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
