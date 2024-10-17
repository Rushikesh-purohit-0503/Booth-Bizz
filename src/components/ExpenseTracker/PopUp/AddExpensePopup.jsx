import React, { useState } from 'react';


const AddExpensePopup = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    customCategory: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);


  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.category === 'custom' && !formData.customCategory) newErrors.customCategory = "Custom category is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    else if (Number(formData.amount) <= 0) newErrors.amount = "Amount must be positive";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        category: formData.category === 'custom' ? formData.customCategory : formData.category,
        amount: Number(formData.amount)
      });
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setFormData(prevData => ({
      ...prevData,
      category: category === 'custom' ? 'custom' : category,
      customCategory: category === 'custom' ? formData.customCategory : ''
    }));
    setDropdownOpen(false);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <span className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-800" onClick={onClose}>&times;</span>
        <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
        <form onSubmit={handleSubmit} className="flex flex-col">

          <label htmlFor="date" className="mb-1 text-left">Date</label>
          <input 
            type="date" 
            id="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.date && <span className="text-red-500 text-sm mb-2">{errors.date}</span>}


          <label htmlFor="description" className="mb-1 text-left">Description</label>
          <input 
            type="text" 
            id="description" 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.description && <span className="text-red-500 text-sm mb-2">{errors.description}</span>}


          <label htmlFor="category" className="mb-1 text-left">Category</label>
          <div className="relative">
            <div 
              className="mb-3 p-2 text-base border border-gray-300 rounded cursor-pointer bg-white"
              onClick={handleDropdownToggle}
            >
              {formData.category || "Select a category"}
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
          {formData.category === 'custom' && (
            <input 
              type="text" 
              placeholder="Enter custom category"
              name="customCategory"
              value={formData.customCategory}
              onChange={handleChange}
              className="mb-3 p-2 text-base border border-gray-300 rounded"
            />
          )}
          {errors.category && <span className="text-red-500 text-sm mb-2">{errors.category}</span>}
          {errors.customCategory && <span className="text-red-500 text-sm mb-2">{errors.customCategory}</span>}


          <label htmlFor="amount" className="mb-1 text-left">Amount</label>
          <input 
            type="number" 
            id="amount" 
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mb-3 p-2 text-base border border-gray-300 rounded"
          />
          {errors.amount && <span className="text-red-500 text-sm mb-2">{errors.amount}</span>}

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