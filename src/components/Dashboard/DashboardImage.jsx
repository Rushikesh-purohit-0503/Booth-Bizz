import React from 'react';

const DashboardImg = ({ src, alt, title, onClick }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden border-b-2 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
        {title && (
          <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
            <p className="text-white font-bold text-xl bg-black bg-opacity-60 rounded-md p-2 inline-block">{title}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardImg;
