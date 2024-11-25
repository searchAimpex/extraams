import React, { useEffect, useState } from 'react';
import { useFetchCenterCommissionMutation } from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const TABLE_HEAD = ["Amount", "Remark", "Transaction ID", "Date", "Receipt", "Invoice"];

export default function RecivedPayment() {
  const { center } = useSelector((state) => state.auth.userInfo);
  const [FetchCenterCommission] = useFetchCenterCommissionMutation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactionID, setTransactionID] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const centerDetails = await FetchCenterCommission(center).unwrap();
        setData(centerDetails);
        setFilteredData(centerDetails); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching center details:', error);
      }
    };

    if (center) fetchUniversities();
  }, [center, FetchCenterCommission]);

  useEffect(() => {
    const total = filteredData.reduce((sum, { amount }) => sum + parseFloat(amount || 0), 0);
    setTotalAmount(total);
  }, [filteredData]);

  // Filter data based on Transaction ID and Date Range
  const filterData = () => {
    let filtered = data;

    if (transactionID) {
      filtered = filtered.filter(item => item.transactionID.includes(transactionID));
    }

    if (startDate) {
      filtered = filtered.filter(item => dayjs(item.date).isAfter(dayjs(startDate).subtract(1, 'day')));
    }

    if (endDate) {
      filtered = filtered.filter(item => dayjs(item.date).isBefore(dayjs(endDate).add(1, 'day')));
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  useEffect(() => {
    filterData();
  }, [transactionID, startDate, endDate]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page on rows per page change
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-4">
        <h2 className="text-xl font-semibold text-blue-600">Total Commission Amount: ₹{totalAmount.toFixed(2)}</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-lg"
          placeholder="Search by Transaction ID"
          value={transactionID}
          onChange={(e) => setTransactionID(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-lg"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-lg"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <table className="w-full table-auto text-left border-collapse">
        <thead>
          <tr className="bg-blue-100">
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-3 font-medium text-gray-700">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData?.length ? (
            paginatedData.map(({ _id, transactionID, recipt, amount, remark, invoice, date }, idx) => (
              <tr key={_id} className={`hover:bg-blue-50 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="p-3">{amount}</td>
                <td className="p-3">{remark}</td>
                <td className="p-3">{transactionID}</td>
                <td className="p-3">{date}</td>
                <td className="p-3 text-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => window.open(recipt, "_blank")}
                  >
                    View Receipt
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => window.open(invoice, "_blank")}
                  >
                    View Invoice
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="text-center p-3 text-gray-500">
                No commission data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-4">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 p-2 rounded-lg"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 text-blue-600 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 text-blue-600 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
