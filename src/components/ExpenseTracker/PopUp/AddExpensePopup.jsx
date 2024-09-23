import React from 'react';
import { useForm } from 'react-hook-form';

const AddExpensePopup = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <span className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-800" onClick={onClose}>&times;</span>
        <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="date" className="mb-1 text-left">Date</label>
          <input 
            type="date" 
            id="date" 
            {...register("date", { required: "Date is required" })}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.date && <span className="text-red-500 text-sm mb-2">{errors.date.message}</span>}

          <label htmlFor="description" className="mb-1 text-left">Description</label>
          <input 
            type="text" 
            id="description" 
            {...register("description", { required: "Description is required" })}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.description && <span className="text-red-500 text-sm mb-2">{errors.description.message}</span>}

          <label htmlFor="category" className="mb-1 text-left">Category</label>
          <input 
            type="text" 
            id="category" 
            {...register("category", { required: "Category is required" })}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.category && <span className="text-red-500 text-sm mb-2">{errors.category.message}</span>}

          <label htmlFor="amount" className="mb-1 text-left">Amount</label>
          <input 
            type="number" 
            id="amount" 
            {...register("amount", { 
              required: "Amount is required",
              min: { value: 0, message: "Amount must be positive" }
            })}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.amount && <span className="text-red-500 text-sm mb-2">{errors.amount.message}</span>}

          <button 
            type="submit" 
            className="bg-[#f89b94] text-gray-800 py-2 mt-2 rounded hover:bg-red-400 transition duration-300"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpensePopup;
