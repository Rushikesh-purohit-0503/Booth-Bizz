import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditExpensePopup = ({ isOpen, onClose, onSubmit, existingData }) => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
  const [customCategory, setCustomCategory] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({ customCategory: '' });


  const selectedCategory = watch('category');

  useEffect(() => {
    if (isOpen && existingData) {
      reset(existingData);
      const predefinedCategories = ['miscellaneous', 'repair & maintenance', 'rent expense', 'raw material', 'printing & stationery', 'employee salaries', 'bank fees'];
      setCustomCategory(!predefinedCategories.includes(existingData.category));
      if (!predefinedCategories.includes(existingData.category)) {
        setValue('category', 'custom');
        setValue('customCategory', existingData.category);
        setFormData({ customCategory: existingData.category });
      }
    }
  }, [isOpen, existingData, reset, setValue]);

  useEffect(() => {
    if (selectedCategory === 'custom') {
      setCustomCategory(true);
    } else {
      setCustomCategory(false);
    }
  }, [selectedCategory]);

  if (!isOpen) return null;

  const onSubmitForm = (data) => {
    const submissionData = {
      ...data,
      category: data.category === 'custom' ? data.customCategory : data.category,
      amount: Number(data.amount)
    };
    onSubmit(submissionData);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCategorySelect = (category) => {
    if (category === 'custom') {
      setCustomCategory(true);
      setValue('category', 'custom');
    } else {
      setCustomCategory(false);
      setValue('category', category)
    }
    setDropdownOpen(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setValue(event.target.name, event.target.value); // Update the form value in react-hook-form
  };  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <span className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-800" onClick={onClose}>&times;</span>
        <h3 className="text-lg font-semibold mb-4">Edit Expense</h3>
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col">
          <label htmlFor="date" className="mb-1 text-left">Date</label>
          <input 
            type="date" 
            id="date" 
            {...register('date', { required: 'Date is required' })}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.date && <span className="text-red-500 text-sm mb-2">{errors.date.message}</span>}

          <label htmlFor="description" className="mb-1 text-left">Description</label>
          <input 
            type="text" 
            id="description" 
            {...register('description', { required: 'Description is required' })}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.description && <span className="text-red-500 text-sm mb-2">{errors.description.message}</span>}

          <label htmlFor="category" className="mb-1 text-left">Category</label>
          <div className="relative">
            <div 
              className="mb-3 p-2 text-base border border-gray-300 rounded cursor-pointer bg-white"
              onClick={handleDropdownToggle}
            >
              {selectedCategory || "Select a category"}
            </div>
            {dropdownOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded w-full max-h-32 overflow-y-auto">
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCategorySelect("miscellaneous")}>Miscellaneous</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCategorySelect("repair & maintenance")}>Repair & Maintenance</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCategorySelect("rent expense")}>Rent Expense</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCategorySelect("raw material")}>Raw Material</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCategorySelect("printing & stationery")}>Printing & Stationery</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCategorySelect("employee salaries")}>Employee Salaries & Advances</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCategorySelect("bank fees")}>Bank Fees & Charge</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCategorySelect("custom")}>Other</div>
              </div>
            )}
          </div>
          {customCategory && (
            <input 
              type="text" 
              placeholder="Enter custom category"
              {...register('customCategory', { required: 'Custom category is required' })}
              className="mb-3 p-2 text-base border border-gray-300 rounded"
            />
          )}
          {errors.category && <span className="text-red-500 text-sm mb-2">{errors.category.message}</span>}
          {errors.customCategory && <span className="text-red-500 text-sm mb-2">{errors.customCategory.message}</span>}

          <label htmlFor="amount" className="mb-1 text-left">Amount</label>
          <input 
            type="number" 
            id="amount" 
            {...register('amount', { 
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be positive' }
            })}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.amount && <span className="text-red-500 text-sm mb-2">{errors.amount.message}</span>}

          <button 
            type="submit" 
            className="bg-[#f89b94] text-gray-800 py-2 mt-2 rounded hover:bg-red-400 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpensePopup;
