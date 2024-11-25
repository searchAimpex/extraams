import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  LogOut, Home, User, Settings, ChevronDown, ChevronUp, Menu, 
  CreditCard, BarChart2, HelpCircle, PowerOff, 
  User2Icon
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { useFetchPopUpMutation } from '../slices/adminApiSlice';

export default function PrivateLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const [FetchPopUp] = useFetchPopUpMutation();

  // State to control sidebar and submenu
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // State to manage popup messages
  const [popupMessages, setPopupMessages] = useState([]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);

  // State to control the sign-out confirmation modal
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  useEffect(() => {
    // Fetch popup data
    const fetchPopUpData = async () => {
      const response = await FetchPopUp();
      console.log("is this fit",response)
      if (response?.data) {
        setPopupMessages(response.data);  // Assuming response.data is an array of popup messages
      }
    };

    fetchPopUpData();
  }, [FetchPopUp]);

  const handleSignOut = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      navigate('/login'); // Navigate to login after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleSubmenu = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  const confirmSignOut = () => {
    setShowSignOutModal(true);  // Show the confirmation modal
  };

  const handleNextPopup = () => {
    if (currentPopupIndex < popupMessages?.length - 1) {
      setCurrentPopupIndex(currentPopupIndex + 1);
    }
  };

  const handleClosePopup = () => {
    setPopupMessages([]);  // Clear messages after closing
  };

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/user/dashboard', subMenu: [] },
    { label: 'University', icon: BarChart2, path: '/user/university', subMenu: [] },
    { label: 'View Fees', icon: CreditCard, path: '/user/fees', subMenu: [] },
    {
      label: 'R/D Admission',
      icon: CreditCard,
      path: '/user/applyview',
      subMenu: [
        { label: 'View', path: '/user/applyview' },
        { label: 'Apply', path: '/user/apply' },
      ],
    },
    {
      label: 'Online Admission',
      icon: CreditCard,
      path: '/user/viewlead',
      subMenu: [
        { label: 'View Lead', path: '/user/viewlead' },
        { label: 'Apply Admission', path: '/user/applyonline' },
        { label: 'Online Admission', path: '/user/viewonline' },
      ],
    },
    {
      label: 'My Commission List',
      icon: User2Icon,
      path: '/user/commission',
    },
    { label: 'University Materials', icon: Settings, path: '/user/material', subMenu: [] },
    { label: 'Important Download', icon: Settings, path: '/user/download', subMenu: [] },
    { label: 'Recived Payment', icon: Settings, path: '/user/recived', subMenu: [] },


    {
      label: 'Transaction',
      icon: CreditCard,
      path: '/user/viewtransaction',
      subMenu: [
        { label: 'View Transactions', path: '/user/viewtransaction' },
        { label: 'Create Transaction', path: '/user/createtransaction' },
      ],
    },
   
   
  ];



  return (
    <div className="flex min-h-screen bg-teal-50">
      {/* Popup Viewer Modal */}
{popupMessages.length > 0 && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: popupMessages[currentPopupIndex]?.message }} />
      
      <div className="mt-4 flex justify-between">
        <button 
          onClick={handleClosePopup} 
          className="px-4 py-2 bg-gray-300 rounded-lg">
          Close
        </button>
        
        {currentPopupIndex < popupMessages.length - 1 ? (
          <button 
            onClick={handleNextPopup} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Next
          </button>
        ) : (
          <button 
            onClick={handleClosePopup} 
            className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Done
          </button>
        )}
      </div>
    </div>
  </div>
)}
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-lg mr-2">
              <Menu className="text-white" size={20} />
            </div>
            {sidebarOpen && <span className="font-bold text-gray-800">PURITY UI</span>}
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div>
                  <Link
                    to={item.path}
                    className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors"
                    onClick={() => item.subMenu.length && toggleSubmenu(index)}
                  >
                    <div className="p-2 rounded-lg bg-teal-100 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                      <item.icon size={20} />
                    </div>
                    {sidebarOpen && <span className="ml-3">{item.label}</span>}
                    {item?.subMenu?.length > 0 && (
                      <div className="ml-auto">
                        {submenuOpen === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    )}
                  </Link>
                  {submenuOpen === index && (
                    <ul className="ml-6 space-y-2 mt-2">
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors"
                          >
                            <span className="ml-3">{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <div className='flex flex-row space-x-5'>
              <button onClick={() => navigate('/user/profile')}>
                <User2Icon size={20} />
              </button>
              <button onClick={confirmSignOut} className="p-2 rounded-lg hover:bg-gray-100">
                <PowerOff size={20} />
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sign-out Confirmation Modal */}
      {showSignOutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-700">Confirm Sign Out</h2>
            <p className="mt-2 text-gray-600">Are you sure you want to sign out?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
