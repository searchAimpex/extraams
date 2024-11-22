import React, { useContext, useEffect } from 'react';
import { StepperContext } from '../../contexts/StepperContex';

export default function Personal({ handleValidation }) {
    const { userData, setUserData } = useContext(StepperContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSelectGender = (selectedValue) => {
        setUserData({ ...userData, gender: selectedValue });
    };

    const handleSelectCategory = (selectedValue) => {
        setUserData({ ...userData, category: selectedValue });
    };

    const handleSelectMaritalStatus = (selectedValue) => {
        setUserData({ ...userData, maritalStatus: selectedValue });
    };

    const handleSelectEmploymentStatus = (selectedValue) => {
        setUserData({ ...userData, employmentStatus: selectedValue });
    };

    const handleSelectReligion = (selectedValue) => {
        setUserData({ ...userData, religion: selectedValue });
    };

    const handleSelectNationality = (selectedValue) => {
        setUserData({ ...userData, nationality: selectedValue });
    };

    useEffect(() => {
        // Call the handleValidation function whenever userData changes
        handleValidation(validateForm());
    }, [userData]);

    const validateForm = () => {
        const requiredFields = ['name', 'fatherName', 'motherName', 'dob', 'gender', 'category', 'maritalStatus', 'employmentStatus', 'religion', 'nationality'];
        for (const field of requiredFields) {
            if (!userData[field]) {
                return false; // Return false if any required field is empty
            }
        }
        return true; // Return true if all required fields are filled
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-5 p-2 m-2">
                <div>
                    <input
                        type="text"
                        name="studentName"
                        placeholder="Student Name"
                        value={userData.name || ''}
                        onChange={handleChange}
                        className="p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="fatherName"
                        placeholder="Father's Name"
                        value={userData.fatherName || ''}
                        onChange={handleChange}
                        className="p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="motherName"
                        placeholder="Mother's Name"
                        value={userData.motherName || ''}
                        onChange={handleChange}
                        className="p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name="dob"
                        placeholder="DOB"
                        value={userData.dob || ''}
                        onChange={handleChange}
                        className="p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <select
                        name="gender"
                        value={userData.gender || ''}
                        onChange={(e) => handleSelectGender(e.target.value)}
                        className="p-2 w-full border rounded-md"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <select
                        name="category"
                        value={userData.category || ''}
                        onChange={(e) => handleSelectCategory(e.target.value)}
                        className="p-2 w-full border rounded-md"
                    >
                        <option value="">Select Category</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC/ST">SC/ST</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <select
                        name="maritalStatus"
                        value={userData.maritalStatus || ''}
                        onChange={(e) => handleSelectMaritalStatus(e.target.value)}
                        className="p-2 w-full border rounded-md"
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                    </select>
                </div>
                <div>
                    <select
                        name="employmentStatus"
                        value={userData.employmentStatus || ''}
                        onChange={(e) => handleSelectEmploymentStatus(e.target.value)}
                        className="p-2 w-full border rounded-md"
                    >
                        <option value="">Select Employment Status</option>
                        <option value="Employed">Employed</option>
                        <option value="Unemployed">Unemployed</option>
                    </select>
                </div>
                <div>
                    <select
                        name="religion"
                        value={userData.religion || ''}
                        onChange={(e) => handleSelectReligion(e.target.value)}
                        className="p-2 w-full border rounded-md"
                    >
                        <option value="">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Christian">Christian</option>
                        <option value="Jain">Jain</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <select
                        name="nationality"
                        value={userData.nationality || ''}
                        onChange={(e) => handleSelectNationality(e.target.value)}
                        className="p-2 w-full border rounded-md"
                    >
                        <option value="">Select Nationality</option>
                        <option value="Indian">Indian</option>
                        <option value="NRI">NRI</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
