import React from 'react';
import { useForm } from 'react-hook-form';

const EditProductPopup = ({ isOpen, onClose, onSubmit, existingData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: existingData,
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg w-80 relative">
                <span className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-800" onClick={onClose}>&times;</span>
                <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <label htmlFor="edit-name" className="mb-1 text-left">Name</label>
                    <input 
                        type="text" 
                        id="edit-name" 
                        {...register("name", { required: "Name is required" })}
                        className="mb-3 p-2 text-base border border-gray-300 rounded"
                    />
                    {errors.name && <span className="text-red-500 text-sm mb-2">{errors.name.message}</span>}

                    <label htmlFor="edit-price" className="mb-1 text-left">Price</label>
                    <input 
                        type="number" 
                        id="edit-price" 
                        {...register("price", { required: "Price is required" })}
                        className="mb-3 p-2 text-base border border-gray-300 rounded"
                    />
                    {errors.price && <span className="text-red-500 text-sm mb-2">{errors.price.message}</span>}

                    <label htmlFor="edit-quantity" className="mb-1 text-left">Quantity</label>
                    <input 
                        type="number" 
                        id="edit-quantity" 
                        {...register("quantity", { required: "Quantity is required" })}
                        className="mb-3 p-2 text-base border border-gray-300 rounded"
                    />
                    {errors.quantity && <span className="text-red-500 text-sm mb-2">{errors.quantity.message}</span>}

                    <button 
                        type="submit" 
                        className="bg-[#f89b94] text-gray-800 py-2 mt-2 rounded hover:bg-[#f87a6e] transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProductPopup
