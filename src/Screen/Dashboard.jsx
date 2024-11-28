import React, { useEffect, useState } from 'react';
import {
  Wallet,
  Users,
  Globe,
  BarChart,
} from 'lucide-react';
import {
  useFetchCenterDetailsFromUserMutation,
  useFetchCrouselMutation,
  useFetchLeadsMutation,
} from '../slices/adminApiSlice';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { center } = useSelector((state) => state.auth.userInfo);
  const [fetchCenterDetailsFromUser] = useFetchCenterDetailsFromUserMutation();
  const [fetchCrousel] = useFetchCrouselMutation();
  const [fetchLeads] = useFetchLeadsMutation();

  const [universities, setUniversities] = useState([]);
  const [requestUniversity, setRequestUniversity] = useState([]);
  const [crousel, setCrousel] = useState([]);
  const [leads, setLeads] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = crousel?.length || 0;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchCenterDetailsFromUser(center);
        const leadResponse = await fetchLeads(center);
        const crouselResponse = await fetchCrousel();

        if (response?.data) {
          setUniversities(response.data?.AssignUniversity || []);
          setRequestUniversity(response.data?.RequestUniversity || []);
        }
        if (leadResponse?.data) {
          setLeads(leadResponse.data);
        }
        if (crouselResponse?.data) {
          setCrousel(crouselResponse.data);
        }
      } catch (error) {
        console.error('Error fetching center details:', error);
      }
    };

    fetchDetails();

    // Auto-switch carousel every 5 seconds
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 5000);

    return () => clearInterval(interval);
  }, [center, fetchCenterDetailsFromUser, fetchCrousel, fetchLeads, totalImages]);

  // Handle manual navigation
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  return (
    <div className="p-2 space-y-6 bg-teal-50">
      {/* Carousel */}
      <div className="relative w-full h-[570px] overflow-hidden rounded-lg">
        {crousel?.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.altName}
              className="w-full h-full object-contained"
              loading={index === activeIndex ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
        >
          ❯
        </button>
      </div>
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="University" value={universities?.length} icon={<Wallet size={20} />} />
        <StatCard title="Request University" value={requestUniversity?.length} icon={<Users size={20} />} />
        <StatCard title="Total Lead" value={leads?.length} icon={<Globe size={20} />} />
        <StatCard title="Total Admissions" value="0" icon={<BarChart size={20} />} />
      </div>

    </div>
  );
};

// StatCard Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
        {icon}
      </div>
    </div>
  </div>
);

export default Dashboard;
