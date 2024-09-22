import React from 'react';

const DeleteProductPopup = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg relative">
                <span 
                    className="absolute top-2 right-2 cursor-pointer text-xl" 
                    onClick={onClose}
                >
                    &times;
                </span>
                <h3 className="text-lg font-semibold mb-4">Confirm! Delete this Product</h3>
                <div className="flex justify-between">
                    <button 
                        className="bg-[#f89b94] text-white py-2 px-4 rounded hover:bg-[#f87a6e] transition duration-300" 
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button 
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300" 
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductPopup
