import React, { useEffect, useState } from 'react'



import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Basic from '../Components/steps/Basic';
import Personal from '../Components/steps/Personal';
import Contact from '../Components/steps/Contact';
import Academic from '../Components/steps/Academic';
import DocumentForm from '../Components/steps/DocumentForm';
import Stepper from '../Components/Stepper';
import { StepperContext } from '../contexts/StepperContex';
import StepperControl from '../Components/StepperControl';
import { useCreateOnlineApplicationMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';

export default function CreateOnlineAdmission() {
    const [currentStep , setCurrentStep] = useState(1)
    const [userData,setUserData] =  useState("")
    const [finalData,setFinalData] = useState([])
    const [CreateOnlineApplication,{isSuccess}] = useCreateOnlineApplicationMutation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(isSuccess){
            toast.success("Admission Applied")
            navigate('/user/viewonline')
        }

    },[isSuccess])
    const [isFilled, setIsFilled] = useState(false); // State to track form validation
   
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    const steps = [
        "Basic",
        "Personal Details",
        "Contact Details",
        "Academic Details",
        "Document",
        "Final"
    ];
    const handleValidation = (isValid) => {
        setIsFilled(isValid); // Update the validation state
    };

    const displayStep = (step) =>{
        switch(step) {
            case 1:
                return <Basic  handleValidation={handleValidation} />
            case 2:
                return <Personal  handleValidation={handleValidation}/>
            case 3: 
                return <Contact  handleValidation={handleValidation} />  
            case 4:
                return <Academic /> 
            case 5:
                return <DocumentForm />
            case 6:
                return <Final />    
            default:
                <Account />      
        }
    }
    const handleClick = (direction) =>{
        let newStep = currentStep
        direction === "next" ? newStep++ : newStep-- 
        newStep > 0 && newStep < steps.length && setCurrentStep(newStep);
    }
    // Function to handle form submission
    const handleSubmit = () => {
        // Get the finalData from state
        const finalDataFromState = finalData;
        // Assuming each step updates userData in its respective component,
        // you need to retrieve userData from the context and update it before submission
        const userDataFromState = userData;
        // Submit finalData and userData to your backend or perform any other action
        console.log('Form data submitted:', userDataFromState);
        const Data = {
            Affidavit: userDataFromState.Affidavit,
            Unicode: userDataFromState.Unicode,
            academics: userDataFromState.academics,
            address: userDataFromState.address,
            adhaarOfApplicant: userDataFromState.adhaarOfApplicant,
            university: userDataFromState.university._id,
            session: userDataFromState.session._id,
            course: userDataFromState.course._id,
            center:userDataFromState.center._id,
            alternatePhone: userDataFromState.alternatePhone,
            category: userDataFromState.category,
            city: userDataFromState.city,
            country: userDataFromState.country,
            district: userDataFromState.district,
            dob: userDataFromState.dob,
            email: userDataFromState.email,
            employmentStatus: userDataFromState.employmentStatus,
            fatherName: userDataFromState.fatherName,
            gender: userDataFromState.gender,
            maritalStatus: userDataFromState.maritalStatus,
            migrationCertification: userDataFromState.migrationCertification,
            motherName: userDataFromState.motherName,
            name: userDataFromState.name,
            nationality: userDataFromState.nationality,
            otherCertificate: userDataFromState.otherCertificate,
            parentEmail: userDataFromState.parentEmail,
            parentMobile: userDataFromState.parentMobile,
            parentSignature: userDataFromState.parentSignature,
            phone: userDataFromState.phone,
            photoOfStudent: userDataFromState.photoOfStudent,
            pinCode: userDataFromState.pinCode,
            religion: userDataFromState.religion,
            specialization: userDataFromState.specialization,
            state: userDataFromState.state,
            studentSignature: userDataFromState.studentSignature
        };
        
        console.log("sending data",Data)
        // dispatch(CreateApplyOnline(Data))
        CreateOnlineApplication(Data)

    };
  return (
    <div className='md:m-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white'>
           
        <div className='container horizontal mt-5'>
            <Stepper steps ={steps} currentStep={currentStep} />
            <div className='mt-10 p-10'>
                <StepperContext.Provider value ={{userData,setUserData,finalData,setFinalData}}>
                    {displayStep(currentStep)}
                </StepperContext.Provider>
            </div>
        </div>
        <div>
            <StepperControl 
                handleClick = {handleClick}
                currentStep ={currentStep}
                steps = {steps}
                handleSubmit ={handleSubmit}
                isFilled={isFilled} 
            />
        </div>
        
    </div>
  )
}
