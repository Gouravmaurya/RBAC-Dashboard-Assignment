import React from 'react';
import { Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/users':
        return 'Users';
      case '/roles':
        return 'Roles';
      case '/permissions':
        return 'Permissions';
      default:
        return 'Dashboard';
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border-b border-zinc-800 h-16 flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-4">
        <motion.h2 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-xl font-semibold text-zinc-100"
        >
          {getPageTitle(location.pathname)}
        </motion.h2>
      </div>
      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-zinc-800 rounded-full relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-zinc-400" />
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
          ></motion.span>
        </motion.button>
        <motion.div 
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="text-right">
            <p className="text-sm font-medium text-blue-400">Admin User</p>
            <p className="text-xs text-zinc-400">admin@vrvsecurity.com</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5 text-zinc-400" />
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;