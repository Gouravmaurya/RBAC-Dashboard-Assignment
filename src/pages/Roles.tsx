import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import { motion } from 'framer-motion';

const Roles = () => {
  const [roles] = useState([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      permissions: ['all'],
      users: 2,
    },
    {
      id: '2',
      name: 'User',
      description: 'Limited access',
      permissions: ['read', 'write'],
      users: 5,
    },
  ]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    {
      key: 'permissions',
      label: 'Permissions',
      render: (permissions: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {permissions.map((permission) => (
            <motion.span
              key={permission}
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-100 rounded-full"
            >
              {permission}
            </motion.span>
          ))}
        </div>
      ),
    },
    {
      key: 'users',
      label: 'Users',
      render: (count: number) => (
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="px-2 py-1 text-xs font-medium bg-zinc-700 text-zinc-100 rounded-full"
        >
          {count} users
        </motion.span>
      ),
    },
  ];

  const actions = (role: any) => (
    <div className="flex items-center gap-2">
      <motion.button 
        whileHover={{ scale: 1.1 }}
        title="Edit role"
        className="p-1 hover:bg-zinc-800 rounded"
      >
        <Pencil className="w-4 h-4 text-zinc-400" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        title="Delete role" 
        className="p-1 hover:bg-zinc-800 rounded"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </motion.button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-zinc-950"
    >
      <div className="mb-6 flex justify-between items-center">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-2xl font-semibold text-zinc-100"
        >
          Roles
        </motion.h1>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </motion.button>
      </div>
      <DataTable columns={columns} data={roles} actions={actions} />
    </motion.div>
  );
};

export default Roles;