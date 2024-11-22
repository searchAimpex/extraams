import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useCreateLeadOnlineMutation,
  useFetchCenterDetailsFromUserMutation,
  useFetchCourseByUniversityMutation,
  useFetchSessionsByUniversityMutation,
} from '../slices/adminApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateLead() {
  const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation();
  const [fetchCourseByUniversity] = useFetchCourseByUniversityMutation();
  const [fetchSessionsByUniversity] = useFetchSessionsByUniversityMutation();
    const navigate = useNavigate()
  const { center } = useSelector((state) => state.auth.userInfo);
    const [  CreateLeadOnline ,{isSuccess}   ] =   useCreateLeadOnlineMutation()
  const [centerDetails, setCenterDetails] = useState({});
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    university: '',
    course: '',
    session: '',
    center:center,
    specialization: '',
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    dateOfBirth: '',
    state: '',
    city: '',
    district: '',
    pincode: '',
  });

  // Fetch center details and universities
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchCenterDetailsFromUser(center);
        if (response?.data) {
          setCenterDetails(response.data);
          setUniversities(response.data?.AssignUniversity || []);
        }
      } catch (error) {
        console.error('Error fetching center details:', error);
      }
    };

    fetchDetails();
  }, [center, fetchCenterDetailsFromUser]);

  // Fetch courses when university is selected
  useEffect(() => {
    const fetchCourses = async () => {
      if (formData.university) {
        try {
          const response = await fetchCourseByUniversity(formData.university);
          if (response?.data) {
            setCourses(response.data);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
    };

    fetchCourses();
  }, [formData.university, fetchCourseByUniversity]);

  // Fetch sessions when course is selected
  useEffect(() => {
    const fetchSessions = async () => {
      if (formData.university) {
        try {
          const response = await fetchSessionsByUniversity(formData.university);
          if (response?.data) {
            setSessions(response.data);
          }
        } catch (error) {
          console.error('Error fetching sessions:', error);
        }
      }
    };

    fetchSessions();
  }, [formData.university, fetchSessionsByUniversity]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(()=>{
    if(isSuccess) {
        toast.success("Lead has been successfully")
        navigate('/user/viewlead')
    }

  },[isSuccess])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Lead data:', formData);
      CreateLeadOnline(formData)
      // Perform your API call to save the lead data here
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  // Get specializations based on the selected course
  const selectedCourse = courses?.course?.find((course) => course._id === formData.course);
  const specializations = selectedCourse?.specializations || [];
  console.log("seleected Course",selectedCourse)
  console.log("selected Course",specializations)
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6">Create Lead</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* University */}
        <div>
          <label htmlFor="university" className="block font-medium">
            University
          </label>
          <select
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
            required
          >
            <option value="">Select a university</option>
            {universities.map((uni) => (
              <option key={uni._id} value={uni.university._id}>
                {uni.university.universityName}
              </option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div>
          <label htmlFor="course" className="block font-medium">
            Course
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
            required
            disabled={!formData.university}
          >
            <option value="">Select a course</option>
            {courses?.course?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Specialization */}
        <div>
          <label htmlFor="specialization" className="block font-medium">
            Specialization
          </label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
            required
            disabled={!specializations.length}
          >
            <option value="">Select a specialization</option>
            {specializations.map((spec) => (
              <option key={spec._id} value={spec.sessionName}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>

        {/* Session */}
        <div>
          <label htmlFor="session" className="block font-medium">
            Session
          </label>
          <select
            id="session"
            name="session"
            value={formData.session}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
            required
            disabled={!sessions.length}
          >
            <option value="">Select a session</option>
            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.sessionName}
              </option>
            ))}
          </select>
        </div>

        {/* Other Fields */}
        {[
          { label: 'Full Name', id: 'name', type: 'text' },
          { label: 'Email', id: 'email', type: 'email' },
          { label: 'Phone', id: 'phone', type: 'tel' },
          { label: 'Alternate Phone', id: 'alternatePhone', type: 'tel' },
          { label: 'Address', id: 'address', type: 'text' },
          { label: 'Date of Birth', id: 'dateOfBirth', type: 'date' },
          { label: 'State', id: 'state', type: 'text' },
          { label: 'City', id: 'city', type: 'text' },
          { label: 'District', id: 'district', type: 'text' },
          { label: 'Pincode', id: 'pincode', type: 'text' },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded"
              required
            />
          </div>
        ))}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
