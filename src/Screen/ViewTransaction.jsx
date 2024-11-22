import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useViewBulkMutation } from '../slices/usersApiSlice'; // Replace with your actual API slice

export default function ViewTransaction() {
  const [viewBulk, { data, isLoading, error }] = useViewBulkMutation();
  const { center } = useSelector((state) => state.auth.userInfo);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewBulk({ centerId: center }); // Pass the required data to your mutation
        if (response.data) {
          setTransactions(response.data); // Assuming your mutation returns an array of transactions
          setFilteredTransactions(response.data); // Initialize filtered transactions
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchData();
  }, [center, viewBulk]);

  // Handle filtering by Transaction ID
  useEffect(() => {
    const filtered = transactions.filter((transaction) =>
      transaction.transactionID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, transactions]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTransactions.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Modal open/close handling
  const handleModalOpen = (receiptUrl) => {
    setSelectedReceipt(receiptUrl);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedReceipt('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {/* Search and Rows Per Page */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Transaction ID"
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
      {filteredTransactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">University</th>
                <th className="py-2 px-4 border border-gray-300">Transaction ID</th>
                <th className="py-2 px-4 border border-gray-300">Date</th>
                <th className="py-2 px-4 border border-gray-300">Amount</th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
                <th className="py-2 px-4 border border-gray-300">Student List</th>
                <th className="py-2 px-4 border border-gray-300">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-teal-100 transition-colors duration-300"
                >
                  <td className="py-2 px-4 border border-gray-300">
                    {transaction.university.universityName}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {transaction.transactionID}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {transaction.transactionDate.split('T')[0]}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {transaction.amount}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {transaction.paymentStatus}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button
                      onClick={() => handleModalOpen(transaction.studentFile)}
                      className="text-teal-500 hover:underline transition-colors duration-200"
                    >
                      View Students
                    </button>
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button
                      onClick={() => handleModalOpen(transaction.transactionRecipt)}
                      className="text-teal-500 hover:underline transition-colors duration-200"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-500 text-white'
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-500 text-white'
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal for receipt view */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg animate__animated animate__fadeIn">
            <h3 className="text-xl font-bold mb-4">Receipt Details</h3>
            <div>
              <iframe
                src={selectedReceipt}
                title="Transaction Receipt"
                className="w-full h-96 border-none"
              />
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
