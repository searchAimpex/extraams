import React, { useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useFetchCenterDetailsFromUserMutation } from '../slices/adminApiSlice';
import { useCreateBulkMutation } from '../slices/usersApiSlice';
import { app } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateTransaction() {
  const { center } = useSelector((state) => state.auth.userInfo);
  const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation();
  const [createBulk, { isLoading, isSuccess, isError }] = useCreateBulkMutation();
  const navigate = useNavigate();
  const [centerDetails, setCenterDetails] = useState({});
  const [formData, setFormData] = useState({
    center: center,
    university: '',
    transactionID: '',
    transactionDate: '',
    amount: '',
    paymentMode: '',
    transactionRecipt: '',
    studentFile: '',
    comment: '',
  });

  const [fileUploading, setFileUploading] = useState(false);

  // Fetch center details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchCenterDetailsFromUser(center);
        if (response?.data) {
          setCenterDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching center details:', error);
      }
    };

    fetchDetails();
  }, [center, fetchCenterDetailsFromUser]);

  // Navigate on success
  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction completed successfully');
      navigate('/user/viewtransaction');
    }
  }, [isSuccess, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileInputChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setFileUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: handle progress
      },
      (error) => {
        console.error('Error uploading file:', error);
        setFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData((prev) => ({
              ...prev,
              [fieldName]: downloadURL,
            }));
            setFileUploading(false);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
            setFileUploading(false);
          });
      }
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBulk(formData);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Create Transaction</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        {/* University Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            University
          </label>
          <select
            name="university"
            value={formData.university}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
            required
          >
            <option value="" disabled>
              Select a university
            </option>
            {centerDetails.AssignUniversity?.map((university, index) => (
              <option key={index} value={university.university._id}>
                {university.university.universityName}
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transaction Date
          </label>
          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
          {/* Transaction ID */}
          <div>
          <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
          <input
            type="text"
            name="transactionID"
            value={formData.transactionID}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
            placeholder="Enter transactionID"
            required
          />
        </div>


        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
            placeholder="Enter Amount"
            required
          />
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Mode
          </label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
            required
          >
            <option value="" disabled>
              Select payment mode
            </option>
            <option value="CreditCard">Credit Card</option>
            <option value="BankTransfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        {/* Transaction Receipt */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transaction Receipt
          </label>
          <input
            type="file"
            onChange={(e) => handleFileInputChange(e, 'transactionRecipt')}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
          />
          {fileUploading && (
            <p className="text-sm text-teal-500 mt-2">Uploading file...</p>
          )}
          {formData.transactionRecipt && (
            <p className="text-sm text-teal-500 mt-2">File uploaded successfully.</p>
          )}
        </div>

        {/* Student File */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Student File</label>
          <input
            type="file"
            onChange={(e) => handleFileInputChange(e, 'studentFile')}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
          />
          {formData.studentFile && (
            <p className="text-sm text-teal-500 mt-2">File uploaded successfully.</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
            placeholder="Add a comment (optional)"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg bg-teal-500 text-white font-medium shadow-lg transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'
            }`}
            disabled={isLoading || fileUploading}
          >
            {isLoading ? 'Creating Transaction...' : 'Create Transaction'}
          </button>
        </div>

        {/* Success/Error Messages */}
        {isSuccess && (
          <p className="text-green-500 mt-4">Transaction created successfully!</p>
        )}
        {isError && (
          <p className="text-red-500 mt-4">Error creating transaction. Please try again.</p>
        )}
      </form>
    </div>
  );
}
