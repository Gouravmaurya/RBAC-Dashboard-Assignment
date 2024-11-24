import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, ShieldCheck, Lock, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: ShieldCheck, label: 'Roles', path: '/roles' },
    { icon: Lock, label: 'Permissions', path: '/permissions' },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 text-white w-64 min-h-screen p-4"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mb-8 px-2"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <ShieldCheck className="w-8 h-8 text-blue-700" />
        </motion.div>
        <h1 className="text-xl font-bold">VRV Security</h1>
      </motion.div>
      <nav>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-zinc-300 hover:bg-zinc-800'
                }`
              }
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="w-5 h-5 " />
              </motion.div>
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;