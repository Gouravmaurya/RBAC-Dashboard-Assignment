import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Column {
  key: string;
  label: string;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: (item: any) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, actions }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-800 rounded-lg shadow overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead className="bg-zinc-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-zinc-800 divide-y divide-zinc-700">
            {data.map((item, index) => (
              <motion.tr 
                key={index} 
                className="hover:bg-zinc-700"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300"
                  >
                    {column.render
                      ? column.render(item[column.key])
                      : item[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {actions(item)}
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-zinc-800 px-4 py-3 flex items-center justify-between border-t border-zinc-700 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="relative inline-flex items-center px-4 py-2 border border-zinc-600 text-sm font-medium rounded-md text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
          >
            Previous
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-zinc-600 text-sm font-medium rounded-md text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
          >
            Next
          </motion.button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-zinc-300">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">10</span> of{' '}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-zinc-600 bg-zinc-800 text-sm font-medium text-zinc-300 hover:bg-zinc-700"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-zinc-600 bg-zinc-800 text-sm font-medium text-zinc-300 hover:bg-zinc-700"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </nav>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataTable;