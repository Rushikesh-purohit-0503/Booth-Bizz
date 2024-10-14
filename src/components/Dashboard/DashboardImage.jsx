import React from 'react';
import {Trash2} from 'lucide-react'
const DashboardImg = ({ src, alt, title, event="Default Event", stallNumber='Default stallnumber', onClick,onDelete }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden border-b-2 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {src && <img src={src} alt={alt} className="stall-image w-full h-48 object-cover" />}
        <div className="p-5">
          {title && <h3 className="text-2xl font-bold">{title}</h3>}
          {stallNumber && <p className="text-lg">{stallNumber}</p>}
          {event && <p className="text-sm text-gray-600">{event}</p>}
           <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the onClick for the entire card
          onDelete();
        }}
        className="absolute top-2 right-2 bg-red-400 text-black p-2 rounded-full hover:bg-red-500 transition-colors"
      >
        {/* Lucide Trash Icon */}
        <Trash2  size={16} />
      </button>
        </div>
      </div>
     
    </div>
  );

};

export default DashboardImg;
