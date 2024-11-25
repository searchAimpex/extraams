import React, { useEffect, useState } from 'react';
import { useFetchCenterDetailsFromUserMutation } from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function UniversityView() {
  const [FetchCenterDetailsFromUser, { isSuccess }] = useFetchCenterDetailsFromUserMutation();
  const [universities, setUniversities] = useState([]);
  const { center } = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await FetchCenterDetailsFromUser(center).unwrap();
        setUniversities(response); // Assuming the API returns a list of universities
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, [FetchCenterDetailsFromUser, center]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="p-6 space-y-12">
      {/* Section 1: Assigned Universities */}
      <section>
        <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide">
          Universities
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {isSuccess && universities?.AssignUniversity?.length > 0 ? (
            universities?.AssignUniversity?.map((university, index) => (
              <motion.div
                key={university.id}
                className="border border-gray-200 rounded-lg shadow-xl overflow-hidden bg-white hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                variants={cardVariants}
              >
                <div className="h-32 overflow-hidden flex items-center justify-center relative group">
                  <img
                    src={university?.university?.UniLogo || 'https://via.placeholder.com/150'}
                    alt={university?.university?.univserityShortName}
                    className="w-[120px] h-[60px] object-contained group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2 text-center">
                  <h2 className="text-lg font-bold text-gray-800">
                    {university?.university?.univserityShortName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {university?.university?.vertical || 'Category not available'}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-lg text-center text-gray-500 col-span-full">
              {isSuccess ? 'No universities found' : 'Loading universities...'}
            </p>
          )}
        </div>
      </section>

      {/* Section 2: Request Universities */}
      <section>
        <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide">
          We Are Also Working With
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {isSuccess && universities?.RequestUniversity?.length > 0 ? (
            universities?.RequestUniversity?.map((university, index) => (
              <motion.div
                key={university.id}
                className="border border-gray-200 rounded-lg shadow-xl overflow-hidden bg-white hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                variants={cardVariants}
              >
                <div className="h-32 overflow-hidden flex items-center justify-center relative group">
                  <img
                    src={university?.university?.UniLogo || 'https://via.placeholder.com/150'}
                    alt={university?.university?.univserityShortName}
                    className="w-[60px] h-[30px] object-contained group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2 text-center">
                  <h2 className="text-lg font-bold text-gray-800">
                    {university?.university?.univserityShortName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {university?.university?.vertical || 'Category not available'}
                  </p>
                  {/* Send Request Button */}
                  <button
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      // You can handle the request logic here, like making an API call
                      alert(`Request sent for ${university?.university?.univserityShortName}`);
                    }}
                  >
                    Send Request
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-lg text-center text-gray-500 col-span-full">
              {isSuccess ? 'No universities found' : 'Loading universities...'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
