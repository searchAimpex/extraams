import React, { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContex';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function DocumentForm() {
    const { userData, setUserData } = useContext(StepperContext);
    const storage = getStorage();

    // Function to handle file upload
    const handleFileUpload = (fieldName, e) => {
        const file = e.target.files[0];
        const fileName = new Date().getTime() + '-' + file.name;
        const fileRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Track the upload progress if needed
            },
            (error) => {
                console.error('Upload error:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // Update the userData with the download URL of the uploaded file
                    setUserData((prevUserData) => ({
                        ...prevUserData,
                        [fieldName]: downloadURL,
                    }));
                });
            }
        );
    };

    console.log('Document', userData);

    return (
        <div>
            <div className='grid grid-cols-3 gap-5 p-4'>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Photo of Student</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload('photoOfStudent', e)}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:py-2 file:px-4 file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Adhaar of Applicant</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload('adhaarOfApplicant', e)}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:py-2 file:px-4 file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Student Signature</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload('studentSignature', e)}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:py-2 file:px-4 file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Signature</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload('parentSignature', e)}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:py-2 file:px-4 file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Migration Certification</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload('migrationCertification', e)}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:py-2 file:px-4 file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Affidavit</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload('affidavit', e)}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:py-2 file:px-4 file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Other Certificate</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload('otherCertificate', e)}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:py-2 file:px-4 file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
}
