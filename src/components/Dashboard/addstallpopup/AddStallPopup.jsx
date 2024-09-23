import React, { useState } from 'react';

const availableImages = [
  'stall-1.jpeg',
  'stall-2.jpeg',
  'stall-3.jpeg',
  'stall-4.jpeg',
];

const AddStallPopup = ({ onSave, onCancel }) => {
  const [stallName, setStallName] = useState('');
  const [stallNumber, setStallNumber] = useState('');
  const [city, setCity] = useState('');
  const [eventName, setEventName] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const handleSave = () => {
    // Randomly select an image from availableImages
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    onSave({ stallName, stallNumber, city, eventName, productCategory, image: randomImage });
    setStallName('');
    setStallNumber('');
    setCity('');
    setEventName('');
    setProductCategory('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-md">
        <h2 className="text-lg">Add New Stall</h2>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">Stall Name</label>
          <input
            type="text"
            value={stallName}
            onChange={(e) => setStallName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">Stall Number</label>
          <input
            type="text"
            value={stallNumber}
            onChange={(e) => setStallNumber(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">Product Category</label>
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            placeholder="Eg. food, jewellery, accessories, crafts and etc."
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="flex gap-6 mt-4">
          <button onClick={handleSave} className="w-full py-2 rounded bg-red-300 text-black hover:bg-red-400">Save</button>
          <button onClick={onCancel} className="w-full py-2 rounded bg-gray-300 text-black hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddStallPopup;
