import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';


import { useNavigate } from 'react-router-dom';
import { useCreateStudentMutation, useFetchCenterDetailsFromUserMutation, useFetchCourseByUniversityMutation, useFetchSessionsByUniversityMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';
export default function CreateAdmission() {
    const storage = getStorage(); // Get Firebase Storage reference
    const navigate = useNavigate()
    // Function to update academic details state with file URL
    const handleFileUpload = (fieldName, e, index, eligibilityName) => {
        const file = e.target.files[0];
        const fileName = new Date().getTime() + '-' + file.name;
        const fileRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error('Upload error:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // Update the academic details state with the download URL of the uploaded file
                    const updatedAcademicDetails = [...academicDetails];
                    const academicIndex = updatedAcademicDetails.findIndex(item => item.elegibilityName === eligibilityName);
                    if (academicIndex !== -1) {
                        updatedAcademicDetails[academicIndex][fieldName] = downloadURL;
                        setAcademicDetails(updatedAcademicDetails);
                    } else {
                        console.error(`Eligibility "${eligibilityName}" not found in academicDetails array.`);
                    }
                });
            }
        );
    };
   // Function to handle file upload and set the corresponding state
   const handleFileUpload2 = (fieldName, setterFunction, event) => {
    const file = event.target.files[0];
    const fileName = new Date().getTime() + '-' + file.name;
    const fileRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            console.error('Upload error:', error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // Set the download URL to the corresponding state variable
                setterFunction(downloadURL);
            });
        }
    );
};
    const dispatch = useDispatch()

    const universitySelect = useSelector(state=>state.user?.selectedUniversity?.university)
    const {center} = useSelector(state=>state.auth.userInfo)
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSession,setSelectedSession] = useState(null);
    const [selectedSpecialization,setSelectedSpecialization] = useState(null);
    const [FetchCourseByUniversity] = useFetchCourseByUniversityMutation();
    const [FetchSessionsByUniversity] = useFetchSessionsByUniversityMutation();
    const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation();


    const [StudentName,setStudentName] = useState('');
    const [FatherName,setFatherName] = useState('');
    const [MotherName,setMotherName] = useState('');
    const [Category,setCategory] = useState('');
    const [EmploymentStatus,setEmploymentStatus] = useState('');
    const [MartialStatus,setMartialStatus] = useState('');
    const [Religion,setReligion] = useState('');
    const [Nationality,setNationality] = useState('');
    const [AdharNumber,setAdharNumber] = useState('');
    const [Handicapped,setHandicapped] = useState('');

    const [StudentEmail,setStudentEmail] = useState('');
    const [StudentPhone,setStudentPhone] = useState('');
    const [StudentAlternateNumber,setStudentAlternateNumber] = useState('');
    const [ParentEmail,setParentEmail] = useState('');
    const [ParentPhone,setParentPhone] = useState('');

    const [StudentDOB,setStudentDOB] = useState('');
    const [Gender,setGender] = useState('');
    const [Address,setAddress] = useState('');
    const [City ,setCity] = useState('');
    const [District,setDistrict] = useState('');
    const [State,setState] = useState('');
    const [PinCode,setPinCode] = useState('');
    const [StudentPhoto,setStudentPhoto] = useState('');
    const [StudentAdhar,setStudentAdhar] = useState('');
    const [StudentSignature,setStudentSignature] = useState('');
    const [ParentSignature,setParentSignature] = useState('');
    const [OtherDocuments,setOtherDocuments] = useState('')
    const [phoneExists, setPhoneExists] = useState(false);

    const [StudentNameError, setStudentNameError] = useState("")
    const [FatherNameError, setFatherNameError] = useState("")
    const [MotherNameError, setMotherNameError] = useState("")
    const [DateOfBirthError, setDateofBirthError] = useState("")
    const [AdharError,setAdharError] = useState("")
    const [StudentPhoneError,setStudentPhoneError] = useState("")
    const [StudentEmailError,setStudentEmailError] = useState("")
    const [CityError,setCityError] = useState("")
    const [DistricError ,setDistricError] = useState("")
    const [StateError,setStateError] = useState("")
    const [PinCodeError,setPinCodeError] = useState("")

    const [emailExist,setEmailExist] = useState(false)
    const [adharExist,setAdharExist] = useState(false)
    const [formData, setFormData ] = useState({})
    const handlePincodeChange = (data) =>{
       
        setPinCode(data.pincode)
        setCity(data.city)
        setState(data.stateName)
        setDistrict(data.district)
        
      }
    const [eligibilityFields, setEligibilityFields] = useState([]);
    const [academicDetails, setAcademicDetails] = useState([]);
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(51), (val, index) => currentYear - index);
       // Function to update academic details state
       const handleAcademicDetailsChange = (fieldName, value, index, eligibilityName) => {
        try {
            const updatedAcademicDetails = [...academicDetails];
            const academicIndex = updatedAcademicDetails.findIndex(item => item.elegibilityName === eligibilityName);
            if (academicIndex !== -1) {
                if (!updatedAcademicDetails[academicIndex].elegibilityName) {
                    updatedAcademicDetails[academicIndex].elegibilityName = eligibilityName;
                }
                updatedAcademicDetails[academicIndex][fieldName] = value;
                setAcademicDetails(updatedAcademicDetails);
            } else {
                console.error(`Eligibility "${eligibilityName}" not found in academicDetails array.`);
            }
        } catch (error) {
            console.error('Error updating academicDetails:', error);
        }
    };
    // Function to handle course selection
    const handleCourseSelection = event => {
        setSelectedCourse(event.target.value);
        const selectedCourseData = course?.course?.find(course => course._id === event.target.value);
        if (selectedCourseData) {
            const eligibility = selectedCourseData.eligibility || [];
            const fields = eligibility.map((eligibilityName, index) => { // Change variable name to "eligibilityName"
                return {
                    id: index,
                    name: eligibilityName,
                    fields: ['Year of Passing', 'Subject','Board/University' , 'Result', 'Marksheet'] // Add other fields as needed
                };
            });
            setEligibilityFields(fields);
    
            // Initialize academic details with the correct number of elements
            const initialAcademicDetails = fields.map(({ name }) => ({ elegibilityName: name })); // Include eligibilityName in each object
            setAcademicDetails(initialAcademicDetails);
        }
    };


    const handleChange = async (e) => {
        const { value } = e.target;
        setStudentPhone(value);
    
        try {
          const response = await fetch('/api/admin/phonecheck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber: value }),
          });
          const data = await response.json();
          const { exists } = data;
          setPhoneExists(exists);
        } catch (error) {
          console.error('Error checking phone number:', error);
        }
      };
      
    const handleChangeEmail = async (e) => {
        const { value } = e.target;
        setStudentEmail(value);
    
        try {
          const response = await fetch('/api/admin/emailcheck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: value }),
          });
          const data = await response.json();
          const { exists } = data;
          setEmailExist(exists);
        } catch (error) {
          console.error('Error checking phone number:', error);
        }
      };
      const handleChangeAdhar = async (e) => {
        console.log("fsafs")
        const { value } = e.target;
        setAdharNumber(value);
    
        try {
          const response = await fetch('/api/admin/adharcheck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ adhar: value }),
          });
          const data = await response.json();
          const { exists } = data;
          setAdharExist(exists);
        } catch (error) {
          console.error('Error checking phone number:', error);
        }
      };
    const handleSessionSelection = (even) =>{
        setSelectedSession(even.target.value)
    }
    const [selectedUniversity ,setSelectedUniversity] = useState()
    const handleUniversitySelection = (event) => {
        setSelectedUniversity(event.target.value)
    }
    const [type,setType] = useState()
    const handleType = (event) =>{
        console.log("event",event)
        setType(event.target.value)
    }
    const [year,setYear] = useState()
    const handleYear = (event) =>{
        console.log("event",event)
        setYear(event.target.value)
    }
    const handleSpecialization = (event) =>{
        console.log("event",event)
        setSelectedSpecialization(event.target.value)
    }
    const [centerDetails, setCenterDetails] = useState({});
    const [universities, setUniversities] = useState([]);
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
    const [session,setSession] = useState()
    const [course,setCourse] = useState()
    const [CreateStudent,{isSuccess}] = useCreateStudentMutation()
    useEffect(()=>{
        if(isSuccess){
            toast.success('Student created successfully')
            setStudentName("")
            setFatherName("")
            setMotherName("")
            setDateofBirth("")
            setAdharNumber("")
            setStudentEmail("")
            setStudentPhone("")
            setCity("")
            setDistrict("")
            setState("")
            setAcademicDetails([])
            setEligibilityFields([])
            setSelectedCourse("")
            setSelectedSpecialization("")
            setSelectedSession("")
            setSelectedUniversity("")
            setType("")
            setYear("")
            setAdharExist(false)
            setEmailExist(false)
            setPhoneExists(false)
            setCenterDetails({})
            setUniversities([])
            setSession([])
            setCourse([])
        }
    },[])
    useEffect(()=>{
        const fetchDetails =  async () => {
            try { 
            const response = await FetchSessionsByUniversity(selectedUniversity)
            const response1 = await FetchCourseByUniversity(selectedUniversity)
            if (response?.data) {
                setSession(response.data)
                setCourse(response1.data)
            }
            } catch (error) {
                console.error('Error fetching center details:', error);
            }
        }
        fetchDetails()
    },[dispatch,selectedUniversity])
    const handleSubmit = (e)=>{
        e.preventDefault()
        setStudentNameError("")
        setFatherNameError("")
        setMotherNameError("")
        setDateofBirthError("")
        setAdharError("")
        setStudentEmailError("")
        setStudentPhoneError("")
        setCityError("")
        setDistricError("")
        setStateError("")


        if(StudentName.length ===0){
            setStudentNameError("Student Name is required")
            return
        }
        if(FatherName.length ===0){
            setFatherNameError("Father Name is required")
            return
        }
        if(MotherName.length ===0){
            setMotherNameError("Mother Name is required")
            return
        }
        if(StudentDOB.length === 0){
            setDateofBirthError("Date of Birth is required")
            return
        }
        if (AdharNumber.length === 0 || AdharNumber.length !== 12) {
            setAdharError("Adhar Number is required and must be 12 digits")
            return
          }
          if(StudentPhone.length === 0 || StudentPhone.length !==10){
            setStudentPhoneError("Phone Number is required and must be 10 digits")
            return
          }
          if(StudentEmail.length ===0){
            setStudentEmailError("Email is required")
            return
          }
          if(City.length===0){
            setCityError("City is required")
            return
  
        }
        if(District.length===0){
            setDistricError("District is required")
            return
        }
        if(State.length===0){
            setStateError("State is required")
            return
        }
        const data = {
            university:selectedUniversity,
            session:selectedSession,
            course:selectedCourse,
            specialization:selectedSpecialization,
            studentType:type,
            center: center,
            StudentName,
            FatherName,
            MotherName,
            Category,
            EmploymentStatus,
            MartialStatus,
            Religion,
            Nationality,
            AdharNumber,
            Handicapped,
            StudentEmail,
            StudentPhone,
            StudentAlternateNumber,
            ParentEmail,
            ParentPhone,
            DateOfBirth: StudentDOB,
            Gender,
            Address,
            City,
            District,
            State,
            PinCode,
            StudentPhoto,
            StudentAdhar,
            StudentSignature,
            ParentSignature,
            OtherDocuments,

            academicDetails: {academicDetails} // Include academic details in the data
        }
        CreateStudent(data)
        console.log("form data",data)
    }
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    const desiredOrder = ['HIGH-SCHOOL', 'INTERMEDIATE', 'DIPLOMA', 'UG', 'PG', 'OTHER'];

    // Sort the eligibilityFields array based on the desired order
    const sortedEligibilityFields = eligibilityFields?.sort((a, b) => {
        // Convert names to uppercase for case-insensitive comparison
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
    
        // Get the index of the name property in the desired order
        const indexA = desiredOrder.indexOf(nameA);
        const indexB = desiredOrder.indexOf(nameB);
        console.log("indexA: " + indexA + " indexB: " + indexB)
    
        // If both names are found in the desired order array, compare their indices
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }
        // If one of the names is not found in the desired order array, prioritize the one that is found
        else if (indexA !== -1) {
            return -1; // a comes before b
        } else if (indexB !== -1) {
            return 1; // b comes before a
        }
        // If neither name is found in the desired order array, maintain the original order
        else {
            return 0;
        }
    });
       


    return (
        <div className='p-5 m-5 bg-teal-100 bg-cover rounded-xl'>
            <div className=''>
                <h2 className='text-2xl text-black font-bold'>Applying For</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6'>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>University:</label>
                        <select
                        onChange={handleUniversitySelection}
                        required
                        className="peer text-black h-full w-full border-b border-white-200 bg-teal-100 pt-4 pb-1.5 text-sm font-normal text-black-700 outline-none transition-all placeholder-shown:border-white-200 focus:border-gray-900 disabled:border-0 disabled:bg-white-50"
                        >
                        <option className='font-bold' value="">Select a University</option>
                        {universities?.map((uni) => (
                            <option className='font-bold' key={uni._id} value={uni?.university._id}>{uni?.university.universityName}</option>
                        ))}
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Session:</label>
                        <select
                        onChange={handleSessionSelection}
                        required
                        className="peer text-black h-full w-full border-b border-white-200 bg-teal-100 pt-4 pb-1.5 text-sm font-normal text-black-700 outline-none transition-all placeholder-shown:border-white-200 focus:border-gray-900 disabled:border-0 disabled:bg-white-50"
                        >
                        <option className='font-bold' value="">Select a Session</option>
                        {session?.map((session) => (
                            <option className='font-bold' key={session._id} value={session?._id}>{session?.sessionName}</option>
                        ))}
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        
                            <label className='font-bold text-black'>Courses:</label>
                            <select
                            className="peer text-black h-full w-full border-b border-white-200 bg-teal-100 pt-4 pb-1.5 text-sm font-normal text-black-700 outline-none transition-all placeholder-shown:border-white-200 focus:border-gray-900 disabled:border-0 disabled:bg-white-50"
                            onChange={handleCourseSelection}
                            >
                            <option className="font-bold" value="">Select a Course</option>
                            {course?.course?.map((course) => (
                                <option className="font-bold" key={course._id} value={course._id}>{course.name}</option>
                            ))}
                            </select>
                        
                      
                    </div>
                    
                    {selectedCourse && (
                        <div className='flex flex-col mt-4 lg:mt-0'>
                            <label className='font-bold text-black'>Specializations:</label>
                            <select
                            onChange={handleSpecialization}
                            className="peer text-black h-full w-full border-b border-white-200 bg-teal-100 pt-4 pb-1.5 text-sm font-normal text-black-700 outline-none transition-all placeholder-shown:border-white-200 focus:border-gray-900 disabled:border-0 disabled:bg-white-50"
                            >
                            <option className="font-bold" value=""> Select Specialization</option>
                            {course?.course?.find(course => course._id === selectedCourse)?.specializations?.map((specialization, index) => (
                                <option className="font-bold" key={index} value={specialization?.name}>{specialization.name}</option>
                            ))}
                            </select>
                        </div>
                        )}
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Year:</label>
                        <select
                            onChange={handleYear}
                            className="peer text-black h-full w-full border-b border-white-200 bg-teal-100 pt-4 pb-1.5 text-sm font-normal text-black-700 outline-none transition-all placeholder-shown:border-white-200 focus:border-gray-900 disabled:border-0 disabled:bg-white-50"
                            >
                                <option className="font-bold" value=""> Select Year</option>
                          
                                <option className="font-bold"  value="1">1</option>
                                <option className="font-bold"  value="2">2</option>
                                <option className="font-bold"  value="3">3</option>
                                <option className="font-bold"  value="4">4</option>
                                <option className="font-bold"  value="5">5</option>


                        
                            </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Type:</label>
                        <select
                            onChange={handleType}
                            className="peer text-black h-full w-full border-b border-white-200 bg-teal-100 pt-4 pb-1.5 text-sm font-normal text-black-700 outline-none transition-all placeholder-shown:border-white-200 focus:border-gray-900 disabled:border-0 disabled:bg-white-50"
                            >
                                <option className="font-bold" value=""> Select Admission Type</option>
                          
                                <option className="font-bold"  value="Fresh">FRESH</option>
                                <option className="font-bold"  value="RR">RR</option>

                        
                            </select>
                    </div>
                    </div>

            </div>
            <div className='mt-6'>
                <div className='text-2xl font-bold text-black'>
                    Personal Details
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4'>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Student Name</label>
                        <input 
                        value ={StudentName}
                        required={true}
                        onChange={(e)=>setStudentName(e.target.value)}
                        className="peer h-full w-full border-b border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-black focus:outline-0 disabled:border-0 disabled:bg-black"
                        type='text' 
                       />
                       {StudentNameError && <p className='text-sm text-red-400 font-bold'>{StudentNameError}</p> }
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Father Name</label>
                        <input 
                        value={FatherName}
                        required
                        onChange ={(e)=>setFatherName(e.target.value)}
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        type='text' 
                       />
                       {FatherNameError && <p className='text-sm text-red-400 font-bold'>{FatherNameError}</p> }
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Mother Name</label>
                        <input 
                        required
                        value={MotherName} 
                        onChange={(e)=>setMotherName(e.target.value)}
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        type='text' 
                       />
                       {MotherNameError &&  <p className='text-sm text-red-400 font-bold'>{MotherNameError}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Date Of Birth</label>
                        <input
                        value={StudentDOB}
                        required
                        onChange={(e)=>setStudentDOB(e.target.value)} 
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        type='Date' 
                       />
                       {DateOfBirthError && <p className='text-sm text-red-400 font-bold'>{DateOfBirthError}</p> }
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Gender</label>
                        <select 
                        value={Gender}
                        onChange={(e)=>setGender(e.target.value)}
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    
                       >
                            <option className="font-bold" value="">Select Gender</option>
                            <option className="font-bold" value="Male">Male</option>
                            <option className="font-bold" value="Female">Female</option>
                            <option className="font-bold" value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Category</label>
                        <select
                        value={Category}
                        onChange={(e)=>setCategory(e.target.value)} 
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    
                       >
                            <option className="font-bold" value="">Select Category</option>
                            <option className="font-bold" value="Gen">Gen</option>
                            <option className="font-bold" value="ST/SC">ST/SC</option>
                            <option className="font-bold" value="OBC">OBC</option>
                            <option className="font-bold" value="Others">Others</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Employment Status</label>
                        <select
                        value={EmploymentStatus}
                        onChange={(e)=>setEmploymentStatus(e.target.value)} 
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    
                       >
                            <option className="font-bold" value="">Select status</option>
                            <option className="font-bold" value="Employed">Employed</option>
                            <option className="font-bold" value="UnEmployed">UnEmployed</option>
                           
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Marital Status</label>
                        <select 
                        value={MartialStatus}
                        onChange={(e)=>setMartialStatus(e.target.value)}

                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    
                       >
                            <option className="font-bold" value="">Select Status</option>
                            <option className="font-bold" value="Married">Married</option>
                            <option className="font-bold" value="Single">Single</option>
                            <option className="font-bold" value="Divorced">Divorced</option>
                            <option className="font-bold" value="Others">Others</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Religion</label>
                        <select 
                        value={Religion}
                        onChange={(e)=>setReligion(e.target.value)}
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    
                       >
                            <option className="font-bold" value="">Select Status</option>
                            <option className="font-bold" value="Hindu">Hindu</option>
                            <option className="font-bold" value="Muslim">Muslim</option>
                            <option className="font-bold" value="Sikh">Sikh</option>
                            <option className="font-bold" value="Christan">Christan</option>
                            <option className="font-bold" value="Others">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Nationaily</label>
                        <select 
                        value={Nationality}
                        onChange={(e)=>setNationality(e.target.value)}
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    
                       >
                            <option className="font-bold" value="">Select Status</option>
                            <option className="font-bold" value="Indian">Indian</option>
                            <option className="font-bold" value="NRI">NRI</option>
                            
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Adhar Number</label>
                        <input 
                            value={AdharNumber}
                            onChange={(e)=>handleChangeAdhar(e)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='number' 
                       />
                       {AdharError && <p className=' text-sm text-red-400 font-bold'>{AdharError}</p>}
                       {adharExist && <p className='text-sm text-red-400 font-bold'>Given Adhar Number alreay exist</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold text-black'>Handicapped</label>
                        <select 
                        value={Handicapped}
                        onChange={(e)=>setHandicapped(e.target.value)}
                        className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    
                       >
                            <option className="font-bold" value="">Select Status</option>
                            <option className="font-bold" value="Disabled">Disabled</option>
                            <option className="font-bold" value="Abled">Abled</option>
                            
                        </select>
                    </div>

                </div>
                <div className='mt-6'>
                    <div className='text-2xl font-bold text-black'>
                        Contact Details
                    </div>
                    <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6'>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Student Phone Number</label>
                            <input 
                            required
                            value={StudentPhone}
                            onChange={(e)=>handleChange(e)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='number' 
                        />
                        {StudentPhoneError&& <p className='text-red-400 font-bold text-sm'>{StudentPhoneError}</p> }
                        {phoneExists && <p className='text-red-400 font-bold text-sm' >Phone Number already in use</p>}
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Student Alternate Number</label>
                            <input
                            value={StudentAlternateNumber}
                            onChange={(e)=>setStudentAlternateNumber(e.target.value)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 
                        />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Student Email</label>
                            <input 
                            value={StudentEmail}
                            onChange={(e)=>handleChangeEmail(e)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 
                           
                            />
                            {StudentEmailError &&<p className='text-red-400 font-bold text-sm'>{StudentEmailError}</p> }
                            {emailExist && <p className='text-red-400 font-bold text-sm'>Email Already exist</p> } 
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Parent Phone Number</label>
                            <input 
                            value={ParentPhone}
                            onChange={(e)=>setParentPhone(e.target.value)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 
                        />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Parent Email</label>
                            <input 
                            value={ParentEmail}
                            onChange={(e)=>setParentEmail(e.target.value)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 
                        />
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <div className='text-2xl font-bold text-black'>
                        Address Details
                    </div>
                    <div className='flex flex-col p-6'>
                            <label className='font-bold text-black'>Address</label>
                            <input 
                            value={Address}
                            onChange={(e)=>setAddress(e.target.value)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 
                        />
                        </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-6'>
                      
                         <div className='flex flex-col'>
                                <label className='font-bold text-black'>PinCode</label>
                                <div>
                                <input 
                            value={PinCode}
                            onChange={(e)=>handlePincodeChange(e.target.value)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 

                            />
                                </div>
                            </div>
                        
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>City/Town</label>
                            <input 
                            value={City}
                            onChange={(e)=>setCity(e.target.value)}
                            className="peer h-full w-full border-b  border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 

                            />
                            {CityError &&<p className='text-red-400 font-bold text-sm'>{CityError}</p> }
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>District</label>
                            <input 
                            value={District}
                            onChange={(e)=>setDistrict(e.target.value)}
                            className="peer h-full w-full border-b border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 
                        />
                            {DistricError &&<p className='text-red-400 font-bold text-sm'>{DistricError}</p> }
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>State</label>
                            <input 
                            value={State}
                            className="peer h-full w-full border-b border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='text' 
                            onChange={(e)=>setState(e.target.value)}
                        />
                        {StateError &&<p className='text-red-400 font-bold text-sm'>{StateError}</p> }
                        </div>
                    </div>
                       
                    </div>
                </div>
                <div className='mt-6'>
                    <div className='text-2xl font-bold text-black'>
                        Document of Student
                        <p className='text-sm text-red-400'>(Attached here clear &  scan document in JPG extenstion only)</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-6'>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Student Photo (Passport size)</label>
                            
                            <input
                            
                            onChange={(e) => handleFileUpload2('StudentPhoto', setStudentPhoto, e)}
                            className="peer h-full w-full border-b border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='file' 
                        />
                        
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Student Adhaar (Front Side)</label>
                            <input 
                   
                            onChange={(e) => handleFileUpload2('StudentAdhar', setStudentAdhar, e)}
                            className="peer h-full w-full border-b border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='file' 
                          
                        />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Student Signature</label>
                            <input 
                            onChange={(e) => handleFileUpload2('StudentSignature', setStudentSignature, e)}
                            
                            className="peer h-full w-full border-b border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='file' 
                        />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold text-black'>Student Adhaar (Back Side) </label>
                            <input 
                           
                            onChange={(e) => handleFileUpload2('ParentSignature', setParentSignature, e)}
                            className="peer h-full w-full border-b border-black bg-teal-100 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type='file' 
                        />
                        </div>
                        
                    </div>
                </div>
           


                <div className='mt-6'>
        
                    <div>
                    <div className=''>
                        
                            <div className='text-2xl font-bold text-black'>
                                Academic Details
                                <p className='text-sm text-red-400'>(Attachedclear and scan document only in PDF extension)</p>
                            </div>
                      
                        {sortedEligibilityFields?.map(eligibilityField => (
                        <div className=''>
                           
                            <div className='flex flex-col sm:flex-row items-center justify-between p-4 m-6 bg-indigo-300 rounded-sm' key={eligibilityField.id}>

                                <div className='w-full sm:w-[90px] mb-2 sm:mb-0'>
                                    <label className='text-sm text-black font-bold'>{eligibilityField?.name?.toUpperCase()}:</label>
                                </div>
                                {eligibilityField?.fields?.map((field, index) => (
                                    <div key={index} className='w-full sm:w-auto sm:ml-4'>
                                        {field === 'Marksheet' ? (
                                            <input className="peer h-full w-full border-b border-black bg-indigo-300 pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                             type='file' 
                                             accept='.pdf,.doc,.docx'  
                                             placeholder={<span className="font-bold text-black">Marksheet</span>}
                                             onChange={e =>  handleFileUpload(field, e, index,eligibilityField.name)}
                                             />
                                        ) : field === 'Year of Passing' ? (
                                            <select 
                                            className="peer text-black h-full w-full border-b border-white-200 bg-teal-100 pt-4 pb-1.5 text-sm font-normal text-black-700 outline outline-0 transition-all placeholder-shown:border-white-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-white-50"
                                                onChange={e => handleAcademicDetailsChange(field, e.target.value, index,eligibilityField.name)}
                                                >
                                                    <option className='font-bold'  value="0" >Year of Passing</option>
                                                {years.map(year => (
                                                    <option className='font-bold'  key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : field === 'Result' ? (
                                            <select 
                                                className="peer text-black h-full w-full border-b border-white-200 bg-teal-100 pt-4 pb-1.5 text-sm font-normal text-black-700 outline outline-0 transition-all placeholder-shown:border-white-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-white-50"
                                              
                                                onChange={e => handleAcademicDetailsChange(field, e.target.value, index,eligibilityField.name)}
                                            >
                                                <option className='font-bold' value="">Select Result</option>
                                                <option className='font-bold'  value="Pass">Pass</option>
                                                <option  className='font-bold' value="Discontinue">Discontinue</option>
                                            </select>
                                        ) :
                                         
                                        (
                                            <input
                                             type='text' 
                                             placeholder={field} 
                                             className="peer text-black  h-full w-full border-b  bg-teal-100 pt-4 pb-1.5  text-l font-bold  outline outline-0 transition-all placeholder-shown:border-white-200 focus:border-white-900 focus:outline-0 disabled:border-0" 
                                             onChange={e => handleAcademicDetailsChange(field, e.target.value, index,eligibilityField.name)}
                                             />
                                        )}
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                    <div className="flex justify-end mt-5 p-5">
                        <button   disabled={adharExist || phoneExists}  
                        className={`rounded-xl text-indigo-300 font-bold px-8 py-3 ${adharExist || phoneExists ? 'bg-red-500' : 'bg-white'}`}
                        onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                </div>
            
        </div>
    )
}
