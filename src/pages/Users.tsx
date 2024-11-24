import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, MoreVertical } from 'lucide-react';
import DataTable from '../components/DataTable';
import UserForm from '../components/UserForm';
import { getUsers, deleteUser, updateUser } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getUsers();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setError('Invalid data format received from server');
        console.error('Invalid data format received:', data);
        toast.error('Invalid data format received from server');
      }
    } catch (error) {
      setError('Failed to load users');
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully');
        loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },


    {
      key: 'status',
      label: 'Status',
      render: (status: string) => (
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === 'active'
              ? 'bg-zinc-800 text-zinc-100'
              : 'bg-zinc-700 text-zinc-100'
          }`}
        >
          {status || 'N/A'}
        </motion.span>
      ),
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (roles: string[] = []) => (
        <div className="flex flex-wrap gap-1">
          {roles && roles.length > 0 ? (
            roles.map((role, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-100 rounded-full"
              >
                {role}
              </motion.span>
            ))
          ) : (
            <span className="text-zinc-500">No roles assigned</span>
          )}
        </div>
      ),
    },
    // {
    //   key: 'roles',label: 'Roles',
    //   render: (roles: any[] = []) => (
    //     <div className="flex gap-1">
    //       {roles && roles.length > 0 ? (
    //         roles.map((role) => (
    //           <motion.span
    //             key={role._id}
    //             whileHover={{ scale: 1.05 }}
    //             className="px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-100 rounded-full"
    //           >
    //             {role.name}
    //           </motion.span>
    //         ))
    //       ) : (
    //         <span className="text-zinc-500">No roles assigned</span>
    //       )}
    //     </div>
    //   ),
    // },
  ];

  const actions = (user: any) => (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => handleEdit(user)}
        aria-label="Edit user"
        className="p-1 hover:bg-zinc-800 rounded text-zinc-400"
      >
        <Pencil className="w-4 h-4" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => handleDelete(user._id)}
        aria-label="Delete user"
        className="p-1 hover:bg-zinc-800 rounded text-zinc-400"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        aria-label="More options"
        className="p-1 hover:bg-zinc-800 rounded text-zinc-400"
      >
        <MoreVertical className="w-4 h-4" />
      </motion.button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <div className="mb-6 flex justify-between items-center">
        <motion.h1 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-2xl font-semibold text-zinc-100"
        >
          Users
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-700 text-zinc-100 rounded-lg hover:bg-zinc-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </motion.button>
      </div>
      
      {loading ? (
        <div className="text-center py-4 text-zinc-400">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zinc-500 mb-4">No users found</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-700 text-zinc-100 rounded-lg hover:bg-zinc-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Your First User
          </motion.button>
        </div>
      ) : (
        <DataTable columns={columns} data={users} actions={actions} />
      )}

      {showForm && (
        <UserForm
          user={editingUser}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
          onSuccess={() => {
            loadUsers();
            setShowForm(false);
            setEditingUser(null);
            toast.success(editingUser ? 'User updated successfully' : 'User added successfully');
          }}
        />
      )}
    </motion.div>
  );
};

export default Users;