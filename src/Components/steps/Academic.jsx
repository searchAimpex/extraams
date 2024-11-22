import React, { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContex';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function Academic() {
    const { userData, setUserData } = useContext(StepperContext);
    const storage = getStorage();

    const handleChange = async (e, eligibilityIndex, eligibilityName) => {
        const { name, files } = e.target;

        const updatedUserData = { ...userData };

        if (!updatedUserData.academics) {
            updatedUserData.academics = [];
        }

        if (!updatedUserData.academics[eligibilityIndex]) {
            updatedUserData.academics[eligibilityIndex] = {};
        }

        if (name === 'marksheet') {
            const file = files[0];
            const fileName = new Date().getTime() + '-' + file.name;
            const fileRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Track progress
                },
                (error) => {
                    console.error('Upload error:', error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updatedUserData.academics[eligibilityIndex]['marksheetURL'] = downloadURL;
                        setUserData(updatedUserData);
                    });
                }
            );
        } else {
            const { value } = e.target;
            updatedUserData.academics[eligibilityIndex][name] = value;
            updatedUserData.academics[eligibilityIndex]['eligibilityName'] = eligibilityName;
            setUserData(updatedUserData);
        }
    };

    const renderEligibilityRows = () => {
        return userData?.course?.eligibility?.map((eligibility, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 uppercase mb-4">{eligibility}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Board/University</label>
                        <input
                            type="text"
                            name="boardUniversity"
                            value={userData?.academics?.[index]?.boardUniversity || ''}
                            onChange={(e) => handleChange(e, index, eligibility)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Board/University"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={userData?.academics?.[index]?.subject || ''}
                            onChange={(e) => handleChange(e, index, eligibility)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Subject"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing</label>
                        <input
                            type="number"
                            name="yearOfPassing"
                            value={userData?.academics?.[index]?.yearOfPassing || ''}
                            onChange={(e) => handleChange(e, index, eligibility)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Year"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marksheet</label>
                        <input
                            type="file"
                            name="marksheet"
                            onChange={(e) => handleChange(e, index, eligibility)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {userData?.academics?.[index]?.marksheetURL && (
                            <p className="text-sm text-green-600 mt-2">File Uploaded</p>
                        )}
                    </div>
                </div>
            </div>
        ));
    };

    return <div className="p-6">{renderEligibilityRows()}</div>;
}
