import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  LogOut, Home, User, Settings, ChevronDown, ChevronUp, Menu, 
  CreditCard, BarChart2, HelpCircle, PowerOff, 
  User2Icon
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';

export default function PrivateLayout() {
  const navigate = useNavigate();
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      navigate('/login'); // Navigate to login after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/user/dashboard', subMenu: [] },
    { label: 'University', icon: BarChart2, path: '/user/university', subMenu: [] },
    { label: 'View Fees', icon: CreditCard, path: '/user/fees', subMenu: [] },
    { label: 'Important Download', icon: Settings, path: '/user/download', subMenu: [] },
    { label: 'University Materials', icon: Settings, path: '/user/material', subMenu: [] },
    {
      label: 'Payment',
      icon: CreditCard,
      path: '/user/viewtransaction',
      subMenu: [
        { label: 'View Transactions', path: '/user/viewtransaction' },
        { label: 'Create Transaction', path: '/user/createtransaction' },
      ],
    },
    {
      label: 'Admission',
      icon: CreditCard,
      path: '/user/applyview',
      subMenu: [
        { label: 'View', path: '/user/applyview' },
        { label: 'Apply', path: '/user/apply' },
      ],
    },
    {
      label: 'Online',
      icon: CreditCard,
      path: '/user/viewlead',
      subMenu: [
        { label: 'View Lead', path: '/user/viewlead' },
        { label: 'Apply Admission', path: '/user/applyonline' },
        { label: 'Online Admission', path: '/user/viewonline' },
      ],
    },
  ];

  const toggleSubmenu = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  return (
    <div className="flex min-h-screen bg-teal-50">
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
                    {item.subMenu.length > 0 && (
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
          {sidebarOpen && (
            <div className="mt-8 p-4 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl text-white">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg mb-4">
                <HelpCircle className="text-teal-500" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Need help?</h4>
              <p className="text-sm opacity-90">Please check our docs</p>
              <button className="mt-4 w-full py-2 px-4 bg-white text-teal-500 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Documentation
              </button>
            </div>
          )}
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
              <button onClick={()=>{
                navigate('/user/profile')
              }}>
                  <User2Icon size = {20} />
              </button>
              <button onClick={handleSignOut} className="p-2 rounded-lg hover:bg-gray-100">
                <PowerOff size={20} />
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
