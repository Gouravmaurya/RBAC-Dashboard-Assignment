import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, Lock, AlertCircle, User, UserCog } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the type for stat
type Stat = {
  icon: any;
  label: string;
  value: string;
  color: string;
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    className="backdrop-blur-lg bg-zinc-900/70 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-zinc-800/50"
  >
    <div className="flex items-center gap-4">
      <motion.div 
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className={`p-4 rounded-xl ${color}`}
      >
        <Icon className="w-7 h-7 text-white" />
      </motion.div>
      <div>
        <p className="text-sm font-medium text-zinc-400">{label}</p>
        <motion.p 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-zinc-100"
        >
          {value}
        </motion.p>
      </div>
    </div>
  </motion.div>
);

const ActivityItem = ({ title, time, description }: { title: string, time: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex gap-4 pb-4 hover:bg-zinc-800/50 p-3 rounded-lg transition-colors duration-200"
  >
    <div className="relative">
      <div className="w-3 h-3 mt-2 rounded-full bg-zinc-500 animate-pulse"></div>
      <div className="absolute top-4 left-1.5 w-0.5 h-full bg-zinc-700"></div>
    </div>
    <div>
      <div className="flex items-center gap-2">
        <p className="font-semibold text-zinc-100">{title}</p>
        <span className="text-sm text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-full">{time}</span>
      </div>
      <p className="text-sm text-zinc-400 mt-1">{description}</p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<{ title: string, time: string, description: string }[]>([]);

  // Function to fetch data from the database (replace with your actual implementation)
  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/api/users');
    const data = await response.json();
    setStats(data);
    setRecentActivity(data.recentActivity || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const adminUsersCount = stats.filter(user => user.roles?.some((role: any) => role.name === 'admin')).length;
  const regularUsersCount = stats.filter(user => user.roles?.some((role: any) => role.name === 'user')).length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 bg-zinc-950 min-h-screen"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-zinc-100 mb-8"
      >
        Dashboard Overview
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <StatCard 
          icon={Users} 
          label="Total Users"
          value={stats.length.toString()}
          color="bg-gradient-to-r from-blue-600 to-blue-700"
        />
        <StatCard
          icon={UserCog}
          label="Admin Users" 
          value={adminUsersCount.toString()}
          color="bg-gradient-to-r from-green-700 to-green-800"
        />
        <StatCard
          icon={User}
          label="Regular Users"
          value={regularUsersCount.toString()} 
          color="bg-gradient-to-r from-purple-800 to-purple-900"
        />
      </div>

      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="backdrop-blur-lg bg-zinc-900/70 rounded-xl shadow-lg p-8 border border-zinc-800/50"
      >
        <h2 className="text-xl font-bold text-zinc-100 mb-6">Recent Activity & System Status</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}

          {/* System Status */}
          <div className="mt-8 space-y-4 bg-zinc-800/50 p-6 rounded-xl backdrop-blur-sm">
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex justify-between items-center p-3 bg-zinc-900/70 rounded-lg shadow-sm backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-zinc-400">System Health</span>
              <span className="px-3 py-1 text-sm font-medium bg-zinc-800/80 text-zinc-100 rounded-full animate-pulse">
                Healthy
              </span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex justify-between items-center p-3 bg-zinc-900/70 rounded-lg shadow-sm backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-zinc-400">Last Backup</span>
              <span className="text-sm font-medium text-zinc-100 bg-zinc-800/80 px-3 py-1 rounded-full">Today, 03:45 AM</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex justify-between items-center p-3 bg-zinc-900/70 rounded-lg shadow-sm backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-zinc-400">Server Uptime</span>
              <span className="text-sm font-medium text-zinc-100 bg-zinc-800/80 px-3 py-1 rounded-full">99.9%</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex justify-between items-center p-3 bg-zinc-900/70 rounded-lg shadow-sm backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-zinc-400">Active Sessions</span>
              <span className="text-sm font-medium text-zinc-100 bg-zinc-800/80 px-3 py-1 rounded-full">24</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;