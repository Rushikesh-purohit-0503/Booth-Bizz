import React from 'react';
import { motion } from 'framer-motion';
import { XIcon, AlertTriangle } from 'lucide-react';

const DeleteExpensePopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 shadow-xl relative max-w-sm w-full mx-4"
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          onClick={onClose}
        >
          <XIcon size={24} />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="bg-yellow-100 p-3 rounded-full mb-4">
            <AlertTriangle size={32} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Confirm Deletion</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this expense? This action cannot be undone.</p>
          
          <div className="flex justify-center space-x-4 w-full">
            <button
              className="bg-red-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-red-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteExpensePopup;