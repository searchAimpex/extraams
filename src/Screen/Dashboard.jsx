import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { 
  Wallet, 
  Users, 
  Globe, 
  BarChart, 
  ArrowRight, 
  Zap 
} from 'lucide-react';

const salesData = [
  { name: 'Jan', value1: 50, value2: 20 },
  { name: 'Feb', value1: 80, value2: 40 },
  { name: 'Mar', value1: 200, value2: 150 },
  { name: 'Apr', value1: 300, value2: 220 },
  { name: 'May', value1: 450, value2: 300 },
  { name: 'Jun', value1: 350, value2: 320 },
  { name: 'Jul', value1: 380, value2: 340 },
  { name: 'Aug', value1: 300, value2: 350 },
  { name: 'Sep', value1: 450, value2: 380 },
];

const barData = [300, 200, 100, 250, 400, 300, 220, 100, 380];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-teal-50">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Today's Moneys"
          value="$53,000"
          change="+55%"
          icon={<Wallet size={20} />}
          positive
        />
        <StatCard 
          title="Today's Users"
          value="2,300"
          change="+5%"
          icon={<Users size={20} />}
          positive
        />
        <StatCard 
          title="New Clients"
          value="+3,020"
          change="-14%"
          icon={<Globe size={20} />}
          positive={false}
        />
        <StatCard 
          title="Total Sales"
          value="$173,000"
          change="+8%"
          icon={<BarChart size={20} />}
          positive
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Built by Developers</p>
          <h3 className="text-xl font-bold mt-1">Purity UI Dashboard</h3>
          <p className="text-sm text-gray-500 mt-2">
            From colors, cards, typography to complex elements, you will find the full documentation.
          </p>
          <button className="flex items-center text-sm mt-4 text-gray-600 hover:text-gray-900">
            Read more <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-emerald-400 rounded-xl p-8 flex items-center justify-center">
            <Zap className="w-16 h-16 text-white" />
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="/api/placeholder/400/200" 
              alt="Work with rockets" 
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
              <h3 className="font-bold">Work with the rockets</h3>
              <p className="text-sm">Wealth creation is a revolutionary recent positive-sum game.</p>
              <button className="flex items-center text-sm mt-2 hover:text-emerald-300">
                Read more <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Active Users</h3>
              <span className="text-emerald-500">+23% than last week</span>
            </div>
          </div>
          <div className="px-6">
            <div className="h-48">
              <div className="flex space-x-4 h-full">
                {barData.map((height, index) => (
                  <div key={index} className="flex-1 flex items-end">
                    <div 
                      className="w-full bg-gray-200 rounded-t"
                      style={{ height: `${height / 4}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              <MetricCard title="Users" value="32,984" icon={<Users size={20} />} />
              <MetricCard title="Clicks" value="2.42m" icon={<BarChart size={20} />} />
              <MetricCard title="Sales" value="2,400$" icon={<Wallet size={20} />} />
              <MetricCard title="Items" value="320" icon={<Globe size={20} />} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Sales Overview</h3>
              <span className="text-emerald-500">5% more in 2021</span>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Area 
                    type="monotone" 
                    dataKey="value1" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value2" 
                    stroke="#1F2937" 
                    fill="#1F2937" 
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon, positive }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-bold">{value}</span>
            <span className={`text-sm ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
              {change}
            </span>
          </div>
        </div>
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;