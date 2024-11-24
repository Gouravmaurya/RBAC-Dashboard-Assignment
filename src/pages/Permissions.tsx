import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import { motion } from 'framer-motion';

const Permissions = () => {
  const [permissions] = useState([
    {
      id: '1',
      name: 'read_users',
      description: 'Can view users', 
      module: 'Users',
      roles: ['Admin', 'User'],
    },
    {
      id: '2',
      name: 'write_users',
      description: 'Can create/edit users',
      module: 'Users', 
      roles: ['Admin'],
    },
  ]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    {
      key: 'module',
      label: 'Module',
      render: (module: string) => (
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-100 rounded-full"
        >
          {module}
        </motion.span>
      ),
    },
    {
      key: 'roles',
      label: 'Assigned Roles',
      render: (roles: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {roles.map((role) => (
            <motion.span
              key={role}
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 text-xs font-medium bg-zinc-700 text-zinc-100 rounded-full"
            >
              {role}
            </motion.span>
          ))}
        </div>
      ),
    },
  ];

  const actions = (permission: any) => (
    <div className="flex items-center gap-2">
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-1 hover:bg-zinc-800 rounded"
        title="Edit permission"
      >
        <Pencil className="w-4 h-4 text-zinc-400" />
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-1 hover:bg-zinc-800 rounded"
        title="Delete permission"
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
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-2xl font-semibold text-zinc-100"
        >
          Permissions
        </motion.h1>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Permission
        </motion.button>
      </div>
      <DataTable columns={columns} data={permissions} actions={actions} />
    </motion.div>
  );
};

export default Permissions;