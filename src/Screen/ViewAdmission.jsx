import React, { useEffect, useState } from 'react';
import { useFetchStudentByCenterMutation } from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';
import { PDFDocument,TextAlignment,rgb ,PDFName} from 'pdf-lib';

export default function ViewAdmission() {
  const [FetchStudentByCenter, { data, isLoading, isError, error }] = useFetchStudentByCenterMutation();
  const { center } = useSelector((state) => state.auth.userInfo);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);


  const fetchPdfTemplate = async (URL) => {
    try {
      const response = await fetch(URL); // Adjust the path to match your file structure
      const pdfBytes = await response.arrayBuffer();
      return pdfBytes;
    } catch (error) {
      console.error('Error fetching PDF template:', error);
      return null;
    }
  };
  // Function to trigger the download of the PDF
const downloadPdf = (pdfBytes, filename) => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const generatePDF = async (data) => {
  try {
    const existingPdfBytes = await fetchPdfTemplate(data?.university?.AcknowledgementTemplate?.fileUrl);
    if (!existingPdfBytes) return;

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    const fields = form.getFields();
    fields.forEach(field => {
      const type = field.constructor.name;
      const name = field.getName();
      console.log(`${type}: ${name}`);
    });

    const getFieldSafely = (fieldName) => {
      try {
        return form.getTextField(fieldName);
      } catch (e) {
        console.warn(`Field '${fieldName}' does not exist in the form`);
        return null;
      }
    };

    const RefrenceNumber = getFieldSafely('Ref_No');
    if (RefrenceNumber) {
      RefrenceNumber.setText(data?.unicode || '');
      RefrenceNumber.disableReadOnly();
    }

    const emblemUrl = data?.StudentPhoto;
    if (emblemUrl) {
      const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer());
      const qrImage = await pdfDoc.embedJpg(emblemImageBytes);

      const StudentPhotoField = form.getButton('Student_Photo_af_image');
      if (StudentPhotoField) {
         // Get the bounding box of the 'Student_photo' field
        
          StudentPhotoField.setImage(qrImage)


      }
    }

    const studentSession = getFieldSafely('Student_Session');
    if (studentSession) {
      studentSession.setText(data?.session?.sessionName || '');
    }

    const studentCourse = getFieldSafely('Student_Course');
    if (studentCourse) {
      studentCourse.setText(data?.course?.name || '');
    }

    const studentSpecialization = getFieldSafely('Student_Specialization');
    if (studentSpecialization) {
      studentSpecialization.setText(data?.specialization || '');
    }

    const studentYear = getFieldSafely('Student_Year');
    if (studentYear) {
      studentYear.setText(data?.Year || '');
    }

    const xyz = getFieldSafely('xtx');
    if (xyz) {
      xyz.setText(data?.specialization || '');
    }
    const studentGender =  getFieldSafely('Student_Gender');
    if(studentGender) {
      studentGender.setText(data?.Gender || '');
    }
    const studentDOB =  getFieldSafely('Student_DOB');
    if(studentDOB) {
      studentDOB.setText(data?.DateOfBirth.split("T")[0] || '');
    }
    const studentName =  getFieldSafely('Student_Name');
    if(studentName) {
      studentName.setText(data?.StudentName.toUpperCase()|| '');
    }
    const studentFatherName =  getFieldSafely('Student_FatherName');
    if(studentFatherName) {
      studentFatherName.setText(data?.FatherName.toUpperCase()  || '');
    }
    const studentMotherName =  getFieldSafely('Student_MotherName');
    if(studentMotherName) {
      studentMotherName.setText(data?.MotherName.toUpperCase() || '');
    }
    const studentAadharNumber =  getFieldSafely('Student_AadharNo');
    if(studentAadharNumber) {
      studentAadharNumber.setText(data?.AdharNumber || '');
    }
    const studentEmail =  getFieldSafely('Student_Email');
    if(studentEmail) {
      studentEmail.setText(data?.AdharNumber || '');
    }
    const studentCategory =  getFieldSafely('Student_Category');
    if(studentCategory) {
      studentCategory.setText(data?.Category || '');
    }
    const studentMaritalStatus =  getFieldSafely('Student_MaritalStatus');
    if(studentMaritalStatus) {
      studentMaritalStatus.setText(data?.MartialStatus || '');
    }
    const studentReligion =  getFieldSafely('Student_Religion');
    if(studentReligion) {
      studentReligion.setText(data?.Religion || '');
    }

    const studentAddress =  getFieldSafely('Student_Address');
    if(studentAddress) {
      studentAddress.setText(data?.Address || '');
    }

    const studentPhone =  getFieldSafely('Student_PhoneNo');
    if(studentPhone) {
      studentPhone.setText(data?.StudentPhone || '');
    }

    const studentParentEmail =  getFieldSafely('Student_FatherEmail');
    if(studentParentEmail) {
      studentParentEmail.setText(data?.ParentEmail || '');
    }

    const studentCity =  getFieldSafely('Student_City');
    if(studentCity) {
      studentCity.setText(data?.City || '');
    }

    const studentState =  getFieldSafely('Student_State');
    if(studentState) {
      studentState.setText(data?.State || '');
    }
    const studentPincode =  getFieldSafely('Student_Pincode');
    if(studentPincode) {
      studentPincode.setText(data?.PinCode || '');
    }


    const studentFatherPhone =  getFieldSafely('Student_FatherPhoneNo');
    if(studentFatherPhone) {
      studentFatherPhone.setText(data?.ParentPhone || '');
    }
    const studentEnrollment =  getFieldSafely('Student_Enrollment');
    if(studentEnrollment) {
      studentEnrollment.setText(data?.enrollmentNumber || '');
    }
    const studentRoll =  getFieldSafely('Student_Roll');
    if(studentRoll) {
      studentRoll.setText(data?.rollNumber || '');
    }

    const studentApplyDate =  getFieldSafely('Student_Apply');
    if(studentApplyDate) {
      studentApplyDate.setText(data?.createdAt.split('T')[0] || '');
    }
    
    const emblemUrlSignature = data?.StudentSignature;
    if (emblemUrlSignature) {
      const emblemImageBytes = await fetch(emblemUrlSignature).then(res => res.arrayBuffer());
      const qrImage = await pdfDoc.embedJpg(emblemImageBytes);

      const Studentsignature = form.getButton('Student_signature');
      if (Studentsignature) {
         // Get the bounding box of the 'Student_photo' field
        
         Studentsignature.setImage(qrImage)


      }
    }

       // Fill academic details
       const academicFieldsMap = {
        "High-school": {
          board: "Student_HighSchool_Board",
          year: "Student_HighSchool_Year"
        },
        "Intermediate": {
          board: "Student_Inter_Board",
          year: "Student_Inter_Year"
        },
        "Diploma": {
          board: "Student_Diploma_Board",
          year: "Student_Diploma_Year"
        },
        "UG": {
          board: "Student_Graduation_Board",
          year: "Student_Graduation_Year"
        },
        "PG": {
          board: "Student_PostGraduation_Board",
          year: "Student_PostGraduation_Year"
        }
      };
      console.log("data",data.academicDetails)
      data?.academicDetails?.academicDetails?.forEach(detail => {
        console.log("acadmic Details",detail)
        const fields = academicFieldsMap[detail.elegibilityName];
        console.log("acadmic Details",fields)
        if (fields) {
          const boardField = getFieldSafely(fields.board);
          if (boardField) {
            boardField.setText(detail['Board/University'] || '');
          }
  
          const yearField = getFieldSafely(fields.year);
          if (yearField) {
            yearField.setText(detail['Year of Passing'] || '');
          }
        }
      });
  

    // Flatten the form fields
    form.flatten();

    const modifiedPdfBytes = await pdfDoc.save();
    downloadPdf(modifiedPdfBytes, `${data?.StudentName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchStudentByCenter(center);
        if (response.data) {
          setStudents(response.data); // Assuming response.data contains the student array
          setFilteredStudents(response.data); // Initialize the filtered students
        }
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchData();
  }, [FetchStudentByCenter, center]);

  // Handle filtering
  useEffect(() => {
    const filtered = students.filter((student) => {
      const refNoMatch = student.unicode.toLowerCase().includes(searchTerm.toLowerCase());
      const nameMatch = student.StudentName.toLowerCase().includes(searchTerm.toLowerCase());
      const centerCodeMatch = student.center.CenterCode.toLowerCase().includes(searchTerm.toLowerCase());
      return refNoMatch || nameMatch || centerCodeMatch;
    });
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, students]);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredStudents.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || 'Failed to fetch data'}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admissions by Center</h1>

      {/* Search and Rows per Page */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Ref No, Name, or Center Code"
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
      <div className="overflow-x-auto ">
        <div className="w-[1200px] overflow-scroll shadow-md border border-gray-300">
          <table className=" border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Ref No.</th>
                <th className="border px-4 py-2">Pay</th>
                <th className="border px-4 py-2">Download PDF</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">University</th>
                <th className="border px-4 py-2">Session</th>
                <th className="border px-4 py-2">Father Name</th>
                <th className="border px-4 py-2">Course</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">State</th>
                <th className="border px-4 py-2">Enrollment Number</th>
                <th className="border px-4 py-2">Roll Number</th>
                <th className="border px-4 py-2">Application Status</th>
                <th className="border px-4 py-2">Document Status</th>
                <th className="border px-4 py-2">Applied Date</th>

              </tr>
            </thead>
            <tbody>
              {currentRows && currentRows.length > 0 ? (
                currentRows.map((student) => (
                  <tr key={student._id}>
                    <td className="border px-4 py-2">{student.unicode}</td>
                    <td className="border px-2 py-2">
                      <div className='flex flex-row space-x-2 items-center'>
                        <span 
                          className={`
                            px-2 py-1 rounded-lg text-white
                            ${student?.paymentStatus === 'Pending' ? 'bg-yellow-500' :
                              student?.paymentStatus === 'Check' ? 'bg-blue-500' :
                              student?.paymentStatus === 'Paid' ? 'bg-green-500' :
                              student?.paymentStatus === 'Rejected' ? 'bg-red-500' :
                              student?.paymentStatus === 'Partial' ? 'bg-orange-500' :
                              student?.paymentStatus === 'Refunded' ? 'bg-purple-500' :
                              'bg-gray-500'  // Default color
                            }
                          `}
                        >
                          {student?.paymentStatus?.toUpperCase()}
                        </span> 

                        {student?.paymentStatus === 'Pending' && (
                          <span className="bg-teal-500 p-2 rounded-xl text-white cursor-pointer">
                            Pay
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                        <button className='bg-teal-500 p-2 rounded-md text-white' onClick={() => generatePDF(student)}>
                                  Download
                        </button>
                    </td>
                    <td className="border px-4 py-2">{student.StudentName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.university?.universityName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.session?.sessionName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.FatherName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.course?.shortName || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.StudentPhone || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.State || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.enrollmentNo || 'N/A'}</td>
                    <td className="border px-4 py-2">{student.rollNo || 'N/A'}</td>
                    <td className="border px-4 py-2 text-center">
                      <span className={`
                        px-2 py-1 rounded-lg text-white 
                        ${student?.applicationStatus === 'pending' ? 'bg-yellow-500' :
                          student?.applicationStatus === 'approved' ? 'bg-green-500' :
                          student?.applicationStatus === 'cancelled' ? 'bg-red-500' :
                          'bg-gray-500'  // Default color
                        }`}>
                        {student.applicationStatus?.toUpperCase() || 'N/A'}
                      </span>
                    </td>

                    <td className="border px-4 py-2 text-center">
                      <span className={`
                        px-2 py-1 rounded-lg text-white 
                        ${student?.docStatus === 'pending' ? 'bg-yellow-500' :
                          student?.docStatus === 'verified' ? 'bg-green-500' :
                          student?.docStatus === 'revert' ? 'bg-orange-500' :
                          student?.docStatus === 'recheck' ? 'bg-blue-500' :
                          'bg-gray-500'  // Default color
                        }`}>
                        {student.docStatus?.toUpperCase() || 'N/A'}
                      </span>
                    </td>
                    <td className="border py-2">{student.createdAt.split("T")[0] || 'N/A'}</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="border px-4 py-2 text-center">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange('prev')}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}